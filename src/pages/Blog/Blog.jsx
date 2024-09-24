import React, { useEffect, useState } from 'react';
import styles from './Blog.module.css';
import BlogEntry from '../../components/BlogEntry/BlogEntry';
import Loading from '../../components/Loading/Loading'

const Blog = () => {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Simula una carga de datos
		setTimeout(() => {
		  setIsLoading(false);
		}, 1000); // Ajusta el tiempo de carga según sea necesario
	  }, []);

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
		content: "Este es el contenido de la tercera entrada de blog.",
		imageUrl: "https://via.placeholder.com/600x400" // URL de la imagen
	  }
  ];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.blog}>
		<h2>Blog</h2>
      {entries.map((entry, index) => (
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