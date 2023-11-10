import React from 'react';
import './Pagination.css';

interface Props {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const Pagination: React.FC<Props> = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
    return (
        <div className="pagination">
            <button onClick={handlePrevPage}>Prev Page</button>
            <p>{currentPage} of {totalPages}</p>
            <button onClick={handleNextPage}>Next Page</button>
        </div>
    );
};

export default Pagination;
