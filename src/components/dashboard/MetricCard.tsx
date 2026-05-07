import { TrendingUp, TrendingDown, Minus, Cpu, Wifi, ShoppingCart, DollarSign, MapPin, AlertTriangle } from 'lucide-react';
import type { DashboardMetric } from '../../types';

interface MetricCardProps {
  data: DashboardMetric;
}

const iconMap: Record<string, typeof Cpu> = {
  Cpu, Wifi, ShoppingCart, DollarSign, MapPin, AlertTriangle,
};

export function MetricCard({ data }: MetricCardProps) {
  const Icon = iconMap[data.iconName] || Cpu;

  const trendColor =
    data.trendDirection === 'up' ? 'text-green-400' :
    data.trendDirection === 'down' ? 'text-red-400' : 'text-slate-400';

  const TrendIcon =
    data.trendDirection === 'up' ? TrendingUp :
    data.trendDirection === 'down' ? TrendingDown : Minus;

  return (
    <div className="group p-5 rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg hover:border-cyan-500/40 transition-all duration-300 cursor-default">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
          {data.label}
        </span>
        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/15 transition-colors duration-300">
          <Icon size={16} className="text-cyan-400" />
        </div>
      </div>
      <div className="mb-3">
        <span className="text-3xl font-display font-bold text-white">{data.value}</span>
      </div>
      <div className={`flex items-center gap-1.5 ${trendColor}`}>
        <TrendIcon size={12} />
        <span className="text-[11px] font-medium">{data.trend}</span>
      </div>
    </div>
  );
}
