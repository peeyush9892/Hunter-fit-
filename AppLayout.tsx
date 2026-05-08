import React from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface AppLayoutProps {
  children: React.ReactNode;
  activeRoute?: string;
}

export default function AppLayout({ children, activeRoute }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background hunter-grid-bg bg-hunter-grid bg-hunter-grid">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute rounded-full blur-3xl opacity-10"
          style={{
            width: '600px',
            height: '600px',
            top: '-200px',
            left: '-100px',
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl opacity-8"
          style={{
            width: '500px',
            height: '500px',
            bottom: '-150px',
            right: '-100px',
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Sidebar — desktop */}
      <Sidebar activeRoute={activeRoute} />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen lg:ml-64 xl:ml-72 pb-20 lg:pb-0 relative z-10">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <MobileNav activeRoute={activeRoute} />
    </div>
  );
}