'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
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
                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">Configuration</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Settings</h2>
                </div>

                <div className="border border-white/10 bg-[#0A0A0A] p-8">
                    <h3 className="text-2xl font-bold uppercase mb-6">Account</h3>
                    <div className="space-y-6 max-w-md">
                        <div className="space-y-2">
                            <label className="text-xs mono opacity-40 uppercase">Name</label>
                            <input 
                                type="text" 
                                value={user.name || ''} 
                                disabled 
                                className="w-full bg-white/5 border border-white/10 p-3 text-sm mono opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs mono opacity-40 uppercase">Email</label>
                            <input 
                                type="email" 
                                value={user.email} 
                                disabled 
                                className="w-full bg-white/5 border border-white/10 p-3 text-sm mono opacity-50 cursor-not-allowed"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs mono opacity-40 uppercase text-[#FF3D00]">Extension ID</label>
                            <div className="flex gap-2">
                                <input 
                                    type="text" 
                                    value={user.id} 
                                    readOnly 
                                    className="w-full bg-white/5 border border-white/10 p-3 text-sm mono text-[#FF3D00]"
                                />
                                <Button 
                                    size="sm" 
                                    onClick={() => navigator.clipboard.writeText(user.id)}
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>
                        <div className="pt-4">
                            <Button variant="outline" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
