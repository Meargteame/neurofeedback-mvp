'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { ProtocolCard } from '@/components/dashboard/ProtocolCard';
import { TelemetryChart } from '@/components/dashboard/TelemetryChart';
import { Button } from '@/components/ui/Button';
import { metricsService, mockBreakSuggestions } from '@/lib/mock-data';
import { FocusMetrics, BreakSuggestion } from '@/types';

export default function DashboardPage() {
    const [metrics, setMetrics] = useState<FocusMetrics | null>(null);
    const [breaks, setBreaks] = useState<BreakSuggestion[]>([]);
    const [isGeneratingBreaks, setIsGeneratingBreaks] = useState(false);

    // Mock user
    const user = {
        id: '1',
        email: 'demo@neurofeedback.io',
        name: 'Demo User',
    };

    useEffect(() => {
        // Update metrics every 2 seconds
        const interval = setInterval(() => {
            setMetrics(metricsService.getCurrentSession());
        }, 2000);

        setMetrics(metricsService.getCurrentSession());

        return () => clearInterval(interval);
    }, []);

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

    const chartData = metricsService.getTodayData();

    return (
        <DashboardLayout user={user} onLogout={() => { }}>
            <div className="space-y-0 border border-[var(--ui-border)] bg-[var(--bg)]">
                {/* Top Console Bar */}
                <div className="p-8 border-b border-[var(--ui-border)] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tighter uppercase">Subject: {user.name}</h2>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] mono text-[#FF3D00] animate-pulse">● LIVE_TELEMETRY</span>
                            <span className="text-[10px] mono opacity-40">SESSION_ID: {Math.random().toString(16).slice(2, 10).toUpperCase()}</span>
                        </div>
                    </div>
                    <Button onClick={handleGenerateBreaks}>
                        {isGeneratingBreaks ? 'Synthesizing...' : 'Request_Recovery'}
                    </Button>
                </div>

                {/* Main Metrics Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 border-b border-[var(--ui-border)]">
                    <MetricCard
                        label="Cognitive_Index"
                        value={`${cognitiveLoad}%`}
                        sublabel="System Friction Detected"
                        variant={cognitiveLoad > 80 ? 'danger' : 'default'}
                        showBar
                        barValue={cognitiveLoad}
                    />

                    <MetricCard
                        label="Focus_Session"
                        value={`${Math.floor((metrics?.activeSeconds || 0) / 60)}m ${metrics?.activeSeconds ? metrics.activeSeconds % 60 : 0}s`}
                        sublabel="NOMINAL_FLOW"
                    />

                    <MetricCard
                        label="Context_Switches"
                        value={metrics?.tabSwitches || 0}
                        sublabel={`${Math.round((metrics?.tabSwitches || 0) / 10 * 100)}% OVERLOAD`}
                        variant={metrics && metrics.tabSwitches > 20 ? 'danger' : 'default'}
                    />

                    <div className="p-8 flex flex-col justify-between bg-[var(--surface)]">
                        <div>
                            <div className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-4">Input_Velocity</div>
                            <div className="text-4xl font-bold tracking-tighter">{metrics?.keystrokeCount || 0}</div>
                        </div>
                        <div className="pt-8 border-t border-[var(--ui-border)]">
                            <div className="text-[10px] mono opacity-40 uppercase tracking-widest mb-1">Hardware</div>
                            <div className="text-xs mono">SYSTEM_DEFAULT</div>
                        </div>
                    </div>
                </div>

                {/* Analytics & Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Main Chart Section */}
                    <div className="lg:col-span-8 p-12 lg:border-r border-[var(--ui-border)]">
                        <div className="flex justify-between items-end mb-12">
                            <h3 className="text-2xl font-bold tracking-tighter uppercase">Telemetry_Stream</h3>
                            <div className="text-[10px] mono opacity-40">UTC_TIMESTAMP: {new Date().toLocaleTimeString()}</div>
                        </div>
                        <div className="h-[340px] w-full">
                            <TelemetryChart data={chartData} />
                        </div>
                    </div>

                    {/* Recalibration Sidebar */}
                    <div className="lg:col-span-4 p-12 bg-[var(--surface)]">
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold tracking-tighter uppercase">Recalibration</h3>
                            <p className="text-[10px] mono opacity-40 mt-1 uppercase">AI-Synthesized Recovery Protocols</p>
                        </div>

                        <div className="space-y-6">
                            {breaks.length > 0 ? (
                                breaks.map((b, i) => (
                                    <div key={i} className="p-6 border border-[var(--ui-border)] hover:border-[#FF3D00] transition-all group">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-[10px] mono text-[#FF3D00] font-bold">PROTOCOL_{i + 1}</span>
                                            <span className="text-[10px] mono opacity-40">{b.durationMinutes}M</span>
                                        </div>
                                        <h4 className="text-lg font-bold uppercase tracking-tight mb-2">{b.title}</h4>
                                        <p className="text-xs mono opacity-40 leading-relaxed group-hover:opacity-100">{b.description}</p>
                                    </div>
                                ))
                            ) : (
                                <div className="py-20 text-center border border-dashed border-[var(--ui-border)]">
                                    <div className="text-xs mono opacity-40 animate-pulse">WAITING_FOR_SENSORY_DATA...</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
