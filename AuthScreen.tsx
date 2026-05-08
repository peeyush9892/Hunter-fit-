'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ParticleField from './ParticleField';
import AppLogo from '@/components/ui/AppLogo';
import { Shield, Zap, TrendingUp, Target } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex">
      {/* Particle background */}
      <ParticleField />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-8"
          style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
      </div>

      {/* Grid bg */}
      <div className="fixed inset-0 hunter-grid-bg bg-hunter-grid bg-hunter-grid opacity-40 z-0 pointer-events-none" />

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between p-12 relative z-10">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <AppLogo size={44} />
          <span className="font-display text-xl font-bold text-primary text-glow-primary tracking-widest">HUNTERFIT</span>
        </div>

        {/* Hero content */}
        <div className="max-w-lg">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="font-display text-xs text-primary tracking-widest">SYSTEM INITIALIZED</span>
          </div>
          <h1 className="font-display text-5xl xl:text-6xl font-black text-foreground leading-tight mb-6">
            ARISE,<br />
            <span className="text-primary text-glow-primary">HUNTER.</span>
          </h1>
          <p className="text-lg text-foreground-muted font-sans leading-relaxed mb-8">
            The System has detected your potential. Your journey from E-Rank to S-Rank begins with a single rep. Every workout earns XP. Every mission builds power.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: 'feat-rank', icon: Shield, label: 'RANK PROGRESSION', desc: 'E-Rank to S-Rank system' },
              { key: 'feat-xp', icon: Zap, label: 'XP & LEVEL UP', desc: 'Every rep earns power' },
              { key: 'feat-missions', icon: Target, label: 'DAILY MISSIONS', desc: 'Complete quests daily' },
              { key: 'feat-stats', icon: TrendingUp, label: 'STAT TRACKING', desc: 'Monitor your growth' },
            ].map(feat => {
              const Icon = feat.icon;
              return (
                <div key={feat.key} className="flex items-start gap-3 p-3 rounded-xl card-glass border border-border">
                  <div className="p-2 rounded-lg bg-primary/10 border border-border-glow">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-display text-xs font-bold tracking-wider text-foreground">{feat.label}</p>
                    <p className="text-xs text-foreground-muted font-sans">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rank progression display */}
        <div className="flex items-center gap-3">
          <span className="font-display text-xs text-foreground-muted tracking-widest">RANK PATH:</span>
          {(['E', 'D', 'C', 'B', 'A', 'S'] as const).map((rank, i) => (
            <React.Fragment key={`rank-path-${rank}`}>
              <div className={`w-7 h-7 rounded-md flex items-center justify-center font-display text-xs font-black text-white
                ${rank === 'E' ? 'gradient-rank-e rank-badge-glow-e' :
                  rank === 'D' ? 'gradient-rank-d rank-badge-glow-d' :
                  rank === 'C' ? 'gradient-rank-c rank-badge-glow-c' :
                  rank === 'B' ? 'gradient-rank-b rank-badge-glow-b' :
                  rank === 'A'? 'gradient-rank-a rank-badge-glow-a' : 'gradient-rank-s rank-badge-glow-s'}`}>
                {rank}
              </div>
              {i < 5 && <div className="w-4 h-0.5 bg-border" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right panel — auth form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
            <AppLogo size={40} />
            <span className="font-display text-lg font-bold text-primary text-glow-primary tracking-widest">HUNTERFIT</span>
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-xl border border-border overflow-hidden mb-6 card-glass">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 font-display text-xs tracking-widest transition-all duration-200 ${
                mode === 'login' ?'bg-primary/15 text-primary border-r border-border-glow' :'text-foreground-muted hover:text-foreground border-r border-border'
              }`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-3 font-display text-xs tracking-widest transition-all duration-200 ${
                mode === 'signup' ?'bg-primary/15 text-primary' :'text-foreground-muted hover:text-foreground'
              }`}
            >
              CREATE HUNTER
            </button>
          </div>

          {mode === 'login' ? (
            <LoginForm onSwitchToSignup={() => setMode('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setMode('login')} />
          )}
        </div>
      </div>
    </div>
  );
}