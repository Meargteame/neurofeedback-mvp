import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import metricsRoutes from './routes/metrics';
import breaksRoutes from './routes/breaks';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/metrics', metricsRoutes);
app.use('/generate_breaks', breaksRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', system: 'NeuroFeedback Backend', uptime: process.uptime() });
});

// Start Server
app.listen(PORT, () => {
    console.log(`
  ┌──────────────────────────────────────────────────┐
  │  NeuroFeedback Backend MVP                       │
  │  -------------------------                       │
  │  STATUS:    ONLINE                               │
  │  PORT:      ${PORT}                                 │
  │  DATABASE:  SQLite (neurofeedback.db)            │
  └──────────────────────────────────────────────────┘
  `);
});
