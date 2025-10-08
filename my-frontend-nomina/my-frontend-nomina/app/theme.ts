// app/theme.ts (Versión "Deel")
"use client";
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google'; // Usaremos "Inter", una fuente muy popular en diseños modernos

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0f172a', // Un azul muy oscuro, casi negro
    },
    secondary: {
      main: '#22c55e', // Un verde vibrante como acento (similar al de Deel)
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Fondo general gris muy claro (off-white)
      paper: '#ffffff',   // Fondo de las tarjetas y menús
    },
    text: {
      primary: '#0f172a', // Texto principal oscuro
      secondary: '#64748b', // Texto secundario más grisáceo
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12, // Bordes más redondeados para un look moderno
  },
  components: {
    // Estilo por defecto para todas las tarjetas
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid #e2e8f0', // Borde sutil
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.04)', // Sombra muy suave
        },
      },
    },
    // Estilo por defecto para los botones
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
        },
        // Estilo para el botón "contained" principal
        containedSecondary: {
            color: 'white',
        }
      },
    },
    // Estilo para el menú lateral
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f172a', // Fondo oscuro
          color: '#ffffff',
        }
      }
    },
    // Estilo para la barra superior
    MuiAppBar: {
        styleOverrides: {
            root: {
                backgroundColor: '#ffffff',
                color: '#0f172a',
                boxShadow: 'none',
                borderBottom: '1px solid #e2e8f0',
            }
        }
    }
  },
});

export default theme;
