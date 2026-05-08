'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp } from 'lucide-react';

const ActivityChart = dynamic(() => import('./ActivityChart'), { ssr: false });

export default function ActivityChartSection() {
  return (
    <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300 h-full">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          <h3 className="font-display text-sm font-bold tracking-widest text-foreground">7-DAY ACTIVITY</h3>
        </div>
        <div className="flex gap-3">
          {[
            { key: 'legend-xp', color: 'bg-primary', label: 'XP' },
            { key: 'legend-calories', color: 'bg-warning', label: 'KCAL' },
          ]?.map(item => (
            <div key={item?.key} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item?.color}`} />
              <span className="font-display text-xs text-foreground-muted tracking-wider">{item?.label}</span>
            </div>
          ))}
        </div>
      </div>
      <ActivityChart />
    </div>
  );
}