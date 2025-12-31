'use client';

import React from 'react';
import { User } from '@/types';
import { Navbar } from './Navbar';

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: User;
    onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user, onLogout }) => {
    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col relative transition-colors duration-300">
            <Navbar user={user} onLogout={onLogout} />

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12 max-w-[1600px] mx-auto w-full transition-colors duration-300">
                <div className="mb-12 flex justify-between items-end border-b border-[var(--ui-border)] pb-8">
                    <div>
                        <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em]">Overview</div>
                        <h1 className="text-5xl font-bold tracking-tighter uppercase mt-2">Dashboard</h1>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="text-[10px] mono opacity-40">User: {user.email}</div>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
};
