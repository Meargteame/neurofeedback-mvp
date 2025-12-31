'use client';

import React from 'react';
import { User } from '@/types';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { LogOut, LayoutDashboard, Activity, Settings, LogIn, Zap, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
    user?: User;
    onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
    const pathname = usePathname();

    return (
        <nav className="w-full h-16 bg-[var(--bg)] border-b border-[var(--ui-border)] flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300">
            {/* Logo / Brand */}
            <Link href="/" className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#FF3D00] rounded-sm"></div>
                <span className="text-sm font-bold tracking-widest uppercase mono hidden sm:block">
                    NeuroFeedback
                </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
                {user ? (
                    <>
                        <NavLink 
                            href="/dashboard" 
                            icon={<LayoutDashboard size={16} />} 
                            label="Dashboard" 
                            active={pathname === '/dashboard'} 
                        />
                        <NavLink 
                            href="/dashboard/focus" 
                            icon={<Zap size={16} />} 
                            label="Focus" 
                            active={pathname === '/dashboard/focus'} 
                        />
                        <NavLink 
                            href="/dashboard/journal" 
                            icon={<BookOpen size={16} />} 
                            label="Journal" 
                            active={pathname === '/dashboard/journal'} 
                        />
                        <NavLink 
                            href="/dashboard/metrics" 
                            icon={<Activity size={16} />} 
                            label="Metrics" 
                            active={pathname === '/dashboard/metrics'} 
                        />
                        <NavLink 
                            href="/dashboard/settings" 
                            icon={<Settings size={16} />} 
                            label="Settings" 
                            active={pathname === '/dashboard/settings'} 
                        />
                    </>
                ) : (
                    <>
                        <a href="#features" className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Features</a>
                        <a href="#methodology" className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Methodology</a>
                        <a href="#privacy" className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Privacy</a>
                        <a href="#pricing" className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Pricing</a>
                        <a href="#faq" className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">FAQ</a>
                    </>
                )}
            </div>

            {/* Right Side: Theme Toggle & User Profile */}
            <div className="flex items-center gap-4">
                <ThemeToggle />
                
                <div className="h-8 w-[1px] bg-[var(--ui-border)] mx-2 hidden sm:block"></div>
                
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <div className="text-xs font-bold">{user.name}</div>
                            <div className="text-[10px] mono opacity-50">{user.email}</div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={onLogout}
                            className="border-none hover:bg-red-500/10 hover:text-red-500"
                        >
                            <LogOut size={16} />
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link href="/login">
                            <Button variant="ghost" size="sm">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button size="sm">
                                Get Started →
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

const NavLink = ({ icon, label, active, href }: { icon: React.ReactNode; label: string; active?: boolean; href: string }) => (
    <Link 
        href={href}
        className={`flex items-center gap-2 text-xs font-medium uppercase tracking-wider transition-colors ${
            active 
                ? 'text-[#FF3D00]' 
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
        }`}
    >
        {icon}
        <span>{label}</span>
    </Link>
);
