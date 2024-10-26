import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import data from "../../data/data";
import styles from './BlogEntry.module.css'; // Importa tus estilos si es necesario

const BlogEntry = () => {
  const { slug } = useParams();
  const article = data.find(item => item.slug === slug);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (article && article.content) {
      fetch(`/${article.content}`)
        .then(response => {
          if (!response.ok) throw new Error("No se pudo cargar el contenido");
          return response.text();
        })
        .then(htmlContent => setContent(htmlContent))
        .catch(error => console.error("Error al cargar el contenido:", error));
    }
  }, [article]);

  if (!article) return <p>Artículo no encontrado</p>;

  return (
    <div className={styles.blogEntry}>
      <NavLink to="/blog" className={styles.backLink}>← Volver al blog</NavLink>
      <h1>{article.title}</h1>
      <img src={`/${article.image}`} alt={article.title} />
      <p>{article.date} · {article.ReadingTime}</p>
      {/* Inserta el HTML del contenido cargado */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BlogEntry;
