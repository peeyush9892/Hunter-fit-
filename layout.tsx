import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Orbitron, Rajdhani, IBM_Plex_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'HunterFit — Level Up Your Body Every Day',
  description: 'HunterFit is the RPG-powered fitness app for serious males — track workouts, earn XP, complete missions, and rise from E-Rank to S-Rank hunter.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable} ${ibmPlexMono.variable} dark`}>
      <body className={rajdhani.className}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(15, 15, 30, 0.95)',
              border: '1px solid var(--border-glow)',
              color: 'var(--foreground)',
              fontFamily: 'var(--font-display)',
              fontSize: '13px',
              letterSpacing: '0.04em',
              boxShadow: '0 0 20px var(--primary-glow)',
            },
          }}
        />
</body>
    </html>
  );
}