export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const errors = [];
  if (password.length < 6) errors.push('At least 6 characters');
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
  if (!/\d/.test(password)) errors.push('One number');
  return errors;
};

export const getPasswordStrength = (password) => {
  if (!password) return { level: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: 'Weak', color: 'bg-red-500' };
  if (score <= 4) return { level: 2, label: 'Medium', color: 'bg-amber-500' };
  return { level: 3, label: 'Strong', color: 'bg-emerald-500' };
};

export const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    return `${fieldName} is required`;
  }
  return '';
};

export const validateSku = (sku) => {
  if (!sku) return 'SKU is required';
  if (!/^[A-Za-z0-9-]+$/.test(sku)) return 'SKU can only contain letters, numbers, and hyphens';
  return '';
};
