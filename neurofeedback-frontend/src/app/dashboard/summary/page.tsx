'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TelemetryChart } from '@/components/dashboard/TelemetryChart';
import { User, MetricChartData } from '@/types';
import { getMockDailySummary, metricsService } from '@/lib/mock-data';

export default function SummaryPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!token || !storedUser) {
            router.push('/login');
            return;
        }

        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    const summary = getMockDailySummary();
    const [weeklyData, setWeeklyData] = useState<MetricChartData[]>([]);

    useEffect(() => {
        metricsService.getWeeklyTrend().then(setWeeklyData).catch(console.error);
    }, []);

    if (!user) {
        return null;
    }

    return (
        <DashboardLayout user={user} onLogout={handleLogout}>
            <div className="space-y-12">
                {/* Header */}
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">Daily Overview</div>
                        <h2 className="text-5xl font-bold tracking-tighter uppercase">Summary Report</h2>
                        <p className="text-lg mono text-white/50 mt-2">{summary.date}</p>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10">
                    <div className="p-6 border-r border-white/10">
                        <div className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-6">Total Focus Time</div>
                        <div className="text-4xl font-black">{summary.totalFocusMinutes}m</div>
                        <div className="text-xs mono text-green-500 mt-2">+12% vs yesterday</div>
                    </div>
                    <div className="p-6 border-r border-white/10">
                        <div className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-6">Breaks Taken</div>
                        <div className="text-4xl font-black">{summary.totalBreaks}</div>
                        <div className="text-xs mono opacity-40 mt-2">Optimal range: 6-10</div>
                    </div>
                    <div className="p-6">
                        <div className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-6">Avg Mental Load</div>
                        <div className="text-4xl font-black text-[#FF3D00]">{summary.cognitiveLoadAvg}%</div>
                        <div className="text-xs mono text-[#FF3D00] mt-2">High Load</div>
                    </div>
                </div>

                {/* Weekly Trend */}
                <div className="border border-white/10 bg-[#0A0A0A]">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">7-Day Trend</h3>
                        <p className="text-[10px] mono opacity-40 mt-1">Mental Load History</p>
                    </div>
                    <div className="p-12">
                        <div className="h-[300px] w-full">
                            {weeklyData.length > 0 ? <TelemetryChart data={weeklyData} /> : <div className="w-full h-full flex items-center justify-center text-[#FF3D00]/30">Loading chart...</div>}
                        </div>
                    </div>
                </div>

                {/* Top Distractions */}
                <div className="border border-white/10 bg-[#0A0A0A]">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">Top Distractions</h3>
                        <p className="text-[10px] mono opacity-40 mt-1">Where you lost focus</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Source</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Occurrences</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Time Lost</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Impact</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.topDistractions.map((distraction, i) => (
                                    <tr key={i} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 font-bold">{distraction.name}</td>
                                        <td className="p-6 mono text-sm">{distraction.occurrences}x</td>
                                        <td className="p-6 mono text-sm text-[#FF3D00]">{distraction.totalTimeMinutes}min</td>
                                        <td className="p-6">
                                            <div className="h-2 w-24 bg-white/5">
                                                <div
                                                    className="h-full bg-[#FF3D00]"
                                                    style={{ width: `${Math.min(100, distraction.totalTimeMinutes * 4)}%` }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Peak Focus Hours */}
                <div className="border border-white/10 bg-[#0A0A0A] p-12">
                    <h3 className="text-2xl font-bold tracking-tighter uppercase mb-8">Peak_Performance_Windows</h3>
                    <div className="flex gap-6 flex-wrap">
                        {summary.peakFocusHours.map((hour) => (
                            <div key={hour} className="border border-[#FF3D00] px-8 py-6 bg-[#FF3D00]/10">
                                <div className="text-4xl font-black">{hour}:00</div>
                                <div className="text-xs mono opacity-40 mt-1">OPTIMAL_SLOT</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs mono opacity-40 mt-8 leading-relaxed">
                        Schedule your most demanding cognitive tasks during these windows for maximum productivity.
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
