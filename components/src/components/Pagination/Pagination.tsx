import React from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
    page: number;
    allPages: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, allPages, setPage }) => {
    const handlePrevClick = (): void => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextClick = (): void => {
        if (page < allPages) setPage(page + 1);
    };

    return (
        <div className={styles.pagination}>
            <button onClick={handlePrevClick} disabled={page === 1}>Prev Page</button>
            <p>{page} of {allPages}</p>
            <button onClick={handleNextClick} disabled={page === allPages}>Next Page</button>
        </div>
    );
};

export default Pagination;
