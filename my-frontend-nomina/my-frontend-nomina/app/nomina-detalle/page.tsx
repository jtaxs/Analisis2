"use client";
import React, { useState, useEffect } from 'react';
import { getNominasDetalle, createNominaDetalle, updateNominaDetalle, deleteNominaDetalle } from '@/lib/services/nominaDetalleService';
import AppLayout from '@/components/AppLayout';
import NominaDetalleForm from '@/components/NominaDetalleForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface NominaDetalle {
  nodDetalleId?: number;
  nomNominaId: number;
  conContratoId: number;
  cncConceptoId: number;
  nodCantidad: number;
  nodMontoUnitario: number;
  nodMontoTotal: number;
  nodEsGravadoIgss: string;
  nodEsGravadoIsr: string;
}

const NominaDetallePage: React.FC = () => {
  const [detalles, setDetalles] = useState<NominaDetalle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDetalle, setSelectedDetalle] = useState<NominaDetalle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchDetalles();
  }, []);

  const fetchDetalles = async () => {
    try {
      setLoading(true);
      const data = await getNominasDetalle();
      setDetalles(data);
    } catch (err) {
      setError('No se pudo cargar la lista de detalles de nómina.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: NominaDetalle) => {
    try {
      await createNominaDetalle(data);
      fetchDetalles();
    } catch (err) {
      setError('Error al crear el detalle de nómina.');
    }
  };

  const handleUpdate = async (data: NominaDetalle) => {
    if (selectedDetalle?.nodDetalleId) {
      try {
        await updateNominaDetalle(selectedDetalle.nodDetalleId, data);
        fetchDetalles();
      } catch (err) {
        setError('Error al actualizar el detalle de nómina.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteNominaDetalle(deleteId);
        fetchDetalles();
      } catch (err) {
        setError('Error al eliminar el detalle de nómina.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (detalle?: NominaDetalle) => {
    setSelectedDetalle(detalle || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDetalle(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando detalles de nómina...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Detalles de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Detalle</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Nómina</TableCell>
                <TableCell>ID Contrato</TableCell>
                <TableCell>ID Concepto</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Monto Unitario</TableCell>
                <TableCell>Monto Total</TableCell>
                <TableCell>Grava IGSS</TableCell>
                <TableCell>Grava ISR</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalles.map((det) => (
                <TableRow key={det.nodDetalleId}>
                  <TableCell>{det.nodDetalleId}</TableCell>
                  <TableCell>{det.nomNominaId}</TableCell>
                  <TableCell>{det.conContratoId}</TableCell>
                  <TableCell>{det.cncConceptoId}</TableCell>
                  <TableCell>{det.nodCantidad}</TableCell>
                  <TableCell>{det.nodMontoUnitario}</TableCell>
                  <TableCell>{det.nodMontoTotal}</TableCell>
                  <TableCell>{det.nodEsGravadoIgss === 'S' ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{det.nodEsGravadoIsr === 'S' ? 'Sí' : 'No'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(det)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(det.nodDetalleId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <NominaDetalleForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedDetalle ? handleUpdate : handleCreate} initialData={selectedDetalle} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este detalle de nómina? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default NominaDetallePage;
