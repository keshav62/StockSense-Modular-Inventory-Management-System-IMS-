import { formatDateTime } from '../../utils/formatDate';

const ProductDetailsInfo = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
        <h3 className="text-lg font-semibold text-slate-900">Product Information</h3>
        <p className="text-sm text-slate-500 mt-1">Detailed master data for this product.</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div>
          <dt className="text-sm font-medium text-slate-500">Product Name</dt>
          <dd className="mt-1 text-base text-slate-900">{product.name}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">SKU / Code</dt>
          <dd className="mt-1 text-base font-mono text-slate-900">{product.sku}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Category</dt>
          <dd className="mt-1 text-base text-slate-900">{product.category?.name || '-'}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Unit of Measure</dt>
          <dd className="mt-1 text-base text-slate-900">{product.unitOfMeasure}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Status</dt>
          <dd className="mt-1">
            <span className={product.isActive ? 'badge badge-success text-sm' : 'badge badge-danger text-sm'}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-slate-500">Initial Stock</dt>
          <dd className="mt-1 text-base text-slate-900 font-medium">{product.initialStock}</dd>
        </div>

        <div className="md:col-span-2 pt-4 border-t border-slate-100">
          <dt className="text-sm font-medium text-slate-500">Description</dt>
          <dd className="mt-2 text-base text-slate-700 whitespace-pre-wrap">
            {product.description || <span className="italic text-slate-400">No description provided.</span>}
          </dd>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-sm">
          <div>
            <dt className="text-slate-500">Created At</dt>
            <dd className="mt-1 text-slate-900">{formatDateTime(product.createdAt)}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Last Updated</dt>
            <dd className="mt-1 text-slate-900">{formatDateTime(product.updatedAt)}</dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsInfo;
