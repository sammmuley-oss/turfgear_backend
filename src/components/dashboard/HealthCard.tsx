import { Server, Gauge, Radio, Database } from 'lucide-react';
import type { SystemHealthItem, HealthStatus } from '../../types';

interface HealthCardProps { data: SystemHealthItem; }

const statusStyles: Record<HealthStatus, { dot: string; label: string; barColor: string }> = {
  healthy: { dot: 'bg-green-500', label: 'Healthy', barColor: 'bg-green-500' },
  degraded: { dot: 'bg-amber-500', label: 'Degraded', barColor: 'bg-amber-500' },
  down: { dot: 'bg-red-500', label: 'Down', barColor: 'bg-red-500' },
};

const iconMap: Record<string, typeof Server> = { Server, Gauge, Radio, Database };

export function HealthCard({ data }: HealthCardProps) {
  const Icon = iconMap[data.iconName] || Server;
  const style = statusStyles[data.status];
  const barWidth = Math.min(data.value, 100);

  return (
    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20"><Icon size={14} className="text-cyan-400" /></div>
          <span className="text-xs font-semibold text-slate-200">{data.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse-dot`} />
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">{style.label}</span>
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-xl font-display font-bold text-white">{data.value}</span>
        <span className="text-[11px] text-slate-500">{data.unit}</span>
      </div>
      <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${style.barColor} transition-all duration-700`} style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
}
