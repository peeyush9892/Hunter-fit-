'use client';
import React, { useState } from 'react';
import RankBadge from '@/components/ui/RankBadge';
import XPBar from '@/components/ui/XPBar';
import { Edit2, Share2, Shield, Zap, Flame, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


export default function ProfileHeroHeader() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl card-glass-glow p-6">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 opacity-5"
          style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-60 h-40 opacity-5"
          style={{ background: 'radial-gradient(ellipse, var(--accent) 0%, transparent 70%)' }} />
        {/* Scan line */}
        <div className="absolute inset-x-0 h-12 opacity-20 scan-line" />
      </div>
      {/* Corner decorations */}
      <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50" />
      <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50" />
      <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50" />
      <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/50" />
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          {/* Avatar + rank */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl gradient-hunter flex items-center justify-center rank-badge-glow-c border border-border-glow">
              <span className="font-display text-4xl font-black text-white">K</span>
            </div>
            <div className="absolute -bottom-2 -right-2">
              <RankBadge rank="C" size="md" />
            </div>
          </div>

          {/* Identity info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="font-display text-3xl font-black text-foreground">
                KAI <span className="text-primary text-glow-primary">BLACKWOOD</span>
              </h2>
              <span className="px-2 py-0.5 rounded text-xs font-display tracking-wider bg-success/10 text-success border border-success/30">
                ACTIVE HUNTER
              </span>
            </div>
            <p className="text-sm text-foreground-muted font-sans mb-3">
              Muscle Gain Protocol · Intermediate · Member since Jan 2026
            </p>

            <div className="flex flex-wrap gap-4 mb-4">
              {[
                { key: 'prof-level', icon: Zap, label: 'Level', value: '24', color: 'text-primary' },
                { key: 'prof-streak', icon: Flame, label: 'Streak', value: '23 days', color: 'text-warning' },
                { key: 'prof-workouts', icon: Shield, label: 'Workouts', value: '147', color: 'text-accent-bright' },
                { key: 'prof-joined', icon: Calendar, label: 'Days Active', value: '118', color: 'text-success' },
              ]?.map(stat => {
                const Icon = stat?.icon;
                return (
                  <div key={stat?.key} className="flex items-center gap-1.5">
                    <Icon size={13} className={stat?.color} />
                    <span className="text-xs text-foreground-muted font-sans">{stat?.label}:</span>
                    <span className={`font-mono-data text-sm font-bold ${stat?.color}`}>{stat?.value}</span>
                  </div>
                );
              })}
            </div>

            <XPBar currentXP={7840} maxXP={12500} level={24} height="md" />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => { setEditing(!editing); toast?.success('Profile edit mode activated.'); }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-ghost-glow text-sm"
            >
              <Edit2 size={14} />
              <span className="font-display tracking-wider text-xs hidden sm:inline">EDIT</span>
            </button>
            <button
              onClick={() => toast?.success('Profile link copied!', { icon: '🔗' })}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl btn-accent-glow text-sm"
            >
              <Share2 size={14} />
              <span className="font-display tracking-wider text-xs hidden sm:inline">SHARE</span>
            </button>
          </div>
        </div>

        {/* Bio / motto */}
        <div className="mt-5 p-3 rounded-xl bg-background/40 border border-border">
          <p className="text-sm text-foreground-muted font-sans italic">
            "I will become the strongest. No excuses. No rest days without reason. The System chose me — I will not disappoint it."
          </p>
        </div>
      </div>
    </div>
  );
}