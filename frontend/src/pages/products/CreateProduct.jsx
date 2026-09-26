import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productApi } from '../../services/productApi';
import PageContainer from '../../components/layout/PageContainer';
import ProductForm from '../../components/products/ProductForm';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productApi.getCategories();
        const activeCategories = res.data.data.filter(c => c.isActive);
        setCategories(activeCategories);
        if (activeCategories.length === 0) {
          setError('You need to create at least one category before adding products.');
        }
      } catch (err) {
        setError('Failed to load categories. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await productApi.createProduct(data);
      toast.success('Product created successfully');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create product');
      setSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="Create Product"
      subtitle="Add a new item to your master product catalog."
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-4xl">
        {loading ? (
          <Loading type="page" />
        ) : error ? (
          <EmptyState
            title="Setup Required"
            message={error}
            actionLabel="Go Back"
            onAction={() => navigate('/products')}
          />
        ) : (
          <ProductForm
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/products')}
            loading={submitting}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default CreateProduct;
