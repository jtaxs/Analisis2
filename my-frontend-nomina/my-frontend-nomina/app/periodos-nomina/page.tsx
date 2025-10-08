"use client";
import React, { useState, useEffect } from 'react';
import { getPeriodosNomina, createPeriodoNomina, updatePeriodoNomina, deletePeriodoNomina } from '@/lib/services/periodoNominaService';
import AppLayout from '@/components/AppLayout';
import PeriodoNominaForm from '@/components/PeriodoNominaForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface PeriodoNomina {
  pnoPeriodoId?: number;
  perPeriodicidadId: number;
  pnoAnio: number;
  pnoNumero: number;
  pnoFechaInicio: string;
  pnoFechaFin: string;
  pnoEstado?: string;
}

const PeriodoNominaPage: React.FC = () => {
  const [periodos, setPeriodos] = useState<PeriodoNomina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPeriodo, setSelectedPeriodo] = useState<PeriodoNomina | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPeriodos();
  }, []);

  const fetchPeriodos = async () => {
    try {
      setLoading(true);
      const data = await getPeriodosNomina();
      setPeriodos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de períodos de nómina.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: PeriodoNomina) => {
    try {
      await createPeriodoNomina(data);
      fetchPeriodos();
    } catch (err) {
      setError('Error al crear el período de nómina.');
    }
  };

  const handleUpdate = async (data: PeriodoNomina) => {
    if (selectedPeriodo?.pnoPeriodoId) {
      try {
        await updatePeriodoNomina(selectedPeriodo.pnoPeriodoId, data);
        fetchPeriodos();
      } catch (err) {
        setError('Error al actualizar el período de nómina.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deletePeriodoNomina(deleteId);
        fetchPeriodos();
      } catch (err) {
        setError('Error al eliminar el período de nómina.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (periodo?: PeriodoNomina) => {
    setSelectedPeriodo(periodo || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPeriodo(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando períodos de nómina...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Períodos de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Período</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Periodicidad</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Número</TableCell>
                <TableCell>Fecha de Inicio</TableCell>
                <TableCell>Fecha de Fin</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {periodos.map((per) => (
                <TableRow key={per.pnoPeriodoId}>
                  <TableCell>{per.pnoPeriodoId}</TableCell>
                  <TableCell>{per.perPeriodicidadId}</TableCell>
                  <TableCell>{per.pnoAnio}</TableCell>
                  <TableCell>{per.pnoNumero}</TableCell>
                  <TableCell>{per.pnoFechaInicio}</TableCell>
                  <TableCell>{per.pnoFechaFin}</TableCell>
                  <TableCell>{per.pnoEstado}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(per)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(per.pnoPeriodoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <PeriodoNominaForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedPeriodo ? handleUpdate : handleCreate} initialData={selectedPeriodo} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este período de nómina? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default PeriodoNominaPage;
