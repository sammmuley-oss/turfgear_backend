import type { Machine } from '../../types';
import { StatusBadge } from './StatusBadge';

interface MachineStatusTableProps {
  machines: Machine[];
}

function StockBar({ level }: { level: number }) {
  const color = level >= 60 ? 'bg-green-500' : level >= 30 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-500`} style={{ width: `${level}%` }} />
      </div>
      <span className="text-[11px] text-slate-400 tabular-nums">{level}%</span>
    </div>
  );
}

export function MachineStatusTable({ machines }: MachineStatusTableProps) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-white">Live Machine Status</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">{machines.length} machines deployed</p>
        </div>
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Real-time</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-800/60">
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Machine ID</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">City</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest hidden lg:table-cell">Location</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest hidden md:table-cell">Rentals</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest hidden md:table-cell">Stock</th>
              <th className="px-5 py-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest text-right">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {machines.map((m) => (
              <tr key={m.machineId} className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors duration-150">
                <td className="px-5 py-3.5">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">{m.machineId}</span>
                </td>
                <td className="px-5 py-3.5 text-sm text-slate-300">{m.city}</td>
                <td className="px-5 py-3.5 text-sm text-slate-400 hidden lg:table-cell">{m.turfName}</td>
                <td className="px-5 py-3.5"><StatusBadge status={m.status} /></td>
                <td className="px-5 py-3.5 text-sm text-slate-300 hidden md:table-cell">{m.activeRentals > 0 ? m.activeRentals : '—'}</td>
                <td className="px-5 py-3.5 hidden md:table-cell"><StockBar level={m.stockLevel} /></td>
                <td className="px-5 py-3.5 text-sm text-right">
                  {m.revenueToday > 0 ? <span className="text-white font-semibold font-display">₹{m.revenueToday.toLocaleString()}</span> : <span className="text-slate-500">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
