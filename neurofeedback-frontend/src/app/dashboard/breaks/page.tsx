'use client';

import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtocolCard } from '@/components/dashboard/ProtocolCard';
import { mockBreakSuggestions } from '@/lib/mock-data';

export default function BreaksPage() {
    const user = {
        id: '1',
        email: 'demo@neurofeedback.io',
        name: 'Demo User',
    };

    return (
        <DashboardLayout user={user} onLogout={() => { }}>
            <div className="space-y-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">RECOVERY_PROTOCOLS</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Micro_Break_Catalog</h2>
                    <p className="text-lg mono text-white/50 mt-4">AI-optimized recovery intervals designed to maximize neural regeneration and prevent cognitive burnout.</p>
                </div>

                {/* Current Load Indicator */}
                <div className="border border-white/10 bg-[#0A0A0A] p-12">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-[10px] mono text-[#FF3D00] mb-4">CURRENT_COGNITIVE_LOAD</div>
                            <div className="text-8xl font-black">72%</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg mono opacity-40 mb-2">RECOMMENDATION</div>
                            <div className="text-2xl font-bold">IMPLEMENT_BREAK_WITHIN_15M</div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 mt-8">
                        <div className="h-full bg-[#FF3D00] transition-all duration-1000" style={{ width: '72%' }} />
                    </div>
                </div>

                {/* Break Protocols Grid */}
                <div className="border border-white/10">
                    {mockBreakSuggestions.map((suggestion, i) => (
                        <ProtocolCard
                            key={suggestion.id}
                            number={`0${i + 1}`}
                            title={suggestion.title}
                            description={suggestion.description}
                        />
                    ))}
                </div>

                {/* Additional Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="border border-white/10 p-8 hover:border-[#FF3D00] transition-colors">
                        <div className="text-[10px] mono text-[#FF3D00] mb-4 font-bold">TIMING</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Optimal_Frequency</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Take a micro-break every 52 minutes of sustained focus. This aligns with ultradian rhythms.</p>
                    </div>
                    <div className="border border-white/10 p-8 hover:border-[#FF3D00] transition-colors">
                        <div className="text-[10px] mono text-[#FF3D00] mb-4 font-bold">DURATION</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Length_Protocol</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Breaks between 1-5minutes maximize recovery without disrupting flow state re-entry.</p>
                    </div>
                    <div className="border border-white/10 p-8 hover:border-[#FF3D00] transition-colors">
                        <div className="text-[10px] mono text-[#FF3D00] mb-4 font-bold">EXECUTION</div>
                        <h3 className="text-xl font-bold uppercase mb-2">Implementation</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Set a timer. Stand up. Move away from screen. Complete the protocol fully.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
