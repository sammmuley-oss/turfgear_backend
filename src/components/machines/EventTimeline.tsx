import { Lock, CreditCard, ScanLine, AlertTriangle, Cpu, Calendar, Info, XCircle } from 'lucide-react';
import type { MachineEvent } from '../../types';
import { EventSeverity } from '../../types';

interface Props { events: MachineEvent[]; }

const severityStyles = {
  [EventSeverity.INFO]:    { dot: 'bg-slate-500' },
  [EventSeverity.SUCCESS]: { dot: 'bg-green-500' },
  [EventSeverity.WARNING]: { dot: 'bg-amber-500' },
  [EventSeverity.ERROR]:   { dot: 'bg-red-500' },
} as const;

const typeIcons: Record<string, typeof Lock> = { locker: Lock, payment: CreditCard, rfid: ScanLine, alert: AlertTriangle, system: Cpu, booking: Calendar, error: XCircle, hardware: Info };

export function EventTimeline({ events }: Props) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
        <div><h2 className="text-sm font-bold text-white">Recent Events</h2><p className="text-[11px] text-slate-500 mt-0.5">{events.length} events logged</p></div>
        <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" /><span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Live</span></span>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {events.map((event, i) => {
          const style = severityStyles[event.severity];
          const Icon = typeIcons[event.type] || Info;
          const isLast = i === events.length - 1;
          return (
            <div key={event.id} className="flex gap-3 px-5 hover:bg-slate-800/20 transition-colors duration-150">
              <div className="flex flex-col items-center pt-4"><div className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} />{!isLast && <div className="w-px flex-1 bg-slate-800 mt-1" />}</div>
              <div className={`flex-1 py-3 ${!isLast ? 'border-b border-slate-800/40' : ''}`}>
                <div className="flex items-start gap-2"><Icon size={13} className="text-slate-500 mt-0.5 shrink-0" /><div className="flex-1 min-w-0"><p className="text-[13px] text-slate-300 leading-snug">{event.text}</p><p className="text-[10px] text-slate-500 mt-1">{event.timestamp}</p></div></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
