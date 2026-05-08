'use client';
import React, { useEffect, useState } from 'react';
import { Zap, CheckCircle, TrendingUp, Star, Shield } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SystemMessageProps {
  type: 'quest-complete' | 'level-up' | 'rank-up' | 'streak' | 'xp-gain';
  title: string;
  description?: string;
  xpGain?: number;
  visible: boolean;
  onClose: () => void;
}

const typeConfig = {
  'quest-complete': { icon: CheckCircle, color: 'text-success', borderColor: 'border-success', glowClass: 'shadow-glow-success', bgColor: 'bg-success/5', label: 'QUEST COMPLETED' },
  'level-up': { icon: TrendingUp, color: 'text-primary', borderColor: 'border-primary', glowClass: 'shadow-glow-primary', bgColor: 'bg-primary/5', label: 'LEVEL UP' },
  'rank-up': { icon: Star, color: 'text-warning', borderColor: 'border-warning', glowClass: 'shadow-glow-accent', bgColor: 'bg-warning/5', label: 'RANK UP' },
  'streak': { icon: Zap, color: 'text-warning', borderColor: 'border-warning', glowClass: 'shadow-glow-accent', bgColor: 'bg-warning/5', label: 'STREAK BONUS' },
  'xp-gain': { icon: Shield, color: 'text-accent-bright', borderColor: 'border-accent', glowClass: 'shadow-glow-accent', bgColor: 'bg-accent/5', label: 'XP GAINED' },
};

export default function SystemMessage({ type, title, description, xpGain, visible, onClose }: SystemMessageProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-scale">
      <div className={`system-message-panel rounded-xl px-6 py-4 min-w-72 ${config.bgColor} ${config.glowClass}`}
        style={{ border: `1px solid`, borderColor: `var(--${type === 'level-up' ? 'primary' : type === 'quest-complete' ? 'success' : 'warning'})` }}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.bgColor}`}>
            <Icon size={20} className={config.color} />
          </div>
          <div>
            <p className={`font-display text-xs tracking-widest ${config.color} mb-0.5`}>{config.label}</p>
            <p className="font-display text-sm text-foreground font-bold">{title}</p>
            {description && <p className="text-xs text-foreground-muted mt-0.5 font-sans">{description}</p>}
          </div>
          {xpGain && (
            <div className="ml-auto text-right">
              <p className="font-display text-lg font-bold text-primary text-glow-primary">+{xpGain}</p>
              <p className="font-display text-xs text-foreground-muted tracking-widest">XP</p>
            </div>
          )}
        </div>
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          <div className="scan-line absolute inset-x-0 h-8 opacity-30" />
        </div>
      </div>
    </div>
  );
}