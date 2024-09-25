import React from 'react';
import PropTypes from 'prop-types';
import styles from './BlogEntry.module.css';

const BlogEntry = ({ title, date, content, imageUrl }) => {
  return (
    <div className={styles.blogEntry}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>{date}</p>
        <p>{content}</p>
      </div>
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