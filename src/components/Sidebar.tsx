import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Cpu,
  Package,
  DollarSign,
  Activity,
  AlertTriangle,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { id: 'cities', label: 'Cities', path: '/cities', icon: MapPin },
  { id: 'machines', label: 'Machines', path: '/machines', icon: Cpu },
  { id: 'inventory', label: 'Inventory', path: '/inventory', icon: Package },
  { id: 'revenue', label: 'Revenue', path: '/revenue', icon: DollarSign },
  { id: 'turf-status', label: 'Turf Status', path: '/turf-status', icon: Activity },
  { id: 'alerts', label: 'Alerts', path: '/alerts', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useSidebar();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen flex flex-col
          bg-[#0e0e12] border-r border-slate-800/80
          transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-[68px]' : 'w-[240px]'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Logo */}
        <div className={`flex items-center h-16 px-4 border-b border-slate-800/80 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(34,211,238,0.25)]">
            <Zap className="w-4 h-4 text-black" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <span className="font-display text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
              TURFGEAR
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={closeMobile}
                className={`
                  group relative flex items-center gap-3 rounded-xl px-3 py-2.5
                  transition-all duration-200
                  ${isCollapsed ? 'justify-center' : ''}
                  ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
                  }
                `}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors duration-200
                    ${isActive ? 'text-cyan-400' : 'group-hover:text-slate-200'}
                  `}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />

                {!isCollapsed && (
                  <span className={`text-[13px] truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>
                    {item.label}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2.5 py-1 rounded-lg bg-[#16161a] border border-slate-800 text-xs text-slate-200 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-xl">
                    {item.label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden lg:flex items-center justify-center p-3 border-t border-slate-800/80">
          <button
            onClick={toggleCollapse}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-slate-800/60 transition-all duration-200"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
}
