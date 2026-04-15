import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#8C2939',
          },
          background: {
            default: '#FBF8F6',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A1A1A',
            secondary: '#4A4A4A',
          },
        }
      : {
          primary: {
            main: '#9C3949',
          },
          background: {
            default: '#231A1A',
            paper: '#322525',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#BBBBBB',
          },
        }),
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    button: {
      textTransform: 'none' as const,
      fontWeight: 600,
    },
    h1: {
      fontWeight: 800,
      fontSize: '4rem',
      lineHeight: 1.1,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
  },
});
