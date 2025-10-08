// app/departamentos/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import {
  getDepartamentos,
  createDepartamento,
  updateDepartamento,
  deleteDepartamento,
} from '@/lib/services/departamentoService';
import AppLayout from '@/components/AppLayout';
import DepartamentoForm from '@/components/DepartamentoForm';
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

interface Departamento {
  depDepartamentoId?: number;
  depCodigo: string;
  depNombre: string;
  depActivo?: string;
}

const DepartamentoPage: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState<Departamento | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchDepartamentos();
  }, []);

  const fetchDepartamentos = async () => {
    try {
      setLoading(true);
      const data = await getDepartamentos();
      setDepartamentos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de departamentos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Departamento) => {
    try {
      await createDepartamento(data);
      fetchDepartamentos();
    } catch (err) {
      setError('Error al crear el departamento.');
    }
  };

  const handleUpdate = async (data: Departamento) => {
    if (selectedDepartamento?.depDepartamentoId) {
      try {
        await updateDepartamento(selectedDepartamento.depDepartamentoId, data);
        fetchDepartamentos();
      } catch (err) {
        setError('Error al actualizar el departamento.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteDepartamento(deleteId);
        fetchDepartamentos();
      } catch (err) {
        setError('Error al eliminar el departamento.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (departamento?: Departamento) => {
    setSelectedDepartamento(departamento || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDepartamento(null);
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
          <Typography variant="body1">Cargando departamentos...</Typography>
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
          Departamentos de Nómina
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenModal()}
        >
          Agregar Departamento
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
              {departamentos.map((dep) => (
                <TableRow key={dep.depDepartamentoId}>
                  <TableCell>{dep.depDepartamentoId}</TableCell>
                  <TableCell>{dep.depCodigo}</TableCell>
                  <TableCell>{dep.depNombre}</TableCell>
                  <TableCell>{dep.depActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(dep)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(dep.depDepartamentoId!)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <DepartamentoForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedDepartamento ? handleUpdate : handleCreate}
        initialData={selectedDepartamento}
      />

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que quieres eliminar este departamento? Esta acción no se puede deshacer.
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

export default DepartamentoPage;
