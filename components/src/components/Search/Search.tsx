import React, { useState } from 'react';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const getSearch = (): void => {
    if (!search) return;
    localStorage.setItem('search', search);
    window.location.reload();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 13) {
      getSearch();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search #Rick"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={getSearch}>
        Search
      </button>
    </div>
  );
}

export default Search;
