import { Wifi, WifiOff, AlertCircle } from 'lucide-react';

const turfCards = [
  { name: 'Turf Alpha', status: 'online' as const, machines: 4, city: 'Mumbai' },
  { name: 'Turf Beta', status: 'online' as const, machines: 3, city: 'Pune' },
  { name: 'Turf Gamma', status: 'offline' as const, machines: 2, city: 'Delhi' },
  { name: 'Turf Delta', status: 'maintenance' as const, machines: 5, city: 'Bangalore' },
];

const statusConfig = {
  online: { color: 'bg-green-500', textColor: 'text-green-400', icon: Wifi, label: 'Online' },
  offline: { color: 'bg-red-500', textColor: 'text-red-400', icon: WifiOff, label: 'Offline' },
  maintenance: { color: 'bg-amber-500', textColor: 'text-amber-400', icon: AlertCircle, label: 'Maintenance' },
};

export default function TurfStatusPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Turf Status
        </h1>
        <p className="text-slate-400 text-sm mt-1">Live venue monitoring</p>
      </div>

      {/* Turf Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {turfCards.map((turf) => {
          const cfg = statusConfig[turf.status];
          const StatusIcon = cfg.icon;
          return (
            <div
              key={turf.name}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{turf.name}</span>
                <div className={`w-2.5 h-2.5 rounded-full ${cfg.color}`} />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <StatusIcon size={14} className={cfg.textColor} />
                <span className={`text-xs font-medium ${cfg.textColor}`}>{cfg.label}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800">
                <span>{turf.city}</span>
                <span>{turf.machines} machines</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
