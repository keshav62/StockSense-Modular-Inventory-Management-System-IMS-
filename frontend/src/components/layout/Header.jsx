import { HiOutlineBars3, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';
import useAuth from '../../hooks/useAuth';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-[72px] bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30 shadow-sm">
      {/* Left: Menu button (mobile) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
        >
          <HiOutlineBars3 className="w-6 h-6" />
        </button>
        <div className="hidden lg:block text-sm font-medium text-slate-500">
          Overview / <span className="text-slate-900 font-semibold">Dashboard</span>
        </div>
      </div>

      {/* Right: User info + Logout */}
      <div className="flex items-center gap-5">
        <div className="hidden sm:flex flex-col items-end">
          <p className="text-sm font-semibold text-slate-900 leading-tight">{user?.name || 'User'}</p>
          <p className="text-[11px] font-medium text-primary-600 uppercase tracking-wide mt-0.5">{user?.role || 'user'}</p>
        </div>
        <div className="flex items-center gap-3 pl-5 border-l border-slate-200">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center border-2 border-white shadow-sm ring-1 ring-slate-100">
            <span className="text-sm font-bold text-primary-700">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <button
            onClick={logout}
            className="p-2.5 rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-600 transition-all duration-200"
            title="Logout"
          >
            <HiOutlineArrowRightOnRectangle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
