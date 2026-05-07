import { Bell, Menu, User, Wifi, WifiOff, Loader2 } from 'lucide-react';
import { useSidebar } from '../context/SidebarContext';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useSocketConnection } from '../socket/useSocket';

export default function TopNavbar() {
  const { toggleMobile } = useSidebar();
  const { formatted, date } = useCurrentTime();
  const { isConnected } = useSocketConnection();

  return (
    <header className="sticky top-0 z-30 h-14 bg-[#0e0e12] border-b border-slate-800/80 flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Branding */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="font-display text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-wider">
            TURFGEAR
          </span>
          <span className="text-slate-600 text-xs">|</span>
          <span className="text-slate-500 text-xs font-medium">Admin Panel</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Live connection status */}
        <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-500 ${
          isConnected
            ? 'border-green-500/30 bg-green-500/5'
            : 'border-red-500/30 bg-red-500/5'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isConnected ? 'bg-green-500 animate-pulse-dot' : 'bg-red-500'
          }`} />
          {isConnected
            ? <Wifi className="w-3 h-3 text-green-500" />
            : <WifiOff className="w-3 h-3 text-red-400" />
          }
          <span className={`text-[11px] font-medium ${
            isConnected ? 'text-green-400' : 'text-red-400'
          }`}>
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>

        {/* Time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-[11px] font-display font-semibold text-slate-300 tracking-wide tabular-nums">
            {formatted}
          </span>
          <span className="text-[10px] text-slate-500">{date}</span>
        </div>

        {/* Notifications */}
        <button
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-slate-800" />

        {/* Profile */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-slate-800/60 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-black" />
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-xs font-semibold text-slate-200">Admin</span>
            <span className="text-[10px] text-slate-500">Super Admin</span>
          </div>
        </button>
      </div>
    </header>
  );
}
