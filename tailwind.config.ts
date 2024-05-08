import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-extraneous-dependencies
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        disabled: '#919EAB',
        primary: {
          main: '#1977F2',
          100: 'rgba(25, 119, 242, 0.08)',
          800: '#0B6CEA',
          900: 'rgba(145, 158, 171, 0.20)',
          dark: '#212B36',
        },
        secondary: {
          main: '#B71D18',
          100: '#FF5630',
          200: '#1890FF',
          300: 'rgba(24, 144, 255, 0.24)',
          400: '#637381',
        },
        grey: {
          100: 'rgba(145, 158, 171, 0.20)',
          200: 'rgba(145, 158, 171, 0.80)',
          300: '#DFE3E8',
          400: '#F4F6F8',
          700: '#919EAB',
          800: '#212B36',
          900: '#637381',
        },
        textColor: {
          main: '#637381',
          primary: '#212B36',
        },
        success: {
          main: '#118D57',
          100: '#D3FCD2',
          300: '#047159',
          400: 'hsla(142, 71%, 45%, 0.16)',
          500: '#22C55E29',
          600: '#118D57',
          700: '#F0FDB6',
          800: '#7B8A35',
        },
        warning: {
          main: '#FFAB00',
          300: '#B76E00',
          400: 'hsla(40, 100%, 50%, 0.16)',
        },
        error: {
          300: '#B71D18',
          400: 'rgba(255, 86, 48, 0.08)',
          500: '#FF563029',
          600: '#FF5630',
        },
        orange: {
          500: '#FF5630',
        },
        border: {
          100: '#e2e9f0',
          200: '#E9EBEB',
          300: 'rgba(145, 158, 171, 0.16)',
          8: 'rgba(145, 158, 171, 0.08)',
        },
      },
      boxShadow: {
        sm: '0px 2px 4px 0px rgba(11, 10, 55, 0.15)',
        lg: '0px 8px 20px 0px rgba(18, 16, 99, 0.06)',
        xl: '0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)',
        xl2: '-40px 40px 80px -8px rgba(0, 0, 0, 0.24)',
      },
      fontFamily: {
        primary: ['var(--primary)', ...fontFamily.sans],
      },
      animation: {
        'slide-up': 'slideup 0.7s linear alternate',
      },
      keyframes: {
        slideup: {
          '0%': { transform: 'translateY(10px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
export default config;
