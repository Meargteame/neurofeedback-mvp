'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - in real app, would authenticate
        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6 grid-pattern">
            <div className="w-full max-w-2xl border border-white/10 bg-[#0A0A0A] p-12 lg:p-20 relative">
                {/* Decorative corner markers */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-[#FF3D00]"></div>
                <div className="absolute top-0 right-0 w-2 h-2 bg-[#FF3D00]"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#FF3D00]"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#FF3D00]"></div>

                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.5em] mb-4">AUTHORIZATION_GATEWAY</div>
                    <h2 className="text-6xl font-bold tracking-tighter uppercase leading-[0.9]">
                        Sync_Your <br /> Neural_Profile
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    <div className="space-y-2">
                        <label className="text-[10px] mono opacity-40 uppercase font-bold tracking-widest">Input_Neural_ID</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b-2 border-white/10 py-6 text-3xl font-bold focus:border-[#FF3D00] focus:outline-none transition-all placeholder:text-white/5 text-white"
                            placeholder="name@company.auth"
                            required
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <Button type="submit" className="flex-1 text-xl">
                            INITIALIZE_SYNC
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/')}
                        >
                            ABORT_SESSION
                        </Button>
                    </div>
                </form>

                <div className="mt-12 pt-12 border-t border-white/10 flex justify-between items-center text-[10px] mono opacity-40 uppercase tracking-widest">
                    <div>Security_Level: Alpha</div>
                    <div>Node_Sync: Active</div>
                </div>
            </div>
        </div>
    );
}
