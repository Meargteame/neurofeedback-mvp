'use client';

import React from 'react';
import { User } from '@/types';
import { Button } from '../ui/Button';

import { ThemeToggle } from '../layout/ThemeToggle';

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: User;
    onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, user, onLogout }) => {
    return (
        <div className="min-h-screen bg-[var(--bg)] flex flex-col lg:flex-row relative transition-colors duration-300">
            {/* Sidebar */}
            <aside className="w-full lg:w-20 lg:h-screen bg-[var(--bg)] border-b lg:border-b-0 lg:border-r border-[var(--ui-border)] flex lg:flex-col items-center justify-between p-6 fixed top-0 left-0 z-50 transition-colors duration-300">
                <div className="w-8 h-8 bg-[#FF3D00]"></div>

                <nav className="flex lg:flex-col gap-8 items-center">
                    <SidebarLink active icon="▤" />
                    <SidebarLink icon="▥" />
                    <SidebarLink icon="▣" />
                    <ThemeToggle />
                </nav>

                <button
                    onClick={onLogout}
                    className="text-xs mono hover:text-[#FF3D00] transition-colors"
                >
                    AUTH.OFF
                </button>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden h-16 border-b border-[var(--ui-border)] flex items-center justify-between px-6 bg-[var(--bg)] transition-colors duration-300">
                <div className="text-xs font-bold mono">NF.SYSTEM_v2</div>
            </header>

            {/* Main Content */}
            <main className="flex-1 lg:ml-20 p-6 lg:p-12 max-w-[1600px] mx-auto w-full transition-colors duration-300">
                <div className="mb-12 flex justify-between items-end border-b border-[var(--ui-border)] pb-8">
                    <div>
                        <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em]">Operational_Intel</div>
                        <h1 className="text-5xl font-bold tracking-tighter uppercase mt-2">DASHBOARD_CONTROLS</h1>
                    </div>
                    <div className="text-right hidden sm:block">
                        <div className="text-[10px] mono opacity-40">USER_REF: {user.email}</div>
                        <div className="text-[10px] mono opacity-40">LOC: 40.7128° N, 74.0060° W</div>
                    </div>
                </div>
                {children}
            </main>
        </div>
    );
};

const SidebarLink = ({ active, icon }: { active?: boolean; icon: string }) => (
    <button className={`text-xl transition-colors ${active ? 'text-[#FF3D00]' : 'text-white/20 hover:text-white'}`}>
        {icon}
    </button>
);
