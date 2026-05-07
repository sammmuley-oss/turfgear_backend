import { Server as SocketServer } from 'socket.io';
import type { Server as HttpServer } from 'http';
import { config } from '../config/index.js';
import { registerMachineHandlers } from './machineSocket.js';
import { TelemetryEmitter } from './telemetryEmitter.js';

let telemetryEmitter: TelemetryEmitter | null = null;

export function initializeSocket(httpServer: HttpServer): SocketServer {
  const allowedOrigins = config.frontendUrl.split(',').map(s => s.trim());

  const io = new SocketServer(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
    transports: ['websocket', 'polling'],
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  io.on('connection', (socket) => {
    console.log(`  🔌 Client connected: ${socket.id}`);

    // Register machine-specific handlers
    registerMachineHandlers(io, socket);

    // Send initial connection status
    socket.emit('connection:status', { connected: true });

    socket.on('disconnect', (reason) => {
      console.log(`  ❌ Client disconnected: ${socket.id} (${reason})`);
    });
  });

  // Start telemetry simulation
  telemetryEmitter = new TelemetryEmitter(io);
  telemetryEmitter.start();

  console.log('  🔌 Socket.IO server initialized');
  return io;
}

export function getEmitter(): TelemetryEmitter | null {
  return telemetryEmitter;
}
