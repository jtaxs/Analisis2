// components/Navbar.tsx (Código actualizado y corregido)
"use client";
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Collapse, IconButton, useTheme } from '@mui/material';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

// --- Iconos para el menú ---
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import CalculateIcon from '@mui/icons-material/Calculate';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';

// --- Props del componente ---
interface NavbarProps {
  isMdUp: boolean;
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isMdUp, drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const [openMenus, setOpenMenus] = React.useState<{ [key: string]: boolean }>({});

  const handleMenuClick = (menu: string) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    if (!isMdUp) handleDrawerToggle();
  };

  // Objeto para manejar los paths de cada menú
  const menuPaths = {
    config: ['/departamentos', '/puestos', '/tipos-contrato', '/jornadas', '/bancos', '/periodicidades', '/conceptos', '/igss-params', '/isr-tabla'],
    empleados: ['/empleados', '/empleados-contacto', '/empleados-cuenta', '/contratos', '/salarios-hist'],
    nomina: ['/periodos-nomina', '/nominas', '/nomina-detalle'],
    novedades: ['/horas-extra', '/ausencias', '/vacaciones', '/prestamos', '/prestamos-cuota', '/bonos', '/liquidaciones'],
    sistema: ['/audit-log'],
  };

  // Función para verificar si un path es parte de un menú
  const isPathInMenu = (paths: string[]) => paths.some(path => pathname === path);

  // useEffect para manejar el estado de los menús al cambiar de ruta
  React.useEffect(() => {
    Object.keys(menuPaths).forEach(menu => {
      setOpenMenus(prev => ({
        ...prev,
        [menu]: isPathInMenu(menuPaths[menu as keyof typeof menuPaths]) || prev[menu],
      }));
    });
  }, [pathname]);

  const drawerContent = (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Toolbar sx={{ p: '16px !important', bgcolor: theme.palette.background.paper, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <FolderIcon sx={{ color: theme.palette.primary.main, mr: 2 }} />
        <Typography variant="h6" sx={{ color: theme.palette.text.primary, fontWeight: 'bold' }}>
          Sistema Nómina
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
      <List sx={{ p: 0, '& .MuiListItemButton-root': {
        pl: 2,
        py: 1.5,
        '&.Mui-selected': {
          bgcolor: theme.palette.primary.main,
          color: theme.palette.common.white,
          '&:hover': {
            bgcolor: theme.palette.primary.dark,
          },
          '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: theme.palette.common.white,
          },
          borderLeft: `4px solid ${theme.palette.primary.dark}`,
          ml: '-4px'
        },
        '&:hover': {
          bgcolor: theme.palette.action.hover,
        },
      }}}>
        <ListItemButton selected={pathname === '/'} onClick={() => handleNavigation('/')}>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Inicio" primaryTypographyProps={{ fontWeight: pathname === '/' ? 'bold' : 'normal' }} />
        </ListItemButton>

        <ListItemButton onClick={() => handleMenuClick('config')} selected={isPathInMenu(menuPaths.config)}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Configuración" />
          {openMenus['config'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus['config']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton selected={pathname === '/departamentos'} onClick={() => handleNavigation('/departamentos')}><ListItemText primary="Departamentos" /></ListItemButton>
            <ListItemButton selected={pathname === '/puestos'} onClick={() => handleNavigation('/puestos')}><ListItemText primary="Puestos" /></ListItemButton>
            <ListItemButton selected={pathname === '/tipos-contrato'} onClick={() => handleNavigation('/tipos-contrato')}><ListItemText primary="Tipos de Contrato" /></ListItemButton>
            <ListItemButton selected={pathname === '/jornadas'} onClick={() => handleNavigation('/jornadas')}><ListItemText primary="Jornadas" /></ListItemButton>
            <ListItemButton selected={pathname === '/bancos'} onClick={() => handleNavigation('/bancos')}><ListItemText primary="Bancos" /></ListItemButton>
            <ListItemButton selected={pathname === '/periodicidades'} onClick={() => handleNavigation('/periodicidades')}><ListItemText primary="Periodicidades" /></ListItemButton>
            <ListItemButton selected={pathname === '/conceptos'} onClick={() => handleNavigation('/conceptos')}><ListItemText primary="Conceptos" /></ListItemButton>
            <ListItemButton selected={pathname === '/igss-params'} onClick={() => handleNavigation('/igss-params')}><ListItemText primary="Parámetros IGSS" /></ListItemButton>
            <ListItemButton selected={pathname === '/isr-tabla'} onClick={() => handleNavigation('/isr-tabla')}><ListItemText primary="Tabla ISR" /></ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleMenuClick('empleados')} selected={isPathInMenu(menuPaths.empleados)}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Gestión Empleados" />
          {openMenus['empleados'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus['empleados']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton selected={pathname === '/empleados'} onClick={() => handleNavigation('/empleados')}><ListItemText primary="Empleados" /></ListItemButton>
            <ListItemButton selected={pathname === '/empleados-contacto'} onClick={() => handleNavigation('/empleados-contacto')}><ListItemText primary="Contactos" /></ListItemButton>
            <ListItemButton selected={pathname === '/empleados-cuenta'} onClick={() => handleNavigation('/empleados-cuenta')}><ListItemText primary="Cuentas Bancarias" /></ListItemButton>
            <ListItemButton selected={pathname === '/contratos'} onClick={() => handleNavigation('/contratos')}><ListItemText primary="Contratos" /></ListItemButton>
            <ListItemButton selected={pathname === '/salarios-hist'} onClick={() => handleNavigation('/salarios-hist')}><ListItemText primary="Historial Salarial" /></ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleMenuClick('nomina')} selected={isPathInMenu(menuPaths.nomina)}>
          <ListItemIcon><CalculateIcon /></ListItemIcon>
          <ListItemText primary="Proceso de Nómina" />
          {openMenus['nomina'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus['nomina']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton selected={pathname === '/periodos-nomina'} onClick={() => handleNavigation('/periodos-nomina')}><ListItemText primary="Períodos de Nómina" /></ListItemButton>
            <ListItemButton selected={pathname === '/nominas'} onClick={() => handleNavigation('/nominas')}><ListItemText primary="Nóminas" /></ListItemButton>
            <ListItemButton selected={pathname === '/nomina-detalle'} onClick={() => handleNavigation('/nomina-detalle')}><ListItemText primary="Detalles de Nómina" /></ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleMenuClick('novedades')} selected={isPathInMenu(menuPaths.novedades)}>
          <ListItemIcon><SyncAltIcon /></ListItemIcon>
          <ListItemText primary="Novedades" />
          {openMenus['novedades'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus['novedades']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton selected={pathname === '/horas-extra'} onClick={() => handleNavigation('/horas-extra')}><ListItemText primary="Horas Extra" /></ListItemButton>
            <ListItemButton selected={pathname === '/ausencias'} onClick={() => handleNavigation('/ausencias')}><ListItemText primary="Ausencias" /></ListItemButton>
            <ListItemButton selected={pathname === '/vacaciones'} onClick={() => handleNavigation('/vacaciones')}><ListItemText primary="Vacaciones" /></ListItemButton>
            <ListItemButton selected={pathname === '/prestamos'} onClick={() => handleNavigation('/prestamos')}><ListItemText primary="Préstamos" /></ListItemButton>
            <ListItemButton selected={pathname === '/prestamos-cuota'} onClick={() => handleNavigation('/prestamos-cuota')}><ListItemText primary="Cuotas de Préstamo" /></ListItemButton>
            <ListItemButton selected={pathname === '/bonos'} onClick={() => handleNavigation('/bonos')}><ListItemText primary="Bonos y Descuentos" /></ListItemButton>
            <ListItemButton selected={pathname === '/liquidaciones'} onClick={() => handleNavigation('/liquidaciones')}><ListItemText primary="Liquidaciones" /></ListItemButton>
          </List>
        </Collapse>

        <ListItemButton onClick={() => handleMenuClick('sistema')} selected={isPathInMenu(menuPaths.sistema)}>
          <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
          <ListItemText primary="Sistema" />
          {openMenus['sistema'] ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenus['sistema']} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <ListItemButton selected={pathname === '/audit-log'} onClick={() => handleNavigation('/audit-log')}><ListItemText primary="Auditoría" /></ListItemButton>
          </List>
        </Collapse>
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.12)' }} />
      <List>
        <ListItemButton onClick={logout} sx={{ pl: 2 }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, bgcolor: theme.palette.background.default }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'rgba(255, 255, 255, 0.8)', // Fondo con transparencia
          color: theme.palette.text.primary,
          backdropFilter: 'blur(10px)', // Efecto de desenfoque
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMdUp ? 'permanent' : 'temporary'}
        open={isMdUp ? true : mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: 'none',
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.secondary,
            '& .MuiListItemButton-root': {
              color: theme.palette.text.secondary,
            },
            '& .MuiListItemIcon-root': {
              color: 'inherit',
            },
            '& .MuiListItemText-primary': {
              color: theme.palette.text.primary,
            },
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Navbar;