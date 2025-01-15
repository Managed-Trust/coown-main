'use client'

import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700', // Bright yellow from the logo
      dark: '#DAA520',
      light: '#FFEB3B',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#1A1A1A',
      paper: '#242424',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B3B3B3',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(45deg, #242424 25%, #2A2A2A 25%, #2A2A2A 50%, #242424 50%, #242424 75%, #2A2A2A 75%, #2A2A2A 100%)',
          backgroundSize: '56.57px 56.57px',
          border: '1px solid rgba(255, 215, 0, 0.1)',
        },
      },
    },
  },
})

