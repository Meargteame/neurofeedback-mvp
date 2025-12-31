'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Navbar } from '@/components/layout/Navbar';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Background FX */}
      <div className="fixed inset-0 grid-pattern opacity-10 z-0 pointer-events-none"></div>
      <div className="laser-h animate-scan-h pointer-events-none" style={{ top: '20%' }}></div>
      <div className="laser-v animate-scan-v pointer-events-none" style={{ left: '30%' }}></div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col px-8 lg:px-20 max-w-[1600px] mx-auto pt-12 pb-12">
        <div className="flex-1 flex flex-col justify-center space-y-6 md:ml-48">
          <div className="mono text-[11px] text-[#FF3D00] font-black uppercase tracking-[0.5em] flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#FF3D00]"></span>
            Cognitive Performance System
          </div>
          <h1 className="text-6xl md:text-[90px] font-bold leading-[0.9] tracking-tighter uppercase max-w-4xl">
            Deep <br />
            <span className="text-[#888888] italic">Work</span> <br />
            Engineered
          </h1>
          <p className="text-lg md:text-xl mono text-[var(--text-secondary)] max-w-lg leading-relaxed">
            Advanced behavioral analytics to quantify focus and prevent burnout. The neural operating system for modern engineering teams—no wearables required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button size="lg" onClick={() => router.push('/dashboard')}>
              Get Started
            </Button>
            <Button variant="outline" size="lg" onClick={() => router.push('/login')}>
              Log In
            </Button>
          </div>
        </div>

        {/* Stats / Social Proof */}
        <div className="flex justify-between items-end border-t border-[var(--ui-border)] pt-8 mt-12">
          <div className="flex gap-12">
            <div>
              <div className="text-3xl font-bold">14.2k</div>
              <div className="text-[10px] mono uppercase opacity-50">Active Nodes</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98.4%</div>
              <div className="text-[10px] mono uppercase opacity-50">Uptime</div>
            </div>
          </div>
          <div className="text-[10px] mono opacity-30 max-w-xs text-right hidden md:block">
            SYSTEM STATUS: OPERATIONAL<br/>
            LATENCY: 12ms<br/>
            ENCRYPTION: AES-256
          </div>
        </div>
      </section>

      {/* 4 Main Sections */}
      <section id="features" className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto border-t border-[var(--ui-border)]">
        <div className="mb-20">
          <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">Features</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">What It <br /> Does</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[var(--ui-border)]">
          {/* Section 1: Deep Focus Tracking */}
          <div className="p-12 border-b md:border-r border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">01 // TRACKING</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Track Your Focus</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              See exactly when you're focused and when you're distracted. Works automatically in the background while you work.
            </p>
          </div>

          {/* Section 2: Focus Dashboard */}
          <div className="p-12 border-b border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">02 // DASHBOARD</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Simple Dashboard</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              See your daily activity in clear charts. Understand your energy levels and work patterns at a glance.
            </p>
          </div>

          {/* Section 3: Smart Recovery */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">03 // REMINDERS</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Smart Break Reminders</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Get friendly reminders to take a break before you get tired. Prevents burnout by suggesting stretches or water breaks.
            </p>
          </div>

          {/* Section 4: Non-Invasive Telemetry */}
          <div className="p-12 hover:bg-[var(--surface-hover)] transition-colors group">
            <div className="text-[10px] mono opacity-40 mb-8 group-hover:text-[#FF3D00]">04 // BACKGROUND</div>
            <h3 className="text-2xl font-bold uppercase mb-4">Works in Background</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Runs quietly without slowing down your computer. We respect your privacy and only measure activity patterns.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology / No Wearables */}
      <section id="methodology" className="py-32 bg-[var(--surface)] border-y border-[var(--ui-border)]">
        <div className="px-8 lg:px-20 max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">How It Works</div>
            <h2 className="text-5xl font-bold tracking-tighter uppercase mb-8">No Extra <br /> Gadgets</h2>
            <p className="text-xl mono opacity-50 leading-relaxed mb-8">
              We use smart patterns from your typing and mouse movement to understand your focus levels. It's just as accurate as expensive headsets, but without the hassle.
            </p>
            <div className="flex gap-12">
              <div>
                <div className="text-4xl font-bold">94%</div>
                <div className="text-[10px] mono opacity-40 mt-1">Accuracy</div>
              </div>
              <div>
                <div className="text-4xl font-bold">0g</div>
                <div className="text-[10px] mono opacity-40 mt-1">Weight</div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="aspect-square border border-[var(--ui-border)] relative overflow-hidden flex items-center justify-center bg-[var(--bg)]">
              <div className="absolute inset-0 grid-pattern opacity-20"></div>
              <div className="w-64 h-64 border border-[#FF3D00] rounded-full animate-pulse-accent flex items-center justify-center relative">
                <div className="w-48 h-48 border border-[#FF3D00] rounded-full opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] mono text-[#FF3D00] animate-pulse">
                  Active
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-[#FF3D00] animate-scan-h opacity-20"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section id="privacy" className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto border-b border-[var(--ui-border)]">
        <div className="mb-20">
          <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">Privacy</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Your Data <br /> Is Safe</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border border-[var(--ui-border)] bg-[var(--surface)]">
            <div className="w-12 h-12 bg-[#FF3D00]/10 flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-[#FF3D00]"></div>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Stays on Your Device</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Your typing data never leaves your computer. We only see the final score.
            </p>
          </div>
          <div className="p-8 border border-[var(--ui-border)] bg-[var(--surface)]">
            <div className="w-12 h-12 bg-[#FF3D00]/10 flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-[#FF3D00]"></div>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">Fully Encrypted</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Your data is locked and secure. Only you can see your personal reports.
            </p>
          </div>
          <div className="p-8 border border-[var(--ui-border)] bg-[var(--surface)]">
            <div className="w-12 h-12 bg-[#FF3D00]/10 flex items-center justify-center mb-6">
              <div className="w-2 h-2 bg-[#FF3D00]"></div>
            </div>
            <h3 className="text-xl font-bold uppercase mb-4">You're in Control</h3>
            <p className="mono text-xs opacity-50 leading-relaxed">
              Delete your data anytime with one click. We respect your right to be forgotten.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto border-b border-[var(--ui-border)]">
        <div className="text-center mb-20">
          <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">Plans</div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Choose Your Plan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[var(--ui-border)]">
          {/* Free Tier */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-[var(--ui-border)] hover:bg-[var(--surface-hover)] transition-colors flex flex-col">
            <div className="text-[10px] mono opacity-40 mb-4">STARTER</div>
            <h3 className="text-3xl font-bold uppercase mb-2">Free</h3>
            <div className="text-4xl font-bold mb-8">$0<span className="text-sm font-normal opacity-50">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Basic Tracking
              </li>
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> 7-Day History
              </li>
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Basic Reminders
              </li>
            </ul>
            <Button variant="outline" className="w-full">Get Started</Button>
          </div>

          {/* Pro Tier */}
          <div className="p-12 border-b md:border-b-0 md:border-r border-[var(--ui-border)] bg-[var(--surface)] relative flex flex-col">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF3D00]"></div>
            <div className="text-[10px] mono text-[#FF3D00] mb-4">PRO</div>
            <h3 className="text-3xl font-bold uppercase mb-2">Pro</h3>
            <div className="text-4xl font-bold mb-8">$12<span className="text-sm font-normal opacity-50">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-sm mono">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Advanced Insights
              </li>
              <li className="flex items-center gap-3 text-sm mono">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Unlimited History
              </li>
              <li className="flex items-center gap-3 text-sm mono">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Custom Reminders
              </li>
              <li className="flex items-center gap-3 text-sm mono">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Deep Work Analysis
              </li>
            </ul>
            <Button className="w-full">Upgrade Now</Button>
          </div>

          {/* Team Tier */}
          <div className="p-12 hover:bg-[var(--surface-hover)] transition-colors flex flex-col">
            <div className="text-[10px] mono opacity-40 mb-4">TEAM</div>
            <h3 className="text-3xl font-bold uppercase mb-2">Team</h3>
            <div className="text-4xl font-bold mb-8">$49<span className="text-sm font-normal opacity-50">/mo</span></div>
            <ul className="space-y-4 mb-12 flex-1">
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Team Dashboard
              </li>
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> Burnout Alerts
              </li>
              <li className="flex items-center gap-3 text-sm mono opacity-70">
                <span className="w-1 h-1 bg-[#FF3D00]"></span> API Access
              </li>
            </ul>
            <Button variant="outline" className="w-full">Contact Sales</Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-8 lg:px-20 max-w-[1600px] mx-auto">
        <div className="flex flex-col md:flex-row gap-20">
          <div className="md:w-1/3">
            <div className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-[0.3em] mb-4">Help</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-8">Common <br /> Questions</h2>
            <p className="text-lg mono opacity-50 leading-relaxed">
              Answers to common questions about how the app works.
            </p>
          </div>
          <div className="md:w-2/3 space-y-8">
            <div className="border-b border-[var(--ui-border)] pb-8">
              <h3 className="text-xl font-bold uppercase mb-4">Will it slow down my computer?</h3>
              <p className="mono text-xs opacity-50 leading-relaxed">
                No. The app is very lightweight and you won't even notice it running.
              </p>
            </div>
            <div className="border-b border-[var(--ui-border)] pb-8">
              <h3 className="text-xl font-bold uppercase mb-4">Do you read what I type?</h3>
              <p className="mono text-xs opacity-50 leading-relaxed">
                Never. We only count how fast you type, not what you type. Your passwords and messages are safe.
              </p>
            </div>
            <div className="border-b border-[var(--ui-border)] pb-8">
              <h3 className="text-xl font-bold uppercase mb-4">Do I need a headset?</h3>
              <p className="mono text-xs opacity-50 leading-relaxed">
                No. The app works with just your keyboard and mouse.
              </p>
            </div>
            <div className="pb-8">
              <h3 className="text-xl font-bold uppercase mb-4">Can I export my data?</h3>
              <p className="mono text-xs opacity-50 leading-relaxed">
                Yes. All metrics are available in JSON/CSV format via the dashboard or API for Pro users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 lg:px-20 max-w-[1600px] mx-auto border-t border-[var(--ui-border)] bg-[var(--surface)]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-4 h-4 bg-[#FF3D00] rounded-sm"></div>
              <span className="text-xs font-bold tracking-widest uppercase mono">
                NeuroFeedback<span className="text-[#FF3D00]">.OS</span>
              </span>
            </div>
            <p className="mono text-[10px] opacity-40 leading-relaxed max-w-xs">
              Work smarter. Stay focused.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-widest mb-6">Product</h4>
            <ul className="space-y-3 text-xs mono opacity-60">
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-widest mb-6">Company</h4>
            <ul className="space-y-3 text-xs mono opacity-60">
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Manifesto</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] mono text-[#FF3D00] font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-3 text-xs mono opacity-60">
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#FF3D00] transition-colors">DPA</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[var(--ui-border)] text-[10px] mono opacity-30 uppercase tracking-widest">
          <div>© 2025 NeuroFeedback Systems Inc.</div>
          <div className="mt-4 md:mt-0">New York, NY</div>
        </div>
      </footer>
    </div>
  );
}

