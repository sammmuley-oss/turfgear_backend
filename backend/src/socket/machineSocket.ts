import type { Server, Socket } from 'socket.io';
import { SOCKET_EVENTS } from './events.js';

/**
 * Machine-specific socket handlers.
 * Manages room subscriptions for per-machine telemetry.
 */
export function registerMachineHandlers(io: Server, socket: Socket): void {
  // Subscribe to a specific machine's room for detailed telemetry
  socket.on(SOCKET_EVENTS.MACHINE_SUBSCRIBE, (machineId: string) => {
    socket.join(`machine:${machineId}`);
    console.log(`  [Socket] ${socket.id} subscribed to machine:${machineId}`);
  });

  // Unsubscribe from a machine room
  socket.on(SOCKET_EVENTS.MACHINE_UNSUBSCRIBE, (machineId: string) => {
    socket.leave(`machine:${machineId}`);
    console.log(`  [Socket] ${socket.id} unsubscribed from machine:${machineId}`);
  });

  // Admin ping (keep-alive / latency check)
  socket.on(SOCKET_EVENTS.ADMIN_PING, () => {
    socket.emit('admin:pong', { timestamp: new Date().toISOString() });
  });
}
