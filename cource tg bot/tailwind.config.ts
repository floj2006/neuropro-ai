import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0c18',
        panel: '#0f1224',
        neon: '#7f5cff',
        neon2: '#28d7ff',
        muted: '#9aa4c7'
      },
      boxShadow: {
        glow: '0 0 30px rgba(127,92,255,0.35)',
        glowStrong: '0 0 40px rgba(40,215,255,0.45)'
      }
    }
  },
  plugins: []
} satisfies Config;
