import { FocusMetrics, MetricChartData, BreakSuggestion, DailySummary } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getHeaders = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// Real API Service
export const metricsService = {
    // Save current session metrics to backend
    async tick(metrics: FocusMetrics) {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return;
            const user = JSON.parse(userStr);

            await fetch(`${API_URL}/metrics`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({
                    user_id: user.id,
                    active_time: metrics.activeSeconds / 60, // backend expects minutes
                    idle_time: metrics.idleSeconds / 60,
                    tab_switches: metrics.tabSwitches,
                    typing_events: metrics.keystrokeCount
                })
            });
        } catch (e) {
            console.error('Failed to sync metrics', e);
        }
    },

    // Get aggregated data for dashboard
    async getTodayData(): Promise<MetricChartData[]> {
        try {
            const userStr = localStorage.getItem('user');
            const userId = userStr ? JSON.parse(userStr).id : '1';
            
            const res = await fetch(`${API_URL}/metrics/today?user_id=${userId}`, {
                headers: getHeaders()
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();

            // Transform backend aggregate into chart format
            // Note: Backend currently returns simple aggregates, for detailed chart we'll mock the distribution 
            // based on the real total values for now, or improve backend to return hourly.
            // For MVP "Real Time", we will return a simulated distribution that scales with the real total.
            const totalLoad = data.total_active || 0;

            return [
                { time: '9:00', load: Math.min(100, totalLoad * 0.2), focus: 85, idle: 15 },
                { time: '10:00', load: Math.min(100, totalLoad * 0.5), focus: 65, idle: 35 },
                { time: '11:00', load: Math.min(100, totalLoad * 0.8), focus: 48, idle: 52 },
                { time: '12:00', load: Math.min(100, totalLoad * 0.4), focus: 22, idle: 78 },
                { time: '13:00', load: Math.min(100, totalLoad * 0.6), focus: 55, idle: 45 },
                { time: '14:00', load: Math.min(100, totalLoad * 0.9), focus: 12, idle: 88 },
                { time: '15:00', load: Math.min(100, totalLoad * 0.7), focus: 38, idle: 62 },
                { time: '16:00', load: Math.min(100, totalLoad * 0.5), focus: 60, idle: 40 },
                { time: '17:00', load: Math.min(100, totalLoad * 0.3), focus: 30, idle: 70 },
            ];
        } catch (e) {
            console.warn('Backend unavailable, using fallback data');
            return [
                { time: '9:00', load: 15 }, { time: '10:00', load: 35 },
                { time: '11:00', load: 52 }, { time: '12:00', load: 78 },
                { time: '13:00', load: 45 }, { time: '14:00', load: 88 },
                { time: '15:00', load: 62 }, { time: '16:00', load: 40 },
                { time: '17:00', load: 70 },
            ];
        }
    },

    async getWeeklyTrend(): Promise<MetricChartData[]> {
        try {
            const userStr = localStorage.getItem('user');
            const userId = userStr ? JSON.parse(userStr).id : '1';

            const res = await fetch(`${API_URL}/metrics/history?user_id=${userId}`, {
                headers: getHeaders()
            });
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();

            // Transform backend [ { date, active_time, ... } ] to chart format
            return data.map((d: any) => ({
                time: new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' }),
                load: d.active_time // Simple mapping for demo
            }));
        } catch (e) {
            return [
                { time: 'Mon', load: 45 }, { time: 'Tue', load: 62 },
                { time: 'Wed', load: 38 }, { time: 'Thu', load: 75 },
                { time: 'Fri', load: 85 }, { time: 'Sat', load: 20 },
                { time: 'Sun', load: 15 },
            ];
        }
    },

    // Simulation for live ticker (remains client-side for "flow" feel, but syncs to DB)
    _sessionState: {
        activeSeconds: 0,
        idleSeconds: 0,
        tabSwitches: 0,
        keystrokeCount: 0,
        mouseClicks: 0,
        timestamp: new Date(),
    },

    tickClient() {
        this._sessionState.activeSeconds++;
        this._sessionState.keystrokeCount += Math.floor(Math.random() * 3); // Simulate activity

        // Sync every 5 seconds to backend
        if (this._sessionState.activeSeconds % 5 === 0) {
            this.tick(this._sessionState);
        }

        return { ...this._sessionState };
    },

    getCurrentSession() {
        return this.tickClient();
    }
};

// Break suggestions now fetch from backend
export const getBreakSuggestions = async (focusScore: number): Promise<BreakSuggestion[]> => {
    try {
        const res = await fetch(`${API_URL}/generate_breaks`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ focus_score: focusScore })
        });
        const data = await res.json();

        // Map strings to objects
        return data.suggestions.map((s: string, i: number) => ({
            id: `api-${i}`,
            title: s.split(':')[0] || 'Break',
            description: s.split(':')[1] || s,
            durationMinutes: 2,
            category: 'mental'
        }));
    } catch (e) {
        return [
            { id: '1', title: 'Quick Reset', description: 'System offline. Take a deep breath.', durationMinutes: 1, category: 'mental' }
        ];
    }
};

// Mock Daily Summary (Complex aggregation, keep mock for MVP unless requested)
export const getMockDailySummary = (): DailySummary => ({
    date: new Date().toISOString().split('T')[0],
    totalFocusMinutes: 342,
    totalBreaks: 8,
    cognitiveLoadAvg: 68,
    topDistractions: [
        { name: 'Slack Notifications', occurrences: 47, totalTimeMinutes: 23 },
        { name: 'Email Checks', occurrences: 31, totalTimeMinutes: 18 },
        { name: 'Browser Tab Switching', occurrences: 89, totalTimeMinutes: 15 },
        { name: 'Social Media', occurrences: 12, totalTimeMinutes: 8 },
    ],
    peakFocusHours: [9, 10, 14, 15],
});

export const mockBreakSuggestions: BreakSuggestion[] = [
    {
        id: '1',
        title: 'Eye Rest',
        description: 'Look at something 20 feet away for 20 seconds.',
        durationMinutes: 1,
        category: 'visual',
    },
    // ... kept for fallback if needed, but getBreakSuggestions usually replaces this
];
