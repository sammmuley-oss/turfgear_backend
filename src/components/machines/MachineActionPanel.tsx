import { useState } from 'react';
import { RefreshCw, LockKeyhole, Stethoscope, PackageCheck, Wrench, X, CheckCircle, Loader2 } from 'lucide-react';
import { mockMachineActions } from '../../mock';
import { useNotifications } from '../../context/NotificationContext';
import { NotificationType } from '../../types';

const iconMap: Record<string, typeof RefreshCw> = { RefreshCw, LockKeyhole, Stethoscope, PackageCheck, Wrench };

const variantStyles: Record<string, string> = {
  primary: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20',
  warning: 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20',
  danger:  'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20',
  default: 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800',
};

const variantConfirmBg: Record<string, string> = {
  primary: 'bg-cyan-500 hover:bg-cyan-600 text-black',
  warning: 'bg-amber-500 hover:bg-amber-600 text-black',
  danger:  'bg-red-500 hover:bg-red-600 text-white',
  default: 'bg-slate-600 hover:bg-slate-500 text-white',
};

interface MachineActionPanelProps {
  machineId?: string;
}

export function MachineActionPanel({ machineId }: MachineActionPanelProps) {
  const { addNotification } = useNotifications();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const handleConfirm = (actionId: string) => {
    const action = mockMachineActions.find(a => a.id === actionId);
    if (!action) return;

    setIsProcessing(true);

    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setActiveAction(null);
      setCompletedActions(prev => new Set(prev).add(actionId));

      // Show success toast
      addNotification({
        type: NotificationType.SUCCESS,
        title: `${action.label} Complete`,
        message: `${action.description} — ${machineId || 'Machine'} processed successfully.`,
        machineId: machineId,
      });

      // Clear completed state after 3 seconds
      setTimeout(() => {
        setCompletedActions(prev => {
          const next = new Set(prev);
          next.delete(actionId);
          return next;
        });
      }, 3000);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80">
        <h2 className="text-sm font-bold text-white">Machine Actions</h2>
        <p className="text-[11px] text-slate-500 mt-0.5">Administrative controls</p>
      </div>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {mockMachineActions.map((action) => {
          const Icon = iconMap[action.iconName] || RefreshCw;
          const isCompleted = completedActions.has(action.id);
          return (
            <button
              key={action.id}
              onClick={() => setActiveAction(action.id)}
              className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all duration-200 active:scale-95 ${
                isCompleted
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : variantStyles[action.variant]
              }`}
            >
              {isCompleted ? <CheckCircle size={20} className="mb-2" /> : <Icon size={20} className="mb-2" />}
              <span className="text-xs font-bold">{isCompleted ? 'Done!' : action.label}</span>
              <span className="text-[10px] text-slate-500 mt-1 leading-tight">{action.description}</span>
            </button>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {activeAction && (() => {
        const action = mockMachineActions.find(a => a.id === activeAction);
        if (!action) return null;
        const ActionIcon = iconMap[action.iconName] || RefreshCw;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !isProcessing && setActiveAction(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-sm rounded-2xl bg-[#12121a] border border-slate-700/80 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ animation: 'toast-slide-in 0.25s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${variantStyles[action.variant]}`}>
                    <ActionIcon size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{action.label}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">{action.description}</p>
                  </div>
                </div>
                {!isProcessing && (
                  <button onClick={() => setActiveAction(null)} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800">
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Body */}
              <div className="px-5 py-3">
                {machineId && (
                  <div className="px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/60 mb-3">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Target</span>
                    <p className="text-xs font-mono font-bold text-cyan-400 mt-0.5">{machineId}</p>
                  </div>
                )}
                <p className="text-xs text-slate-400 leading-relaxed">
                  {action.variant === 'danger'
                    ? 'This action will take the machine offline. Active sessions may be interrupted.'
                    : action.variant === 'warning'
                    ? 'This will affect all locker compartments immediately.'
                    : 'This action is safe and can be performed during normal operation.'}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 px-5 pb-5 pt-2">
                <button
                  onClick={() => !isProcessing && setActiveAction(null)}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConfirm(action.id)}
                  disabled={isProcessing}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${variantConfirmBg[action.variant]}`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Confirm'
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
