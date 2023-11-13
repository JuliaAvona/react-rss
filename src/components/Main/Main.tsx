import React, {
    useEffect, useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import ProductList from '../ProductList/ProductList';
import SearchForm from '../SearchForm/SearchForm';
import Pagination from '../Pagination/Pagination';
import ResultsControl from '../ResultsControl/ResultsControl';
import Spinner from '../Spinner/Spinner';
import { fetchProducts } from '../../api/api';
import { useSearch } from '../SearchContext';

const Main: React.FC = () => {

    const [limit, setLimit] = useState<number>(Number(localStorage.getItem('limit')) || 10);
    const [inputLimit, setInputLimit] = useState<string>(localStorage.getItem('inputLimit') || '10');
    const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('searchQuery') || '');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const { inputSearchQuery, setInputSearchQuery, products, setProducts } = useSearch();

    const navigate = useNavigate();

    const getProducts = async () => {
        setLoading(true);
        try {
            const skip = (currentPage - 1) * limit;
            const data = await fetchProducts(searchQuery, limit, skip);

            setProducts(data.products);
            const totalPagesCalculated = Math.ceil(data.total / limit);
            setTotalPages(totalPagesCalculated);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        navigate(`?page=${currentPage}`);
    }, [currentPage]);

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

    const handleSearchSubmit = (e: React.FormEvent): void => {
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

    return (
        <div>
            <ErrorBoundary>
                <SearchForm
                    handleSearchSubmit={handleSearchSubmit}
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
        </div>
    );
};

export default Main;