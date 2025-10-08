// app/puestos/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  getPuestos,
  createPuesto,
  updatePuesto,
  deletePuesto,
} from '@/lib/services/puestoService';
import AppLayout from '@/components/AppLayout';
import PuestoForm from '@/components/PuestoForm';
import {
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Puesto {
  puePuestoId?: number;
  pueCodigo: string;
  pueNombre: string;
  pueActivo?: string;
}

const PuestoPage: React.FC = () => {
  const [puestos, setPuestos] = useState<Puesto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPuesto, setSelectedPuesto] = useState<Puesto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchPuestos();
  }, []);

  const fetchPuestos = async () => {
    try {
      setLoading(true);
      const data = await getPuestos();
      setPuestos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de puestos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Puesto) => {
    try {
      await createPuesto(data);
      fetchPuestos();
    } catch (err) {
      setError('Error al crear el puesto.');
    }
  };

  const handleUpdate = async (data: Puesto) => {
    if (selectedPuesto?.puePuestoId) {
      try {
        await updatePuesto(selectedPuesto.puePuestoId, data);
        fetchPuestos();
      } catch (err) {
        setError('Error al actualizar el puesto.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deletePuesto(deleteId);
        fetchPuestos();
      } catch (err) {
        setError('Error al eliminar el puesto.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (puesto?: Puesto) => {
    setSelectedPuesto(puesto || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPuesto(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) {
    return (
      <AppLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography variant="body1">Cargando puestos...</Typography>
        </Box>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">
          Puestos de Nómina
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Agregar Puesto
        </Button>
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
              {puestos.map((pue) => (
                <TableRow key={pue.puePuestoId}>
                  <TableCell>{pue.puePuestoId}</TableCell>
                  <TableCell>{pue.pueCodigo}</TableCell>
                  <TableCell>{pue.pueNombre}</TableCell>
                  <TableCell>{pue.pueActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(pue)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(pue.puePuestoId!)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <PuestoForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedPuesto ? handleUpdate : handleCreate}
        initialData={selectedPuesto}
      />

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este puesto? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default PuestoPage;
