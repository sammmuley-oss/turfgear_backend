import { AlertTriangle, Filter } from 'lucide-react';
import { useState } from 'react';

const alertTabs = ['All', 'Critical', 'Warning', 'Info'];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Alerts
          </h1>
          <p className="text-slate-400 text-sm mt-1">System alerts & notifications</p>
        </div>

        <button className="px-4 py-2 rounded-full border border-slate-800 bg-[#16161a] text-slate-400 text-sm font-medium hover:border-slate-700 transition-colors flex items-center gap-2 w-fit">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {alertTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full border text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-cyan-500 border-cyan-500 text-black font-bold shadow-[0_0_16px_rgba(34,211,238,0.2)]'
                : 'border-slate-800 bg-[#16161a] text-slate-400 hover:border-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Empty State */}
      <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg flex flex-col items-center justify-center min-h-[380px]">
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
          <AlertTriangle size={32} className="text-amber-400/40" />
        </div>
        <p className="text-lg font-semibold text-slate-300">Alert Center</p>
        <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
          Real-time alerts for machine errors, low stock, offline turfs, and system anomalies. Integration coming soon.
        </p>
      </div>
    </div>
  );
}
