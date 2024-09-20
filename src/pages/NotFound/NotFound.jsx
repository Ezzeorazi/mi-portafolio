"use client";
import React from 'react';
import styles from './NotFound.module.css';
import PropTypes from 'prop-types';

const NotFound = ({}) => {
	return (
		<div className={styles.notfound}>
 			<h1>Error 404: Page not found</h1>
 		</div>
	);
};

NotFound.propTypes = {};

export default NotFound;