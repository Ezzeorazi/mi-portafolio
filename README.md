# Portafolio de Ezequiel Orazi

Bienvenido al código de mi sitio personal. Este proyecto nació con el objetivo de mostrar mis habilidades en desarrollo web y servir como carta de presentación para nuevas oportunidades laborales.

## Demo

El sitio está desplegado en: [https://ezequiel-orazi.online](https://ezequiel-orazi.online)

## Características principales

- **React + Vite** para una carga rápida y una experiencia de desarrollo moderna.
- **Ruteo dinámico** con React Router DOM y "lazy loading" de páginas para optimizar el rendimiento.
- **Blog estático** gestionado con archivos Markdown convertidos a HTML.
- **Formulario de contacto** conectado a EmailJS para recibir mensajes directamente en mi correo.
- **Diseño responsive** y animaciones con `styled-components` y `animate.css`.

## Tecnologías utilizadas

- React 18
- Vite
- React Router DOM
- Styled Components
- EmailJS
- Animate.css
- React Icons

## Instalación

```bash
# Clona el repositorio
git clone https://github.com/Ezzeorazi/mi-portafolio.git
cd mi-portafolio

# Instala las dependencias
npm install
```

### Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo.
- `npm run build` – Genera los archivos listos para producción en la carpeta `dist`.
- `npm run preview` – Sirve el build generado para hacer pruebas locales.
- `npm test` – Ejecuta las pruebas con Vitest (requiere instalar `vitest`).

## Variables de entorno

Para que el formulario de contacto funcione necesitas tus credenciales de EmailJS. Crea un archivo `.env` a partir de `.env.example` y coloca allí los valores correspondientes:

```
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

## Estructura del proyecto

```
mi-portafolio/
├── public/
│   └── pdf/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── hooks/
│   ├── pages/
│   ├── routers/
│   ├── styles/
│   └── main.jsx
├── package.json
└── vite.config.js
```
## Cómo crear un nuevo post

Sigue estos pasos para publicar una entrada en el blog:

1. Escribe tu artículo en formato HTML (puedes convertirlo desde Markdown si lo prefieres) y colócalo en la carpeta `public`.
2. Añade una imagen relacionada en `public/` y toma nota de su nombre.
3. Registra la entrada en `src/data/data.js` incluyendo `id`, `slug`, `image`, `title`, `category`, `description`, `date`, `ReadingTime` y el nombre del archivo HTML en `content`.
4. Actualiza `public/sitemap.xml` agregando un nuevo elemento `<url>` con la ruta y la fecha de publicación.

Con estos cambios el post aparecerá en la lista del blog y podrá ser indexado por buscadores.

## Contribuciones

Las propuestas de mejora son bienvenidas. Puedes abrir un issue o enviar un pull request si deseas colaborar.

## Contacto

Si quieres saber más sobre mi experiencia o tienes alguna propuesta laboral, puedes escribirme a [ezequiel.orazi90@gmail.com](mailto:ezequiel.orazi90@gmail.com) o contactar conmigo a través del formulario del sitio.

¡Gracias por visitar mi proyecto!
