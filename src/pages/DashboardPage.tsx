import { useState, useCallback, useEffect, useRef } from 'react';
import { Zap } from 'lucide-react';
import {
  MetricCard,
  MachineStatusTable,
  CityCard,
  ActivityItem,
  HealthCard,
} from '../components/dashboard';
import { useAnalytics } from '../hooks/useAnalytics';
import { useMachines } from '../hooks/useMachines';
import { PageLoader, ErrorState } from '../components/ui/LoadingStates';
import { useMachineUpdates, useActivityStream, useAlertStream } from '../socket/useSocket';
import { useNotifications } from '../context/NotificationContext';
import { NotificationType } from '../types';
import type { MachineUpdatePayload, ActivityPayload } from '../socket/socketEvents';
import type { Machine, ActivityEvent } from '../types';

export default function DashboardPage() {
  const {
    metrics, cities, activities: initialActivities,
    systemHealth, isLoading: analyticsLoading, error: analyticsError, refetch: refetchAnalytics,
  } = useAnalytics();
  const { machines, isLoading: machinesLoading, error: machinesError } = useMachines();
  const { addNotification } = useNotifications();

  // ─── Realtime state ───
  const [liveMachines, setLiveMachines] = useState<Map<string, Partial<MachineUpdatePayload>>>(new Map());
  const liveActivities = useActivityStream(15);
  const { alerts } = useAlertStream();

  // Apply machine updates from socket
  useMachineUpdates(useCallback((data: MachineUpdatePayload) => {
    setLiveMachines(prev => new Map(prev).set(data.machineId, data));
  }, []));

  // Show alert toasts — use a ref-based Set to persist across renders
  const shownAlertIds = useRef(new Set<string>());

  useEffect(() => {
    if (alerts.length === 0) return;
    const latest = alerts[0];
    if (shownAlertIds.current.has(latest.id)) return;
    shownAlertIds.current.add(latest.id);

    // Keep the set from growing unbounded
    if (shownAlertIds.current.size > 100) {
      const entries = Array.from(shownAlertIds.current);
      shownAlertIds.current = new Set(entries.slice(-50));
    }

    addNotification({
      type: (latest.type as NotificationType) || NotificationType.INFO,
      title: latest.title,
      message: latest.message,
      machineId: latest.machineId,
      city: latest.city,
    });
  }, [alerts, addNotification]);

  // Merge live data into machines array
  const mergedMachines: Machine[] = machines.map(m => {
    const live = liveMachines.get(m.machineId);
    if (!live) return m;
    return {
      ...m,
      activeRentals: live.activeRentals ?? m.activeRentals,
      revenueToday: live.revenueToday ?? m.revenueToday,
      stockLevel: live.stockLevel ?? m.stockLevel,
      lastHeartbeat: live.lastHeartbeat ?? m.lastHeartbeat,
      occupancy: live.occupancy ?? m.occupancy,
    };
  });

  // Merge live activities with initial
  const mergedActivities: ActivityEvent[] = [
    ...liveActivities.map((a): ActivityEvent => ({
      id: a.id,
      type: a.type as any,
      text: a.text,
      timestamp: a.timestamp,
    })),
    ...initialActivities,
  ].slice(0, 20);

  const isLoading = analyticsLoading || machinesLoading;
  const error = analyticsError || machinesError;

  if (isLoading) return <PageLoader />;
  if (error) return <ErrorState message={error} onRetry={refetchAnalytics} />;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">Smart infrastructure overview — real-time monitoring</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/20 w-fit">
          <Zap size={12} className="text-cyan-400" />
          <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">Live Data</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
        </div>
      </div>

      {/* Section 1: Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.id} data={m} />
        ))}
      </div>

      {/* Section 2: Machine Status Table */}
      <MachineStatusTable machines={mergedMachines} />

      {/* Section 3 + 4: City Overview + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white">City Overview</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">{cities.length} cities active</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cities.map((c) => (
              <CityCard key={c.name} data={c} />
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-700/60 backdrop-blur-lg h-full flex flex-col">
            <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-sm font-bold text-white">Live Activity</h2>
                <p className="text-[11px] text-slate-500 mt-0.5">Real-time event stream</p>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
                <span className="text-[10px] text-green-400 uppercase tracking-widest font-semibold">Live</span>
              </span>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-2 max-h-[420px]">
              {mergedActivities.map((a) => (
                <ActivityItem key={a.id} event={a} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: System Health */}
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-bold text-white">System Health</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">Infrastructure monitoring</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemHealth.map((h) => (
            <HealthCard key={h.id} data={h} />
          ))}
        </div>
      </div>
    </div>
  );
}
