import { useState, useEffect } from 'react';
import { HiOutlineTag, HiOutlineHashtag, HiOutlineCube } from 'react-icons/hi2';
import Input from '../common/Input';
import Dropdown from '../common/Dropdown';
import Button from '../common/Button';
import { UNITS_OF_MEASURE, STATUS_OPTIONS } from '../../utils/constants';
import { validateRequired, validateSku } from '../../utils/validators';

const ProductForm = ({
  initialData = {},
  categories = [],
  onSubmit,
  onCancel,
  loading = false,
  isEdit = false
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: '',
    unitOfMeasure: '',
    initialStock: 0,
    description: '',
    isActive: 'true',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        sku: initialData.sku || '',
        category: initialData.category?._id || initialData.category || '',
        unitOfMeasure: initialData.unitOfMeasure || '',
        initialStock: initialData.initialStock || 0,
        description: initialData.description || '',
        isActive: initialData.isActive !== undefined ? String(initialData.isActive) : 'true',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    newErrors.name = validateRequired(formData.name, 'Product Name');
    newErrors.sku = validateSku(formData.sku);
    newErrors.category = validateRequired(formData.category, 'Category');
    newErrors.unitOfMeasure = validateRequired(formData.unitOfMeasure, 'Unit of Measure');

    if (formData.initialStock < 0) {
      newErrors.initialStock = 'Initial stock cannot be negative';
    }

    // Filter out empty error messages
    const finalErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, msg]) => msg !== '')
    );

    setErrors(finalErrors);
    return Object.keys(finalErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitData = {
      ...formData,
      initialStock: Number(formData.initialStock),
      isActive: formData.isActive === 'true',
    };

    onSubmit(submitData);
  };

  // Convert categories to dropdown options format
  const categoryOptions = categories.map(c => ({ value: c._id, label: c.name }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Product Name *"
          id="product-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={HiOutlineCube}
          placeholder="e.g. Steel Rod"
        />

        <Input
          label="SKU / Code *"
          id="product-sku"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          error={errors.sku}
          icon={HiOutlineHashtag}
          placeholder="e.g. STR-001"
          className="uppercase"
        />

        <Dropdown
          label="Category *"
          id="product-category"
          options={categoryOptions}
          value={formData.category}
          onChange={(val) => handleDropdownChange('category', val)}
          error={errors.category}
          placeholder="Select category"
        />

        <Dropdown
          label="Unit of Measure *"
          id="product-uom"
          options={UNITS_OF_MEASURE}
          value={formData.unitOfMeasure}
          onChange={(val) => handleDropdownChange('unitOfMeasure', val)}
          error={errors.unitOfMeasure}
          placeholder="Select unit"
        />

        <Input
          label="Initial Stock"
          id="product-stock"
          name="initialStock"
          type="number"
          min="0"
          value={formData.initialStock}
          onChange={handleChange}
          error={errors.initialStock}
          disabled={isEdit} // Usually stock is not directly editable after creation (done via adjustments)
          title={isEdit ? "Use stock adjustments to change stock levels" : ""}
        />

        <Dropdown
          label="Status"
          id="product-status"
          options={STATUS_OPTIONS.filter(opt => opt.value !== '')}
          value={formData.isActive}
          onChange={(val) => handleDropdownChange('isActive', val)}
          error={errors.isActive}
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="product-desc" className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          id="product-desc"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleChange}
          className="input-field resize-y"
          placeholder="Detailed description of the product..."
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          {isEdit ? 'Save Changes' : 'Create Product'}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
