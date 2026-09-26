import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import useProducts from '../../hooks/useProducts';
import { productApi } from '../../services/productApi';
import PageContainer from '../../components/layout/PageContainer';
import Button from '../../components/common/Button';
import SearchBar from '../../components/common/SearchBar';
import Pagination from '../../components/common/Pagination';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import Modal from '../../components/common/Modal';
import ProductFilters from '../../components/products/ProductFilters';
import ProductTable from '../../components/products/ProductTable';
import ProductCard from '../../components/products/ProductCard';

const Products = () => {
  const { products, pagination, loading, error, params, updateParams, refetch } = useProducts();
  const [categories, setCategories] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await productApi.getCategories();
        setCategories(res.data.data || []);
      } catch (err) {}
    };
    fetchCategories();
  }, []);

  const handleDeactivate = async () => {
    if (!deleteModal.product) return;
    setDeleting(true);
    try {
      await productApi.deleteProduct(deleteModal.product._id);
      toast.success('Product deactivated successfully');
      setDeleteModal({ isOpen: false, product: null });
      refetch();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to deactivate product');
    } finally {
      setDeleting(false);
    }
  };

  const actions = (
    <Link to="/products/create">
      <button className="inline-flex items-center justify-center gap-2 font-semibold rounded-xl bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/20 px-5 py-2.5 transition-all duration-200">
        <HiOutlinePlus className="w-5 h-5" />
        Add Product
      </button>
    </Link>
  );

  return (
    <PageContainer
      title="Products"
      subtitle="Manage your inventory catalog and master data."
      actions={actions}
    >
      <div className="card p-0 overflow-hidden mb-6">
        <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96">
            <SearchBar
              value={params.search}
              onChange={(val) => updateParams({ search: val })}
              placeholder="Search by name or SKU..."
            />
          </div>
          <div className="w-full md:w-auto">
            <ProductFilters
              categories={categories}
              params={params}
              updateParams={updateParams}
            />
          </div>
        </div>

        {error ? (
          <EmptyState title="Error" message={error} actionLabel="Retry" onAction={refetch} />
        ) : loading && products.length === 0 ? (
          <Loading type="skeleton-table" rows={6} />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            message={params.search || params.category || params.isActive ? "Try adjusting your filters or search query." : "Get started by adding your first product to the inventory."}
            actionLabel={!params.search && !params.category && !params.isActive ? "Add Product" : "Clear Filters"}
            onAction={!params.search && !params.category && !params.isActive
              ? () => window.location.href = '/products/create'
              : () => updateParams({ search: '', category: '', isActive: '', unitOfMeasure: '' })
            }
          />
        ) : (
          <div className="p-0">
            {/* Desktop view */}
            <div className="hidden lg:block">
              <ProductTable
                products={products}
                onDeactivate={(p) => setDeleteModal({ isOpen: true, product: p })}
              />
            </div>

            {/* Mobile view */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 p-5 bg-slate-50">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onDeactivate={(p) => setDeleteModal({ isOpen: true, product: p })}
                />
              ))}
            </div>

            <div className="p-5 border-t border-slate-100 bg-white">
              <Pagination
                pagination={pagination}
                onPageChange={(page) => updateParams({ page })}
              />
            </div>
          </div>
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        title="Deactivate Product"
      >
        <p className="text-slate-600 mb-6">
          Are you sure you want to deactivate <span className="font-semibold text-slate-900">{deleteModal.product?.name}</span>?
          This will hide it from active inventory operations but preserve its history.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteModal({ isOpen: false, product: null })} disabled={deleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeactivate} loading={deleting}>
            Deactivate
          </Button>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Products;
