import type { Config } from 'tailwindcss';

/**
 * Town Hall Tailwind Configuration
 * 
 * Brand colors emphasize trust and accessibility:
 * - Primary (Blue): Trust, stability, professionalism
 * - Secondary (Green): Community, growth, positivity
 * - Accent (Orange): Energy, action, warmth
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bauhaus Primary Colors
        'bauhaus-red': '#E1000F',
        'bauhaus-yellow': '#FFED00',
        'bauhaus-blue': '#0064B4',
        'bauhaus-black': '#000000',
        'bauhaus-white': '#FFFFFF',
        // Town Hall Brand Colors - Bauhaus-inspired
        primary: {
          50: 'hsl(206, 100%, 95%)',
          100: 'hsl(206, 100%, 90%)',
          200: 'hsl(206, 100%, 80%)',
          300: 'hsl(206, 100%, 65%)',
          400: 'hsl(206, 100%, 50%)',
          500: '#0064B4',  // Bauhaus Blue
          600: 'hsl(206, 100%, 30%)',
          700: 'hsl(206, 100%, 25%)',
          800: 'hsl(206, 100%, 20%)',
          900: 'hsl(206, 100%, 15%)',
        },
        secondary: {
          50: 'hsl(356, 100%, 95%)',
          100: 'hsl(356, 100%, 90%)',
          200: 'hsl(356, 100%, 80%)',
          300: 'hsl(356, 100%, 65%)',
          400: 'hsl(356, 100%, 55%)',
          500: '#E1000F',  // Bauhaus Red
          600: 'hsl(356, 100%, 38%)',
          700: 'hsl(356, 100%, 32%)',
          800: 'hsl(356, 100%, 26%)',
          900: 'hsl(356, 100%, 20%)',
        },
        accent: {
          50: 'hsl(51, 100%, 95%)',
          100: 'hsl(51, 100%, 90%)',
          200: 'hsl(51, 100%, 80%)',
          300: 'hsl(51, 100%, 70%)',
          400: 'hsl(51, 100%, 60%)',
          500: '#FFED00',  // Bauhaus Yellow
          600: 'hsl(51, 100%, 45%)',
          700: 'hsl(51, 100%, 40%)',
          800: 'hsl(51, 100%, 35%)',
          900: 'hsl(51, 100%, 30%)',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Accessible minimum sizes
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
