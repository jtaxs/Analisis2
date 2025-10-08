"use client";
import React, { useState, useEffect } from 'react';
import { getTiposContrato, createTipoContrato, updateTipoContrato, deleteTipoContrato } from '@/lib/services/tipoContratoService';
import AppLayout from '@/components/AppLayout';
import TipoContratoForm from '@/components/TipoContratoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface TipoContrato {
  tcoTipoContratoId?: number;
  tcoCodigo: string;
  tcoNombre: string;
  tcoActivo?: string;
}

const TipoContratoPage: React.FC = () => {
  const [tiposContrato, setTiposContrato] = useState<TipoContrato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTipoContrato, setSelectedTipoContrato] = useState<TipoContrato | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchTiposContrato();
  }, []);

  const fetchTiposContrato = async () => {
    try {
      setLoading(true);
      const data = await getTiposContrato();
      setTiposContrato(data);
    } catch (err) {
      setError('No se pudo cargar la lista de tipos de contrato.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: TipoContrato) => {
    try {
      await createTipoContrato(data);
      fetchTiposContrato();
    } catch (err) {
      setError('Error al crear el tipo de contrato.');
    }
  };

  const handleUpdate = async (data: TipoContrato) => {
    if (selectedTipoContrato?.tcoTipoContratoId) {
      try {
        await updateTipoContrato(selectedTipoContrato.tcoTipoContratoId, data);
        fetchTiposContrato();
      } catch (err) {
        setError('Error al actualizar el tipo de contrato.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteTipoContrato(deleteId);
        fetchTiposContrato();
      } catch (err) {
        setError('Error al eliminar el tipo de contrato.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (tipoContrato?: TipoContrato) => {
    setSelectedTipoContrato(tipoContrato || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTipoContrato(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando tipos de contrato...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Tipos de Contrato de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Tipo de Contrato</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tiposContrato.map((tc) => (
                <TableRow key={tc.tcoTipoContratoId}>
                  <TableCell>{tc.tcoTipoContratoId}</TableCell>
                  <TableCell>{tc.tcoCodigo}</TableCell>
                  <TableCell>{tc.tcoNombre}</TableCell>
                  <TableCell>{tc.tcoActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(tc)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(tc.tcoTipoContratoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TipoContratoForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedTipoContrato ? handleUpdate : handleCreate} initialData={selectedTipoContrato}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este tipo de contrato? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default TipoContratoPage;
