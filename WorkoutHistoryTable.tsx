'use client';
import React, { useState } from 'react';
import { Dumbbell, ChevronUp, ChevronDown, Search } from 'lucide-react';

interface WorkoutSession {
  id: string;
  date: string;
  name: string;
  type: string;
  duration: number;
  exercises: number;
  totalVolume: string;
  caloriesBurned: number;
  xpEarned: number;
  status: 'completed' | 'partial' | 'skipped';
}

const workoutHistory: WorkoutSession[] = [
  { id: 'ws-001', date: 'May 8', name: 'Push Day A', type: 'Chest/Shoulders/Triceps', duration: 72, exercises: 6, totalVolume: '12,400kg', caloriesBurned: 640, xpEarned: 150, status: 'completed' },
  { id: 'ws-002', date: 'May 6', name: 'Pull Day A', type: 'Back/Biceps', duration: 68, exercises: 7, totalVolume: '11,850kg', caloriesBurned: 590, xpEarned: 140, status: 'completed' },
  { id: 'ws-003', date: 'May 5', name: 'Leg Day A', type: 'Quads/Hamstrings/Glutes', duration: 85, exercises: 8, totalVolume: '18,200kg', caloriesBurned: 820, xpEarned: 200, status: 'completed' },
  { id: 'ws-004', date: 'May 3', name: 'Push Day B', type: 'Chest/Shoulders/Triceps', duration: 45, exercises: 4, totalVolume: '7,200kg', caloriesBurned: 420, xpEarned: 80, status: 'partial' },
  { id: 'ws-005', date: 'May 1', name: 'Pull Day B', type: 'Back/Biceps/Rear Delts', duration: 70, exercises: 6, totalVolume: '10,600kg', caloriesBurned: 560, xpEarned: 135, status: 'completed' },
  { id: 'ws-006', date: 'Apr 29', name: 'Leg Day B', type: 'Quads/Calves/Core', duration: 78, exercises: 7, totalVolume: '15,400kg', caloriesBurned: 710, xpEarned: 175, status: 'completed' },
  { id: 'ws-007', date: 'Apr 28', name: 'Upper Power', type: 'Compound Upper', duration: 90, exercises: 5, totalVolume: '14,800kg', caloriesBurned: 680, xpEarned: 190, status: 'completed' },
  { id: 'ws-008', date: 'Apr 26', name: 'Rest Day', type: 'Active Recovery', duration: 0, exercises: 0, totalVolume: '—', caloriesBurned: 0, xpEarned: 0, status: 'skipped' },
  { id: 'ws-009', date: 'Apr 24', name: 'Push Day A', type: 'Chest/Shoulders/Triceps', duration: 74, exercises: 6, totalVolume: '12,700kg', caloriesBurned: 650, xpEarned: 155, status: 'completed' },
  { id: 'ws-010', date: 'Apr 22', name: 'Pull Day A', type: 'Back/Biceps', duration: 65, exercises: 7, totalVolume: '11,200kg', caloriesBurned: 575, xpEarned: 130, status: 'completed' },
  { id: 'ws-011', date: 'Apr 20', name: 'Leg Day A', type: 'Quads/Hamstrings/Glutes', duration: 82, exercises: 8, totalVolume: '17,900kg', caloriesBurned: 800, xpEarned: 195, status: 'completed' },
  { id: 'ws-012', date: 'Apr 18', name: 'Full Body', type: 'Compound Movements', duration: 95, exercises: 6, totalVolume: '13,500kg', caloriesBurned: 720, xpEarned: 210, status: 'completed' },
];

const statusConfig = {
  completed: { label: 'COMPLETED', color: 'text-success', bg: 'bg-success/10', border: 'border-success/30' },
  partial: { label: 'PARTIAL', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/30' },
  skipped: { label: 'SKIPPED', color: 'text-foreground-muted', bg: 'bg-background-elevated', border: 'border-border' },
};

type SortKey = 'date' | 'duration' | 'xpEarned' | 'caloriesBurned';

export default function WorkoutHistoryTable() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const perPage = 8;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const filtered = workoutHistory
    .filter(w => w.name.toLowerCase().includes(search.toLowerCase()) || w.type.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      if (sortKey === 'date') return dir * (workoutHistory.indexOf(a) - workoutHistory.indexOf(b));
      return dir * ((a[sortKey] as number) - (b[sortKey] as number));
    });

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const SortIcon = ({ k }: { k: SortKey }) => (
    <span className="inline-flex flex-col ml-1 opacity-50">
      {sortKey === k ? (
        sortDir === 'asc' ? <ChevronUp size={10} className="opacity-100 text-primary" /> : <ChevronDown size={10} className="opacity-100 text-primary" />
      ) : (
        <ChevronDown size={10} />
      )}
    </span>
  );

  return (
    <div className="card-glass rounded-2xl border border-border hover:border-border-glow transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Dumbbell size={16} className="text-primary" />
            <h3 className="font-display text-sm font-bold tracking-widest text-foreground">WORKOUT HISTORY</h3>
            <span className="font-display text-xs text-foreground-muted">({filtered.length} sessions)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
              <input
                type="text"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search sessions..."
                className="input-hunter pl-8 pr-3 py-1.5 rounded-lg text-xs w-40 font-sans"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background-elevated/50">
              {[
                { key: 'date' as SortKey, label: 'DATE', sortable: true },
                { key: null, label: 'WORKOUT', sortable: false },
                { key: null, label: 'TYPE', sortable: false },
                { key: 'duration' as SortKey, label: 'DURATION', sortable: true },
                { key: null, label: 'EXERCISES', sortable: false },
                { key: null, label: 'VOLUME', sortable: false },
                { key: 'caloriesBurned' as SortKey, label: 'KCAL', sortable: true },
                { key: 'xpEarned' as SortKey, label: 'XP', sortable: true },
                { key: null, label: 'STATUS', sortable: false },
              ].map((col, i) => (
                <th
                  key={`col-header-${i}`}
                  className={`px-4 py-3 text-left font-display text-[10px] tracking-widest text-foreground-muted whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                  onClick={col.sortable && col.key ? () => handleSort(col.key!) : undefined}
                >
                  {col.label}
                  {col.sortable && col.key && <SortIcon k={col.key} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((session) => {
              const status = statusConfig[session.status];
              return (
                <tr
                  key={session.id}
                  className="border-b border-border/50 hover:bg-primary/5 transition-all duration-150 group"
                >
                  <td className="px-4 py-3 font-mono-data text-xs text-foreground-muted whitespace-nowrap">{session.date}</td>
                  <td className="px-4 py-3">
                    <p className="font-display text-xs font-bold tracking-wide text-foreground whitespace-nowrap">{session.name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-foreground-muted font-sans whitespace-nowrap">{session.type}</p>
                  </td>
                  <td className="px-4 py-3 font-mono-data text-xs text-foreground whitespace-nowrap">
                    {session.duration > 0 ? `${session.duration}m` : '—'}
                  </td>
                  <td className="px-4 py-3 font-mono-data text-xs text-foreground text-center">{session.exercises > 0 ? session.exercises : '—'}</td>
                  <td className="px-4 py-3 font-mono-data text-xs text-foreground-muted whitespace-nowrap">{session.totalVolume}</td>
                  <td className="px-4 py-3 font-mono-data text-xs text-warning whitespace-nowrap">
                    {session.caloriesBurned > 0 ? session.caloriesBurned : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {session.xpEarned > 0 ? (
                      <span className="font-mono-data text-xs text-primary font-bold">+{session.xpEarned}</span>
                    ) : (
                      <span className="font-mono-data text-xs text-foreground-subtle">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-display tracking-wider border ${status.color} ${status.bg} ${status.border} whitespace-nowrap`}>
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border">
        <p className="font-display text-xs text-foreground-muted tracking-wider">
          SHOWING {((page - 1) * perPage) + 1}–{Math.min(page * perPage, filtered.length)} OF {filtered.length}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 rounded-lg btn-ghost-glow text-xs disabled:opacity-30 disabled:cursor-not-allowed"
          >
            PREV
          </button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={`page-btn-${i + 1}`}
              onClick={() => setPage(i + 1)}
              className={`w-7 h-7 rounded-lg font-display text-xs transition-all duration-200 ${
                page === i + 1 ? 'bg-primary/20 text-primary border border-border-glow' : 'text-foreground-muted hover:text-foreground border border-transparent'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 rounded-lg btn-ghost-glow text-xs disabled:opacity-30 disabled:cursor-not-allowed"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}