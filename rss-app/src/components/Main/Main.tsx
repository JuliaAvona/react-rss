import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Routes, Route, } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import ProductList from '../ProductList/ProductList';
import SearchForm from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';
import ResultsControl from '../ResultsControl/ResultsControl';
import Spinner from '../Spinner/Spinner';
import OneProduct from '../OneProduct/OneProduct';

const Main: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [limit, setLimit] = useState<number>(Number(localStorage.getItem('limit')) || 10);
    const [inputLimit, setInputLimit] = useState<string>(localStorage.getItem('inputLimit') || '10');
    const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('searchQuery') || '');
    const [inputSearchQuery, setInputSearchQuery] = useState<string>(localStorage.getItem('inputSearchQuery') || '');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentProduct, setCurrentProduct] = useState<any | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const getProducts = async () => {
        setLoading(true);
        const baseEndpoint = 'https://dummyjson.com/products';
        const searchParam = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '?';
        const limitParam = `limit=${limit}`;
        const skip = (currentPage - 1) * limit;
        const skipParam = `skip=${skip}`;

        const url = `${baseEndpoint}${searchParam}&${limitParam}&${skipParam}`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products);

        const totalPagesCalculated = Math.ceil(data.total / limit);
        setTotalPages(totalPagesCalculated);
        setLoading(false);
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const pageFromUrl = Number(params.get('page')) || 1;
        setCurrentPage(pageFromUrl);
    }, [location]);

    useEffect(() => {
        navigate(`?page=${currentPage}`);
    }, [currentPage, navigate]);

    useEffect(() => {
        getProducts();
    }, [limit, searchQuery, currentPage]);

    useEffect(() => {
        try {
            localStorage.setItem('limit', String(limit));
            localStorage.setItem('inputLimit', inputLimit);
            localStorage.setItem('searchQuery', searchQuery);
            localStorage.setItem('inputSearchQuery', inputSearchQuery);
        } catch (error) {
            console.error("Failed to save to localStorage:", error);
        }
    }, [limit, inputLimit, searchQuery, inputSearchQuery]);

    const handleUpdateClick = (e: React.FormEvent) => {
        e.preventDefault();
        const newLimit = parseInt(inputLimit, 10);
        if (!isNaN(newLimit)) {
            setLimit(newLimit);
            setCurrentPage(1);
        }
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(inputSearchQuery);
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(Math.max(1, currentPage - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(Math.min(totalPages, currentPage + 1));
    };

    const handleProductClick = (product: any) => {
        navigate(`/product/${product.id}`);
    };

    const handleCloseModal = () => {
        navigate(`?page=${currentPage}`);
    }

    return (
        <div>
            <ErrorBoundary>
                <SearchForm
                    inputSearchQuery={inputSearchQuery}
                    handleSearchSubmit={handleSearchSubmit}
                    setInputSearchQuery={setInputSearchQuery}
                />
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
                {loading ? <Spinner /> : <ProductList products={products} onProductClick={handleProductClick} />}
            </ErrorBoundary>
            <Routes>
                <Route path="/product/:id" element={<OneProduct />} />
            </Routes>
        </div>
    );
};

export default Main;