"use client";
import React, { useState, useEffect } from 'react';
import { getEmpleadosCuenta, createEmpleadoCuenta, updateEmpleadoCuenta, deleteEmpleadoCuenta } from '@/lib/services/empleadoCuentaService';
import AppLayout from '@/components/AppLayout';
import EmpleadoCuentaForm from '@/components/EmpleadoCuentaForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface EmpleadoCuenta {
  ebcCuentaId?: number;
  empEmpleadoId: number;
  banBancoId: number;
  ebcTipo: string;
  ebcNumero: string;
}

const EmpleadoCuentaPage: React.FC = () => {
  const [cuentas, setCuentas] = useState<EmpleadoCuenta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCuenta, setSelectedCuenta] = useState<EmpleadoCuenta | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchCuentas();
  }, []);

  const fetchCuentas = async () => {
    try {
      setLoading(true);
      const data = await getEmpleadosCuenta();
      setCuentas(data);
    } catch (err) {
      setError('No se pudo cargar la lista de cuentas de empleados.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: EmpleadoCuenta) => {
    try {
      await createEmpleadoCuenta(data);
      fetchCuentas();
    } catch (err) {
      setError('Error al crear la cuenta de empleado.');
    }
  };

  const handleUpdate = async (data: EmpleadoCuenta) => {
    if (selectedCuenta?.ebcCuentaId) {
      try {
        await updateEmpleadoCuenta(selectedCuenta.ebcCuentaId, data);
        fetchCuentas();
      } catch (err) {
        setError('Error al actualizar la cuenta de empleado.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteEmpleadoCuenta(deleteId);
        fetchCuentas();
      } catch (err) {
        setError('Error al eliminar la cuenta de empleado.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (cuenta?: EmpleadoCuenta) => {
    setSelectedCuenta(cuenta || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCuenta(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando cuentas...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Cuentas de Empleados</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Cuenta</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Cuenta</TableCell>
                <TableCell>ID Empleado</TableCell>
                <TableCell>ID Banco</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Número</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuentas.map((cta) => (
                <TableRow key={cta.ebcCuentaId}>
                  <TableCell>{cta.ebcCuentaId}</TableCell>
                  <TableCell>{cta.empEmpleadoId}</TableCell>
                  <TableCell>{cta.banBancoId}</TableCell>
                  <TableCell>{cta.ebcTipo}</TableCell>
                  <TableCell>{cta.ebcNumero}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(cta)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(cta.ebcCuentaId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EmpleadoCuentaForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedCuenta ? handleUpdate : handleCreate} initialData={selectedCuenta}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar esta cuenta? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default EmpleadoCuentaPage;
