'use client';
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, User, Dumbbell, Brain, Flame } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface MobileNavProps {
  activeRoute?: string;
}

const mobileNavItems = [
  { key: 'mob-dashboard', label: 'HOME', icon: LayoutDashboard, href: '/' },
  { key: 'mob-workouts', label: 'TRAIN', icon: Dumbbell, href: '/workout-tracker' },
  { key: 'mob-ai-planner', label: 'AI PLAN', icon: Brain, href: '/ai-planner' },
  { key: 'mob-nutrition', label: 'FUEL', icon: Flame, href: '#' },
  { key: 'mob-profile', label: 'PROFILE', icon: User, href: '/profile-screen' },
];

export default function MobileNav({ activeRoute }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden card-glass border-t border-border-glow">
      <div className="flex items-center justify-around px-2 py-2">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.href || (item.href === '/' && activeRoute === '/');
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isActive ? 'text-primary' : 'text-foreground-muted'
              }`}
            >
              <Icon
                size={20}
                className={isActive ? 'drop-shadow-[0_0_6px_var(--primary)]' : ''}
              />
              <span className={`font-display text-[9px] tracking-widest ${isActive ? 'text-primary' : 'text-foreground-subtle'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary pulse-glow mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}