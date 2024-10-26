import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleList.module.css';

const ArticleList = ({ articles }) => {
  return (
    <div className={styles.articleList}>
      {articles.map(article => (
        <Link
          to={`/blog/${article.slug}`} // Enlace dinámico a la vista de artículo detallado
          key={article.id}
          className={styles.articleLink} // Agrega un estilo para los enlaces, si es necesario
        >
          <div className={styles.articleContainer}>
            <div className={styles.imgContainer}>
              <img src={article.image} alt={article.title} />
            </div>

            <div className={styles.articleBody}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className={styles.articleFooter}>
                <span>{article.date} · </span>
                <span>{article.ReadingTime}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ArticleList;
