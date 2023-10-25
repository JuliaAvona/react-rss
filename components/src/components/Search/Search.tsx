import React from 'react';
import styles from './Search.module.scss';

const Search = () => {
  const [search, setSearch] = React.useState('');

  function getSearch() {
    console.log(search);
    localStorage.setItem('search', search);
  }

  search;
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search #Rick"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" onClick={() => getSearch()}>
        Search
      </button>
    </div>
  );
};

export default Search;
