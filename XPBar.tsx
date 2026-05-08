'use client';
import React, { useEffect, useState } from 'react';

interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  animated?: boolean;
  showNumbers?: boolean;
  height?: 'sm' | 'md' | 'lg';
}

const heightMap = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

export default function XPBar({ currentXP, maxXP, level, animated = true, showNumbers = true, height = 'md' }: XPBarProps) {
  const [displayWidth, setDisplayWidth] = useState(animated ? 0 : (currentXP / maxXP) * 100);
  const targetWidth = (currentXP / maxXP) * 100;

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setDisplayWidth(targetWidth), 300);
      return () => clearTimeout(timer);
    }
  }, [animated, targetWidth]);

  return (
    <div className="w-full">
      {showNumbers && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="font-display text-xs text-foreground-muted tracking-widest">
            LVL <span className="text-primary text-glow-primary">{level}</span>
          </span>
          <span className="font-mono-data text-xs text-foreground-muted">
            <span className="text-primary">{currentXP.toLocaleString()}</span>
            <span className="text-foreground-subtle"> / {maxXP.toLocaleString()} XP</span>
          </span>
        </div>
      )}
      <div className={`progress-track ${heightMap[height]} w-full relative overflow-hidden`}>
        <div
          className="xp-bar h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${displayWidth}%` }}
        >
          {height === 'lg' && (
            <div className="absolute inset-0 bg-white/20 rounded-full" style={{ width: '30%', left: '10%', filter: 'blur(4px)' }} />
          )}
        </div>
      </div>
    </div>
  );
}