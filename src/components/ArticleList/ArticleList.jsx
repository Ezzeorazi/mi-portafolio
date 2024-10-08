import React from 'react';
import styles from './ArticleList.module.css';

const ArticleList = ({ articles }) => {
	return (
		<div className={styles.articleList}>
			{articles.map(article => (
				<div className={styles.articleContainer} key={article.id}>
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

			))} 		
		
		</div>
	);
};


export default ArticleList;