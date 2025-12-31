import express, { Request, Response } from 'express';
import db from '../db';

const router = express.Router();

interface AuthRequest extends Request {
    user?: any;
}

// Middleware to mock check auth (in real app, use JWT verification)
const requireAuth = (req: AuthRequest, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    // For MVP: Decoding simply without verification for speed if needed, but here we assume verified by gateway
    // Ideally verify token here.
    next();
};

// POST /metrics - Save session
router.post('/', async (req: Request, res: Response) => {
    let { user_id, active_time, idle_time, tab_switches, typing_events } = req.body;

    if (!user_id) {
        res.status(400).json({ error: 'Missing user_id' });
        return;
    }

    // Validate and sanitize input
    active_time = Number(active_time) || 0;
    idle_time = Number(idle_time) || 0;
    tab_switches = Number(tab_switches) || 0;
    typing_events = Number(typing_events) || 0;

    try {
        const stmt = db.prepare(`
      INSERT INTO focus_sessions (user_id, active_time, idle_time, tab_switches, typing_events)
      VALUES (?, ?, ?, ?, ?)
    `);
        const result = stmt.run(user_id, active_time, idle_time, tab_switches, typing_events);
        res.status(201).json({ id: result.lastInsertRowid });
    } catch (error: any) {
        console.error('Metrics save error:', error);
        res.status(500).json({ error: 'Failed to save metrics', details: error.message });
    }
});

// GET /metrics/today - Dashboard Aggregates
router.get('/today', async (req: Request, res: Response) => {
    const { user_id } = req.query;

    try {
        // Get aggregated stats for today
        const stmt = db.prepare(`
      SELECT 
        SUM(active_time) as total_active,
        SUM(idle_time) as total_idle,
        SUM(tab_switches) as total_switches,
        AVG(active_time) as avg_session_length
      FROM focus_sessions 
      WHERE user_id = ? AND created_at >= date('now', 'start of day')
    `);

        const stats = stmt.get(user_id);
        res.json(stats || { total_active: 0, total_idle: 0, total_switches: 0 });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

// GET /metrics/history - Last 7 Days
router.get('/history', async (req: Request, res: Response) => {
    const { user_id } = req.query;

    try {
        const stmt = db.prepare(`
      SELECT 
        date(created_at) as date,
        SUM(active_time) as active_time,
        SUM(idle_time) as idle_time
      FROM focus_sessions
      WHERE user_id = ? AND created_at >= date('now', '-7 days')
      GROUP BY date(created_at)
      ORDER BY date ASC
    `);

        const history = stmt.all(user_id);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

export default router;
