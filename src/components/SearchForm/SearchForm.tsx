import React from 'react';
import './SearchForm.css';
import { useSearch } from '../SearchContext';
import { SearchProps } from '../../types/types';

const SearchForm: React.FC<SearchProps> = ({ handleSearchSubmit }) => {
    const { inputSearchQuery, setInputSearchQuery } = useSearch();

    return (
        <form onSubmit={handleSearchSubmit} className="search">
            <input
                type="text"
                value={inputSearchQuery || localStorage.getItem('searchQuery') || ''}
                onChange={e => setInputSearchQuery(e.target.value)}
                placeholder="Search... #iphone"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
