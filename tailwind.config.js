/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFF9E6',
          100: '#FFF0BF',
          200: '#FFE799',
          300: '#FFDB66',
          400: '#FFD040',
          500: '#E6B800',
          600: '#C49A00',
          700: '#A17E00',
          800: '#7D6200',
          900: '#5A4600',
        },
        navy: {
          50: '#EEF0F6',
          100: '#D5D9E8',
          200: '#ABB3D1',
          300: '#818DBA',
          400: '#5767A3',
          500: '#2D418C',
          600: '#243470',
          700: '#1B2754',
          800: '#121A38',
          900: '#0A0F20',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FDF8F0',
          200: '#FAF0E1',
          300: '#F5E5CC',
          400: '#EDDAB7',
          500: '#E5CFA2',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-scale': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'scroll-hint': {
          '0%, 100%': { opacity: '1', transform: 'translateY(0)' },
          '50%': { opacity: '0.5', transform: 'translateY(8px)' },
        },
        'heart-pop': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '30%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
        'slide-down': 'slide-down 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-scale': 'fade-scale 0.4s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite linear',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
        'heart-pop': 'heart-pop 0.4s ease-out',
        'count-up': 'count-up 0.6s ease-out forwards',
        'typing-dot': 'typing-dot 1.4s ease-in-out infinite',
      },
      boxShadow: {
        luxury: '0 4px 20px rgba(0, 0, 0, 0.08)',
        'luxury-lg': '0 10px 40px rgba(0, 0, 0, 0.12)',
        'luxury-xl': '0 20px 60px rgba(0, 0, 0, 0.15)',
        gold: '0 4px 20px rgba(230, 184, 0, 0.15)',
        'gold-lg': '0 10px 40px rgba(230, 184, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
