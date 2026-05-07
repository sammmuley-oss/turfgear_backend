import { ShoppingCart, Lock, Cpu, CreditCard, ScanLine, AlertTriangle } from 'lucide-react';
import type { ActivityEvent, ActivityType } from '../../types';

const iconMap: Record<ActivityType, { icon: typeof ShoppingCart; color: string }> = {
  rental: { icon: ShoppingCart, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
  locker: { icon: Lock, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
  machine: { icon: Cpu, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  payment: { icon: CreditCard, color: 'text-green-400 bg-green-500/10 border-green-500/20' },
  rfid: { icon: ScanLine, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  alert: { icon: AlertTriangle, color: 'text-red-400 bg-red-500/10 border-red-500/20' },
};

interface ActivityItemProps { event: ActivityEvent; }

export function ActivityItem({ event }: ActivityItemProps) {
  const cfg = iconMap[event.type];
  const Icon = cfg.icon;
  const [textColor, bgColor, borderColor] = cfg.color.split(' ');

  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-800/40 last:border-0 hover:bg-slate-800/20 transition-colors duration-150 px-4 -mx-4 rounded-lg">
      <div className={`p-1.5 rounded-lg border shrink-0 mt-0.5 ${bgColor} ${borderColor}`}>
        <Icon size={13} className={textColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-slate-300 leading-snug">{event.text}</p>
        <p className="text-[10px] text-slate-500 mt-1">{event.timestamp}</p>
      </div>
    </div>
  );
}
