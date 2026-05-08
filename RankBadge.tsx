import React from 'react';

type Rank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

interface RankBadgeProps {
  rank: Rank;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

const rankConfig: Record<Rank, { gradient: string; glow: string; textColor: string; label: string }> = {
  E: { gradient: 'gradient-rank-e', glow: 'rank-badge-glow-e', textColor: 'text-rank-e', label: 'E RANK' },
  D: { gradient: 'gradient-rank-d', glow: 'rank-badge-glow-d', textColor: 'text-rank-d', label: 'D RANK' },
  C: { gradient: 'gradient-rank-c', glow: 'rank-badge-glow-c', textColor: 'text-rank-c', label: 'C RANK' },
  B: { gradient: 'gradient-rank-b', glow: 'rank-badge-glow-b', textColor: 'text-rank-b', label: 'B RANK' },
  A: { gradient: 'gradient-rank-a', glow: 'rank-badge-glow-a', textColor: 'text-rank-a', label: 'A RANK' },
  S: { gradient: 'gradient-rank-s', glow: 'rank-badge-glow-s', textColor: 'text-rank-s', label: 'S RANK' },
};

const sizeConfig = {
  sm: { badge: 'w-6 h-6 text-xs', label: 'text-xs' },
  md: { badge: 'w-9 h-9 text-sm', label: 'text-sm' },
  lg: { badge: 'w-14 h-14 text-xl', label: 'text-base' },
  xl: { badge: 'w-20 h-20 text-3xl', label: 'text-lg' },
};

export default function RankBadge({ rank, size = 'md', showLabel = false }: RankBadgeProps) {
  const config = rankConfig[rank];
  const sizes = sizeConfig[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${sizes.badge} ${config.gradient} ${config.glow} rounded-lg flex items-center justify-center font-display font-black text-white transition-all duration-300 hover:scale-110`}
      >
        {rank}
      </div>
      {showLabel && (
        <span className={`font-display tracking-widest ${sizes.label} ${config.textColor}`}>
          {config.label}
        </span>
      )}
    </div>
  );
}