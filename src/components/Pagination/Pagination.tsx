import React from 'react';
import './Pagination.css';

interface Props {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
}

const Pagination: React.FunctionComponent<Props> = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
    return (
        <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage <= 1}>Prev Page</button>
            <p>{currentPage} of {totalPages}</p>
            <button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next Page</button>
        </div>
    );
};

export default Pagination;
