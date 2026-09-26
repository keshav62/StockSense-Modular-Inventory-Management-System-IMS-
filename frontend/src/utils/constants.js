export const UNITS_OF_MEASURE = [
  { value: 'PCS', label: 'Pieces (PCS)' },
  { value: 'KG', label: 'Kilograms (KG)' },
  { value: 'LB', label: 'Pounds (LB)' },
  { value: 'G', label: 'Grams (G)' },
  { value: 'L', label: 'Liters (L)' },
  { value: 'ML', label: 'Milliliters (ML)' },
  { value: 'M', label: 'Meters (M)' },
  { value: 'CM', label: 'Centimeters (CM)' },
  { value: 'FT', label: 'Feet (FT)' },
  { value: 'BOX', label: 'Box' },
  { value: 'PACK', label: 'Pack' },
  { value: 'SET', label: 'Set' },
  { value: 'PAIR', label: 'Pair' },
  { value: 'ROLL', label: 'Roll' },
  { value: 'SHEET', label: 'Sheet' },
  { value: 'UNIT', label: 'Unit' },
];

export const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'true', label: 'Active' },
  { value: 'false', label: 'Inactive' },
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Date Created' },
  { value: 'name', label: 'Name' },
  { value: 'sku', label: 'SKU' },
  { value: 'initialStock', label: 'Initial Stock' },
];

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'StockSense';
