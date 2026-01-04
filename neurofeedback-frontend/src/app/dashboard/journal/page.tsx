'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { User } from '@/types';

export default function JournalPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [energy, setEnergy] = useState(50);
    const [mood, setMood] = useState(50);
    const [clarity, setClarity] = useState(50);
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (!token || !storedUser) {
            router.push('/login');
            return;
        }
        setUser(JSON.parse(storedUser));
    }, [router]);

    const handleSave = () => {
        // In a real app, save to backend
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    if (!user) return null;

    return (
        <DashboardLayout user={user} onLogout={() => {}}>
            <div className="max-w-3xl mx-auto">
                <div className="mb-12">
                    <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-2">Self Reflection</div>
                    <h2 className="text-5xl font-bold tracking-tighter uppercase">Daily Journal</h2>
                </div>

                <div className="space-y-8">
                    {/* Sliders */}
                    <div className="border border-white/10 bg-[#0A0A0A] p-8 space-y-8">
                        <RangeSlider label="Energy" value={energy} onChange={setEnergy} low="Low" high="High" />
                        <RangeSlider label="Mood" value={mood} onChange={setMood} low="Bad" high="Good" />
                        <RangeSlider label="Clarity" value={clarity} onChange={setClarity} low="Foggy" high="Clear" />
                    </div>

                    {/* Notes */}
                    <div className="border border-white/10 bg-[#0A0A0A] p-8">
                        <label className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest mb-4 block">Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="How are you feeling today?"
                            className="w-full h-40 bg-white/5 border border-white/10 p-4 text-sm mono focus:border-[#FF3D00] focus:outline-none transition-all resize-none"
                        />
                    </div>

                    <Button onClick={handleSave} className="w-full" disabled={saved}>
                        {saved ? 'Saved' : 'Save Entry'}
                    </Button>
                </div>
            </div>
        </DashboardLayout>
    );
}

const RangeSlider = ({ label, value, onChange, low, high }: any) => (
    <div>
        <div className="flex justify-between mb-4">
            <label className="text-[10px] mono opacity-40 font-bold uppercase tracking-widest">{label}</label>
            <span className="text-xl font-bold text-[#FF3D00]">{value}%</span>
        </div>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-none appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#FF3D00]"
        />
        <div className="flex justify-between mt-2 text-[10px] mono opacity-30 uppercase">
            <span>{low}</span>
            <span>{high}</span>
        </div>
    </div>
);
