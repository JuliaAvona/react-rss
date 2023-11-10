import React from 'react';
import './SearchForm.css';

interface Props {
    inputSearchQuery: string;
    handleSearchSubmit: (e: React.FormEvent) => void;
    setInputSearchQuery: (value: string) => void;
}

const SearchForm: React.FC<Props> = ({ inputSearchQuery, handleSearchSubmit, setInputSearchQuery }) => {
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
