import { useState, useEffect } from 'react';
import { getTotalPages } from '../api/api';

const usePagination = (initialPage = 1, initialLimit = 10) => {
  const [page, setPage] = useState(initialPage);
  const [allPages, setAllPages] = useState(1);
  const [total, setTotal] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTotalPages();
        setTotal(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setAllPages(Math.ceil(total / limit));
  }, [total, limit]);

  return {
    page,
    setPage,
    allPages,
    total,
    limit,
    setLimit
  };
}

export default usePagination;
