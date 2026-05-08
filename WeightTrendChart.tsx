'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const weightData = [
  { date: 'Apr 8', weight: 87.0 },
  { date: 'Apr 11', weight: 86.5 },
  { date: 'Apr 14', weight: 86.8 },
  { date: 'Apr 17', weight: 86.1 },
  { date: 'Apr 20', weight: 85.7 },
  { date: 'Apr 23', weight: 85.4 },
  { date: 'Apr 26', weight: 85.9 },
  { date: 'Apr 29', weight: 85.2 },
  { date: 'May 2', weight: 84.8 },
  { date: 'May 5', weight: 84.5 },
  { date: 'May 8', weight: 84.2 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="system-message-panel rounded-lg px-3 py-2 text-xs">
        <p className="font-display tracking-widest text-foreground-muted mb-1">{label}</p>
        <p className="font-mono-data text-primary font-bold">{payload[0].value} kg</p>
      </div>
    );
  }
  return null;
};

export default function WeightTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={weightData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
        <defs>
          <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tick={{ fill: 'var(--foreground-muted)', fontSize: 9, fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
          axisLine={false}
          tickLine={false}
          interval={2}
        />
        <YAxis
          domain={[83, 88]}
          tick={{ fill: 'var(--foreground-muted)', fontSize: 9, fontFamily: 'var(--font-mono)' }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={84.2} stroke="var(--success)" strokeDasharray="4 4" strokeOpacity={0.5} />
        <Area
          type="monotone"
          dataKey="weight"
          stroke="var(--primary)"
          strokeWidth={2}
          fill="url(#weightGradient)"
          dot={false}
          activeDot={{ r: 4, fill: 'var(--primary)', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}