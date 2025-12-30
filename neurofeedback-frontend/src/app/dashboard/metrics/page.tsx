'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TelemetryChart } from '@/components/dashboard/TelemetryChart';
import { metricsService } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MetricsPage() {
    const user = {
        id: '1',
        email: 'demo@neurofeedback.io',
        name: 'Demo User',
    };

    const todayData = metricsService.getTodayData();
    const weeklyData = metricsService.getWeeklyTrend();

    return (
        <DashboardLayout user={user} onLogout={() => { }}>
            <div className="space-y-0">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">DETAILED_ANALYTICS</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Focus_Metrics</h2>
                </div>

                {/* Today's Detailed View */}
                <div className="border border-white/10 bg-[#0A0A0A] mb-8">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">Today's_Activity</h3>
                        <p className="text-[10px] mono opacity-40 mt-1">HOURLY_COGNITIVE_LOAD_DISTRIBUTION</p>
                    </div>
                    <div className="p-12">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={todayData}>
                                    <XAxis
                                        dataKey="time"
                                        stroke="#fff"
                                        strokeOpacity={0.2}
                                        style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono' }}
                                    />
                                    <YAxis
                                        stroke="#fff"
                                        strokeOpacity={0.2}
                                        style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: '#000',
                                            border: '1px solid #222',
                                            borderRadius: '0',
                                            fontSize: '10px',
                                            fontFamily: 'IBM Plex Mono'
                                        }}
                                    />
                                    <Bar dataKey="load" fill="#FF3D00" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Weekly Trend */}
                <div className="border border-white/10 bg-[#0A0A0A] mb-8">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">Weekly_Trend</h3>
                        <p className="text-[10px] mono opacity-40 mt-1">AVERAGE_DAILY_LOAD</p>
                    </div>
                    <div className="p-12">
                        <div className="h-[300px] w-full">
                            <TelemetryChart data={weeklyData} />
                        </div>
                    </div>
                </div>

                {/* Metrics Table */}
                <div className="border border-white/10 bg-[#0A0A0A]">
                    <div className="p-8 border-b border-white/10">
                        <h3 className="text-2xl font-bold tracking-tighter uppercase">Session_Log</h3>
                        <p className="text-[10px] mono opacity-40 mt-1">HISTORICAL_DATA_STREAM</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Time</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Load</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Focus %</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Idle %</th>
                                    <th className="text-left p-6 text-[10px] mono font-bold uppercase tracking-widest opacity-40">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todayData.map((row, i) => (
                                    <tr key={i} className="border-b border-white/10 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6 mono text-sm">{row.time}</td>
                                        <td className="p-6 font-bold text-lg">{row.load}%</td>
                                        <td className="p-6 mono text-sm text-green-500">{row.focus}%</td>
                                        <td className="p-6 mono text-sm opacity-40">{row.idle}%</td>
                                        <td className="p-6">
                                            <span className={`text-[10px] mono ${row.load > 80 ? 'text-[#FF3D00]' : 'text-white/40'}`}>
                                                {row.load > 80 ? 'OVERLOAD' : 'NOMINAL'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
