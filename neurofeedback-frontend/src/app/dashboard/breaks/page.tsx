'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtocolCard } from '@/components/dashboard/ProtocolCard';
import { mockBreakSuggestions } from '@/lib/mock-data';

export default function BreaksPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; id: string; name?: string } | null>(null);

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

    if (!user) {
        return null;
    }

    return (
        <DashboardLayout user={user} onLogout={handleLogout}>
            <div className="space-y-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">Recovery</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Break Catalog</h2>
                    <p className="text-lg mono text-white/50 mt-4">Short breaks designed to help you recharge and stay focused.</p>
                </div>

                {/* Current Load Indicator */}
                <div className="border border-white/10 bg-[#0A0A0A] p-6">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="text-[10px] mono text-[#FF3D00] mb-4">Current Mental Load</div>
                            <div className="text-5xl font-black">72%</div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg mono opacity-40 mb-2">Recommendation</div>
                            <div className="text-xl font-bold">Take a break in 15m</div>
                        </div>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 mt-6">
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
                        <h3 className="text-xl font-bold uppercase mb-2">How Often?</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Take a short break every 52 minutes of work.</p>
                    </div>
                    <div className="border border-white/10 p-8 hover:border-[#FF3D00] transition-colors">
                        <div className="text-[10px] mono text-[#FF3D00] mb-4 font-bold">DURATION</div>
                        <h3 className="text-xl font-bold uppercase mb-2">How Long?</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Breaks of 1-5 minutes are best to keep your momentum.</p>
                    </div>
                    <div className="border border-white/10 p-8 hover:border-[#FF3D00] transition-colors">
                        <div className="text-[10px] mono text-[#FF3D00] mb-4 font-bold">EXECUTION</div>
                        <h3 className="text-xl font-bold uppercase mb-2">How to do it?</h3>
                        <p className="mono text-xs opacity-40 leading-relaxed">Set a timer. Stand up. Look away from the screen.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
