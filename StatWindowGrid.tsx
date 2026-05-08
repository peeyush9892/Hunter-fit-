'use client';
import React from 'react';
import { Weight, Ruler, Activity, Heart, TrendingDown, Dumbbell, Target } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const stats = [
  { id: 'stat-weight', icon: Weight, label: 'BODY WEIGHT', value: '84.2', unit: 'kg', change: '-2.8', changeType: 'positive', color: 'text-primary', borderColor: 'border-primary/20', bgColor: 'bg-primary/5' },
  { id: 'stat-height', icon: Ruler, label: 'HEIGHT', value: '183', unit: 'cm', change: null, changeType: 'neutral', color: 'text-foreground-muted', borderColor: 'border-border', bgColor: 'bg-background/30' },
  { id: 'stat-bmi', icon: Activity, label: 'BMI', value: '25.1', unit: '', change: '-0.8', changeType: 'positive', color: 'text-success', borderColor: 'border-success/20', bgColor: 'bg-success/5' },
  { id: 'stat-bf', icon: TrendingDown, label: 'BODY FAT', value: '16.4', unit: '%', change: '-1.2%', changeType: 'positive', color: 'text-warning', borderColor: 'border-warning/20', bgColor: 'bg-warning/5' },
  { id: 'stat-muscle', icon: Dumbbell, label: 'MUSCLE MASS', value: '68.8', unit: 'kg', change: '+1.4', changeType: 'positive', color: 'text-accent-bright', borderColor: 'border-accent/20', bgColor: 'bg-accent/5' },
  { id: 'stat-chest', icon: Target, label: 'CHEST', value: '108', unit: 'cm', change: '+3', changeType: 'positive', color: 'text-primary', borderColor: 'border-primary/20', bgColor: 'bg-primary/5' },
  { id: 'stat-waist', icon: Ruler, label: 'WAIST', value: '82', unit: 'cm', change: '-4', changeType: 'positive', color: 'text-success', borderColor: 'border-success/20', bgColor: 'bg-success/5' },
  { id: 'stat-hr', icon: Heart, label: 'RESTING HR', value: '58', unit: 'bpm', change: '-6', changeType: 'positive', color: 'text-danger', borderColor: 'border-danger/20', bgColor: 'bg-danger/5' },
];

export default function StatWindowGrid() {
  return (
    <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Activity size={16} className="text-primary" />
        <h3 className="font-display text-sm font-bold tracking-widest text-foreground">HUNTER STATS WINDOW</h3>
        <span className="ml-auto font-display text-xs text-foreground-muted tracking-widest">UPDATED TODAY</span>
      </div>
      <div className="neon-divider mb-4" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats?.map((stat) => {
          const Icon = stat?.icon;
          return (
            <div
              key={stat?.id}
              className={`stat-row-hover p-3 rounded-xl border ${stat?.borderColor} ${stat?.bgColor} transition-all duration-200`}
            >
              <div className="flex items-center gap-1.5 mb-2">
                <Icon size={12} className={stat?.color} />
                <span className={`font-display text-[10px] tracking-widest ${stat?.color}`}>{stat?.label}</span>
              </div>
              <div className="flex items-end gap-1">
                <span className={`font-mono-data text-xl font-bold leading-none ${stat?.color}`}>{stat?.value}</span>
                {stat?.unit && <span className="font-display text-xs text-foreground-muted mb-0.5">{stat?.unit}</span>}
              </div>
              {stat?.change && (
                <p className={`font-mono-data text-xs mt-1 ${stat?.changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
                  {stat?.changeType === 'positive' ? '▲' : '▼'} {stat?.change} vs start
                </p>
              )}
            </div>
          );
        })}
      </div>
      {/* BMI indicator */}
      <div className="mt-4 p-3 rounded-xl bg-background/40 border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display text-xs tracking-widest text-foreground-muted">BMI CLASSIFICATION</span>
          <span className="font-display text-xs text-success tracking-wider px-2 py-0.5 rounded bg-success/10 border border-success/30">NORMAL WEIGHT</span>
        </div>
        <div className="relative h-3 rounded-full overflow-hidden bg-background-elevated">
          <div className="absolute inset-0 flex">
            <div className="flex-1 bg-primary/40" />
            <div className="flex-1 bg-success/50" />
            <div className="flex-1 bg-warning/50" />
            <div className="flex-1 bg-danger/50" />
          </div>
          {/* Indicator needle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-glow-primary"
            style={{ left: '38%' }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {['UNDER', 'NORMAL', 'OVER', 'OBESE']?.map(label => (
            <span key={`bmi-label-${label}`} className="font-display text-[9px] text-foreground-subtle tracking-wider">{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}