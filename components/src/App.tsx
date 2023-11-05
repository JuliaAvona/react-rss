import React, { useEffect, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [limit, setLimit] = useState<number>(Number(localStorage.getItem('limit')) || 10);
  const [inputLimit, setInputLimit] = useState<string>(localStorage.getItem('inputLimit') || '10');
  const [searchQuery, setSearchQuery] = useState<string>(localStorage.getItem('searchQuery') || '');
  const [inputSearchQuery, setInputSearchQuery] = useState<string>(localStorage.getItem('inputSearchQuery') || '');

  const getProducts = async () => {
    const baseEndpoint = 'https://dummyjson.com/products';
    const searchParam = searchQuery ? `/search?q=${encodeURIComponent(searchQuery)}` : '';
    const limitParam = `limit=${limit}`;

    const url = `${baseEndpoint}${searchParam}&${limitParam}`;

    const response = await fetch(url);
    const data = await response.json();
    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, [limit, searchQuery]);

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

  const createProducts = () => {
    return products.map((product: any) => {
      return (
        <div className="product" key={product.id}>
          <p>{product.title}</p>
          <p>{product.description}</p>
          <p>{product.brand}</p>
          <img src={product.images[0]} alt={product.title} />
        </div>
      )
    })
  }

  const handleUpdateClick = (e: React.FormEvent) => {
    e.preventDefault();
    const newLimit = parseInt(inputLimit, 10);
    if (!isNaN(newLimit)) {
      setLimit(newLimit);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputSearchQuery);
  };

  return (
    <div>
      <ErrorBoundary>
        <form onSubmit={handleSearchSubmit} className="search">
          <input
            type="text"
            value={inputSearchQuery}
            onChange={e => setInputSearchQuery(e.target.value)}
            placeholder="Search... #iphone"
          />
          <button type="submit">
            Search
          </button>
        </form>
        <div className="pagination">
          <button>Prev Page</button>
          <p>1 of 6</p>
          <button>Next Page</button>
        </div>
        <form onSubmit={handleUpdateClick} className="control">
          <input
            type="text"
            value={inputLimit}
            onChange={e => setInputLimit(e.target.value)}
            placeholder="Results per page... #10"
          />
          <button type="submit">
            Update Results
          </button>
        </form>
        <div className="results">
          {createProducts()}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
