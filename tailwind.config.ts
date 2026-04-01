import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F172A',
        surface: '#172033',
        edge: '#27324a',
        primary: '#7C3AED',
        secondary: '#F59E0B',
        text: '#F8FAFC',
        muted: '#94A3B8',
        success: '#22C55E',
        danger: '#F87171',
      },
      boxShadow: {
        badge: '0 30px 80px rgba(124, 58, 237, 0.35)',
        panel: '0 24px 60px rgba(15, 23, 42, 0.4)',
      },
      animation: {
        drift: 'drift 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite'
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 60px rgba(124,58,237,0.18)' },
          '50%': { boxShadow: '0 0 86px rgba(245,158,11,0.26)' }
        }
      }
    },
  },
  plugins: [],
};

export default config;
