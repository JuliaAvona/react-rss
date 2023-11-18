import React from 'react';
import './SearchForm.css';
import { useSearch } from '../SearchContext';

interface Props {
    handleSearchSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<Props> = ({ handleSearchSubmit }) => {
    const { inputSearchQuery, setInputSearchQuery } = useSearch();
    console.log('inputSearchQuery' + inputSearchQuery);

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
