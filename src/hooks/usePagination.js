import { useState, useEffect, useRef, useCallback } from 'react';

export default function usePagination({
  fetchFn,
  limit = 20,
  searchDelay = 300,
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const searchTimeoutRef = useRef(null);
  const isInitialMount = useRef(true);

  const fetchData = useCallback(async (currentPage = page, searchQuery = search) => {
    try {
      setLoading(true);
      const result = await fetchFn({ page: currentPage, limit, search: searchQuery });
      setData(result.data || []);
      setTotal(result.total || 0);
      setTotalPages(result.totalPages || 1);
      setPage(currentPage);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchFn, limit]);

  // Initial fetch
  useEffect(() => {
    fetchData(1, '');
  }, []);

  // Search with debounce
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, search);
    }, searchDelay);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search, searchDelay]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchData(newPage, search);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  const refresh = () => {
    fetchData(page, search);
  };

  const deleteItem = (id, filterFn) => {
    setData(data.filter(filterFn || ((item) => item.id !== id)));
    setTotal((prev) => prev - 1);
  };

  return {
    data,
    loading,
    search,
    page,
    total,
    totalPages,
    setSearch: handleSearch,
    setPage: handlePageChange,
    refresh,
    deleteItem,
  };
}
