import type { Config } from 'tailwindcss';

/**
 * Town Hall Tailwind Configuration
 * 
 * Swiss Modern (International Typographic Style) Design System
 * 
 * Design Principles:
 * - Minimalist clarity: Every element serves a purpose
 * - Grid-based layouts: 12-column modular grid
 * - Sans-serif typography: Inter font family
 * - Generous whitespace: Content-focused design
 * - High contrast: Black/white with red accents
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
        // Swiss Modern Design System Colors
        swiss: {
          black: '#0A0A0A',      // Headlines, primary text, primary buttons
          white: '#FFFFFF',       // Backgrounds, cards
          red: '#E53935',         // CTAs, accents, focus states
          gray: '#6B7280',        // Secondary text, icons
          light: '#F5F5F5',       // Section backgrounds
          border: '#E5E5E5',      // Borders, dividers
          success: '#10B981',     // Success states
          error: '#EF4444',       // Error states
          warning: '#F59E0B',     // Warning states
        },
        // Legacy Bauhaus colors (for backward compatibility)
        'bauhaus-red': '#E53935',
        'bauhaus-yellow': '#F59E0B',
        'bauhaus-blue': '#0A0A0A',
        'bauhaus-black': '#0A0A0A',
        'bauhaus-white': '#FFFFFF',
        // Semantic color mappings
        primary: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#0A0A0A',   // Swiss Black
          600: '#171717',
          700: '#0A0A0A',
          800: '#050505',
          900: '#000000',
        },
        secondary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#E53935',   // Swiss Red
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#F59E0B',   // Swiss Warning/Accent
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#6B7280',   // Swiss Gray
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Swiss Modern Typography Scale
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h2': ['2rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h1': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display': ['4rem', { lineHeight: '1.0', fontWeight: '700', letterSpacing: '-0.02em' }],
        // Legacy sizes for compatibility
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['4rem', { lineHeight: '1.0' }],
      },
      spacing: {
        // Swiss Modern 8px base spacing system
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        'swiss': '1280px',  // Swiss Modern max content width
      },
      borderRadius: {
        // Swiss Modern: Minimal to no border radius
        'swiss': '0.25rem',  // 4px - maximum for Swiss style
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        // Swiss Modern: Subtle, functional shadows
        'swiss': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'swiss-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'swiss-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
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
