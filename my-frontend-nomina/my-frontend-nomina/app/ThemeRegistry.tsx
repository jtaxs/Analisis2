// app/ThemeRegistry.tsx
'use client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Importa tu tema

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline normaliza los estilos */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
