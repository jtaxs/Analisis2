// components/AppLayout.tsx
"use client";
import React, { useState } from 'react';
import { CssBaseline, Box, useTheme, useMediaQuery } from '@mui/material';
import Navbar from './Navbar';
import ProtectedRoute from './ProtectedRoute';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const drawerWidth = 260;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ProtectedRoute>
      <CssBaseline />
      <Box 
        sx={{ 
          display: 'flex', 
          minHeight: '100vh', 
          bgcolor: theme.palette.background.default, 
          // Efecto de fondo con imagen y paralaje
          backgroundImage: `url('https://images.pexels.com/photos/7134983/pexels-photo-7134983.jpeg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Capa de color semitransparente sobre el fondo para mejorar la legibilidad del texto */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Blanco semitransparente
          zIndex: -1,
        }} />

        <Navbar
          isMdUp={isMdUp}
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Box sx={{ ...theme.mixins.toolbar }} />
          {children}
        </Box>
      </Box>
    </ProtectedRoute>
  );
};

export default AppLayout;