'use client';
import React, { useState } from 'react';
import { Dumbbell, Play, Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const exercises = [
  { id: 'ex-001', name: 'Bench Press', sets: 4, reps: '8-10', weight: '100kg', muscle: 'Chest', done: false },
  { id: 'ex-002', name: 'Incline DB Press', sets: 3, reps: '10-12', weight: '36kg', muscle: 'Upper Chest', done: false },
  { id: 'ex-003', name: 'Cable Fly', sets: 3, reps: '12-15', weight: '20kg', muscle: 'Chest', done: false },
  { id: 'ex-004', name: 'Overhead Press', sets: 4, reps: '8-10', weight: '70kg', muscle: 'Shoulders', done: false },
  { id: 'ex-005', name: 'Lateral Raises', sets: 3, reps: '15-20', weight: '14kg', muscle: 'Delts', done: false },
  { id: 'ex-006', name: 'Tricep Pushdown', sets: 3, reps: '12-15', weight: '35kg', muscle: 'Triceps', done: false },
];

export default function TodaysWorkoutCard() {
  const [expanded, setExpanded] = useState(true);
  const [exerciseList, setExerciseList] = useState(exercises);
  const [timerActive, setTimerActive] = useState(false);

  const doneCount = exerciseList.filter(e => e.done).length;

  const toggleExercise = (id: string) => {
    setExerciseList(prev => prev.map(e => {
      if (e.id === id) {
        if (!e.done) toast.success(`${e.name} complete!`, { icon: '💪', description: `+25 XP` });
        return { ...e, done: !e.done };
      }
      return e;
    }));
  };

  return (
    <div className="card-glass rounded-2xl border border-border hover:border-border-glow transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Dumbbell size={16} className="text-primary" />
            <h3 className="font-display text-sm font-bold tracking-widest text-foreground">TODAY'S WORKOUT</h3>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="text-foreground-muted hover:text-primary transition-colors">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-black text-foreground mb-1">PUSH DAY</p>
            <p className="text-xs text-foreground-muted font-sans">Chest · Shoulders · Triceps</p>
          </div>
          <div className="flex gap-2">
            <div className="text-center px-3 py-1.5 rounded-lg bg-background-elevated border border-border">
              <p className="font-mono-data text-sm font-bold text-primary">75</p>
              <p className="font-display text-[9px] text-foreground-muted tracking-wider">MIN</p>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-background-elevated border border-border">
              <p className="font-mono-data text-sm font-bold text-warning">650</p>
              <p className="font-display text-[9px] text-foreground-muted tracking-wider">KCAL</p>
            </div>
            <div className="text-center px-3 py-1.5 rounded-lg bg-background-elevated border border-border">
              <p className="font-mono-data text-sm font-bold text-accent-bright">150</p>
              <p className="font-display text-[9px] text-foreground-muted tracking-wider">XP</p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="font-display text-xs text-foreground-muted tracking-widest">{doneCount}/{exerciseList.length} EXERCISES</span>
            <span className="font-display text-xs text-primary">{Math.round((doneCount / exerciseList.length) * 100)}%</span>
          </div>
          <div className="progress-track h-1.5">
            <div className="xp-bar h-full rounded-full transition-all duration-500" style={{ width: `${(doneCount / exerciseList.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Exercise list */}
      {expanded && (
        <div className="divide-y divide-border">
          {exerciseList.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => toggleExercise(exercise.id)}
              className={`w-full text-left flex items-center gap-3 px-5 py-3 transition-all duration-200 group ${
                exercise.done ? 'bg-success/5' : 'hover:bg-primary/5'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                exercise.done ? 'border-success bg-success/20' : 'border-foreground-subtle group-hover:border-primary'
              }`}>
                {exercise.done && <CheckCircle2 size={12} className="text-success" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-display text-xs font-bold tracking-wide ${exercise.done ? 'text-foreground-muted line-through' : 'text-foreground'}`}>
                  {exercise.name}
                </p>
                <p className="text-xs text-foreground-muted font-sans">{exercise.muscle}</p>
              </div>
              <div className="flex gap-3 text-right flex-shrink-0">
                <div>
                  <p className="font-mono-data text-xs text-foreground">{exercise.sets}×{exercise.reps}</p>
                  <p className="font-display text-[9px] text-foreground-muted tracking-wider">SETS</p>
                </div>
                <div>
                  <p className="font-mono-data text-xs text-primary">{exercise.weight}</p>
                  <p className="font-display text-[9px] text-foreground-muted tracking-wider">LOAD</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Start button */}
      <div className="p-4 border-t border-border">
        <button
          onClick={() => {
            setTimerActive(!timerActive);
            toast.success(timerActive ? 'Workout paused.' : 'Workout started! Push your limits.', { icon: timerActive ? '⏸' : '🔥' });
          }}
          className={`w-full py-3 rounded-xl font-display text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-200 ${
            timerActive ? 'btn-accent-glow' : 'btn-primary-glow'
          }`}
        >
          {timerActive ? (
            <>
              <Clock size={16} className="animate-pulse" />
              WORKOUT IN PROGRESS
            </>
          ) : (
            <>
              <Play size={16} />
              START WORKOUT
            </>
          )}
        </button>
      </div>
    </div>
  );
}