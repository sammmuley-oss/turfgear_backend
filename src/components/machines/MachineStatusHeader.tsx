import { Wifi, WifiOff, Wrench, Clock, MapPin, Server, Globe, Cpu } from 'lucide-react';
import type { Machine } from '../../types';
import { MachineStatus } from '../../types';

interface Props { machine: Machine; }

const statusCfg = {
  [MachineStatus.ONLINE]:      { dot: 'bg-green-500', text: 'text-green-400', label: 'Online', icon: Wifi },
  [MachineStatus.OFFLINE]:     { dot: 'bg-red-500', text: 'text-red-400', label: 'Offline', icon: WifiOff },
  [MachineStatus.MAINTENANCE]: { dot: 'bg-amber-500', text: 'text-amber-400', label: 'Maintenance', icon: Wrench },
} as const;

export function MachineStatusHeader({ machine }: Props) {
  const cfg = statusCfg[machine.status];
  const StatusIcon = cfg.icon;
  const infoItems = [
    { icon: Globe, label: 'IP Address', value: machine.ipAddress },
    { icon: Cpu, label: 'Firmware', value: machine.firmwareVersion },
    { icon: Clock, label: 'Last Heartbeat', value: machine.lastHeartbeat },
    { icon: Server, label: 'Uptime', value: `${machine.uptime}%` },
  ];

  return (
    <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg overflow-hidden">
      <div className="p-5 border-b border-slate-800/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20"><Cpu size={22} className="text-cyan-400" /></div>
            <div>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-500/20">{machine.machineId}</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold uppercase tracking-wider ${
                  machine.status === MachineStatus.ONLINE ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                  machine.status === MachineStatus.OFFLINE ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                  'bg-amber-500/10 border-amber-500/30 text-amber-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse-dot`} /><StatusIcon size={11} />{cfg.label}
                </span>
              </div>
              <h1 className="text-lg font-bold text-white mt-1.5">{machine.turfName}</h1>
              <div className="flex items-center gap-1.5 mt-0.5"><MapPin size={12} className="text-slate-500" /><span className="text-xs text-slate-400">{machine.city} — {machine.turfAddress}</span></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Occupancy</p><p className="text-2xl font-display font-bold text-white">{machine.occupancy}%</p></div>
            <div className="w-12 h-12 rounded-xl border border-slate-700 flex items-center justify-center relative overflow-hidden">
              <div className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${machine.occupancy >= 70 ? 'bg-green-500/20' : machine.occupancy >= 40 ? 'bg-amber-500/20' : 'bg-red-500/20'}`} style={{ height: `${machine.occupancy}%` }} />
              <span className="text-xs font-bold text-slate-300 relative z-10">{machine.activeRentals}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-800/80">
        {infoItems.map((item) => { const Icon = item.icon; return (
          <div key={item.label} className="px-5 py-3">
            <div className="flex items-center gap-1.5 mb-1"><Icon size={11} className="text-slate-500" /><span className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</span></div>
            <span className="text-sm font-semibold text-white">{item.value}</span>
          </div>
        ); })}
      </div>
    </div>
  );
}
