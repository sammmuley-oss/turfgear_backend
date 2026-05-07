import { io, type Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

/**
 * Socket.IO client singleton.
 * Auto-connects on import. Shares one connection across the entire app.
 */
class SocketManager {
  private socket: Socket;
  private _isConnected = false;

  constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 10000,
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      this._isConnected = true;
      console.log('[Socket] ✅ Connected:', this.socket.id);
      this.notifyStatusListeners(true);
    });

    this.socket.on('disconnect', (reason) => {
      this._isConnected = false;
      console.log('[Socket] ❌ Disconnected:', reason);
      this.notifyStatusListeners(false);
    });

    this.socket.on('connect_error', (err) => {
      this._isConnected = false;
      console.warn('[Socket] ⚠️ Connection error:', err.message);
    });

    this.socket.io.on('reconnect', (attempt) => {
      console.log(`[Socket] 🔄 Reconnected after ${attempt} attempts`);
    });

    this.socket.io.on('reconnect_attempt', (attempt) => {
      console.log(`[Socket] 🔄 Reconnect attempt #${attempt}`);
    });
  }

  connect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  get isConnected(): boolean {
    return this._isConnected;
  }

  get id(): string | undefined {
    return this.socket.id;
  }

  // ─── Event Listeners ───
  on(event: string, handler: (...args: any[]) => void): void {
    this.socket.on(event, handler);
  }

  off(event: string, handler: (...args: any[]) => void): void {
    this.socket.off(event, handler);
  }

  emit(event: string, ...args: any[]): void {
    this.socket.emit(event, ...args);
  }

  // ─── Room Management ───
  subscribeMachine(machineId: string): void {
    this.socket.emit('machine:subscribe', machineId);
  }

  unsubscribeMachine(machineId: string): void {
    this.socket.emit('machine:unsubscribe', machineId);
  }

  // ─── Connection Status Listeners ───
  private statusListeners = new Set<(connected: boolean) => void>();

  onConnectionChange(handler: (connected: boolean) => void): () => void {
    this.statusListeners.add(handler);
    // Call immediately with current state
    handler(this._isConnected);
    return () => { this.statusListeners.delete(handler); };
  }

  private notifyStatusListeners(connected: boolean): void {
    this.statusListeners.forEach(fn => fn(connected));
  }
}

export const socketManager = new SocketManager();
