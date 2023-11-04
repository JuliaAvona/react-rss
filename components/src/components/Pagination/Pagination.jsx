import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ page }) => {
    return (
        <div className={styles.pagination}>
            <button>Prev Page</button>
            <p>{page}</p>
            <button>Next Page</button>
        </div>
    );
};

export default Pagination;