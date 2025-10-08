"use client";
import React, { useState, useEffect } from 'react';
import { getSalariosHist, createSalarioHist, updateSalarioHist, deleteSalarioHist } from '@/lib/services/salarioHistService';
import AppLayout from '@/components/AppLayout';
import SalarioHistForm from '@/components/SalarioHistForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface SalarioHist {
  salHistId?: number;
  conContratoId: number;
  salFechaEfectiva: string;
  salarioBase: number;
}

const SalarioHistPage: React.FC = () => {
  const [salariosHist, setSalariosHist] = useState<SalarioHist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSalarioHist, setSelectedSalarioHist] = useState<SalarioHist | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchSalariosHist();
  }, []);

  const fetchSalariosHist = async () => {
    try {
      setLoading(true);
      const data = await getSalariosHist();
      setSalariosHist(data);
    } catch (err) {
      setError('No se pudo cargar la lista de historial de salarios.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: SalarioHist) => {
    try {
      await createSalarioHist(data);
      fetchSalariosHist();
    } catch (err) {
      setError('Error al crear el historial de salario.');
    }
  };

  const handleUpdate = async (data: SalarioHist) => {
    if (selectedSalarioHist?.salHistId) {
      try {
        await updateSalarioHist(selectedSalarioHist.salHistId, data);
        fetchSalariosHist();
      } catch (err) {
        setError('Error al actualizar el historial de salario.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteSalarioHist(deleteId);
        fetchSalariosHist();
      } catch (err) {
        setError('Error al eliminar el historial de salario.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (salarioHist?: SalarioHist) => {
    setSelectedSalarioHist(salarioHist || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSalarioHist(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando historial de salarios...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Historial de Salarios</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Historial</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Contrato</TableCell>
                <TableCell>Fecha Efectiva</TableCell>
                <TableCell>Salario Base</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salariosHist.map((sal) => (
                <TableRow key={sal.salHistId}>
                  <TableCell>{sal.salHistId}</TableCell>
                  <TableCell>{sal.conContratoId}</TableCell>
                  <TableCell>{sal.salFechaEfectiva}</TableCell>
                  <TableCell>{sal.salarioBase}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(sal)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(sal.salHistId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <SalarioHistForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedSalarioHist ? handleUpdate : handleCreate} initialData={selectedSalarioHist}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este historial de salario? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default SalarioHistPage;
