import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  MessageSquareText,
  User,
  LogOut,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/job-match', icon: Briefcase, label: 'Job Match' },
  { to: '/questions', icon: MessageSquareText, label: 'Answer Questions' },
  { to: '/profile', icon: User, label: 'My Profile' },
];

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
         fixed top-0 left-0 h-full w-[280px] max-w-[85vw] bg-surface-card border-r border-surface-border
          flex flex-col z-30 transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        {/* Logo */}
        {/* <div className="p-6 border-b border-surface-border"> */}
        <div className="p-4 sm:p-6 border-b border-surface-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-volt-400 flex items-center justify-center">
              <Zap size={16} className="text-ink-950" />
            </div>
            <span className="font-display font-700 text-white text-lg">JobMatch AI</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-body font-500 transition-all duration-150 ${
                  isActive
                    ? 'bg-volt-400/10 text-volt-400 border border-volt-400/20'
                    : 'text-ink-300 hover:bg-surface-elevated hover:text-ink-100'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-surface-border space-y-3">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-elevated">
            <div className="w-8 h-8 rounded-full bg-volt-400/20 border border-volt-400/30 flex items-center justify-center text-volt-400 text-xs font-display font-700">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-500 text-ink-100 truncate">{user?.name}</p>
              {/* <p className="text-xs text-ink-400 truncate">{user?.email}</p> */}
              <p className="text-xs text-ink-400 truncate max-w-[140px]">{user?.email}</p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn-ghost w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-400/5">
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface-card border-b border-surface-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-volt-400 flex items-center justify-center">
              <Zap size={14} className="text-ink-950" />
            </div>
            <span className="font-display font-700 text-white">JobMatch AI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn-ghost p-2"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>

        {/* <main className="flex-1 overflow-auto p-6 lg:p-8"> */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
