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
