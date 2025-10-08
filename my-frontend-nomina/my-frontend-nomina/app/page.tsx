// app/page.tsx
"use client";
import React from 'react';
import AppLayout from '@/components/AppLayout';
import PayrollCostChart from '@/components/PayrollCostChart';
import { 
  Typography, Paper, Box, Grid, Button, Card, CardContent, Avatar,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip
} from '@mui/material';

// --- Iconos ---
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';

// --- Componente de Tarjeta de Estadísticas ---
const StatCard = ({ title, value, icon, color = 'primary.main' }) => (
  <Card elevation={3} sx={{ borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ bgcolor: color, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="h6" component="p" noWrap>
            {value}
          </Typography>
          <Typography color="text.secondary">
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const HomePage: React.FC = () => {
  // --- DATOS DE EJEMPLO ---
  const stats = {
    activeEmployees: 125,
    nextPayrollAmount: 75230.50,
    pendingTasks: 3,
  };

  const recentActivity = [
    { id: 1, action: 'Nómina Procesada', details: 'Período 08/2025', date: '29/09/2025', status: 'Completado' },
    { id: 2, action: 'Nuevo Empleado', details: 'Ana Sofía Paredes', date: '28/09/2025', status: 'Agregado' },
    { id: 3, action: 'Actualización', details: 'Salario de Carlos Solís', date: '27/09/2025', status: 'Modificado' },
    { id: 4, action: 'Reporte Generado', details: 'Reporte de Vacaciones', date: '26/09/2025', status: 'Descargado' },
  ];
  
  const payrollData = [
    { name: 'Abr', costo: 78000 },
    { name: 'May', costo: 81500 },
    { name: 'Jun', costo: 80500 },
    { name: 'Jul', costo: 84000 },
    { name: 'Ago', costo: 83200 },
    { name: 'Sep', costo: 85500 },
  ];

  // --- Función Auxiliar ---
  const getStatusChip = (status: string) => {
    switch (status) {
      case 'Completado':
      case 'Agregado':
        return <Chip label={status} color="success" size="small" />;
      case 'Modificado':
        return <Chip label={status} color="info" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <AppLayout>
      <Box sx={{ p: 3 }}>
        {/* --- Encabezado --- */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          Panel de Control
        </Typography>

        {/* --- Sección de Indicadores Clave (KPIs) --- */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Empleados Activos"
              value={stats.activeEmployees}
              icon={<PeopleIcon />}
              color="primary.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Monto Próxima Nómina"
              value={stats.nextPayrollAmount.toLocaleString('es-GT', { style: 'currency', currency: 'GTQ' })}
              icon={<MonetizationOnIcon />}
              color="success.main"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              title="Tareas Pendientes"
              value={stats.pendingTasks}
              icon={<PlaylistAddCheckIcon />}
              color="warning.main"
            />
          </Grid>
        </Grid>

        {/* --- Sección de Acciones Rápidas --- */}
        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
          Acciones Rápidas
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="contained" startIcon={<PostAddIcon />} fullWidth sx={{ py: 2 }}>
                Procesar Nueva Nómina
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="outlined" startIcon={<PersonAddIcon />} fullWidth sx={{ py: 2 }}>
                Agregar Nuevo Empleado
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button variant="outlined" startIcon={<AssessmentIcon />} fullWidth sx={{ py: 2 }}>
                Generar Reportes
              </Button>
            </Grid>
          </Grid>
        </Paper>
        
        {/* --- Secciones: Gráfico y Actividad Reciente --- */}
        <Grid container spacing={3}>
            {/* --- Columna Izquierda: Gráfico --- */}
            <Grid item xs={12} lg={7}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    Costo de Nómina (Últimos 6 meses)
                </Typography>
                <Paper elevation={3} sx={{ p: 2, height: '400px', borderRadius: 2 }}>
                    <PayrollCostChart data={payrollData} />
                </Paper>
            </Grid>

            {/* --- Columna Derecha: Actividad Reciente --- */}
            <Grid item xs={12} lg={5}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 2 }}>
                    Actividad Reciente
                </Typography>
                <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                    <Table aria-label="tabla de actividad reciente">
                        <TableHead>
                            <TableRow>
                                <TableCell>Acción</TableCell>
                                <TableCell>Detalles</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentActivity.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.action}
                                        <Box>{getStatusChip(row.status)}</Box>
                                    </TableCell>
                                    <TableCell>{row.details}</TableCell>
                                    <TableCell align="right">{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
};

export default HomePage;