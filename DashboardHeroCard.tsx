'use client';
import React from 'react';
import RankBadge from '@/components/ui/RankBadge';
import XPBar from '@/components/ui/XPBar';
import { Flame, Zap, Calendar, TrendingUp, Shield } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  { key: 'stat-streak', icon: Flame, label: 'DAY STREAK', value: '23', color: 'text-warning', glow: 'shadow-glow-accent' },
  { key: 'stat-workouts', icon: Zap, label: 'WORKOUTS', value: '147', color: 'text-primary', glow: 'shadow-glow-primary' },
  { key: 'stat-this-week', icon: Calendar, label: 'THIS WEEK', value: '5/6', color: 'text-success', glow: 'shadow-glow-success' },
  { key: 'stat-power', icon: TrendingUp, label: 'POWER SCORE', value: '8,420', color: 'text-accent-bright', glow: 'shadow-glow-accent' },
];

export default function DashboardHeroCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl card-glass-glow p-6">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-5 pointer-events-none">
        <div className="w-full h-full rounded-full" style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
      </div>
      <div className="absolute bottom-0 left-1/2 w-96 h-32 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 70%)' }} />
      </div>
      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary/60" />
      <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary/60" />
      <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary/60" />
      <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary/60" />
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Rank badge + identity */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <RankBadge rank="C" size="xl" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-success border-2 border-background flex items-center justify-center">
                <Shield size={10} className="text-background" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-xs text-foreground-muted tracking-widest">HUNTER ID #00247</span>
                <span className="px-2 py-0.5 rounded text-xs font-display tracking-wider bg-primary/10 text-primary border border-border-glow">ACTIVE</span>
              </div>
              <h2 className="font-display text-2xl font-black text-foreground mb-0.5">
                KAI <span className="text-primary text-glow-primary">BLACKWOOD</span>
              </h2>
              <p className="text-sm text-foreground-muted font-sans">
                Muscle Gain · Intermediate · <span className="text-warning">23 Day Streak 🔥</span>
              </p>
            </div>
          </div>

          {/* XP bar section */}
          <div className="sm:ml-auto sm:w-64 xl:w-80">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-display text-xs text-foreground-muted tracking-widest">PROGRESS TO RANK B</span>
              <span className="font-display text-xs text-warning">62%</span>
            </div>
            <XPBar currentXP={7840} maxXP={12500} level={24} height="lg" />
            <p className="text-xs text-foreground-muted mt-2 font-sans">
              <span className="text-primary font-bold">4,660 XP</span> needed to reach B Rank
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="neon-divider my-5" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats?.map((stat) => {
            const Icon = stat?.icon;
            return (
              <div key={stat?.key} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border hover:border-border-glow transition-all duration-200">
                <div className={`p-2 rounded-lg bg-background-elevated`}>
                  <Icon size={16} className={stat?.color} />
                </div>
                <div>
                  <p className={`font-mono-data text-lg font-bold leading-none ${stat?.color}`}>{stat?.value}</p>
                  <p className="font-display text-[10px] text-foreground-muted tracking-wider mt-0.5">{stat?.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}