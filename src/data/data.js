const data = [
	{
		"id": 1,
    	"slug": "entendiendo-las-promesas-en-javascript",
		"image": "Javascript-blog.png",
		"title": "Entendiendo las Promesas en JavaScript",
		"category": "Javascript",
		"description": "Una guía para comprender y usar promesas en JavaScript para manejar operaciones asíncronas.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "7 min de lectura",
		"content": "entendiendo-las-promesas-en-javascript.html"

	},
	{
		"id": 2,
    	"slug": "como-usar-grid-y-flexbox-en-css",
		"image": "Css-blog.png",
		"title": "Cómo usar Grid y Flexbox en CSS",
		"category": "CSS",
		"description": "Una comparación práctica entre Grid y Flexbox para construir layouts responsivos en CSS.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "6 min de lectura",
		"content": "como-usar-grid-y-flexbox-en-css.html"
	},
	{
		"id": 3,
		"image": "Next-blog.png",
    	"slug": "como-mejorar-el rendimiento-en-Next-con-imagenes-optimizadas",
		"title": "Cómo mejorar el rendimiento en Next.js con imágenes optimizadas",
		"category": "Next.js",
		"description": "Aprende a optimizar imágenes en aplicaciones Next.js usando el componente Image para mejorar el rendimiento.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "5 min de lectura",
		"content": "como-mejorar-el rendimiento-en-Next-con-imagenes-optimizadas.html"
	},
	{
		"id": 4,
    	"slug": "configurando-un-servidor-Express-en-Node",
		"image": "Node-blog.png",
		"title": "Configurando un servidor Express en Node.js",
		"category": "Node.js",
		"description": "Guía paso a paso para configurar un servidor básico con Express.js en Node.js.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "8 min de lectura",
		"content": "configurando-un-servidor-Express-en-Node.html"
	},
	{
		"id": 5,
		"slug": "introduccion-a-los-hooks-de-react",
		"image": "React-blog.png",
		"title": "Introducción a los hooks de React",
		"category": "React",
		"description": "Descubre cómo usar los hooks de React, como useState y useEffect, para manejar el estado y los efectos secundarios.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "6 min de lectura",
		"content": "introduccion-a-los-hooks-de-react.html"
	},
	{
		"id": 6,
		"slug": "flujo-de-trabajo-con-git",
		"image": "Git-blog.png",
		"title": "Flujo de trabajo con Git: ramas y fusiones",
		"category": "Git",
		"description": "Cómo trabajar con ramas y realizar fusiones en Git para gestionar el control de versiones de forma efectiva.",
		"date": "Publicado el 21 de octubre de 2024",
		"ReadingTime": "5 min de lectura",
		"content": "flujo-de-trabajo-con-git.html"
	},
	{
		"id": 7,
		"slug": "como-aprender-desarrollo-web",
		"image": "trabajando-ia-pc.webp",
		"title": "Guía Completa para Aprender Desarrollo Web",
		"category": "Desarrollo Web",
		"description": "Explora los fundamentos del desarrollo web, desde cómo comenzar hasta las áreas de front-end, back-end y full stack.",
		"date": "Publicado el 25 de octubre de 2024",
		"readingTime": "12 min de lectura",
		"content":"como-aprender-desarrollo-web.html"
	},
	{
		"id": 8,
		"slug": "introduccion-a-javascript",
		"image": "JavaScript-blog-new-logo.png",
		"title": "Introducción a JavaScript: Todo lo que necesitas saber",
		"category": "Javascript",
		"description": "Descubre qué es JavaScript, cómo funciona, quién lo creó y dónde puedes aprender este poderoso lenguaje.",
		"date": "Publicado el 26 de octubre de 2024",
		"readingTime": "10 min de lectura",
		"content": "introduccion-a-javascript.html"
	},
	{
		"id": 9,
		"slug": "introduccion-a-material-ui",
		"image": "material-ui-logo.webp",
		"title": "Introducción a Material UI: Diseño Moderno y Consistente",
		"category": "Material UI",
		"description": "Explora Material UI, la biblioteca de componentes basada en Material Design que permite a los desarrolladores construir interfaces de usuario modernas y uniformes de manera rápida y sencilla.",
  		"date": "Publicado el 13 de noviembre de 2024",
  		"readingTime": "10 min de lectura",
		"content": "introduccion-a-material-ui.html"
	},
	{
  		"id": 10,
 		"slug": "html-fundamento-desarrollo-web",
  		"image": "html-logo.png",
  		"title": "HTML: El Fundamento del Desarrollo Web",
  		"category": "HTML",
  		"description": "Conoce los principios y evolución de HTML, su estructura, etiquetas clave, y su integración con CSS y JavaScript.",
  		"date": "Publicado el 13 de noviembre de 2024",
  		"ReadingTime": "8 min de lectura",
  		"content": "que-es-html.html"
},
	{
  		"id": 11,
 		"slug": "que-es-docker",
  		"image": "docker-logo.png",
  		"title": "¿Que es Docker?",
  		"category": "Docker",
  		"description": "Aprende qué es Docker, cómo funciona, y por qué es esencial para el desarrollo y despliegue de aplicaciones modernas. Descubre sus ventajas, casos de uso y recursos para estudiar Docker. ¡Una guía completa para principiantes y expertos!",
  		"date": "Publicado el 17 de noviembre de 2024",
  		"ReadingTime": "10 min de lectura",
  		"content": "que-es-docker.html"
},
{
    "id": 12, // Incrementa el ID para el nuevo artículo
    "slug": "dominando-react-hooks-avanzados",
    "image": "react-hooks-avanzados.png", // Asegúrate de tener una imagen relevante
    "title": "Dominando React Hooks Avanzados: Lleva tus Componentes al Siguiente Nivel",
    "category": "React",
    "description": "Explora los React Hooks avanzados como useContext, useReducer, useMemo y useCallback para optimizar tus componentes y mejorar la gestión del estado.",
    "date": "Publicado el [18 de marzo de 2025]", // Reemplaza con la fecha real
    "readingTime": "8 min de lectura", // Estima el tiempo de lectura
    "content": "dominando-react-hooks-avanzados.html" // Nombre del archivo HTML del artículo
}
	
];

export default data;
