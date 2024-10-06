import React, { useEffect, useState } from 'react';
import styles from './Blog.module.css';
import BlogEntry from '../../components/BlogEntry/BlogEntry';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);

  const entries = [
	{
		title: "Creando una Aplicación de Blog con React",
		date: "2023-10-14",
		content: "En esta entrada, exploramos el proceso de creación de una aplicación de blog utilizando React. Comenzamos configurando el entorno de desarrollo con Vite, una herramienta de construcción rápida y ligera. Luego, creamos componentes reutilizables para las entradas del blog y la barra de búsqueda. También implementamos una funcionalidad de búsqueda en tiempo real para filtrar las entradas del blog según el término de búsqueda del usuario. Finalmente, añadimos estilos responsivos para asegurar que la aplicación se vea bien en dispositivos móviles y de escritorio. Este proyecto es un excelente ejemplo de cómo React puede ser utilizado para construir aplicaciones web dinámicas y modernas.",
		imageUrl: "trabajando-ia-pc.webp" // URL de la imagen
	  }
  ];



  useEffect(() => {
    setFilteredEntries(
      entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);


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