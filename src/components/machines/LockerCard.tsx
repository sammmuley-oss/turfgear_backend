import { ScanLine, AlertTriangle } from 'lucide-react';
import type { Locker } from '../../types';
import { LockerStatus, RfidStatus } from '../../types';

interface Props { locker: Locker; }

const statusStyles = {
  [LockerStatus.AVAILABLE]:  { border: 'border-green-500/30', bg: 'bg-green-500/5', label: 'Available', labelColor: 'text-green-400' },
  [LockerStatus.RENTED]:     { border: 'border-cyan-500/30', bg: 'bg-cyan-500/5', label: 'Rented', labelColor: 'text-cyan-400' },
  [LockerStatus.OFFLINE]:    { border: 'border-slate-600/30', bg: 'bg-slate-800/30', label: 'Offline', labelColor: 'text-slate-500' },
  [LockerStatus.DAMAGED]:    { border: 'border-red-500/30', bg: 'bg-red-500/5', label: 'Damaged', labelColor: 'text-red-400' },
  [LockerStatus.LOW_STOCK]:  { border: 'border-amber-500/30', bg: 'bg-amber-500/5', label: 'Low Stock', labelColor: 'text-amber-400' },
} as const;

const rfidStyles = { [RfidStatus.ACTIVE]: 'text-green-400', [RfidStatus.INACTIVE]: 'text-slate-500', [RfidStatus.ERROR]: 'text-red-400' };

export function LockerCard({ locker }: Props) {
  const style = statusStyles[locker.status];
  return (
    <div className={`p-4 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:scale-[1.02] cursor-default ${style.border} ${style.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded border border-cyan-500/20">{locker.lockerId}</span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${style.labelColor}`}>{style.label}</span>
      </div>
      <p className="text-sm font-bold text-white mb-0.5">{locker.equipment}</p>
      <p className="text-[11px] text-slate-500 mb-3">{locker.sport}</p>
      <div className="flex items-center justify-between mb-2"><span className="text-[10px] text-slate-500 uppercase tracking-wider">Stock</span><span className="text-xs font-bold text-slate-300">{locker.stockQty}/{locker.maxQty}</span></div>
      <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden mb-3">
        <div className={`h-full rounded-full transition-all duration-500 ${locker.stockQty / locker.maxQty >= 0.5 ? 'bg-green-500' : locker.stockQty / locker.maxQty > 0 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${(locker.stockQty / locker.maxQty) * 100}%` }} />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5"><ScanLine size={11} className={rfidStyles[locker.rfidStatus]} /><span className="text-[10px] text-slate-500">RFID</span></div>
        {locker.hasDamageWarning && <div className="flex items-center gap-1"><AlertTriangle size={11} className="text-red-400" /><span className="text-[10px] text-red-400 font-medium">Damage</span></div>}
        <span className="text-[10px] text-slate-500">{locker.lastAccessed}</span>
      </div>
    </div>
  );
}
