'use client';
import React from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'MON', xp: 320, calories: 2650, workouts: 1 },
  { day: 'TUE', xp: 0, calories: 2200, workouts: 0 },
  { day: 'WED', xp: 480, calories: 2900, workouts: 1 },
  { day: 'THU', xp: 150, calories: 2450, workouts: 1 },
  { day: 'FRI', xp: 620, calories: 3100, workouts: 1 },
  { day: 'SAT', xp: 280, calories: 2750, workouts: 1 },
  { day: 'SUN', xp: 390, calories: 2340, workouts: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="system-message-panel rounded-lg px-3 py-2 text-xs">
        <p className="font-display tracking-widest text-primary mb-1">{label}</p>
        {payload.map((entry: any, i: number) => (
          <p key={`tooltip-entry-${i}`} className="font-mono-data" style={{ color: entry.color }}>
            {entry.name === 'xp' ? 'XP' : 'KCAL'}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.9} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: 'var(--foreground-muted)', fontSize: 10, fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          yAxisId="xp"
          orientation="left"
          tick={{ fill: 'var(--foreground-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
          domain={[0, 800]}
        />
        <YAxis
          yAxisId="cal"
          orientation="right"
          tick={{ fill: 'var(--foreground-muted)', fontSize: 10, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
          domain={[1800, 3500]}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 212, 255, 0.05)' }} />
        <Bar
          yAxisId="xp"
          dataKey="xp"
          fill="url(#xpGradient)"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
        <Line
          yAxisId="cal"
          type="monotone"
          dataKey="calories"
          stroke="var(--warning)"
          strokeWidth={2}
          dot={{ fill: 'var(--warning)', r: 3, strokeWidth: 0 }}
          activeDot={{ r: 5, fill: 'var(--warning)', strokeWidth: 0 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}