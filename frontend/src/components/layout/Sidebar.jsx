import { NavLink } from 'react-router-dom';
import {
  HiOutlineCube,
  HiOutlineUser,
  HiOutlineXMark,
  HiOutlineBuildingStorefront,
  HiOutlineClipboardDocumentList,
  HiOutlineChartBarSquare,
} from 'react-icons/hi2';
import { APP_NAME } from '../../utils/constants';

const navigation = [
  // Member 1 routes
  { name: 'Products', href: '/products', icon: HiOutlineCube },
  { name: 'Profile', href: '/profile', icon: HiOutlineUser },
  // Member 2 placeholder
  { name: 'Warehouses', href: '#', icon: HiOutlineBuildingStorefront, disabled: true },
  // Member 3 placeholder
  { name: 'Operations', href: '#', icon: HiOutlineClipboardDocumentList, disabled: true },
  { name: 'Dashboard', href: '#', icon: HiOutlineChartBarSquare, disabled: true },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <aside
      className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 text-white shadow-2xl
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 font-sans border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-[72px] px-6 bg-slate-900/50 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
            <HiOutlineCube className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-outfit font-bold tracking-wide">{APP_NAME}</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <HiOutlineXMark className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1.5 mt-2">
        <div className="px-3 mb-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        {navigation.map((item) => {
          if (item.disabled) {
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-500/50 cursor-not-allowed group"
                title="Coming soon — handled by another team member"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                <span className="ml-auto text-[9px] bg-slate-800/50 px-2 py-0.5 rounded-full text-slate-500 uppercase tracking-wide">Soon</span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-600/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm">
          <p className="text-xs font-medium text-slate-400 text-center">{APP_NAME} v1.0.0</p>
          <p className="text-[10px] text-slate-500 text-center mt-1">Enterprise Edition</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
