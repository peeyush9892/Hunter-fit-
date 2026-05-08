'use client';
import React, { useState } from 'react';
import StatRing from '@/components/ui/StatRing';
import { Droplets, Moon, Flame, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

export default function TrackersRow() {
  const [water, setWater] = useState(2.1);
  const [sleep, setSleep] = useState(6.5);
  const [calories, setCalories] = useState(2340);

  const addWater = () => {
    const newVal = Math.min(water + 0.25, 3.5);
    setWater(newVal);
    if (newVal >= 3.5) {
      toast?.success('Hydration goal reached!', { icon: '💧', description: '+50 XP earned.' });
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Water tracker */}
      <div className="card-glass rounded-2xl p-4 border border-border hover:border-primary/30 transition-all duration-300 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Droplets size={14} className="text-primary" />
          <h4 className="font-display text-xs tracking-widest text-foreground-muted">WATER INTAKE</h4>
          {water < 2.5 && (
            <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-display bg-warning/10 text-warning border border-warning/30">LOW</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <StatRing value={water} max={3.5} label="WATER" sublabel="L" color="primary" size={80} />
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-2">
              <p className="font-mono-data text-2xl font-bold text-primary text-glow-primary">{water?.toFixed(1)}</p>
              <span className="font-display text-sm text-foreground-muted">/3.5L</span>
            </div>
            <p className="text-xs text-foreground-muted font-sans mb-3">
              {water < 3.5 ? `${(3.5 - water)?.toFixed(1)}L remaining` : 'Goal reached! 🎉'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={addWater}
                className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-lg btn-primary-glow text-xs"
              >
                <Plus size={12} />
                250ml
              </button>
              <button
                onClick={() => setWater(Math.max(0, water - 0.25))}
                className="p-1.5 rounded-lg btn-ghost-glow"
              >
                <Minus size={12} />
              </button>
            </div>
          </div>
        </div>
        {/* Water glasses visual */}
        <div className="flex gap-1 mt-3">
          {Array.from({ length: 14 })?.map((_, i) => (
            <div
              key={`water-glass-${i}`}
              className={`flex-1 h-2 rounded-sm transition-all duration-300 ${
                i < Math.floor(water / 0.25) ? 'bg-primary shadow-glow-primary' : 'bg-background-elevated border border-border'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Sleep tracker */}
      <div className="card-glass rounded-2xl p-4 border border-border hover:border-accent/30 transition-all duration-300 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Moon size={14} className="text-accent-bright" />
          <h4 className="font-display text-xs tracking-widest text-foreground-muted">LAST NIGHT'S SLEEP</h4>
          {sleep < 7 && (
            <span className="ml-auto px-1.5 py-0.5 rounded text-[9px] font-display bg-danger/10 text-danger border border-danger/30">POOR</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <StatRing value={sleep} max={9} label="SLEEP" sublabel="hrs" color="accent" size={80} />
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <p className="font-mono-data text-2xl font-bold text-accent-bright">{sleep}</p>
              <span className="font-display text-sm text-foreground-muted">/ 8 hrs</span>
            </div>
            <p className={`text-xs font-sans mb-2 ${sleep < 7 ? 'text-danger' : 'text-success'}`}>
              {sleep < 7 ? '⚠ Recovery compromised' : '✓ Good recovery'}
            </p>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-foreground-muted font-display tracking-wider">BED</span>
                <span className="font-mono-data text-foreground">11:30 PM</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-foreground-muted font-display tracking-wider">WAKE</span>
                <span className="font-mono-data text-foreground">6:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Calories */}
      <div className="card-glass rounded-2xl p-4 border border-border hover:border-warning/30 transition-all duration-300 flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Flame size={14} className="text-warning" />
          <h4 className="font-display text-xs tracking-widest text-foreground-muted">CALORIES TODAY</h4>
        </div>
        <div className="flex items-center gap-4">
          <StatRing value={calories} max={2800} label="KCAL" color="warning" size={80} />
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <p className="font-mono-data text-xl font-bold text-warning">{calories?.toLocaleString()}</p>
              <span className="font-display text-xs text-foreground-muted">kcal</span>
            </div>
            <p className="text-xs text-foreground-muted font-sans mb-2">Target: 2,800 kcal</p>
            <div className="grid grid-cols-3 gap-1">
              {[
                { label: 'PROTEIN', value: '182g', color: 'text-primary' },
                { label: 'CARBS', value: '290g', color: 'text-warning' },
                { label: 'FAT', value: '78g', color: 'text-accent-bright' },
              ]?.map((macro) => (
                <div key={`macro-${macro?.label}`} className="text-center">
                  <p className={`font-mono-data text-xs font-bold ${macro?.color}`}>{macro?.value}</p>
                  <p className="font-display text-[9px] text-foreground-muted tracking-wider">{macro?.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}