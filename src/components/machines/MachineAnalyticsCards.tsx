import { DollarSign, ShoppingCart, CheckCircle, XCircle, Package, Clock } from 'lucide-react';
import type { MachineAnalytics } from '../../types';

interface Props { analytics: MachineAnalytics; }

export function MachineAnalyticsCards({ analytics }: Props) {
  const cards = [
    { label: "Today's Revenue", value: `₹${analytics.revenueToday.toLocaleString()}`, icon: DollarSign, accent: 'cyan' },
    { label: 'Active Rentals', value: String(analytics.activeRentals), icon: ShoppingCart, accent: 'cyan' },
    { label: 'Successful Payments', value: String(analytics.successfulPayments), icon: CheckCircle, accent: 'green' },
    { label: 'Failed Transactions', value: String(analytics.failedTransactions), icon: XCircle, accent: 'red' },
    { label: 'Stock Utilization', value: `${analytics.stockUtilization}%`, icon: Package, accent: 'cyan' },
    { label: 'Avg Rental Duration', value: analytics.avgRentalDuration, icon: Clock, accent: 'cyan' },
  ];
  const accentMap: Record<string, string> = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {cards.map((card) => {
        const Icon = card.icon;
        const [textColor, bgColor, borderColor] = accentMap[card.accent].split(' ');
        return (
          <div key={card.label} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-300">
            <div className={`p-1.5 rounded-lg border w-fit mb-3 ${bgColor} ${borderColor}`}><Icon size={14} className={textColor} /></div>
            <p className="text-xl font-display font-bold text-white">{card.value}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">{card.label}</p>
          </div>
        );
      })}
    </div>
  );
}
