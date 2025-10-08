// app/empleados/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '@/lib/services/empleadoService';
import AppLayout from '@/components/AppLayout';
import EmpleadoForm from '@/components/EmpleadoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Empleado {
  empEmpleadoId?: number;
  empCodigoEmp: string;
  empNombres: string;
  empApellidos: string;
  empActivo?: string;
}

const EmpleadoPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState<Empleado | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      const data = await getEmpleados();
      setEmpleados(data);
    } catch (err) {
      setError('No se pudo cargar la lista de empleados.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Empleado) => {
    try {
      await createEmpleado(data);
      fetchEmpleados();
    } catch (err) {
      setError('Error al crear el empleado.');
    }
  };

  const handleUpdate = async (data: Empleado) => {
    if (selectedEmpleado?.empEmpleadoId) {
      try {
        await updateEmpleado(selectedEmpleado.empEmpleadoId, data);
        fetchEmpleados();
      } catch (err) {
        setError('Error al actualizar el empleado.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteEmpleado(deleteId);
        fetchEmpleados();
      } catch (err) {
        setError('Error al eliminar el empleado.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (empleado?: Empleado) => {
    setSelectedEmpleado(empleado || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmpleado(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando empleados...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Empleados de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Empleado</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombres</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {empleados.map((emp) => (
                <TableRow key={emp.empEmpleadoId}>
                  <TableCell>{emp.empEmpleadoId}</TableCell>
                  <TableCell>{emp.empCodigoEmp}</TableCell>
                  <TableCell>{emp.empNombres}</TableCell>
                  <TableCell>{emp.empApellidos}</TableCell>
                  <TableCell>{emp.empActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(emp)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(emp.empEmpleadoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EmpleadoForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedEmpleado ? handleUpdate : handleCreate} initialData={selectedEmpleado}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este empleado? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default EmpleadoPage;
