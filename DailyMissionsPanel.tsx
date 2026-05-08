'use client';
import React, { useState } from 'react';
import { CheckCircle2, Circle, Zap, Target, Dumbbell, Droplets, Moon, Flame, Lock } from 'lucide-react';
import { toast } from 'sonner';
import Icon from '@/components/ui/AppIcon';


interface Mission {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  xp: number;
  completed: boolean;
  locked: boolean;
  category: 'workout' | 'nutrition' | 'recovery' | 'bonus';
  progress?: { current: number; total: number; unit: string };
}

const initialMissions: Mission[] = [
  { id: 'mission-001', icon: Dumbbell, title: 'Complete Push Day Workout', description: 'Chest, shoulders, and triceps training session', xp: 150, completed: true, locked: false, category: 'workout' },
  { id: 'mission-002', icon: Flame, title: 'Hit 2,800 Calorie Target', description: 'Reach your daily caloric intake goal', xp: 80, completed: true, locked: false, category: 'nutrition', progress: { current: 2340, total: 2800, unit: 'kcal' } },
  { id: 'mission-003', icon: Droplets, title: 'Drink 3.5L of Water', description: 'Stay hydrated throughout the day', xp: 50, completed: false, locked: false, category: 'recovery', progress: { current: 2.1, total: 3.5, unit: 'L' } },
  { id: 'mission-004', icon: Target, title: 'Log Morning Bodyweight', description: 'Record your weight for progress tracking', xp: 30, completed: false, locked: false, category: 'nutrition' },
  { id: 'mission-005', icon: Moon, title: 'Log 7+ Hours of Sleep', description: 'Recovery is as important as training', xp: 60, completed: false, locked: false, category: 'recovery' },
  { id: 'mission-006', icon: Zap, title: 'BONUS: 1000 Rep Challenge', description: 'Complete 1000 total reps across any exercises', xp: 300, completed: false, locked: true, category: 'bonus' },
];

const categoryColors = {
  workout: 'text-primary border-primary/30 bg-primary/5',
  nutrition: 'text-warning border-warning/30 bg-warning/5',
  recovery: 'text-success border-success/30 bg-success/5',
  bonus: 'text-accent-bright border-accent/30 bg-accent/5',
};

export default function DailyMissionsPanel() {
  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  const completedCount = missions.filter(m => m.completed).length;
  const totalXP = missions.filter(m => m.completed).reduce((sum, m) => sum + m.xp, 0);

  const toggleMission = (id: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id && !m.locked) {
        const newCompleted = !m.completed;
        if (newCompleted) {
          toast.success(`+${m.xp} XP — ${m.title}`, {
            icon: '⚡',
            description: 'Quest objective completed.',
          });
        }
        return { ...m, completed: newCompleted };
      }
      return m;
    }));
  };

  return (
    <div className="card-glass rounded-2xl p-5 h-full border border-border hover:border-border-glow transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <Target size={16} className="text-primary" />
            <h3 className="font-display text-sm font-bold tracking-widest text-foreground">DAILY MISSIONS</h3>
          </div>
          <p className="text-xs text-foreground-muted font-sans">
            {completedCount}/{missions.length} completed ·{' '}
            <span className="text-primary font-bold font-mono-data">{totalXP} XP</span> earned
          </p>
        </div>
        <div className="text-right">
          <p className="font-display text-xs text-foreground-muted tracking-widest">RESETS IN</p>
          <p className="font-mono-data text-sm text-warning">13:52:08</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track h-2 mb-5">
        <div
          className="xp-bar h-full rounded-full transition-all duration-700"
          style={{ width: `${(completedCount / missions.length) * 100}%` }}
        />
      </div>

      {/* Missions list */}
      <div className="space-y-2">
        {missions.map((mission) => {
          const Icon = mission.icon;
          return (
            <button
              key={mission.id}
              onClick={() => toggleMission(mission.id)}
              disabled={mission.locked}
              className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 group ${
                mission.completed
                  ? 'bg-success/5 border-success/20 opacity-80'
                  : mission.locked
                  ? 'bg-background/30 border-border opacity-50 cursor-not-allowed' :'bg-background/40 border-border hover:border-border-glow hover:bg-primary/5 cursor-pointer'
              }`}
            >
              {/* Checkbox */}
              <div className="flex-shrink-0 mt-0.5">
                {mission.completed ? (
                  <CheckCircle2 size={18} className="text-success drop-shadow-[0_0_4px_var(--success)]" />
                ) : mission.locked ? (
                  <Lock size={18} className="text-foreground-subtle" />
                ) : (
                  <Circle size={18} className="text-foreground-subtle group-hover:text-primary transition-colors" />
                )}
              </div>

              {/* Icon */}
              <div className={`flex-shrink-0 p-1.5 rounded-lg border ${categoryColors[mission.category]}`}>
                <Icon size={14} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className={`font-display text-xs font-bold tracking-wide ${mission.completed ? 'text-foreground-muted line-through' : 'text-foreground'}`}>
                    {mission.title}
                  </p>
                  {mission.category === 'bonus' && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-display tracking-wider bg-accent/20 text-accent-bright border border-accent/30">
                      BONUS
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground-muted mt-0.5 font-sans">{mission.description}</p>
                {mission.progress && !mission.completed && (
                  <div className="mt-1.5">
                    <div className="flex justify-between mb-1">
                      <span className="font-mono-data text-xs text-foreground-muted">
                        {mission.progress.current} / {mission.progress.total} {mission.progress.unit}
                      </span>
                      <span className="font-mono-data text-xs text-primary">
                        {Math.round((mission.progress.current / mission.progress.total) * 100)}%
                      </span>
                    </div>
                    <div className="progress-track h-1">
                      <div
                        className="xp-bar h-full rounded-full"
                        style={{ width: `${(mission.progress.current / mission.progress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* XP badge */}
              <div className="flex-shrink-0 text-right">
                <span className={`font-display text-xs font-bold ${mission.completed ? 'text-success' : 'text-primary'}`}>
                  +{mission.xp}
                </span>
                <p className="font-display text-[9px] text-foreground-muted tracking-widest">XP</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}