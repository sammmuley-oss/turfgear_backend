import { RefreshCw, LockKeyhole, Stethoscope, PackageCheck, Wrench } from 'lucide-react';
import { mockMachineActions } from '../../mock';

const iconMap: Record<string, typeof RefreshCw> = { RefreshCw, LockKeyhole, Stethoscope, PackageCheck, Wrench };

const variantStyles: Record<string, string> = {
  primary: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20',
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20',
  danger:  'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20',
  default: 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800',
};

export function MachineActionPanel() {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80"><h2 className="text-sm font-bold text-white">Machine Actions</h2><p className="text-[11px] text-slate-500 mt-0.5">Administrative controls</p></div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mockMachineActions.map((action) => {
          const Icon = iconMap[action.iconName] || RefreshCw;
          return (
            <button key={action.id} className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 active:scale-95 ${variantStyles[action.variant]}`}>
              <Icon size={20} className="mb-2" /><span className="text-xs font-bold">{action.label}</span><span className="text-[10px] text-slate-500 mt-1 leading-tight">{action.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
