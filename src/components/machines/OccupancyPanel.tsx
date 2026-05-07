import { Users, Timer, Calendar, PlayCircle } from 'lucide-react';
import type { TurfOccupancy } from '../../types';
import { BookingStatus } from '../../types';

interface Props { data: TurfOccupancy; }

export function OccupancyPanel({ data }: Props) {
  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between">
        <div><h2 className="text-sm font-bold text-white">Turf Occupancy</h2><p className="text-[11px] text-slate-500 mt-0.5">{data.isOccupied ? 'Currently in session' : 'Turf available'}</p></div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${data.isOccupied ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${data.isOccupied ? 'bg-green-500 animate-pulse-dot' : 'bg-slate-500'}`} />{data.isOccupied ? 'Occupied' : 'Free'}
        </span>
      </div>
      <div className="p-5 space-y-4">
        {data.currentSession && (
          <div className="p-4 rounded-xl bg-[#16161a] border border-slate-800">
            <div className="flex items-center gap-2 mb-2"><PlayCircle size={14} className="text-green-400" /><span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Active Session</span></div>
            <p className="text-sm font-bold text-white mb-2">{data.currentSession}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5"><Users size={12} className="text-slate-500" /><span className="text-xs text-slate-400">{data.activePlayers} players</span></div>
              <div className="flex items-center gap-1.5"><Timer size={12} className="text-cyan-400" /><span className="text-xs font-display font-bold text-cyan-400 tabular-nums">{data.sessionTimer}</span></div>
            </div>
          </div>
        )}
        {data.nextBooking && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-950/20 border border-cyan-500/15"><Calendar size={13} className="text-cyan-400" /><span className="text-xs text-slate-400">Next:</span><span className="text-xs font-semibold text-cyan-400">{data.nextBooking}</span></div>
        )}
        <div>
          <h3 className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 px-1">Schedule</h3>
          <div className="space-y-1">
            {data.schedule.map((booking, i) => (
              <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-colors ${
                booking.status === BookingStatus.ACTIVE ? 'bg-green-500/5 border border-green-500/20' :
                booking.status === BookingStatus.UPCOMING ? 'bg-[#16161a] border border-slate-800' : 'bg-slate-900/30 border border-slate-800/40'
              }`}>
                <span className="text-slate-400 font-medium">{booking.time}</span><span className="text-slate-300">{booking.team}</span><span className="text-slate-500">{booking.players}p</span>
                <span className={`text-[10px] uppercase tracking-wider font-semibold ${booking.status === BookingStatus.ACTIVE ? 'text-green-400' : booking.status === BookingStatus.UPCOMING ? 'text-cyan-400' : 'text-slate-500'}`}>{booking.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
