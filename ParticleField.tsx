'use client';
import React, { useEffect, useRef } from 'react';

export default function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];
    const count = 30;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const size = (i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1);
      const left = (i * 37) % 100;
      const duration = 8 + (i % 7) * 2;
      const delay = (i * 0.4) % 8;
      const drift = ((i % 5) - 2) * 30;
      const isBlue = i % 3 !== 2;

      particle.className = 'particle-dot';
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: -10px;
        background: ${isBlue ? 'var(--primary)' : 'var(--accent-bright)'};
        box-shadow: 0 0 ${size * 3}px ${isBlue ? 'var(--primary)' : 'var(--accent-bright)'};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        --drift: ${drift}px;
        opacity: 0;
      `;

      container.appendChild(particle);
      particles.push(particle);
    }

    return () => {
      particles.forEach(p => p.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    />
  );
}