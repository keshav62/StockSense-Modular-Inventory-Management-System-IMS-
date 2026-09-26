import { Link } from 'react-router-dom';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi2';

const ProductTable = ({ products, onDeactivate }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80">
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">UOM</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Stock</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products.map((product) => (
            <tr key={product._id} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-6 py-4">
                <div className="font-semibold text-slate-900">{product.name}</div>
                {product.description && (
                  <div className="text-xs text-slate-400 truncate max-w-xs mt-0.5">{product.description}</div>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="font-mono text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{product.sku}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-600">{product.category?.name || '—'}</span>
              </td>
              <td className="px-6 py-4 text-sm font-medium text-slate-600">
                {product.unitOfMeasure}
              </td>
              <td className="px-6 py-4 text-right">
                <span className="text-sm font-bold text-slate-700">{product.initialStock}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`badge ${product.isActive ? 'badge-success' : 'badge-danger'}`}>
                  {product.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/products/${product._id}`}
                    className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <HiOutlineEye className="w-5 h-5" />
                  </Link>
                  <Link
                    to={`/products/${product._id}/edit`}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Edit Product"
                  >
                    <HiOutlinePencilSquare className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => onDeactivate(product)}
                    disabled={!product.isActive}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Deactivate"
                  >
                    <HiOutlineTrash className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
