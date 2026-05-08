import React from 'react';

const rankSteps = [
  { id: 'rank-step-e', rank: 'E', label: 'E RANK', desc: 'Starting point', xp: '0', completed: true, date: 'Jan 12, 2026', gradient: 'gradient-rank-e', glow: 'rank-badge-glow-e', textColor: 'text-rank-e' },
  { id: 'rank-step-d', rank: 'D', label: 'D RANK', desc: 'Novice Hunter', xp: '2,500', completed: true, date: 'Feb 3, 2026', gradient: 'gradient-rank-d', glow: 'rank-badge-glow-d', textColor: 'text-rank-d' },
  { id: 'rank-step-c', rank: 'C', label: 'C RANK', desc: 'Intermediate Hunter', xp: '7,000', completed: true, date: 'Mar 28, 2026', gradient: 'gradient-rank-c', glow: 'rank-badge-glow-c', textColor: 'text-rank-c' },
  { id: 'rank-step-b', rank: 'B', label: 'B RANK', desc: 'Advanced Hunter', xp: '12,500', completed: false, date: null, gradient: 'gradient-rank-b', glow: 'rank-badge-glow-b', textColor: 'text-rank-b' },
  { id: 'rank-step-a', rank: 'A', label: 'A RANK', desc: 'Elite Hunter', xp: '25,000', completed: false, date: null, gradient: 'gradient-rank-a', glow: 'rank-badge-glow-a', textColor: 'text-rank-a' },
  { id: 'rank-step-s', rank: 'S', label: 'S RANK', desc: 'Shadow Monarch', xp: '50,000', completed: false, date: null, gradient: 'gradient-rank-s', glow: 'rank-badge-glow-s', textColor: 'text-rank-s' },
];

export default function RankProgressionTimeline() {
  return (
    <div className="card-glass rounded-2xl p-5 border border-border hover:border-border-glow transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-4 h-4 rounded gradient-rank-s rank-badge-glow-s flex items-center justify-center">
          <span className="font-display text-[8px] font-black text-white">S</span>
        </div>
        <h3 className="font-display text-sm font-bold tracking-widest text-foreground">RANK PROGRESSION</h3>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border" />
        <div className="absolute left-4 top-4 w-0.5 bg-gradient-to-b from-rank-c to-border" style={{ height: '45%' }} />

        <div className="space-y-4">
          {rankSteps?.map((step) => (
            <div key={step?.id} className="flex items-start gap-4 relative">
              {/* Rank badge */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${step?.gradient} ${step?.completed ? step?.glow : ''} flex items-center justify-center font-display text-xs font-black text-white z-10 transition-all duration-300 ${!step?.completed ? 'opacity-40' : ''}`}>
                {step?.rank}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-2 ${!step?.completed ? 'opacity-40' : ''}`}>
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <p className={`font-display text-xs font-bold tracking-wider ${step?.completed ? step?.textColor : 'text-foreground-muted'}`}>
                    {step?.label}
                  </p>
                  {step?.completed && step?.date && (
                    <span className="font-display text-[10px] text-foreground-subtle tracking-wider">{step?.date}</span>
                  )}
                  {!step?.completed && (
                    <span className="font-display text-[10px] text-foreground-subtle tracking-wider px-1.5 py-0.5 rounded bg-background-elevated border border-border">LOCKED</span>
                  )}
                </div>
                <p className="text-xs text-foreground-muted font-sans">{step?.desc}</p>
                <p className="font-mono-data text-[10px] text-foreground-subtle mt-0.5">{step?.xp} XP required</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Current progress indicator */}
      <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-border-glow">
        <div className="flex items-center justify-between mb-2">
          <span className="font-display text-xs text-primary tracking-widest">NEXT RANK: B</span>
          <span className="font-mono-data text-xs text-primary">62%</span>
        </div>
        <div className="progress-track h-2">
          <div className="xp-bar h-full rounded-full" style={{ width: '62%' }} />
        </div>
        <p className="font-display text-[10px] text-foreground-muted tracking-wider mt-1.5">
          4,660 XP remaining to B-Rank
        </p>
      </div>
    </div>
  );
}