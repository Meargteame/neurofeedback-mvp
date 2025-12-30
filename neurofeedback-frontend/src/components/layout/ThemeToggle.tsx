'use client';

import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as 'dark' | 'light';
        if (stored) {
            setTheme(stored);
            document.documentElement.setAttribute('data-theme', stored);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!mounted) return null;

    return (
        <button
            onClick={toggleTheme}
            className="w-full py-4 text-xs mono font-bold uppercase tracking-widest hover:text-[#FF3D00] transition-colors flex items-center justify-center gap-2 border border-[var(--ui-border)] hover:border-[#FF3D00]"
        >
            <span className="w-2 h-2 bg-current rounded-full"></span>
            {theme === 'dark' ? 'LIGHT_MODE' : 'DARK_MODE'}
        </button>
    );
};
