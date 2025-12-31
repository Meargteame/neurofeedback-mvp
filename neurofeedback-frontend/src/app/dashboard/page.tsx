'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ProtocolCard } from '@/components/dashboard/ProtocolCard';
import { TelemetryChart } from '@/components/dashboard/TelemetryChart';
import { Button } from '@/components/ui/Button';
import { metricsService, mockBreakSuggestions } from '@/lib/mock-data';
import { FocusMetrics, BreakSuggestion, MetricChartData } from '@/types';

export default function DashboardPage() {
    const router = useRouter();
    const [metrics, setMetrics] = useState<FocusMetrics | null>(null);
    const [breaks, setBreaks] = useState<BreakSuggestion[]>([]);
    const [chartData, setChartData] = useState<MetricChartData[]>([]);
    const [isGeneratingBreaks, setIsGeneratingBreaks] = useState(false);
    const [user, setUser] = useState<{ email: string; id: string; name?: string } | null>(null);

    useEffect(() => {
        // Check auth
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(storedUser));

        // Update metrics every 2 seconds
        const interval = setInterval(() => {
            setMetrics(metricsService.getCurrentSession());
        }, 2000);

        setMetrics(metricsService.getCurrentSession());
        
        // Load chart data
        metricsService.getTodayData().then(setChartData).catch(console.error);

        return () => clearInterval(interval);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    const handleGenerateBreaks = async () => {
        setIsGeneratingBreaks(true);
        try {
            // Use current cognitive load as score (mocked calculation based on session)
            const currentScore = metrics
                ? Math.min(100, Math.floor((metrics.tabSwitches * 12) + (metrics.activeSeconds / 45)))
                : 50;

            const suggestions = await import('@/lib/mock-data').then(m => m.getBreakSuggestions(currentScore));
            setBreaks(suggestions);
        } catch (e) {
            console.error(e);
        } finally {
            setIsGeneratingBreaks(false);
        }
    };

    const cognitiveLoad = metrics
        ? Math.min(100, Math.floor((metrics.tabSwitches * 12) + (metrics.activeSeconds / 45) - (metrics.idleSeconds / 100)))
        : 0;

    if (!user) {
        return <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-[#FF3D00] mono text-xs animate-pulse">Loading...</div>;
    }

    return (
        <DashboardLayout user={user} onLogout={handleLogout}>
            <div className="space-y-0 border border-[var(--ui-border)] bg-[var(--bg)]">
                {/* Top Console Bar */}
                <div className="p-8 border-b border-[var(--ui-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tighter uppercase">Welcome back, {user.name || user.email.split('@')[0]}</h2>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] mono text-[#FF3D00] animate-pulse">● Live Status</span>
                        </div>
                    </div>
                    <Button onClick={handleGenerateBreaks}>
                        {isGeneratingBreaks ? 'Loading...' : 'Take a Break'}
                    </Button>
                </div>

                {/* Main Metrics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-b border-[var(--ui-border)]">
                    <MetricCard
                        label="Mental Load"
                        value={`${cognitiveLoad}%`}
                        sublabel="High Stress Detected"
                        variant={cognitiveLoad > 80 ? 'danger' : 'default'}
                        showBar
                        barValue={cognitiveLoad}
                    />

                    <MetricCard
                        label="Focus Time"
                        value={`${Math.floor((metrics?.activeSeconds || 0) / 60)}m ${metrics?.activeSeconds ? metrics.activeSeconds % 60 : 0}s`}
                        sublabel="On Track"
                    />

                    <MetricCard
                        label="Distractions"
                        value={metrics?.tabSwitches || 0}
                        sublabel={`${Math.round((metrics?.tabSwitches || 0) / 10 * 100)}% Overload`}
                        variant={metrics && metrics.tabSwitches > 20 ? 'danger' : 'default'}
                    />

                    <div className="p-8 flex flex-col justify-between bg-[var(--surface)]">
                        <div>
                            <div className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-4">Typing Speed</div>
                            <div className="text-4xl font-bold tracking-tighter">{metrics?.keystrokeCount || 0}</div>
                        </div>
                        <div className="pt-8 border-t border-[var(--ui-border)]">
                            <div className="text-[10px] mono opacity-40 uppercase tracking-widest mb-1">Device</div>
                            <div className="text-xs mono">Standard</div>
                        </div>
                    </div>
                </div>

                {/* Analytics & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Main Chart Section */}
                    <div className="lg:col-span-8 p-12 lg:border-r border-[var(--ui-border)]">
                        <div className="flex justify-between items-end mb-12">
                            <h3 className="text-2xl font-bold tracking-tighter uppercase">Activity Chart</h3>
                            <div className="text-[10px] mono opacity-40">Time: {new Date().toLocaleTimeString()}</div>
                        </div>
                        <div className="h-[340px] w-full">
                            <TelemetryChart data={chartData} />
                        </div>
                    </div>

                    {/* Recalibration Sidebar */}
                    <div className="lg:col-span-4 p-12 bg-[var(--surface)]">
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold tracking-tighter uppercase">Break Suggestions</h3>
                            <p className="text-[10px] mono opacity-40 mt-1 uppercase">Recommended Breaks</p>
                        </div>

                        <div className="space-y-6">
                            {breaks.length > 0 ? (
                                breaks.map((b, i) => (
                                    <div key={i} className="p-6 border border-[var(--ui-border)] hover:border-[#FF3D00] transition-all group">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] mono text-[#FF3D00] font-bold">Option {i + 1}</span>
                                            <span className="text-[10px] mono opacity-40">{b.durationMinutes}M</span>
                                        </div>
                                        <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{b.title}</h4>
                                        <p className="text-xs mono opacity-40 leading-relaxed group-hover:opacity-100">{b.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center border border-dashed border-[var(--ui-border)]">
                                    <div className="text-xs mono opacity-40 animate-pulse">Waiting for activity...</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
