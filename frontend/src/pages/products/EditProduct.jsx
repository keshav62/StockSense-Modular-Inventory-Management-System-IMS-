import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { productApi } from '../../services/productApi';
import PageContainer from '../../components/layout/PageContainer';
import ProductForm from '../../components/products/ProductForm';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          productApi.getProduct(id),
          productApi.getCategories()
        ]);
        setProduct(productRes.data.data);
        setCategories(categoryRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (data) => {
    setSubmitting(true);
    try {
      await productApi.updateProduct(id, data);
      toast.success('Product updated successfully');
      navigate('/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update product');
      setSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="Edit Product"
      subtitle={product ? `Updating master data for ${product.sku}` : ''}
    >
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 max-w-4xl">
        {loading ? (
          <Loading type="page" />
        ) : error ? (
          <EmptyState
            title="Error"
            message={error}
            actionLabel="Go Back"
            onAction={() => navigate('/products')}
          />
        ) : (
          <ProductForm
            initialData={product}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/products')}
            loading={submitting}
            isEdit={true}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default EditProduct;
