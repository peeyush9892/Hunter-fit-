import React from 'react';
import AppLayout from '@/components/AppLayout';
import DashboardHeroCard from './components/DashboardHeroCard';
import DailyMissionsPanel from './components/DailyMissionsPanel';
import TrackersRow from './components/TrackersRow';
import TodaysWorkoutCard from './components/TodaysWorkoutCard';
import ActivityChartSection from './components/ActivityChartSection';
import SystemMessageController from './components/SystemMessageController';

export default function DashboardPage() {
  return (
    <AppLayout activeRoute="/">
      <SystemMessageController />
      <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 space-y-6 max-w-screen-2xl w-full">
        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-display text-xs text-foreground-muted tracking-widest mb-1">
              SYSTEM — MAY 8, 2026 · 10:07 AM
            </p>
            <h1 className="font-display text-2xl font-bold text-foreground">
              COMMAND <span className="text-primary text-glow-primary">CENTER</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-success pulse-glow" />
            <span className="font-display text-xs text-success tracking-widest">SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Hero rank card */}
        <DashboardHeroCard />

        {/* Daily missions + trackers row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <DailyMissionsPanel />
          </div>
          <div className="lg:col-span-2">
            <TrackersRow />
          </div>
        </div>

        {/* Workout + Activity chart */}
        <div className="grid grid-cols-1 xl:grid-cols-5 2xl:grid-cols-5 gap-6">
          <div className="xl:col-span-2">
            <TodaysWorkoutCard />
          </div>
          <div className="xl:col-span-3">
            <ActivityChartSection />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
