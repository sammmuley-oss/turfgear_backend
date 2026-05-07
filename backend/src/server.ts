import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { config } from './config/index.js';
import { requestLogger, errorHandler, notFoundHandler } from './middleware/index.js';
import machineRoutes from './routes/machineRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { initializeSocket } from './socket/index.js';

const app = express();
const httpServer = createServer(app);

// ─── Middleware ───
const allowedOrigins = config.frontendUrl.split(',').map(s => s.trim());
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, health checks, etc.)
    if (!origin) return callback(null, true);
    // Allow any Vercel preview/production domain
    if (origin.endsWith('.vercel.app')) return callback(null, true);
    // Allow explicitly configured origins
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow localhost in development
    if (origin.includes('localhost')) return callback(null, true);

    console.warn(`[CORS] Blocked origin: ${origin}`);
    callback(null, false);
  },
  credentials: true,
}));
app.use(express.json());
app.use(requestLogger);

// ─── Health Check ───
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: { status: 'ok', uptime: process.uptime(), env: config.nodeEnv },
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───
app.use('/api/machines', machineRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ─── Error Handling ───
app.use(notFoundHandler);
app.use(errorHandler);

// ─── Socket.IO ───
const io = initializeSocket(httpServer);

// ─── Start Server ───
httpServer.listen(config.port, () => {
  console.log('');
  console.log('  ⚡ TurfGear Admin API Server');
  console.log(`  ├─ Port:      ${config.port}`);
  console.log(`  ├─ Env:       ${config.nodeEnv}`);
  console.log(`  ├─ CORS:      ${allowedOrigins.join(', ')}`);
  console.log(`  ├─ Socket.IO: enabled`);
  console.log(`  └─ Health:    http://localhost:${config.port}/api/health`);
  console.log('');
});

export { app, io };
