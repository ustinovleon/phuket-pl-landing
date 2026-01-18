/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f0f7f4',
          100: '#dcebe3',
          200: '#bbd7ca',
          300: '#8fbba8',
          400: '#629a84',
          500: '#437d68',
          600: '#326453',
          700: '#2a5044',
          800: '#244139',
          900: '#1f3630',
          950: '#0f1f1b',
        },
        'accent': {
          50: '#fdf8ef',
          100: '#faeed9',
          200: '#f4dbb2',
          300: '#edc281',
          400: '#e4a24e',
          500: '#dd8a2d',
          600: '#cf7023',
          700: '#ac551f',
          800: '#8a4420',
          900: '#70391d',
          950: '#3c1b0d',
        },
        'slate': {
          850: '#1a2332',
          925: '#0f1419',
        }
      },
      fontFamily: {
        'display': ['"DM Serif Display"', 'Georgia', 'serif'],
        'body': ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

