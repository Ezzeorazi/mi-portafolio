import React, { useState } from 'react';
import styles from './Blog.module.css';
import { ArticleList, ButtonList } from '../../components';
import data from '../../data/data';

const Blog = () => {

  let allCategories = ['All', ...new Set(data.map(article => article.category))]

  const [categories, setCategories] = useState(allCategories)
  const [articles, setArticles] = useState(data)

  const filterCategory = (category) => {
    if(category === 'All'){
      setArticles(data)
      return
    }

    const filterData = data.filter(article => article.category === category)
    setArticles(filterData)
  }
  return (
    <div className={`animate_animated animate__fadeIn ${styles.blog}`}>
      <h2>Blog</h2>

      <ButtonList categories={categories} filterCategory={filterCategory}/>

      <ArticleList articles={articles} />

    </div>
  );
};

export default Blog;