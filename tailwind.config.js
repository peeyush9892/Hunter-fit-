/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
          card: 'var(--background-card)',
          elevated: 'var(--background-elevated)',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          muted: 'var(--foreground-muted)',
          subtle: 'var(--foreground-subtle)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
          glow: 'var(--primary-glow)',
          dim: 'var(--primary-dim)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
          glow: 'var(--accent-glow)',
          bright: 'var(--accent-bright)',
        },
        danger: {
          DEFAULT: 'var(--danger)',
          glow: 'var(--danger-glow)',
        },
        success: {
          DEFAULT: 'var(--success)',
          glow: 'var(--success-glow)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          glow: 'var(--warning-glow)',
        },
        border: {
          DEFAULT: 'var(--border)',
          glow: 'var(--border-glow)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        rank: {
          e: 'var(--rank-e)',
          d: 'var(--rank-d)',
          c: 'var(--rank-c)',
          b: 'var(--rank-b)',
          a: 'var(--rank-a)',
          s: 'var(--rank-s)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        sm: 'calc(var(--radius) - 4px)',
        lg: 'calc(var(--radius) + 4px)',
        xl: 'calc(var(--radius) + 8px)',
        '2xl': 'calc(var(--radius) + 16px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 4s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-up': 'slideInUp 0.4s ease-out',
        'fade-in-scale': 'fadeInScale 0.3s ease-out',
        'xp-fill': 'xpFill 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scan-line': 'scanLine 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-glow-accent': 'pulseGlowAccent 2s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px var(--primary-glow)', opacity: '1' },
          '50%': { boxShadow: '0 0 20px var(--primary), 0 0 40px var(--primary-glow)', opacity: '0.9' },
        },
        pulseGlowAccent: {
          '0%, 100%': { boxShadow: '0 0 8px var(--accent-glow)', opacity: '1' },
          '50%': { boxShadow: '0 0 20px var(--accent-bright), 0 0 40px var(--accent-glow)', opacity: '0.9' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInScale: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' },
        },
        xpFill: {
          from: { width: '0%' },
          to: { width: 'var(--xp-width, 60%)' },
        },
      },
      backgroundImage: {
        'hunter-grid': "linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px)",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'hunter-grid': '40px 40px',
      },
      boxShadow: {
        'glow-primary': '0 0 16px var(--primary-glow)',
        'glow-primary-lg': '0 0 32px var(--primary-glow), 0 0 64px var(--primary-glow)',
        'glow-accent': '0 0 16px var(--accent-glow)',
        'glow-accent-lg': '0 0 32px var(--accent-glow)',
        'glow-success': '0 0 16px var(--success-glow)',
        'glow-danger': '0 0 16px var(--danger-glow)',
        'card': '0 4px 32px rgba(0, 0, 0, 0.6)',
        'card-glow': '0 0 24px var(--primary-glow), 0 4px 32px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};