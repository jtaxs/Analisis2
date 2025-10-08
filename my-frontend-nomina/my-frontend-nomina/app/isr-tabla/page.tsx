"use client";
import React, { useState, useEffect } from 'react';
import { getIsrTabla, createIsrTabla, updateIsrTabla, deleteIsrTabla } from '@/lib/services/isrTablaService';
import AppLayout from '@/components/AppLayout';
import IsrTablaForm from '@/components/IsrTablaForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface IsrTabla {
  isrTablaId?: number;
  isrAnio: number;
  isrTramoNum: number;
  isrDesde: number;
  isrHasta: number;
  isrTasa: number;
  isrCuotaFija: number;
}

const IsrTablaPage: React.FC = () => {
  const [isrTabla, setIsrTabla] = useState<IsrTabla[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedIsrTabla, setSelectedIsrTabla] = useState<IsrTabla | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchIsrTabla();
  }, []);

  const fetchIsrTabla = async () => {
    try {
      setLoading(true);
      const data = await getIsrTabla();
      setIsrTabla(data);
    } catch (err) {
      setError('No se pudo cargar la tabla ISR.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: IsrTabla) => {
    try {
      await createIsrTabla(data);
      fetchIsrTabla();
    } catch (err) {
      setError('Error al crear el registro de tabla ISR.');
    }
  };

  const handleUpdate = async (data: IsrTabla) => {
    if (selectedIsrTabla?.isrTablaId) {
      try {
        await updateIsrTabla(selectedIsrTabla.isrTablaId, data);
        fetchIsrTabla();
      } catch (err) {
        setError('Error al actualizar el registro de tabla ISR.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteIsrTabla(deleteId);
        fetchIsrTabla();
      } catch (err) {
        setError('Error al eliminar el registro de tabla ISR.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (isrTabla?: IsrTabla) => {
    setSelectedIsrTabla(isrTabla || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIsrTabla(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando tabla ISR...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Tabla ISR</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Registro</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Tramo</TableCell>
                <TableCell>Desde</TableCell>
                <TableCell>Hasta</TableCell>
                <TableCell>Tasa (%)</TableCell>
                <TableCell>Cuota Fija</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isrTabla.map((isr) => (
                <TableRow key={isr.isrTablaId}>
                  <TableCell>{isr.isrTablaId}</TableCell>
                  <TableCell>{isr.isrAnio}</TableCell>
                  <TableCell>{isr.isrTramoNum}</TableCell>
                  <TableCell>{isr.isrDesde}</TableCell>
                  <TableCell>{isr.isrHasta}</TableCell>
                  <TableCell>{isr.isrTasa * 100}</TableCell>
                  <TableCell>{isr.isrCuotaFija}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(isr)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(isr.isrTablaId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <IsrTablaForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedIsrTabla ? handleUpdate : handleCreate} initialData={selectedIsrTabla} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este registro? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default IsrTablaPage;
