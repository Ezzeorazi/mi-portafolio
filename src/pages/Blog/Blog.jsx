import React, { useEffect, useState } from 'react';
import styles from './Blog.module.css';
import BlogEntry from '../../components/BlogEntry/BlogEntry';
import Loading from '../../components/Loading/Loading';

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  const entries = [
	{
	  title: "Primera entrada de blog",
	  date: "2023-10-01",
	  content: "Este es el contenido de la primera entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Segunda entrada de blog",
	  date: "2023-10-02",
	  content: "Este es el contenido de la segunda entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Tercera entrada de blog",
	  date: "2023-10-03",
	  content: "Este es el contenido de la tercera entrada blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Cuarta entrada de blog",
	  date: "2023-10-04",
	  content: "Este es el contenido de la cuarta entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Quinta entrada de blog",
	  date: "2023-10-05",
	  content: "Este es el contenido de la quinta entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Sexta entrada de blog",
	  date: "2023-10-06",
	  content: "Este es el contenido de la sexta entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Séptima entrada de blog",
	  date: "2023-10-07",
	  content: "Este es el contenido de la séptima entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Octava entrada de blog",
	  date: "2023-10-08",
	  content: "Este es el contenido de la octava entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Novena entrada de blog",
	  date: "2023-10-09",
	  content: "Este es el contenido de la novena entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Décima entrada de blog",
	  date: "2023-10-10",
	  content: "Este es el contenido de la décima entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Undécima entrada de blog",
	  date: "2023-10-11",
	  content: "Este es el contenido de la undécima entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Duodécima entrada de blog",
	  date: "2023-10-12",
	  content: "Este es el contenido de la duodécima entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
	  title: "Decimotercera entrada de blog",
	  date: "2023-10-13",
	  content: "Este es el contenido de la decimotercera entrada de blog.",
	  imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	},
	{
		title: "Creando una Aplicación de Blog con React",
		date: "2023-10-14",
		content: "En esta entrada, exploramos el proceso de creación de una aplicación de blog utilizando React. Comenzamos configurando el entorno de desarrollo con Vite, una herramienta de construcción rápida y ligera. Luego, creamos componentes reutilizables para las entradas del blog y la barra de búsqueda. También implementamos una funcionalidad de búsqueda en tiempo real para filtrar las entradas del blog según el término de búsqueda del usuario. Finalmente, añadimos estilos responsivos para asegurar que la aplicación se vea bien en dispositivos móviles y de escritorio. Este proyecto es un excelente ejemplo de cómo React puede ser utilizado para construir aplicaciones web dinámicas y modernas.",
		imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	  }
  ];

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false);
      setFilteredEntries(entries); // Inicializa las entradas filtradas
    }, 1000); // Ajusta el tiempo de carga según sea necesario
  }, []);

  useEffect(() => {
    setFilteredEntries(
      entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.blog}>
      <h2>Blog</h2>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBar}
      />
      {filteredEntries.map((entry, index) => (
        <BlogEntry
          key={index}
          title={entry.title}
          date={entry.date}
          content={entry.content}
          imageUrl={entry.imageUrl}
        />
      ))}
    </div>
  );
};

export default Blog;