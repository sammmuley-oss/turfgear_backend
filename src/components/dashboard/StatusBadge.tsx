import type { MachineStatus } from '../../types';

interface StatusBadgeProps {
  status: MachineStatus;
}

const config = {
  ONLINE: { bg: 'bg-green-500/10 border-green-500/30', text: 'text-green-400', dot: 'bg-green-500', label: 'Online' },
  OFFLINE: { bg: 'bg-red-500/10 border-red-500/30', text: 'text-red-400', dot: 'bg-red-500', label: 'Offline' },
  MAINTENANCE: { bg: 'bg-amber-500/10 border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500', label: 'Maintenance' },
} as const;

export function StatusBadge({ status }: StatusBadgeProps) {
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${c.bg} ${c.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
