import { HiOutlineCubeTransparent } from 'react-icons/hi2';
import Button from './Button';

const EmptyState = ({
  icon: Icon = HiOutlineCubeTransparent,
  title = 'No data found',
  message = 'There are no items to display.',
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 text-center max-w-sm mb-6">{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
