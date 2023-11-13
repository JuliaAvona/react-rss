import React from 'react';
import './SearchForm.css';
import { useSearch } from '../SearchContext';

interface Props {
    handleSearchSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<Props> = ({ handleSearchSubmit }) => {
    const { inputSearchQuery, setInputSearchQuery } = useSearch();

    return (
        <form onSubmit={handleSearchSubmit} className="search">
            <input
                type="text"
                value={inputSearchQuery}
                onChange={e => setInputSearchQuery(e.target.value)}
                placeholder="Search... #iphone"
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;