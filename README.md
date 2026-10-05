# Portafolio de Ezequiel Orazi

Sitio personal y comercial de Ezequiel Orazi, desarrollador web fullstack radicado en Playa del Carmen (México). Funciona como carta de presentación para reclutadores y como vidriera de servicios para clientes de América Latina.

**Sitio en producción:** [https://ezequiel-orazi.online](https://ezequiel-orazi.online)

## Qué incluye

- **Home** con propuesta de valor, proyectos destacados, servicios con precios publicados y FAQ.
- **Currículum, Skills y Sobre mí** con experiencia, formación, stack agrupado por área y CV en PDF.
- **Proyectos** con casos de estudio (problema, decisiones técnicas, resultados).
- **Blog** con artículos técnicos en HTML y un semanario de noticias tech generado automáticamente cada miércoles con GitHub Actions y Gemini.
- **Herramientas gratuitas** para captar clientes: auditoría SEO (`/auditoria-seo`) y análisis de seguridad web (`/analisis-seguridad`), servidas desde route handlers de Next.js.
- **Detector de granjas de contenido** (`/detector-de-bots`): herramienta con cola de trabajos en Postgres y un worker en Python que corre en GitHub Actions.
- **Sitio bilingüe** (español / inglés) con cambio de idioma en cliente.
- **SEO técnico**: metadata por página, JSON-LD (Person, FAQPage), sitemap automático, canonicals y cabeceras de seguridad (CSP, HSTS, etc.).

## Stack

| Capa | Tecnologías |
| --- | --- |
| Framework | Next.js 15 (App Router), React 18, TypeScript |
| Estilos | Tailwind CSS, Framer Motion |
| Datos | Prisma ORM + PostgreSQL (Neon) para el detector de bots |
| Contenido | Posts en HTML estático (`content/blog`) + metadatos en `data/posts.ts` |
| Formulario | EmailJS (cliente) con honeypot y cooldown |
| Automatización | GitHub Actions (noticias semanales, worker Python, tests) |
| Hosting | Netlify con `@netlify/plugin-nextjs` |

## Mapa de rutas

Todas las rutas del sitio, incluidas las que no aparecen en la navegación.

### Páginas en el menú

| Ruta | Qué es |
| --- | --- |
| `/` | Home: propuesta de valor, proyectos destacados, servicios y FAQ |
| `/services` | Servicios con precios publicados |
| `/auditoria-seo` | Herramienta gratuita de auditoría SEO on-page + PageSpeed |
| `/analisis-seguridad` | Herramienta gratuita de análisis de seguridad web (cabeceras, TLS, etc.) |
| `/proyectos` | Listado de proyectos |
| `/curriculum` | Experiencia, formación y descarga del CV |
| `/blog` | Listado de artículos con filtro por categoría |
| `/contacto` | Formulario (EmailJS) y vías de contacto |

### Páginas públicas que no están en el menú

Son indexables y entran en el sitemap, pero solo se llega a ellas desde el footer o desde el cuerpo de otras páginas.

| Ruta | Qué es | Desde dónde se llega |
| --- | --- | --- |
| `/sobre-mi` | Perfil personal y trayectoria | Footer, firma de los posts del blog |
| `/skills` | Stack agrupado por área | Footer, `/sobre-mi` |
| `/faq` | Preguntas frecuentes (con JSON-LD `FAQPage`) | Footer, bloque de FAQ de la home |

### Rutas ocultas

Funcionan por URL directa, pero no tienen ningún enlace interno, llevan `noindex, nofollow`, están excluidas del sitemap y bloqueadas en `robots.txt` (ver `next-sitemap.config.js`).

| Ruta | Qué es | Por qué está oculta |
| --- | --- | --- |
| `/detector-de-bots` | **Detector de granjas de contenido**: analiza la SERP de un keyword y estima qué porcentaje de resultados son sitios de baja calidad o coordinados. El informe llega por email. | Herramienta en pruebas. El flag maestro es `TOOL_IS_PUBLIC` en `lib/tools/serp-farm/config.ts`; ahí mismo están los pasos para hacerla pública |
| `/presupuestos` | Generador de presupuestos en PDF para uso interno | Herramienta propia, no es para clientes |

### Rutas dinámicas

Se generan en el build (SSG) a partir de los archivos de datos.

| Patrón | Origen de los slugs |
| --- | --- |
| `/blog/<slug>` | `data/posts.ts` (un objeto por post; el HTML vive en `content/blog/<slug>.html`) |
| `/proyectos/<slug>` | `data/projects.ts` |

Proyectos publicados hoy: `riviera-maya-pass`, `nacho-rodriguez`, `elune`, `caliber-3d`, `pixel-maker`, `portfolio`, `nimbus-crm`, `generador-presupuestos`, `creador-prompts-ia`, `golden-horses`, `maktub`.

### API (route handlers)

Todos son `POST`, corren con runtime `nodejs` y `dynamic = 'force-dynamic'`.

| Endpoint | Lo usa | Qué hace |
| --- | --- | --- |
| `/api/seo-audit` | `/auditoria-seo` | Audita on-page y consulta Google PageSpeed (`PAGESPEED_API_KEY` es opcional) |
| `/api/security-scan` | `/analisis-seguridad` | Revisa cabeceras de seguridad, TLS y exposiciones comunes |
| `/api/tools/serp-farm/analyze` | `/detector-de-bots` | Valida y encola el análisis en Postgres, y dispara el worker de GitHub Actions (`repository_dispatch`). Rate limit: 3 análisis por email e IP cada 24 h |

### Cómo se procesa un análisis del detector de bots

1. `/detector-de-bots` manda el keyword a `/api/tools/serp-farm/analyze`, que lo valida
   y lo encola en Postgres.
2. La API dispara el worker con un `repository_dispatch` a GitHub Actions. **Necesita
   `GITHUB_DISPATCH_TOKEN` en Netlify**: sin ese token el análisis se encola igual, pero
   nadie despierta al worker.
3. Como red de seguridad, el workflow también corre por cron cada 10 minutos. GitHub
   demora bastante los cron (en este repo se midieron retrasos de 2 a 6 horas), así que
   el cron evita que un informe se pierda, no que tarde.
4. El worker levanta el job, corre el pipeline y manda el informe por email con Resend.

Para saber si un token sirve antes de cargarlo en Netlify:

```bash
node scripts/probar-dispatch.mjs <token>
```

Hace la misma llamada que el sitio y dice qué contestó GitHub (401 = token inválido,
403 = sin permisos, 404 = el fine-grained token no tiene acceso a este repo, 204 = ok).

### Archivos servidos desde `public/`

| Ruta | Qué es |
| --- | --- |
| `/sitemap.xml` | Lo regenera `next-sitemap` en cada build |
| `/robots.txt` | Lo regenera `next-sitemap`; incluye el `disallow` de las rutas ocultas |
| `/pdf/Ezequiel_Orazi-CV.pdf` | CV en PDF (la ruta está centralizada en `lib/links.ts`) |

### Redirecciones

Definidas en `netlify.toml`:

- `/blog/*.html` → `/blog/*` (301): accesos directos al HTML viejo del blog.
- `/blog/como-mejorar-el rendimiento-en-Next-con-imagenes-optimizadas` → el slug corregido (301).

## Estructura

```
mi-portafolio/
├── app/              # Rutas (App Router): páginas, layouts y route handlers en app/api
├── components/       # Componentes de UI
├── content/blog/     # Artículos del blog en HTML
├── data/             # Fuentes de datos estáticas (posts, proyectos)
├── lib/              # Lógica compartida (blog, proyectos, traducciones, db)
├── prisma/           # Esquema y migraciones (detector de bots)
├── public/           # Imágenes, CV en PDF, robots.txt, sitemap
├── scripts/          # Generador de noticias y utilidades
└── worker/           # Worker en Python del detector de bots
```

## Desarrollo local

```bash
git clone https://github.com/Ezzeorazi/mi-portafolio.git
cd mi-portafolio
npm install
cp .env.example .env   # completar las variables necesarias
npm run dev
```

Scripts principales:

| Script | Descripción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Genera el cliente de Prisma y el build de producción; luego corre `next-sitemap` |
| `npm run lint` | ESLint con la configuración de Next.js |
| `npm run noticias` | Genera manualmente el post semanal de noticias (requiere `GEMINI_API_KEY`) |
| `npm run db:migrate` | Migraciones de Prisma en desarrollo |

Las variables de entorno están documentadas en `.env.example`. El formulario de contacto necesita las claves públicas de EmailJS; el detector de bots necesita `DATABASE_URL` y `DIRECT_URL`.

## Cómo publicar un post

1. Crear el artículo en HTML en `content/blog/<slug>.html` (hay una plantilla en `content/blog/_PLANTILLA.html`).
2. Guardar la portada en `public/images/blog/`.
3. Registrar la entrada en `data/posts.ts` (slug, título, categoría, fecha, tiempo de lectura, descripción e imagen).
4. El sitemap se regenera solo en el build.

El semanario de noticias se publica solo; el detalle está en `scripts/README-noticias.md`.

## Contacto

Propuestas laborales o proyectos: [ezequiel.orazi90@gmail.com](mailto:ezequiel.orazi90@gmail.com), [LinkedIn](https://www.linkedin.com/in/ezequiel-orazi32/) o el [formulario del sitio](https://ezequiel-orazi.online/contacto).
