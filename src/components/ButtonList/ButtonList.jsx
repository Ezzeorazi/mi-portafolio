import React from 'react';
import styles from './ButtonList.module.css';

const ButtonList = ({categories, filterCategory}) => {
	return (
		<div className={styles.categories}>
			{categories.map(category => (
				<button
				className={styles.btnCategory}
				onClick={() => filterCategory(category)}
				key={category}
				>
					{category}
				</button>
			))}
 		</div>
	);
};


export default ButtonList;