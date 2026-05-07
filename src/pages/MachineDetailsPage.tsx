import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useMachineDetails } from '../hooks/useMachineDetails';
import { PageLoader, ErrorState } from '../components/ui/LoadingStates';
import { useMachineRoom } from '../socket/useSocket';
import {
  MachineStatusHeader,
  LockerCard,
  MachineAnalyticsCards,
  DiagnosticsPanel,
  EventTimeline,
  OccupancyPanel,
  MachineActionPanel,
} from '../components/machines';
import type { Machine, Locker, DiagnosticItem } from '../types';

export default function MachineDetailsPage() {
  const { machineId } = useParams<{ machineId: string }>();
  const { machine, isLoading, error, refetch } = useMachineDetails(machineId);
  const { machineUpdate, lockerUpdates, diagnosticsUpdate, turfUpdate } = useMachineRoom(machineId);

  // Merge live data into machine
  const liveMachine = useMemo((): Machine | null => {
    if (!machine) return null;

    // Merge top-level machine updates
    const merged = { ...machine };
    if (machineUpdate) {
      merged.activeRentals = machineUpdate.activeRentals;
      merged.revenueToday = machineUpdate.revenueToday;
      merged.stockLevel = machineUpdate.stockLevel;
      merged.lastHeartbeat = machineUpdate.lastHeartbeat;
      merged.occupancy = machineUpdate.occupancy;
      merged.analytics = { ...merged.analytics, revenueToday: machineUpdate.revenueToday, activeRentals: machineUpdate.activeRentals };
    }

    // Merge locker updates
    if (lockerUpdates.size > 0) {
      merged.lockers = machine.lockers.map((locker): Locker => {
        const liveLocker = lockerUpdates.get(locker.lockerId);
        if (!liveLocker) return locker;
        return {
          ...locker,
          status: liveLocker.status as any,
          stockQty: liveLocker.stockQty,
        };
      });
    }

    // Merge diagnostics updates
    if (diagnosticsUpdate) {
      merged.diagnostics = machine.diagnostics.map((diag): DiagnosticItem => {
        const liveDiag = diagnosticsUpdate.diagnostics.find(d => d.id === diag.id);
        if (!liveDiag) return diag;
        return { ...diag, value: liveDiag.value, status: liveDiag.status as any };
      });
    }

    // Merge turf occupancy
    if (turfUpdate) {
      merged.turfOccupancy = {
        ...merged.turfOccupancy,
        isOccupied: turfUpdate.isOccupied,
        activePlayers: turfUpdate.activePlayers,
        sessionTimer: turfUpdate.sessionTimer,
      };
    }

    return merged;
  }, [machine, machineUpdate, lockerUpdates, diagnosticsUpdate, turfUpdate]);

  if (isLoading) return <PageLoader />;
  if (error || !liveMachine) {
    return <ErrorState message={error || `Machine ${machineId} not found`} onRetry={refetch} />;
  }

  return (
    <div className="space-y-6 page-enter">
      <div className="flex items-center justify-between">
        <Link to="/machines" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft size={16} /> Back to Machines
        </Link>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-dot" />
          <span className="text-[10px] font-semibold text-green-400 uppercase tracking-wider">Live Telemetry</span>
        </div>
      </div>

      <MachineStatusHeader machine={liveMachine} />
      <MachineAnalyticsCards analytics={liveMachine.analytics} />

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-white">Live Locker System</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">{liveMachine.lockers.length} compartments</p>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-medium">Live</span>
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {liveMachine.lockers.map((locker) => (
            <LockerCard key={locker.lockerId} locker={locker} />
          ))}
        </div>
      </div>

      <DiagnosticsPanel items={liveMachine.diagnostics} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3"><EventTimeline events={liveMachine.events} /></div>
        <div className="lg:col-span-2"><OccupancyPanel data={liveMachine.turfOccupancy} /></div>
      </div>

      <MachineActionPanel />
    </div>
  );
}
