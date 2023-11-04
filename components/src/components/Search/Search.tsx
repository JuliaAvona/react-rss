import React, { useState } from 'react';
import styles from './Search.module.scss';

const Search: React.FC = () => {

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Search..."
      />
      <button type="submit" >
        Search
      </button>
    </div>
  );
}

export default Search;
