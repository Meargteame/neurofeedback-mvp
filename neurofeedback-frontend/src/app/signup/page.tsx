'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Signup failed');
            }

            // Store token and user info (in a real app, use a more secure method or httpOnly cookies)
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
                    <div className="text-sm font-medium text-[#FF3D00] uppercase tracking-wider mb-2">Get Started</div>
                    <h2 className="text-4xl font-bold tracking-tight">
                        Create an account
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-medium opacity-60 uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-[#FF3D00] focus:outline-none transition-all placeholder:text-white/10 text-white"
                                placeholder="name@company.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium opacity-60 uppercase tracking-wider">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 py-3 text-xl focus:border-[#FF3D00] focus:outline-none transition-all placeholder:text-white/10 text-white"
                                placeholder="••••••••"
                                required
                                minLength={8}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-[#FF3D00] text-sm mono uppercase tracking-widest border border-[#FF3D00]/20 bg-[#FF3D00]/5 p-4">
                            Error: {error}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button type="submit" className="flex-1" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push('/')}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>

                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center text-xs opacity-60">
                    <div>Already have an account? <Link href="/login" className="text-[#FF3D00] hover:underline">Log in</Link></div>
                    <div>© 2025 NeuroFeedback</div>
                </div>
            </div>
        </div>
    );
}
