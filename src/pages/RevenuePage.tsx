import { DollarSign, Calendar, TrendingUp } from 'lucide-react';

const summaryCards = [
  { label: 'Total Revenue', value: '—', sub: 'All time' },
  { label: 'This Month', value: '—', sub: 'Current period' },
  { label: 'Today', value: '—', sub: 'Live count' },
];

export default function RevenuePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Revenue
          </h1>
          <p className="text-slate-400 text-sm mt-1">Financial analytics & reports</p>
        </div>

        <button className="px-4 py-2 rounded-full border border-slate-800 bg-[#16161a] text-slate-400 text-sm font-medium hover:border-slate-700 transition-colors flex items-center gap-2 w-fit">
          <Calendar className="w-4 h-4" />
          Date Range
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-colors"
          >
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{card.label}</p>
            <p className="text-2xl font-display font-bold text-white">{card.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg flex flex-col items-center justify-center min-h-[320px]">
        <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
          <TrendingUp size={28} className="text-cyan-400/40" />
        </div>
        <p className="text-lg font-semibold text-slate-300">Revenue Analytics</p>
        <p className="text-sm text-slate-500 mt-2 text-center max-w-md">
          Detailed revenue charts, breakdowns by city and machine, and financial reports coming soon.
        </p>
      </div>
    </div>
  );
}
