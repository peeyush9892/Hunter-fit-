'use client';
import React, { useEffect, useState } from 'react';

interface StatRingProps {
  value: number;
  max: number;
  label: string;
  sublabel?: string;
  color?: 'primary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: number;
}

const colorMap = {
  primary: { stroke: 'var(--primary)', glow: 'var(--primary-glow)', text: 'text-primary' },
  accent: { stroke: 'var(--accent-bright)', glow: 'var(--accent-glow)', text: 'text-accent-bright' },
  success: { stroke: 'var(--success)', glow: 'var(--success-glow)', text: 'text-success' },
  warning: { stroke: 'var(--warning)', glow: 'var(--warning-glow)', text: 'text-warning' },
  danger: { stroke: 'var(--danger)', glow: 'var(--danger-glow)', text: 'text-danger' },
};

export default function StatRing({ value, max, label, sublabel, color = 'primary', size = 88 }: StatRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const colors = colorMap[color];
  const percentage = (animatedValue / max) * 100;
  const radius = (size / 2) - 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 400);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 6px ${colors.glow})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono-data font-bold text-lg leading-none ${colors.text}`}>
            {Math.round(animatedValue)}
          </span>
          {sublabel && <span className="font-display text-[9px] text-foreground-muted tracking-wider mt-0.5">{sublabel}</span>}
        </div>
      </div>
      <span className="font-display text-xs text-foreground-muted tracking-widest text-center">{label}</span>
    </div>
  );
}