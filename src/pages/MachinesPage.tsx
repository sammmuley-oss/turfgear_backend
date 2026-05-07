import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, ChevronRight, Wifi, WifiOff, Wrench, Filter } from 'lucide-react';
import { useMachines } from '../hooks/useMachines';
import { PageLoader, ErrorState } from '../components/ui/LoadingStates';
import { MachineStatus } from '../types';

const statusTabs: { label: string; value: MachineStatus | 'ALL' }[] = [
  { label: 'All Machines', value: 'ALL' as const },
  { label: 'Online', value: MachineStatus.ONLINE },
  { label: 'Offline', value: MachineStatus.OFFLINE },
  { label: 'Maintenance', value: MachineStatus.MAINTENANCE },
];

const sortOptions = [
  { label: 'Machine ID', key: 'machineId' },
  { label: 'Revenue', key: 'revenueToday' },
  { label: 'Uptime', key: 'uptime' },
  { label: 'Stock Level', key: 'stockLevel' },
] as const;

type SortKey = (typeof sortOptions)[number]['key'];

const statusIcon = { [MachineStatus.ONLINE]: Wifi, [MachineStatus.OFFLINE]: WifiOff, [MachineStatus.MAINTENANCE]: Wrench };
const statusColor = {
  [MachineStatus.ONLINE]: 'bg-green-500/10 border-green-500/30 text-green-400',
  [MachineStatus.OFFLINE]: 'bg-red-500/10 border-red-500/30 text-red-400',
  [MachineStatus.MAINTENANCE]: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
};
const dotColor = { [MachineStatus.ONLINE]: 'bg-green-500', [MachineStatus.OFFLINE]: 'bg-red-500', [MachineStatus.MAINTENANCE]: 'bg-amber-500' };

export default function MachinesPage() {
  const navigate = useNavigate();
  const { machines, cities, isLoading, error, refetch } = useMachines();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MachineStatus | 'ALL'>('ALL');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [sortKey, setSortKey] = useState<SortKey>('machineId');
  const [sortAsc, setSortAsc] = useState(true);
  const [showSort, setShowSort] = useState(false);

  const filtered = useMemo(() => {
    let list = [...machines];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(m => m.machineId.toLowerCase().includes(q) || m.turfName.toLowerCase().includes(q) || m.city.toLowerCase().includes(q));
    }
    if (statusFilter !== 'ALL') list = list.filter(m => m.status === statusFilter);
    if (cityFilter !== 'ALL') list = list.filter(m => m.city === cityFilter);
    list.sort((a, b) => {
      const aVal = a[sortKey]; const bVal = b[sortKey];
      if (typeof aVal === 'number' && typeof bVal === 'number') return sortAsc ? aVal - bVal : bVal - aVal;
      return sortAsc ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
    return list;
  }, [machines, search, statusFilter, cityFilter, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
    setShowSort(false);
  };

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Machines</h1>
          <p className="text-slate-400 text-sm mt-1">{machines.length} machines deployed across {cities.length} cities</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search machines..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-full bg-[#16161a] border border-slate-800 focus:border-cyan-500/40 outline-none text-slate-200 placeholder-slate-500 transition-colors w-44 sm:w-56" />
          </div>
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}
            className="px-3 py-2 rounded-full bg-[#16161a] border border-slate-800 text-sm text-slate-400 outline-none focus:border-cyan-500/40 transition-colors cursor-pointer">
            <option value="ALL">All Cities</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="relative">
            <button onClick={() => setShowSort(!showSort)} className="px-3 py-2 rounded-full border border-slate-800 bg-[#16161a] text-slate-400 text-sm hover:border-slate-700 transition-colors flex items-center gap-1.5">
              <ArrowUpDown size={14} /><span className="hidden sm:inline">Sort</span>
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 w-40 rounded-xl bg-[#16161a] border border-slate-800 shadow-xl z-20 overflow-hidden">
                {sortOptions.map(opt => (
                  <button key={opt.key} onClick={() => handleSort(opt.key)}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors ${sortKey === opt.key ? 'text-cyan-400 bg-cyan-500/5' : 'text-slate-400 hover:bg-slate-800/60'}`}>
                    {opt.label} {sortKey === opt.key && (sortAsc ? '↑' : '↓')}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => (
          <button key={tab.value} onClick={() => setStatusFilter(tab.value)}
            className={`px-5 py-2 rounded-full border text-xs font-medium whitespace-nowrap transition-all ${
              statusFilter === tab.value ? 'bg-cyan-500 border-cyan-500 text-black font-bold shadow-[0_0_16px_rgba(34,211,238,0.2)]' : 'border-slate-800 bg-[#16161a] text-slate-400 hover:border-slate-700'
            }`}>{tab.label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg flex flex-col items-center justify-center">
          <Filter size={32} className="text-slate-600 mb-3" />
          <p className="text-sm text-slate-400">No machines match your filters</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((machine) => {
            const StIcon = statusIcon[machine.status];
            return (
              <button key={machine.machineId} onClick={() => navigate(`/machines/${machine.machineId}`)}
                className="w-full text-left p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-200 group flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full ${dotColor[machine.status]} shrink-0`} />
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/30 px-2.5 py-1 rounded border border-cyan-500/20 shrink-0">{machine.machineId}</span>
                <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1 items-center">
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-400 transition-colors">{machine.turfName}</p>
                    <p className="text-[11px] text-slate-500">{machine.city}</p>
                  </div>
                  <div className="hidden sm:block">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold uppercase tracking-wider ${statusColor[machine.status]}`}>
                      <StIcon size={10} />{machine.status}
                    </span>
                  </div>
                  <div className="hidden lg:block"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Rentals</p><p className="text-sm font-semibold text-white">{machine.activeRentals}</p></div>
                  <div className="hidden lg:block"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Stock</p>
                    <div className="flex items-center gap-2"><div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden"><div className={`h-full rounded-full transition-all ${machine.stockLevel >= 60 ? 'bg-green-500' : machine.stockLevel >= 30 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${machine.stockLevel}%` }} /></div><span className="text-[11px] text-slate-400">{machine.stockLevel}%</span></div>
                  </div>
                  <div className="hidden lg:block"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Revenue</p><p className="text-sm font-display font-semibold text-white">₹{machine.revenueToday.toLocaleString()}</p></div>
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
