"use client";
import React, { useState, useEffect } from 'react';
import { getEmpleadosContacto, createEmpleadoContacto, updateEmpleadoContacto, deleteEmpleadoContacto } from '@/lib/services/empleadoContactoService';
import AppLayout from '@/components/AppLayout';
import EmpleadoContactoForm from '@/components/EmpleadoContactoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface EmpleadoContacto {
  ecoContactoId?: number;
  empEmpleadoId: number;
  ecoTipo: string;
  ecoNombre: string;
}

const EmpleadoContactoPage: React.FC = () => {
  const [contactos, setContactos] = useState<EmpleadoContacto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContacto, setSelectedContacto] = useState<EmpleadoContacto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchContactos();
  }, []);

  const fetchContactos = async () => {
    try {
      setLoading(true);
      const data = await getEmpleadosContacto();
      setContactos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de contactos de empleados.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: EmpleadoContacto) => {
    try {
      await createEmpleadoContacto(data);
      fetchContactos();
    } catch (err) {
      setError('Error al crear el contacto de empleado.');
    }
  };

  const handleUpdate = async (data: EmpleadoContacto) => {
    if (selectedContacto?.ecoContactoId) {
      try {
        await updateEmpleadoContacto(selectedContacto.ecoContactoId, data);
        fetchContactos();
      } catch (err) {
        setError('Error al actualizar el contacto de empleado.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteEmpleadoContacto(deleteId);
        fetchContactos();
      } catch (err) {
        setError('Error al eliminar el contacto de empleado.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (contacto?: EmpleadoContacto) => {
    setSelectedContacto(contacto || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContacto(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando contactos...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Contactos de Empleados</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Contacto</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Contacto</TableCell>
                <TableCell>ID Empleado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactos.map((cont) => (
                <TableRow key={cont.ecoContactoId}>
                  <TableCell>{cont.ecoContactoId}</TableCell>
                  <TableCell>{cont.empEmpleadoId}</TableCell>
                  <TableCell>{cont.ecoTipo}</TableCell>
                  <TableCell>{cont.ecoNombre}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(cont)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(cont.ecoContactoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <EmpleadoContactoForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedContacto ? handleUpdate : handleCreate} initialData={selectedContacto}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este contacto? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default EmpleadoContactoPage;
