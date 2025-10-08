"use client";
import React, { useState, useEffect } from 'react';
import { getJornadas, createJornada, updateJornada, deleteJornada } from '@/lib/services/jornadaService';
import AppLayout from '@/components/AppLayout';
import JornadaForm from '@/components/JornadaForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Jornada {
  jorJornadaId?: number;
  jorCodigo: string;
  jorNombre: string;
  jorHorasDiarias: number;
}

const JornadaPage: React.FC = () => {
  const [jornadas, setJornadas] = useState<Jornada[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedJornada, setSelectedJornada] = useState<Jornada | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchJornadas();
  }, []);

  const fetchJornadas = async () => {
    try {
      setLoading(true);
      const data = await getJornadas();
      setJornadas(data);
    } catch (err) {
      setError('No se pudo cargar la lista de jornadas.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Jornada) => {
    try {
      await createJornada(data);
      fetchJornadas();
    } catch (err) {
      setError('Error al crear la jornada.');
    }
  };

  const handleUpdate = async (data: Jornada) => {
    if (selectedJornada?.jorJornadaId) {
      try {
        await updateJornada(selectedJornada.jorJornadaId, data);
        fetchJornadas();
      } catch (err) {
        setError('Error al actualizar la jornada.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteJornada(deleteId);
        fetchJornadas();
      } catch (err) {
        setError('Error al eliminar la jornada.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (jornada?: Jornada) => {
    setSelectedJornada(jornada || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJornada(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando jornadas...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Jornadas de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Jornada</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Horas Diarias</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jornadas.map((jor) => (
                <TableRow key={jor.jorJornadaId}>
                  <TableCell>{jor.jorJornadaId}</TableCell>
                  <TableCell>{jor.jorCodigo}</TableCell>
                  <TableCell>{jor.jorNombre}</TableCell>
                  <TableCell>{jor.jorHorasDiarias}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(jor)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(jor.jorJornadaId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <JornadaForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedJornada ? handleUpdate : handleCreate} initialData={selectedJornada}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar esta jornada? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default JornadaPage;
