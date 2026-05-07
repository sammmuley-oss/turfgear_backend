import { MapPin, Users, DollarSign } from 'lucide-react';
import type { CityOverview } from '../../types';

interface CityCardProps { data: CityOverview; }

export function CityCard({ data }: CityCardProps) {
  const occupancyColor = data.turfOccupancy >= 70 ? 'bg-green-500' : data.turfOccupancy >= 40 ? 'bg-amber-500' : 'bg-red-500';

  return (
    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-300 group">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20"><MapPin size={14} className="text-cyan-400" /></div>
        <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors duration-200">{data.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400"><Users size={12} /><span className="text-[11px]">Active Users</span></div>
          <span className="text-xs font-bold text-white">{data.activeUsers}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-400"><DollarSign size={12} /><span className="text-[11px]">Revenue Today</span></div>
          <span className="text-xs font-bold text-cyan-400 font-display">₹{data.revenueToday.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Machines</span>
          <span className="text-xs font-bold text-white">{data.machines}</span>
        </div>
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">Turf Occupancy</span>
            <span className="text-[11px] font-bold text-slate-300">{data.turfOccupancy}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className={`h-full rounded-full ${occupancyColor} transition-all duration-700`} style={{ width: `${data.turfOccupancy}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
