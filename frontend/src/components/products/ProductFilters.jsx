import Dropdown from '../common/Dropdown';
import { UNITS_OF_MEASURE, STATUS_OPTIONS } from '../../utils/constants';

const ProductFilters = ({ categories = [], params, updateParams }) => {
  const categoryOptions = categories.map(c => ({ value: c._id, label: c.name }));

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex-1 min-w-[200px]">
        <Dropdown
          options={categoryOptions}
          value={params.category}
          onChange={(val) => updateParams({ category: val })}
          placeholder="All Categories"
        />
      </div>
      <div className="flex-1 min-w-[150px]">
        <Dropdown
          options={UNITS_OF_MEASURE}
          value={params.unitOfMeasure}
          onChange={(val) => updateParams({ unitOfMeasure: val })}
          placeholder="All Units"
        />
      </div>
      <div className="flex-1 min-w-[150px]">
        <Dropdown
          options={STATUS_OPTIONS}
          value={params.isActive}
          onChange={(val) => updateParams({ isActive: val })}
        />
      </div>
    </div>
  );
};

export default ProductFilters;
