"use client";
import React, { useState, useEffect } from 'react';
import { getNominas, createNomina, updateNomina, deleteNomina } from '@/lib/services/nominaService';
import AppLayout from '@/components/AppLayout';
import NominaForm from '@/components/NominaForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Nomina {
  nomNominaId?: number;
  pnoPeriodoId: number;
  nomFechaCalculo: string;
  nomDescripcion: string;
  nomEstado: string;
}

const NominaPage: React.FC = () => {
  const [nominas, setNominas] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedNomina, setSelectedNomina] = useState<Nomina | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchNominas();
  }, []);

  const fetchNominas = async () => {
    try {
      setLoading(true);
      const data = await getNominas();
      setNominas(data);
    } catch (err) {
      setError('No se pudo cargar la lista de nóminas.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Nomina) => {
    try {
      await createNomina(data);
      fetchNominas();
    } catch (err) {
      setError('Error al crear la nómina.');
    }
  };

  const handleUpdate = async (data: Nomina) => {
    if (selectedNomina?.nomNominaId) {
      try {
        await updateNomina(selectedNomina.nomNominaId, data);
        fetchNominas();
      } catch (err) {
        setError('Error al actualizar la nómina.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteNomina(deleteId);
        fetchNominas();
      } catch (err) {
        setError('Error al eliminar la nómina.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (nomina?: Nomina) => {
    setSelectedNomina(nomina || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNomina(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando nóminas...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Nóminas</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Nómina</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>ID Período</TableCell>
                <TableCell>Fecha de Cálculo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nominas.map((nom) => (
                <TableRow key={nom.nomNominaId}>
                  <TableCell>{nom.nomNominaId}</TableCell>
                  <TableCell>{nom.pnoPeriodoId}</TableCell>
                  <TableCell>{nom.nomFechaCalculo}</TableCell>
                  <TableCell>{nom.nomDescripcion}</TableCell>
                  <TableCell>{nom.nomEstado}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(nom)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(nom.nomNominaId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <NominaForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedNomina ? handleUpdate : handleCreate} initialData={selectedNomina} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar esta nómina? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default NominaPage;
