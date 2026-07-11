"""Acceso a Postgres/Neon con psycopg (la cola de jobs es una tabla, sin Redis).

El esquema lo gobierna Prisma (`prisma/schema.prisma`); acá solo se lee y escribe. Las
columnas van en camelCase entre comillas porque así las creó Prisma.

Este módulo se usa en el modo `--from-db` (pasos 3-6). El checkpoint humano (paso 2)
no lo importa, así que no hace falta psycopg ni DATABASE_URL para calibrar.
"""

from __future__ import annotations

import os
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from typing import Any, Iterator

CACHE_TTL_DAYS = 30
MAX_ATTEMPTS = 3


def _dsn() -> str:
    dsn = os.environ.get("DATABASE_URL")
    if not dsn:
        raise RuntimeError("Falta DATABASE_URL en el entorno.")
    return dsn


@contextmanager
def connect() -> Iterator[Any]:
    import psycopg

    conn = psycopg.connect(_dsn(), autocommit=False)
    try:
        yield conn
    finally:
        conn.close()


def claim_pending_job(conn: Any) -> dict[str, Any] | None:
    """Toma UN job PENDING y lo marca RUNNING de forma atómica.

    `FOR UPDATE SKIP LOCKED` evita que dos corridas de cron solapadas agarren el mismo
    job. El prompt pide un solo job por corrida, así que `LIMIT 1`.
    """
    with conn.cursor() as cur:
        cur.execute(
            """
            UPDATE "SerpAnalysisJob"
               SET status = 'RUNNING', attempts = attempts + 1
             WHERE id = (
                   SELECT id FROM "SerpAnalysisJob"
                    WHERE status = 'PENDING'
                    ORDER BY "createdAt" ASC
                    FOR UPDATE SKIP LOCKED
                    LIMIT 1
             )
         RETURNING id, keyword, email, region, attempts;
            """
        )
        row = cur.fetchone()
        conn.commit()
        if not row:
            return None
        return {
            "id": row[0],
            "keyword": row[1],
            "email": row[2],
            "region": row[3],
            "attempts": row[4],
        }


def mark_done(conn: Any, job_id: str, result: dict) -> None:
    import json

    with conn.cursor() as cur:
        cur.execute(
            'UPDATE "SerpAnalysisJob" SET status = %s, "completedAt" = %s, result = %s '
            "WHERE id = %s",
            ("DONE", datetime.now(timezone.utc), json.dumps(result), job_id),
        )
        conn.commit()


def requeue_or_fail(conn: Any, job_id: str, attempts: int, error: str) -> str:
    """Tras un fallo (rate-limit del SERP o error de procesamiento): vuelve a PENDING
    salvo que ya haya agotado los intentos (3 crons), en cuyo caso queda FAILED.

    `attempts` ya viene incrementado por `claim_pending_job`, así que un rate-limit sí
    consume un intento y tras 3 crons fallidos el job se marca FAILED.
    """
    new_status = "FAILED" if attempts >= MAX_ATTEMPTS else "PENDING"
    with conn.cursor() as cur:
        cur.execute(
            'UPDATE "SerpAnalysisJob" SET status = %s, "errorMessage" = %s WHERE id = %s',
            (new_status, error[:1000], job_id),
        )
        conn.commit()
    return new_status


# ─── Caché de perfiles de dominio (TTL 30 días) ───────────────────────────────

def load_cached_profiles(conn: Any, domains: list[str]) -> dict[str, dict]:
    """Devuelve los perfiles vigentes (fetchedAt dentro del TTL) por dominio, como filas
    completas (dict por columna) para poder reconstruir el DomainProfile."""
    if not domains:
        return {}
    from psycopg.rows import dict_row

    cutoff = datetime.now(timezone.utc) - timedelta(days=CACHE_TTL_DAYS)
    with conn.cursor(row_factory=dict_row) as cur:
        cur.execute(
            'SELECT * FROM "SerpDomainProfile" '
            'WHERE domain = ANY(%s) AND "fetchedAt" >= %s',
            (domains, cutoff),
        )
        return {row["domain"]: row for row in cur.fetchall()}


def upsert_profile(conn: Any, profile_dict: dict) -> None:
    """Inserta o actualiza un perfil de dominio (upsert por PK domain)."""
    import json

    cols = list(profile_dict.keys())
    placeholders = ", ".join(["%s"] * len(cols))
    quoted = ", ".join(f'"{c}"' for c in cols)
    updates = ", ".join(f'"{c}" = EXCLUDED."{c}"' for c in cols if c != "domain")
    values = [
        json.dumps(v) if isinstance(v, (dict, list)) else v
        for v in profile_dict.values()
    ]
    with conn.cursor() as cur:
        cur.execute(
            f'INSERT INTO "SerpDomainProfile" ({quoted}) VALUES ({placeholders}) '
            f'ON CONFLICT (domain) DO UPDATE SET {updates}',
            values,
        )
        conn.commit()
