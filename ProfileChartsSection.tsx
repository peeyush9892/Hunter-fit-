'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { TrendingUp, Zap } from 'lucide-react';

const WeightTrendChart = dynamic(() => import('./WeightTrendChart'), { ssr: false });
const FitnessRadarChart = dynamic(() => import('./FitnessRadarChart'), { ssr: false });

export default function ProfileChartsSection() {
  return (
    <div className="space-y-4">
      {/* Weight trend */}
      <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-primary" />
          <h3 className="font-display text-sm font-bold tracking-widest text-foreground">WEIGHT TREND</h3>
          <span className="ml-auto font-display text-xs text-success tracking-wider">-2.8kg</span>
        </div>
        <WeightTrendChart />
      </div>

      {/* Fitness radar */}
      <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={16} className="text-accent-bright" />
          <h3 className="font-display text-sm font-bold tracking-widest text-foreground">ATTRIBUTE STATS</h3>
        </div>
        <FitnessRadarChart />
      </div>
    </div>
  );
}