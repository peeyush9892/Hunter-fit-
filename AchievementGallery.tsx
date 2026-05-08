'use client';
import React, { useState } from 'react';
import { Trophy, Flame, Zap, Shield, Dumbbell, Target, Star, Award, TrendingUp, Moon, Droplets, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


interface Achievement {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  unlocked: boolean;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedDate?: string;
}

const achievements: Achievement[] = [
  { id: 'ach-001', icon: Flame, title: 'First Spark', description: 'Complete your first workout', unlocked: true, xp: 50, rarity: 'common', unlockedDate: 'Jan 12' },
  { id: 'ach-002', icon: Zap, title: 'Week Warrior', description: '7-day workout streak', unlocked: true, xp: 150, rarity: 'common', unlockedDate: 'Jan 20' },
  { id: 'ach-003', icon: Shield, title: 'Iron Will', description: 'Complete 50 workouts', unlocked: true, xp: 300, rarity: 'rare', unlockedDate: 'Mar 4' },
  { id: 'ach-004', icon: Dumbbell, title: 'Century Club', description: 'Complete 100 workouts', unlocked: true, xp: 500, rarity: 'epic', unlockedDate: 'Apr 28' },
  { id: 'ach-005', icon: Target, title: 'Calorie King', description: 'Hit calorie target 30 days in a row', unlocked: true, xp: 200, rarity: 'rare', unlockedDate: 'Apr 2' },
  { id: 'ach-006', icon: Moon, title: 'Recovery Master', description: 'Log 8+ hours of sleep for 14 days', unlocked: true, xp: 150, rarity: 'common', unlockedDate: 'Mar 18' },
  { id: 'ach-007', icon: Droplets, title: 'Hydration Hero', description: 'Hit water goal 21 days straight', unlocked: false, xp: 175, rarity: 'rare' },
  { id: 'ach-008', icon: TrendingUp, title: 'Power Surge', description: 'Gain 5kg of muscle mass', unlocked: false, xp: 400, rarity: 'epic' },
  { id: 'ach-009', icon: Star, title: 'Rank Up: B', description: 'Reach B-Rank hunter status', unlocked: false, xp: 750, rarity: 'epic' },
  { id: 'ach-010', icon: Trophy, title: 'Legend Status', description: 'Reach S-Rank hunter status', unlocked: false, xp: 2000, rarity: 'legendary' },
  { id: 'ach-011', icon: Calendar, title: 'Consistent Soldier', description: '30-day active streak', unlocked: false, xp: 350, rarity: 'rare' },
  { id: 'ach-012', icon: Award, title: 'Shadow Monarch', description: 'Complete all S-Rank challenges', unlocked: false, xp: 5000, rarity: 'legendary' },
];

const rarityConfig = {
  common: { label: 'COMMON', color: 'text-foreground-muted', border: 'border-border', bg: 'bg-background/40', glow: '' },
  rare: { label: 'RARE', color: 'text-primary', border: 'border-primary/30', bg: 'bg-primary/5', glow: 'shadow-glow-primary' },
  epic: { label: 'EPIC', color: 'text-accent-bright', border: 'border-accent/30', bg: 'bg-accent/5', glow: 'shadow-glow-accent' },
  legendary: { label: 'LEGENDARY', color: 'text-warning', border: 'border-warning/40', bg: 'bg-warning/5', glow: 'shadow-glow-accent' },
};

export default function AchievementGallery() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const filtered = achievements.filter(a =>
    filter === 'all' ? true : filter === 'unlocked' ? a.unlocked : !a.unlocked
  );

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-warning" />
          <h3 className="font-display text-sm font-bold tracking-widest text-foreground">ACHIEVEMENTS</h3>
        </div>
        <span className="font-display text-xs text-warning tracking-widest">
          {unlockedCount}/{achievements.length} UNLOCKED
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {(['all', 'unlocked', 'locked'] as const).map(f => (
          <button
            key={`ach-filter-${f}`}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg font-display text-xs tracking-widest transition-all duration-200 ${
              filter === f
                ? 'bg-primary/15 text-primary border border-border-glow' :'text-foreground-muted hover:text-foreground border border-border'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Achievement grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {filtered.map(achievement => {
          const Icon = achievement.icon;
          const rarity = rarityConfig[achievement.rarity];
          return (
            <button
              key={achievement.id}
              onClick={() => achievement.unlocked && toast.success(achievement.title, { description: achievement.description, icon: '🏆' })}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 group ${
                achievement.unlocked
                  ? `${rarity.border} ${rarity.bg} hover:scale-105`
                  : 'border-border bg-background/20 opacity-40 cursor-default'
              }`}
              title={achievement.unlocked ? `${achievement.title} — ${achievement.description}` : `Locked: ${achievement.description}`}
            >
              <div className={`p-2 rounded-lg ${achievement.unlocked ? `${rarity.bg} ${rarity.glow}` : 'bg-background-elevated'}`}>
                <Icon size={18} className={achievement.unlocked ? rarity.color : 'text-foreground-subtle'} />
              </div>
              <div className="text-center">
                <p className={`font-display text-[10px] font-bold tracking-wide leading-tight ${achievement.unlocked ? 'text-foreground' : 'text-foreground-subtle'}`}>
                  {achievement.title}
                </p>
                {achievement.unlocked && (
                  <p className={`font-display text-[9px] tracking-widest mt-0.5 ${rarity.color}`}>{rarity.label}</p>
                )}
                <p className={`font-mono-data text-[10px] mt-0.5 ${achievement.unlocked ? 'text-primary' : 'text-foreground-subtle'}`}>
                  +{achievement.xp} XP
                </p>
              </div>
              {achievement.unlockedDate && (
                <p className="font-display text-[9px] text-foreground-subtle tracking-wider">{achievement.unlockedDate}</p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}