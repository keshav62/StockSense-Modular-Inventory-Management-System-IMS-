import { useState, useEffect, useCallback } from 'react';
import productApi from '../services/productApi';

export const useProducts = (initialParams = {}) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    search: '',
    category: '',
    unitOfMeasure: '',
    isActive: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    ...initialParams,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Clean empty params
      const cleanParams = {};
      Object.entries(params).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          cleanParams[key] = value;
        }
      });
      const res = await productApi.getProducts(cleanParams);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const updateParams = useCallback((newParams) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
      // Reset to page 1 when filters change (unless page is explicitly set)
      page: newParams.page || 1,
    }));
  }, []);

  return {
    products,
    pagination,
    loading,
    error,
    params,
    updateParams,
    refetch: fetchProducts,
  };
};

export default useProducts;
