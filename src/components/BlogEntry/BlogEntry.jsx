import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogEntry.module.css';

const BlogEntry = ({ title, date, content, imageUrl }) => {
  return (
    <div className={styles.blogEntry}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.image} />}
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.date}>{date}</p>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

BlogEntry.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

export default BlogEntry;