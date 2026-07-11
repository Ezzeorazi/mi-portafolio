"""Clustering de redes coordinadas — el hallazgo vendible del informe.

Construye un grafo sobre los dominios SOSPECHOSOS (no LIMPIO) y detecta redes como
componentes conexos. Dos dominios se conectan si:
  - comparten IP exacta, o
  - son template_twin (estructura HTML casi idéntica), o
  - mismo ASN + mismo registrador + registrados con < 30 días de diferencia.

Cada componente con 2+ nodos es una red detectada. Se restringe a sospechosos a propósito:
dos sitios legítimos en la misma IP de un CDN (Cloudflare, Fastly) no deben aparecer como
"red". Ver tres dominios distintos en la misma IP con el mismo template rankeando en las
posiciones 4, 7 y 12 es una prueba, no una inferencia.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from itertools import combinations

import networkx as nx

from .config import weights
from .scoring import ScoredDomain
from .signals import ScoringContext


@dataclass
class DetectedNetwork:
    domains: list[str]
    members: list[ScoredDomain]
    shared_ips: list[str] = field(default_factory=list)
    linked_by: list[str] = field(default_factory=list)  # razones legibles

    @property
    def size(self) -> int:
        return len(self.domains)

    @property
    def positions(self) -> list[int]:
        pos: list[int] = []
        for m in self.members:
            pos.extend(m.positions)
        return sorted(pos)


def build_networks(
    scored: list[ScoredDomain], ctx: ScoringContext
) -> list[DetectedNetwork]:
    suspects = [s for s in scored if s.classification != weights.CLASS_CLEAN]
    suspect_domains = {s.domain for s in suspects}
    by_domain = {s.domain: s for s in suspects}

    graph = nx.Graph()
    graph.add_nodes_from(suspect_domains)

    _add_shared_ip_edges(graph, ctx, suspect_domains)
    _add_template_edges(graph, ctx, suspect_domains)
    _add_asn_registrar_window_edges(graph, ctx, suspect_domains)

    networks: list[DetectedNetwork] = []
    for component in nx.connected_components(graph):
        if len(component) < 2:
            continue
        sub = graph.subgraph(component)
        reasons: set[str] = set()
        shared_ips: set[str] = set()
        for _, _, data in sub.edges(data=True):
            reasons.update(data.get("reasons", set()))
            shared_ips.update(data.get("ips", set()))
        members = sorted(
            (by_domain[d] for d in component),
            key=lambda s: min(s.positions or [999]),
        )
        networks.append(
            DetectedNetwork(
                domains=[m.domain for m in members],
                members=members,
                shared_ips=sorted(shared_ips),
                linked_by=sorted(reasons),
            )
        )

    # Redes más grandes primero (más contundentes en el informe).
    networks.sort(key=lambda n: (n.size, -min(n.positions or [999])), reverse=True)
    return networks


def _connect(graph: nx.Graph, a: str, b: str, reason: str, ip: str | None = None) -> None:
    if graph.has_edge(a, b):
        graph[a][b]["reasons"].add(reason)
        if ip:
            graph[a][b]["ips"].add(ip)
    else:
        graph.add_edge(a, b, reasons={reason}, ips={ip} if ip else set())


def _add_shared_ip_edges(graph, ctx: ScoringContext, suspects: set[str]) -> None:
    for ip, domains in ctx.by_ip.items():
        group = [d for d in domains if d in suspects]
        for a, b in combinations(group, 2):
            _connect(graph, a, b, f"misma IP {ip}", ip=ip)


def _add_template_edges(graph, ctx: ScoringContext, suspects: set[str]) -> None:
    for domain, twins in ctx.template_twins.items():
        if domain not in suspects:
            continue
        for twin in twins:
            if twin in suspects:
                _connect(graph, domain, twin, "template HTML casi idéntico")


def _add_asn_registrar_window_edges(graph, ctx: ScoringContext, suspects: set[str]) -> None:
    # Pares que comparten (ASN, registrador) Y están dentro de la ventana de registro.
    for (asn, registrar), domains in ctx.by_asn_registrar.items():
        group = [d for d in domains if d in suspects]
        for a, b in combinations(group, 2):
            if b in ctx.same_window.get(a, set()):
                _connect(
                    graph, a, b,
                    f"mismo ASN ({asn}) + registrador ({registrar}), "
                    "registrados con <30 días de diferencia",
                )
