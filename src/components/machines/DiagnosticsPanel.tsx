import { Cpu, Gauge, Signal, ScanLine, Lock, Camera, Thermometer, Wifi } from 'lucide-react';
import type { DiagnosticItem } from '../../types';
import { DiagnosticStatus } from '../../types';

interface Props { items: DiagnosticItem[]; }

const statusColor = {
  [DiagnosticStatus.HEALTHY]:  { bar: 'bg-green-500', dot: 'bg-green-500', label: 'OK' },
  [DiagnosticStatus.WARNING]:  { bar: 'bg-amber-500', dot: 'bg-amber-500', label: 'WARN' },
  [DiagnosticStatus.CRITICAL]: { bar: 'bg-red-500', dot: 'bg-red-500', label: 'CRIT' },
} as const;

const iconMap: Record<string, typeof Cpu> = { Cpu, Gauge, Signal, ScanLine, Lock, Camera, Thermometer, Wifi };

export function DiagnosticsPanel({ items }: Props) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80"><h2 className="text-sm font-bold text-white">Hardware Diagnostics</h2><p className="text-[11px] text-slate-500 mt-0.5">Real-time hardware telemetry</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/40">
        {items.map((item) => {
          const Icon = iconMap[item.iconName] || Cpu;
          const color = statusColor[item.status];
          const barWidth = item.unit === 'ms' ? Math.min(100, (item.value / 200) * 100) : Math.min(item.value, 100);
          return (
            <div key={item.id} className="p-4 bg-[#0a0a0c]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><Icon size={13} className="text-slate-500" /><span className="text-xs font-medium text-slate-300">{item.label}</span></div>
                <div className="flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${color.dot} animate-pulse-dot`} /><span className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">{color.label}</span></div>
              </div>
              <div className="flex items-baseline gap-1 mb-2"><span className="text-lg font-display font-bold text-white">{item.value}</span><span className="text-[10px] text-slate-500">{item.unit}</span></div>
              <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden"><div className={`h-full rounded-full ${color.bar} transition-all duration-700`} style={{ width: `${barWidth}%` }} /></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
