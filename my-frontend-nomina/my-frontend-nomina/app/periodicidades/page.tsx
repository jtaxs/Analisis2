"use client";
import React, { useState, useEffect } from 'react';
import { getPeriodicidades, createPeriodicidad, updatePeriodicidad, deletePeriodicidad } from '@/lib/services/periodicidadService';
import AppLayout from '@/components/AppLayout';
import PeriodicidadForm from '@/components/PeriodicidadForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Periodicidad {
  perPeriodicidadId?: number;
  perCodigo: string;
  perNombre: string;
  perDiasPromedio: number;
}

const PeriodicidadPage: React.FC = () => {
  const [periodicidades, setPeriodicidades] = useState<Periodicidad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPeriodicidad, setSelectedPeriodicidad] = useState<Periodicidad | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPeriodicidades();
  }, []);

  const fetchPeriodicidades = async () => {
    try {
      setLoading(true);
      const data = await getPeriodicidades();
      setPeriodicidades(data);
    } catch (err) {
      setError('No se pudo cargar la lista de periodicidades.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Periodicidad) => {
    try {
      await createPeriodicidad(data);
      fetchPeriodicidades();
    } catch (err) {
      setError('Error al crear la periodicidad.');
    }
  };

  const handleUpdate = async (data: Periodicidad) => {
    if (selectedPeriodicidad?.perPeriodicidadId) {
      try {
        await updatePeriodicidad(selectedPeriodicidad.perPeriodicidadId, data);
        fetchPeriodicidades();
      } catch (err) {
        setError('Error al actualizar la periodicidad.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deletePeriodicidad(deleteId);
        fetchPeriodicidades();
      } catch (err) {
        setError('Error al eliminar la periodicidad.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (periodicidad?: Periodicidad) => {
    setSelectedPeriodicidad(periodicidad || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPeriodicidad(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando periodicidades...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Periodicidades de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Periodicidad</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Días Promedio</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {periodicidades.map((per) => (
                <TableRow key={per.perPeriodicidadId}>
                  <TableCell>{per.perPeriodicidadId}</TableCell>
                  <TableCell>{per.perCodigo}</TableCell>
                  <TableCell>{per.perNombre}</TableCell>
                  <TableCell>{per.perDiasPromedio}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(per)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(per.perPeriodicidadId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <PeriodicidadForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedPeriodicidad ? handleUpdate : handleCreate} initialData={selectedPeriodicidad}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar esta periodicidad? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default PeriodicidadPage;
