import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '480px',
      'tablet': '768px',
      'lg': '1024px',
      'desktop': '1280px',
      'xl': '1536px',
      '2xl': '1920px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C22032',
          light: '#EE1113',
          dark: '#9A1A28',
          hover: '#A81C2C',
        },
        secondary: {
          DEFAULT: '#1E417C',
          light: '#2A5299',
          dark: '#152D57',
        },
        brand: {
          navy: '#1E417C',
          'navy-light': 'rgba(30, 65, 124, 0.01)',
          red: '#EE1113',
          purple: '#7403FA',
        },
        pastel: {
          purple: {
            light: '#F0E8F5',
            base: '#E8D6F0',
            medium: '#DBC9E8',
            dark: '#D4BBE0',
          },
          cyan: {
            light: '#E6F5F8',
            base: '#D6F0F5',
            medium: '#C8EBF2',
            dark: '#BFDFEA',
          },
          lavender: {
            light: '#F5F0FA',
            base: '#E8DDF5',
            medium: '#DDD0F0',
            dark: '#D0C0E8',
          },
        },
        text: {
          primary: '#333333',
          secondary: '#505050',
          muted: '#777777',
          light: '#555555',
          dark: '#444444',
        },
        bg: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          card: 'rgba(255, 255, 255, 0.7)',
          'card-hover': 'rgba(255, 255, 255, 0.9)',
          selected: 'rgba(238, 17, 19, 0.15)',
          glass: 'rgba(30, 65, 124, 0.01)',
          'glass-white': 'rgba(255, 255, 255, 0.01)',
          'glass-black': 'rgba(0, 0, 0, 0.01)',
        },
      },
      
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '25px',
        '3xl': '35px',
        '4xl': '45px',
        '7': '7px',
        '10': '10px',
        '22': '22px',
        '37': '37px',
        '39': '39px',
        '40': '40px',
        '42': '42px',
        '80': '80px',
        '86': '86px',
        '110': '110px',
        '170': '170px',
      },
      
      fontFamily: {
        heading: ['Audiowide', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
        button: ['Comfortaa', 'cursive', 'sans-serif'],
        primary: ['Poppins', 'sans-serif'],
        display: ['Comfortaa', 'cursive', 'sans-serif'],
        accent: ['Audiowide', 'sans-serif'],
      },
      
      fontSize: {
        'tag-mobile': ['8px', { lineHeight: '9px', fontWeight: '500' }],
        'tag-tablet': ['12px', { lineHeight: '14px', fontWeight: '400' }],
        'tag-desktop': ['15px', { lineHeight: '16px', fontWeight: '500' }],
        '2xs': '8px',
        'xs': '9px',
        'sm': '10px',
        'base': '12px',
        'md': '13px',
        'lg': '15px',
        'xl': '16px',
        '2xl': '18px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '30px',
      },
      
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        '9': '9px',
        '12': '12px',
        '16': '16px',
        '18': '18px',
      },
      
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '20px',
        'tag-mobile': '23px',
        '2xl': '29px',
        'tag': '30px',
        'full': '9999px',
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'tag-inner': 'inset 0px 0px 6px rgba(194, 32, 50, 0.1)',
        'focus': '0 0 0 3px rgba(194, 32, 50, 0.3)',
        'button-inset': 'inset 0px 0px 10px 0px rgba(194, 32, 50, 0.3), inset -1px -2px 3px 0px rgba(194, 32, 50, 0.1), inset 1px 1px 2px 0px rgba(194, 32, 50, 0.2)',
        'glass': 'inset 0px 0px 10px 0px rgba(0,0,0,0.05), inset -1px -2px 3px 0px rgba(0,0,0,0.05), inset 1px 1px 2px 0px rgba(0,0,0,0.05)',
        'glass-selected': 'inset 0px 0px 10px 0px rgba(194,32,50,0.15), inset -1px -2px 3px 0px rgba(194,32,50,0.1), inset 1px 1px 2px 0px rgba(194,32,50,0.1)',
      },
      
      backgroundImage: {
        'gradient-mobile': 'linear-gradient(140.59deg, #EE1113 0.91%, #7403FA 96.74%)',
        'gradient-tablet': 'linear-gradient(161.24deg, #EE1113 0.91%, #7403FA 96.74%)',
        'gradient-desktop': 'linear-gradient(167.47deg, #EE1113 0.91%, #7403FA 96.74%)',
        'gradient-primary': 'linear-gradient(161.24deg, #EE1113 0.91%, #7403FA 96.74%)',
        'gradient-text': 'linear-gradient(161.24deg, #EE1113 0.91%, #7403FA 96.74%)',
        'gradient-pastel': 'linear-gradient(135deg, #F0E8F5 0%, #E6F5F8 100%)',
        'gradient-divider': 'linear-gradient(90deg, transparent 0%, #bbb 50%, transparent 100%)',
        'gradient-footer': 'linear-gradient(165.84deg, #EE1113 0.91%, #7403FA 96.74%)',
      },
      
      backdropBlur: {
        'glass': '2.5px',
      },
      
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      
      zIndex: {
        'base': '0',
        'above': '10',
        'dropdown': '50',
        'modal': '100',
        'overlay': '200',
      },
      
      width: {
        'next-btn-mobile': '72px',
        'next-btn': '138px',
        'divider-mobile': '300px',
        'divider-tablet': '611px',
        'logo-mobile': '31px',
        'logo-tablet': '38px',
        'logo-desktop': '69px',
      },
      
      height: {
        'tag-mobile': '28px',
        'tag-tablet': '40px',
        'tag-desktop': '50px',
        'next-btn-mobile': '24px',
        'next-btn': '37px',
        'logo-mobile': '30px',
        'logo-tablet': '36px',
        'logo-desktop': '66px',
        'divider-mobile': '2px',
        'divider-tablet': '4px',
      },
      
      maxWidth: {
        'narrow': '720px',
        'container': '1200px',
        'mobile': '393px',
        'tablet': '768px',
        'desktop': '1920px',
        'tagline-mobile': '307px',
        'tagline-tablet': '671px',
        'tagline-desktop': '769px',
        'subtitle-mobile': '307px',
        'subtitle-tablet': '575px',
        'tags-mobile': '378px',
        'tags-tablet': '659px',
        'tags-desktop': '1530px',
        'stats': '658px',
        'stats-desktop': '1530px',
        'footer-links': '604px',
      },
      
      gap: {
        'tag-x-mobile': '10px',
        'tag-y-mobile': '8px',
        'tag-tablet': '20px',
        'tag-desktop': '20px',
        'stats-x-mobile': '110px',
        'stats-y': '40px',
        'stats-x-desktop': '170px',
        'footer': '10px',
        'footer-tablet': '20px',
      },
    },
  },
  plugins: [],
}

export default config

