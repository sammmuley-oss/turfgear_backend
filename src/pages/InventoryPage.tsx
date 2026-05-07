import { Package, Search, ArrowUpDown } from 'lucide-react';

export default function InventoryPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Inventory
          </h1>
          <p className="text-slate-400 text-sm mt-1">Track equipment stock levels</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="pl-9 pr-4 py-2 text-sm rounded-full bg-[#16161a] border border-slate-800 focus:border-cyan-500/40 outline-none text-slate-200 placeholder-slate-500 transition-colors w-48 sm:w-56"
            />
          </div>
          <button className="px-4 py-2 rounded-full border border-slate-800 bg-[#16161a] text-slate-400 text-sm font-medium hover:border-slate-700 transition-colors flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg flex flex-col items-center justify-center min-h-[380px]">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <Package size={32} className="text-cyan-400/40" />
        </div>
        <p className="text-lg font-semibold text-slate-300">Inventory Manager</p>
        <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
          Track sports equipment stock across all machines. Low stock alerts and restocking workflows coming soon.
        </p>
      </div>
    </div>
  );
}
