import express, { Request, Response } from 'express';
import db from '../database';

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
        const result = await db.execute(
            `INSERT INTO focus_sessions (user_id, active_time, idle_time, tab_switches, typing_events)
             VALUES ($1, $2, $3, $4, $5)`,
            [user_id, active_time, idle_time, tab_switches, typing_events]
        );
        res.status(201).json({ id: result.id });
    } catch (error: any) {
        console.error('Metrics save error:', error);
        res.status(500).json({ error: 'Failed to save metrics', details: error.message });
    }
});

// GET /metrics/today - Dashboard Aggregates
router.get('/today', async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id) {
        res.status(400).json({ error: 'Missing user_id' });
        return;
    }

    try {
        // Simple aggregate for today
        // Note: SQLite uses strftime, Postgres uses CURRENT_DATE or date_trunc
        // We need a dialect-agnostic way or conditional logic.
        // For MVP, let's use a simple query that might work on both or handle error.
        
        // Actually, let's just fetch all for the user and filter in JS for MVP simplicity across DBs
        // OR use a raw query that is standard SQL.
        
        // "SELECT sum(active_time) as total_active FROM focus_sessions WHERE user_id = ? AND created_at > ?"
        
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
        
        const rows = await db.query(
            `SELECT active_time, idle_time, created_at FROM focus_sessions WHERE user_id = $1`,
            [user_id]
        );
        
        // Filter for today in JS to avoid SQL dialect issues with dates
        const todayRows = rows.filter((r: any) => {
            const d = new Date(r.created_at);
            return d >= startOfDay;
        });
        
        const totalActive = todayRows.reduce((acc: number, curr: any) => acc + (curr.active_time || 0), 0);
        const totalIdle = todayRows.reduce((acc: number, curr: any) => acc + (curr.idle_time || 0), 0);
        
        res.json({
            total_active: totalActive,
            total_idle: totalIdle,
            session_count: todayRows.length
        });
    } catch (error: any) {
        console.error('Metrics fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch metrics' });
    }
});

// GET /metrics/history - Weekly Trend
router.get('/history', async (req: Request, res: Response) => {
    const { user_id } = req.query;
    if (!user_id) {
        res.status(400).json({ error: 'Missing user_id' });
        return;
    }

    try {
        // Fetch all sessions
        const rows = await db.query(
            `SELECT active_time, created_at FROM focus_sessions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 100`,
            [user_id]
        );
        
        // Group by date in JS
        const dailyMap = new Map<string, number>();
        
        rows.forEach((r: any) => {
            const dateStr = new Date(r.created_at).toISOString().split('T')[0];
            const current = dailyMap.get(dateStr) || 0;
            dailyMap.set(dateStr, current + (r.active_time || 0));
        });
        
        const history = Array.from(dailyMap.entries()).map(([date, active_time]) => ({
            date,
            active_time
        }));
        
        res.json(history);
    } catch (error: any) {
        console.error('History fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

export default router;
