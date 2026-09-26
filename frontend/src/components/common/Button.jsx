import { HiOutlineArrowPath } from 'react-icons/hi2';

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-600',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-lg
        transition-all duration-200 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <HiOutlineArrowPath className="w-4 h-4 animate-spin" />
      )}
      {children}
    </button>
  );
};

export default Button;
