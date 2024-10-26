import React from "react";
import { useParams, Link } from "react-router-dom";
import data from "../../data/data";
import ReactMarkdown from "react-markdown";
import styles from './BlogEntry.module.css'; // Importa tus estilos si es necesario

const BlogEntry = () => {
  const { slug } = useParams();
  const article = data.find(item => item.slug === slug);

  if (!article) return <p>Artículo no encontrado</p>;

  return (
    <div className={styles.blogEntry}>
      <Link to="/blog" className={styles.backLink}>← Volver al blog</Link>
      <h1>{article.title}</h1>
      <img src={`/${article.image}`} alt={article.title} />
      <p>{article.date} · {article.ReadingTime}</p>
      <ReactMarkdown>{article.content}</ReactMarkdown>
    </div>
  );
};

export default BlogEntry;
