/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f0f0f5',
          100: '#e2e2ed',
          200: '#c4c4db',
          300: '#9494bf',
          400: '#6b6ba0',
          500: '#4a4a80',
          600: '#393972',
          700: '#27276b',
          800: '#1a1a5c',
          900: '#0e0e2a',
          950: '#06061a',
        },
        volt: {
          300: '#d4ff4d',
          400: '#c8ff1a',
          500: '#b8f000',
          600: '#9acc00',
        },
        surface: {
          DEFAULT: '#0d0d1a',
          card: '#13132b',
          elevated: '#1a1a38',
          border: '#2a2a50',
        },
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(42 42 80 / 0.4)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease forwards',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
