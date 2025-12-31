// Core Data Types
export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface FocusMetrics {
    activeSeconds: number;
    idleSeconds: number;
    tabSwitches: number;
    keystrokeCount: number;
    mouseClicks: number;
    timestamp: Date;
}

export interface BreakSuggestion {
    id: string;
    title: string;
    description: string;
    durationMinutes: number;
    category: 'physical' | 'mental' | 'visual' | 'social';
}

export interface DailySummary {
    date: string;
    totalFocusMinutes: number;
    totalBreaks: number;
    cognitiveLoadAvg: number;
    topDistractions: Distraction[];
    peakFocusHours: number[];
}

export interface Distraction {
    name: string;
    occurrences: number;
    totalTimeMinutes: number;
}

export interface AuthState {
    user: User | null;
    isLoading: boolean;
}

export interface MetricChartData {
    time: string;
    load: number;
    focus?: number;
    idle?: number;
}
