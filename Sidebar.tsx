'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { LayoutDashboard, User, Dumbbell, Target, Flame, ChevronLeft, ChevronRight, LogOut, Settings, Trophy, Brain } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface SidebarProps {
  activeRoute?: string;
}

const navItems = [
  { key: 'nav-dashboard', label: 'DASHBOARD', icon: LayoutDashboard, href: '/' },
  { key: 'nav-profile', label: 'HUNTER PROFILE', icon: User, href: '/profile-screen' },
  { key: 'nav-workouts', label: 'WORKOUT TRACKER', icon: Dumbbell, href: '/workout-tracker' },
  { key: 'nav-ai-planner', label: 'AI PLANNER', icon: Brain, href: '/ai-planner' },
  { key: 'nav-missions', label: 'DAILY MISSIONS', icon: Target, href: '#' },
  { key: 'nav-achievements', label: 'ACHIEVEMENTS', icon: Trophy, href: '#' },
  { key: 'nav-nutrition', label: 'NUTRITION', icon: Flame, href: '#' },
];

export default function Sidebar({ activeRoute }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="fixed left-0 top-0 h-full z-40 hidden lg:flex flex-col card-glass border-r border-border-glow transition-all duration-300 ease-in-out"
      style={{ width: collapsed ? '72px' : '256px' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <AppLogo size={36} />
        {!collapsed && (
          <span className="font-display text-primary text-glow-primary text-sm font-bold tracking-widest truncate">
            HUNTERFIT
          </span>
        )}
      </div>

      {/* Hunter rank mini card */}
      {!collapsed && (
        <div className="mx-3 mt-4 mb-2 p-3 rounded-lg card-glass-glow">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-md gradient-rank-c flex items-center justify-center rank-badge-glow-c">
              <span className="font-display text-xs font-bold text-white">C</span>
            </div>
            <div>
              <p className="font-display text-xs text-primary tracking-widest">RANK C HUNTER</p>
              <p className="text-xs text-foreground-muted font-mono-data">LVL 24 · 7,840 XP</p>
            </div>
          </div>
          <div className="progress-track h-1.5 mt-2">
            <div className="xp-bar h-full rounded-full" style={{ width: '62%' }} />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-foreground-muted font-mono-data">7,840</span>
            <span className="text-xs text-foreground-muted font-mono-data">12,500</span>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-2 py-2 space-y-1 overflow-y-auto">
        <p className={`text-xs text-foreground-subtle font-display tracking-widest px-3 py-2 ${collapsed ? 'hidden' : ''}`}>
          NAVIGATION
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.href || (item.href === '/' && activeRoute === '/');
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-primary/10 border border-border-glow text-primary' :'text-foreground-muted hover:bg-primary/5 hover:text-foreground border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                size={18}
                className={`flex-shrink-0 transition-all duration-200 ${
                  isActive ? 'text-primary drop-shadow-[0_0_6px_var(--primary)]' : 'group-hover:text-primary'
                }`}
              />
              {!collapsed && (
                <span className="font-display text-xs tracking-widest truncate">{item.label}</span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary pulse-glow" />
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 rounded bg-background-elevated border border-border text-xs font-display tracking-wider text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-border px-2 py-3 space-y-1">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground-muted hover:bg-primary/5 hover:text-foreground transition-all duration-200 group"
          title={collapsed ? 'SETTINGS' : undefined}
        >
          <Settings size={18} className="flex-shrink-0 group-hover:text-primary transition-colors" />
          {!collapsed && <span className="font-display text-xs tracking-widest">SETTINGS</span>}
        </button>
        <Link
          href="/sign-up-login-screen"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-foreground-muted hover:bg-danger/10 hover:text-danger transition-all duration-200 group"
          title={collapsed ? 'LOGOUT' : undefined}
        >
          <LogOut size={18} className="flex-shrink-0 group-hover:text-danger transition-colors" />
          {!collapsed && <span className="font-display text-xs tracking-widest">LOGOUT</span>}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-background-elevated border border-border-glow flex items-center justify-center text-primary hover:bg-primary/20 transition-all duration-200 shadow-glow-primary"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}