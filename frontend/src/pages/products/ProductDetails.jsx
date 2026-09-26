import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlinePencilSquare, HiArrowLeft } from 'react-icons/hi2';
import { productApi } from '../../services/productApi';
import PageContainer from '../../components/layout/PageContainer';
import ProductDetailsInfo from '../../components/products/ProductDetails';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProduct(id);
        setProduct(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const actions = product ? (
    <div className="flex items-center gap-3">
      <Button variant="secondary" onClick={() => navigate('/products')}>
        <HiArrowLeft className="w-4 h-4 mr-1" /> Back
      </Button>
      <Link to={`/products/${product._id}/edit`}>
        <Button variant="primary" icon={HiOutlinePencilSquare}>
          Edit Product
        </Button>
      </Link>
    </div>
  ) : null;

  return (
    <PageContainer
      title={product ? product.name : 'Product Details'}
      subtitle={product ? `SKU: ${product.sku}` : ''}
      actions={actions}
    >
      {loading ? (
        <Loading type="page" />
      ) : error ? (
        <EmptyState
          title="Error"
          message={error}
          actionLabel="Go Back to Products"
          onAction={() => navigate('/products')}
        />
      ) : (
        <div className="space-y-6 max-w-5xl">
          <ProductDetailsInfo product={product} />

          {/* Integration point for Member 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden opacity-75">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Stock by Location</h3>
                <p className="text-sm text-slate-500 mt-1">Warehouse distribution (Managed by Inventory Module)</p>
              </div>
              <span className="badge bg-slate-200 text-slate-600">Pending Integration</span>
            </div>
            <div className="p-8 text-center text-slate-500 bg-slate-50 border-t border-slate-200">
              <p>This section will display real-time stock levels across warehouses once the inventory stock engine is integrated.</p>
              <p className="text-xs mt-2 text-slate-400">Product ID: {product._id}</p>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default ProductDetails;
