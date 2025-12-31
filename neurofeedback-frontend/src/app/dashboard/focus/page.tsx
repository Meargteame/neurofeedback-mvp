'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Play, Pause, Square, CheckCircle } from 'lucide-react';

export default function FocusPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ email: string; id: string; name?: string } | null>(null);
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
    const [task, setTask] = useState('');
    const [sessionCount, setSessionCount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (!token || !storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            setSessionCount(prev => prev + 1);
            // Play sound or notify
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!user) return null;

    return (
        <DashboardLayout user={user} onLogout={() => {}}>
            <div className="max-w-4xl mx-auto">
                <div className="mb-12 text-center">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">Focus Mode</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Deep Work Timer</h2>
                </div>

                <div className="border border-white/10 bg-[#0A0A0A] p-12 relative overflow-hidden">
                    {/* Background Pulse Effect when Active */}
                    {isActive && (
                        <div className="absolute inset-0 bg-[#FF3D00]/5 animate-pulse pointer-events-none"></div>
                    )}

                    <div className="relative z-10 flex flex-col items-center space-y-12">
                        {/* Task Input */}
                        <div className="w-full max-w-lg">
                            <input
                                type="text"
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                placeholder="What are you working on?"
                                className="w-full bg-transparent border-b-2 border-white/10 py-4 text-center text-2xl font-bold focus:border-[#FF3D00] focus:outline-none transition-all placeholder:text-white/10 text-white uppercase"
                            />
                        </div>

                        {/* Timer Display */}
                        <div className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter tabular-nums">
                            {formatTime(timeLeft)}
                        </div>

                        {/* Controls */}
                        <div className="flex gap-6">
                            <Button 
                                onClick={toggleTimer} 
                                className={`w-32 justify-center ${isActive ? 'bg-white/10 hover:bg-white/20' : 'bg-[#FF3D00] hover:bg-[#ff5722] text-black'}`}
                            >
                                {isActive ? <Pause size={24} /> : <Play size={24} />}
                            </Button>
                            <Button variant="outline" onClick={resetTimer} className="w-32 justify-center">
                                <Square size={24} />
                            </Button>
                        </div>

                        {/* Session Stats */}
                        <div className="flex gap-12 pt-8 border-t border-white/10">
                            <div className="text-center">
                                <div className="text-[10px] mono opacity-40 uppercase tracking-widest mb-1">Sessions Done</div>
                                <div className="text-2xl font-bold">{sessionCount}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-[10px] mono opacity-40 uppercase tracking-widest mb-1">Status</div>
                                <div className={`text-2xl font-bold ${isActive ? 'text-[#FF3D00]' : 'text-white/50'}`}>
                                    {isActive ? 'Active' : 'Ready'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
