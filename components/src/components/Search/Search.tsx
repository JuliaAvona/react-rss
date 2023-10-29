import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import styles from './Search.module.scss';

const Search: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  function getSearch(): void {
    localStorage.setItem('search', search);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.keyCode === 13) {
      getSearch();
    }
  }

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search #Rick"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={() => getSearch()}>
        Search
      </button>
    </div>
  );
};

export default Search;
