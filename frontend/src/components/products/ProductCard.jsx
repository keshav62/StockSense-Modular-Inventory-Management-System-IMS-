import { Link } from 'react-router-dom';
import { HiOutlinePencilSquare, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';

const ProductCard = ({ product, onDeactivate }) => {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm font-mono text-slate-500 mt-0.5">{product.sku}</p>
        </div>
        <span className={product.isActive ? 'badge badge-success' : 'badge badge-danger'}>
          {product.isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4 text-sm">
        <div>
          <p className="text-slate-500">Category</p>
          <p className="font-medium text-slate-900">{product.category?.name || '-'}</p>
        </div>
        <div>
          <p className="text-slate-500">Stock ({product.unitOfMeasure})</p>
          <p className="font-medium text-slate-900">{product.initialStock}</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100 mt-2">
        <Link
          to={`/products/${product._id}`}
          className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
        >
          <HiOutlineEye className="w-5 h-5" />
        </Link>
        <Link
          to={`/products/${product._id}/edit`}
          className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
        >
          <HiOutlinePencilSquare className="w-5 h-5" />
        </Link>
        {product.isActive && (
          <button
            onClick={() => onDeactivate(product)}
            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <HiOutlineTrash className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
