import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation, Navigate } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  CalendarCheck,
  BedDouble,
  Users,
  Tag,
  Star,
  Settings,
  Mail,
  Image,
  LogOut,
  Menu,
  X,
  BarChart3,
  FileText,
  ExternalLink,
  Waves,
  Gift,
  UtensilsCrossed,
} from 'lucide-react';

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/reports', label: 'Reports', icon: FileText },
  { to: '/admin/inquiries', label: 'Inquiries', icon: MessageSquare },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/rooms', label: 'Rooms', icon: BedDouble },
  { to: '/admin/guests', label: 'Guests', icon: Users },
  { to: '/admin/offers', label: 'Offers', icon: Tag },
  { to: '/admin/reviews', label: 'Reviews', icon: Star },
  { to: '/admin/pool-tickets', label: 'Pool & Tickets', icon: Waves },
  { to: '/admin/rewards', label: 'Points & Rewards', icon: Gift },
  { to: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
  { to: '/admin/emails', label: 'Email Templates', icon: Mail },
  { to: '/admin/gallery', label: 'Gallery', icon: Image },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isAuthenticated = sessionStorage.getItem('admin_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login', { replace: true });
  };

  const currentPage = navItems.find(item => location.pathname === item.to)?.label || 'Admin';

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 flex flex-col transform transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5 border-b border-gray-700 flex items-center gap-3">
          <img src="/android-chrome-192x192.png" alt="Amaluna" className="h-9 w-auto" />
          <div>
            <p className="text-white font-heading font-bold text-sm">Amaluna</p>
            <p className="text-gray-500 text-xs">Admin Panel</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-400'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-700 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-700/50 transition-colors"
          >
            <ExternalLink className="h-5 w-5" />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-400 hover:text-white">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-heading font-bold text-white">{currentPage}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
