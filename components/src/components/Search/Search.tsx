import React, { useState } from 'react';

const Search = () => {
  const [search, setSearch] = React.useState('Toxic Rick');

  function getSearch() {
    console.log(search);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" onClick={() => getSearch()}>
        Search
      </button>
    </>
  );
};

export default Search;
