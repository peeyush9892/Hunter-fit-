'use client';
import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const radarData = [
  { attribute: 'STRENGTH', value: 72, fullMark: 100 },
  { attribute: 'ENDURANCE', value: 58, fullMark: 100 },
  { attribute: 'AGILITY', value: 45, fullMark: 100 },
  { attribute: 'RECOVERY', value: 63, fullMark: 100 },
  { attribute: 'FLEXIBILITY', value: 38, fullMark: 100 },
  { attribute: 'POWER', value: 69, fullMark: 100 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="system-message-panel rounded-lg px-3 py-2 text-xs">
        <p className="font-display tracking-widest text-primary">{payload[0].payload.attribute}</p>
        <p className="font-mono-data text-foreground font-bold">{payload[0].value} / 100</p>
      </div>
    );
  }
  return null;
};

export default function FitnessRadarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis
          dataKey="attribute"
          tick={{ fill: 'var(--foreground-muted)', fontSize: 9, fontFamily: 'var(--font-display)', letterSpacing: '0.08em' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Radar
          name="Stats"
          dataKey="value"
          stroke="var(--primary)"
          fill="var(--primary)"
          fillOpacity={0.15}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}