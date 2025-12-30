'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white">
      {/* Background FX */}
      <div className="fixed inset-0 grid-pattern opacity-10 z-0"></div>
      <div className="laser-h animate-scan-h" style={{ top: '20%' }}></div>
      <div className="laser-v animate-scan-v" style={{ left: '30%' }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-2xl px-8 h-24 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-[#FF3D00] shadow-[0_0_15px_#FF3D00]"></div>
            <div className="text-2xl font-black tracking-tighter uppercase leading-none">Neuro_Feedback</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push('/login')}>
            AUTH.LOGIN
          </Button>
          <Button onClick={() => router.push('/dashboard')}>
            DEPLOY_MODULE →
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center px-8 lg:px-20 max-w-[1600px] mx-auto pt-24">
        <div className="space-y-12">
          <div className="mono text-[11px] text-[#FF3D00] font-black uppercase tracking-[0.5em] flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#FF3D00]"></span>
            High-Precision Cognitive Tracking
          </div>
          <h1 className="text-7xl md:text-[140px] font-bold leading-[0.8] tracking-tighter uppercase max-w-5xl">
            Deep <br />
            <span className="text-white/10 italic">Work</span> <br />
            Engineered
          </h1>
          <p className="text-xl md:text-2xl mono text-white/50 max-w-2xl leading-relaxed">
            The neural operating system for modern engineering teams. Quantify mental friction. Protect focus intervals. Prevent burnout with biometric precision.
          </p>
          <div className="flex flex-wrap gap-8">
            <Button onClick={() => router.push('/dashboard')}>
              START_SESSION_SYNC
            </Button>
            <div className="flex flex-col justify-center mono text-[10px] opacity-40 uppercase tracking-widest">
              <span>Free for individual developers</span>
              <span>Requires no invasive bio-sensors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto border-t border-[var(--ui-border)]">
        <div className="mb-20">
          <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">System_Capabilities</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Biometric <br /> Precision</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--ui-border)]">
          <div className="p-12 border-b md:border-b-0 md:border-r border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">01 // DEEP_ANALYSIS</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Real-Time Telemetry</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Live-stream cognitive load metrics directly to your dashboard. Detect flow state interruptions with ms-latency.
            </p>
          </div>
          <div className="p-12 border-b md:border-b-0 md:border-r border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">02 // RECOVERY_PROTOCOLS</div>
            <h3 className="text-2xl font-bold uppercase mb-4">AI Recovery</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Automated micro-break suggestions based on current fatigue levels. Prevent burnout before it begins.
            </p>
          </div>
          <div className="p-12 hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">03 // PRIVACY_CORE</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Local-First Intel</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Your neural data never leaves your local environment without encryption. Enterprise-grade security standard.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology / No Wearables */}
      <section className="py-32 bg-[var(--surface)] border-y border-[var(--ui-border)]">
        <div className="px-8 lg:px-20 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">Methodology</div>
            <h2 className="text-5xl font-bold tracking-tighter uppercase mb-8">No Hardware <br /> Required</h2>
            <p className="text-xl mono opacity-50 leading-relaxed mb-8">
              We leverage advanced behavioral heuristics—typing patterns, context switching velocity, and idle time variance—to approximate neural states with 94% correlation to EEG headsets.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold">94%</div>
                <div className="text-[10px] mono opacity-40 mt-1">ACCURACY_RT</div>
              </div>
              <div>
                <div className="text-4xl font-bold">0g</div>
                <div className="text-[10px] mono opacity-40 mt-1">HARDWARE_WEIGHT</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square border border-[var(--ui-border)] relative overflow-hidden flex items-center justify-center bg-[var(--bg)]">
              <div className="absolute inset-0 grid-pattern opacity-20"></div>
              <div className="w-64 h-64 border border-[#FF3D00] rounded-full animate-pulse-accent flex items-center justify-center relative">
                <div className="w-48 h-48 border border-[#FF3D00] rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] mono text-[#FF3D00] animate-pulse">
                  SENSORY_INPUT_ACTIVE
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF3D00] animate-scan-h opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA */}
      <section className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Initialize <br /> Access</h2>
          <p className="text-xl mono opacity-50">
            Join 10,000+ engineers optimizing their cognitive performance.
          </p>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center pt-8">
            <Button onClick={() => router.push('/dashboard')} className="text-lg px-12 py-6">
              START_FREE_TRIAL
            </Button>
            <Button variant="outline" onClick={() => router.push('/login')} className="text-lg px-12 py-6">
              ENTER_DEMO_MODE
            </Button>
          </div>
          <p className="text-[10px] mono opacity-40 pt-4">NO_CREDIT_CARD_REQUIRED_FOR_MVP</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 lg:px-20 max-w-[1600px] mx-auto border-t border-white/10">
        <div className="flex justify-between items-center text-[10px] mono opacity-40 uppercase tracking-widest">
          <div>© 2025 NEUROFEEDBACK_SYSTEMS</div>
          <div>EST. 40.7128° N, 74.0060° W</div>
        </div>
      </footer>
    </div>
  );
}
