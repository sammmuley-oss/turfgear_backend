import { useState } from 'react';
import { MapPin, Plus, Search, X, Building2, Cpu, Users, IndianRupee, Loader2, Trash2 } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationType } from '../types';

interface City {
  id: string;
  name: string;
  state: string;
  machines: number;
  activeUsers: number;
  revenueToday: number;
  turfOccupancy: number;
}

const initialCities: City[] = [
  { id: 'c1', name: 'Pimpri', state: 'Maharashtra', machines: 2, activeUsers: 18, revenueToday: 7400, turfOccupancy: 72 },
  { id: 'c2', name: 'Pune', state: 'Maharashtra', machines: 2, activeUsers: 24, revenueToday: 7000, turfOccupancy: 85 },
  { id: 'c3', name: 'Mumbai', state: 'Maharashtra', machines: 1, activeUsers: 12, revenueToday: 6100, turfOccupancy: 65 },
  { id: 'c4', name: 'Nashik', state: 'Maharashtra', machines: 1, activeUsers: 0, revenueToday: 0, turfOccupancy: 0 },
];

export default function CitiesPage() {
  const { addNotification } = useNotifications();
  const [cities, setCities] = useState<City[]>(initialCities);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newCity, setNewCity] = useState({ name: '', state: '' });
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = cities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.state.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddCity = () => {
    if (!newCity.name.trim() || !newCity.state.trim()) return;
    setIsAdding(true);

    setTimeout(() => {
      const city: City = {
        id: `c-${Date.now()}`,
        name: newCity.name.trim(),
        state: newCity.state.trim(),
        machines: 0,
        activeUsers: 0,
        revenueToday: 0,
        turfOccupancy: 0,
      };

      setCities(prev => [...prev, city]);
      setIsAdding(false);
      setShowAddModal(false);
      setNewCity({ name: '', state: '' });

      addNotification({
        type: NotificationType.SUCCESS,
        title: 'City Added',
        message: `${city.name}, ${city.state} has been added to the deployment network.`,
      });
    }, 1200);
  };

  const handleDeleteCity = (cityId: string) => {
    const city = cities.find(c => c.id === cityId);
    setCities(prev => prev.filter(c => c.id !== cityId));
    setDeleteTarget(null);

    addNotification({
      type: NotificationType.WARNING,
      title: 'City Removed',
      message: `${city?.name} has been removed from the deployment network.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Cities
          </h1>
          <p className="text-slate-400 text-sm mt-1">{cities.length} deployment cities configured</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-full bg-[#16161a] border border-slate-800 focus:border-cyan-500/40 outline-none text-slate-200 placeholder-slate-500 transition-colors w-48 sm:w-56"
            />
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black text-sm font-semibold tracking-wide transition-all active:scale-95 shadow-[0_0_16px_rgba(0,212,255,0.4)] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add City</span>
          </button>
        </div>
      </div>

      {/* City Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg flex flex-col items-center justify-center min-h-[320px]">
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <MapPin size={32} className="text-cyan-400/40" />
          </div>
          <p className="text-lg font-semibold text-slate-300">No Cities Found</p>
          <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
            {search ? 'No cities match your search.' : 'Click "Add City" to add your first deployment city.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((city) => (
            <div
              key={city.id}
              className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-200 relative"
            >
              {/* Delete button */}
              <button
                onClick={(e) => { e.stopPropagation(); setDeleteTarget(city.id); }}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>

              {/* City header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Building2 size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{city.name}</h3>
                  <p className="text-[11px] text-slate-500">{city.state}</p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-slate-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Cpu size={10} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Machines</span>
                  </div>
                  <p className="text-sm font-bold text-white">{city.machines}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Users size={10} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Users</span>
                  </div>
                  <p className="text-sm font-bold text-white">{city.activeUsers}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <IndianRupee size={10} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Revenue</span>
                  </div>
                  <p className="text-sm font-bold text-white">₹{city.revenueToday.toLocaleString()}</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/40">
                  <div className="flex items-center gap-1.5 mb-1">
                    <MapPin size={10} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">Occupancy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{city.turfOccupancy}%</p>
                    <div className="flex-1 h-1.5 rounded-full bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          city.turfOccupancy >= 60 ? 'bg-green-500' : city.turfOccupancy >= 30 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${city.turfOccupancy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add City Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => !isAdding && setShowAddModal(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#12121a] border border-slate-700/80 shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'toast-slide-in 0.25s cubic-bezier(0.16,1,0.3,1)' }}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <MapPin size={18} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Add New City</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Register a new deployment location</p>
                </div>
              </div>
              {!isAdding && (
                <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-800">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="px-6 py-4 space-y-4">
              <div>
                <label className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1.5">City Name</label>
                <input
                  type="text"
                  value={newCity.name}
                  onChange={(e) => setNewCity(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Bangalore"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-800/60 border border-slate-700 focus:border-cyan-500/40 outline-none text-white placeholder-slate-600 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 uppercase tracking-wider font-semibold mb-1.5">State</label>
                <input
                  type="text"
                  value={newCity.state}
                  onChange={(e) => setNewCity(prev => ({ ...prev, state: e.target.value }))}
                  placeholder="e.g. Karnataka"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-slate-800/60 border border-slate-700 focus:border-cyan-500/40 outline-none text-white placeholder-slate-600 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-2 px-6 pb-6 pt-2">
              <button
                onClick={() => !isAdding && setShowAddModal(false)}
                disabled={isAdding}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCity}
                disabled={isAdding || !newCity.name.trim() || !newCity.state.trim()}
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-black text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAdding ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    Add City
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (() => {
        const city = cities.find(c => c.id === deleteTarget);
        if (!city) return null;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteTarget(null)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-sm rounded-2xl bg-[#12121a] border border-red-500/20 shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
              style={{ animation: 'toast-slide-in 0.25s cubic-bezier(0.16,1,0.3,1)' }}
            >
              <div className="px-6 pt-6 pb-3">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                    <Trash2 size={18} className="text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Remove City</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">This action cannot be undone</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to remove <span className="text-white font-semibold">{city.name}</span> from the deployment network?
                  {city.machines > 0 && ` This city has ${city.machines} active machine(s).`}
                </p>
              </div>
              <div className="flex gap-2 px-6 pb-6 pt-2">
                <button onClick={() => setDeleteTarget(null)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-400 hover:bg-slate-800 transition-colors">
                  Cancel
                </button>
                <button onClick={() => handleDeleteCity(city.id)} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-all">
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
