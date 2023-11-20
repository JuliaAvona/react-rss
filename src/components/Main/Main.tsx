import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ProductList from '../ProductList/ProductList';
import SearchForm from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';
import ResultsControl from '../ResultsControl/ResultsControl';
import Spinner from '../Spinner/Spinner';
import { useSearch } from '../SearchContext';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../redux/features/search/searchSlice';
import { useFetchProductsQuery } from '../../api/api';

const Main: React.FC = () => {
    const [limit, setLimit] = useState<number>(Number(localStorage.getItem('limit')) || 10);
    const [inputLimit, setInputLimit] = useState<string>(localStorage.getItem('inputLimit') || '10');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const { inputSearchQuery } = useSearch();
    const searchQuery = useSelector((state) => state.search.searchQuery) || localStorage.getItem('searchQuery') || '';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const skip = (currentPage - 1) * limit;

    const { data, error, isLoading } = useFetchProductsQuery({ searchQuery, limit, skip });
    console.log(data);

    useEffect(() => {
        if (data) {
            setTotalPages(Math.ceil(data.total / limit));
        }
    }, [data, limit]);

    useEffect(() => {
        navigate(`?page=${currentPage}`);
    }, [currentPage, navigate]);

    useEffect(() => {
        localStorage.setItem('limit', String(limit));
        localStorage.setItem('inputLimit', inputLimit);
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('inputSearchQuery', inputSearchQuery);
    }, [limit, inputLimit, searchQuery, inputSearchQuery]);

    const handleUpdateClick = (e: React.FormEvent) => {
        e.preventDefault();
        const newLimit = parseInt(inputLimit, 10);
        if (!isNaN(newLimit)) {
            setLimit(newLimit);
            setCurrentPage(1);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent): void => {
        e.preventDefault();
        dispatch(setSearchQuery(inputSearchQuery));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(totalPages, currentPage + 1));
    };

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div>
            <ErrorBoundary>
                <SearchForm handleSearchSubmit={handleSearchSubmit} />
                <ResultsControl
                    inputLimit={inputLimit}
                    handleUpdateClick={handleUpdateClick}
                    setInputLimit={setInputLimit}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                />
                {isLoading ? <Spinner /> : <ProductList products={data?.products} onProductClick={handleProductClick} />}
            </ErrorBoundary>
        </div>
    );
};

export default Main;