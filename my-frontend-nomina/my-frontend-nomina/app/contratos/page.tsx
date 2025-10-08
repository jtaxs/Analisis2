"use client";
import React, { useState, useEffect } from 'react';
import { getContratos, createContrato, updateContrato, deleteContrato } from '@/lib/services/contratoService';
import AppLayout from '@/components/AppLayout';
import ContratoForm from '@/components/ContratoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Contrato {
  conContratoId?: number;
  empEmpleadoId: number;
  puePuestoId: number;
  depDepartamentoId: number;
  tcoTipoContratoId: number;
  perPeriodicidadId: number;
  jorJornadaId: number;
  conFechaInicio: string;
  conFechaFin?: string;
  conSalarioBase: number;
  conEstado?: string;
}

const ContratoPage: React.FC = () => {
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedContrato, setSelectedContrato] = useState<Contrato | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchContratos();
  }, []);

  const fetchContratos = async () => {
    try {
      setLoading(true);
      const data = await getContratos();
      setContratos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de contratos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Contrato) => {
    try {
      await createContrato(data);
      fetchContratos();
    } catch (err) {
      setError('Error al crear el contrato.');
    }
  };

  const handleUpdate = async (data: Contrato) => {
    if (selectedContrato?.conContratoId) {
      try {
        await updateContrato(selectedContrato.conContratoId, data);
        fetchContratos();
      } catch (err) {
        setError('Error al actualizar el contrato.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteContrato(deleteId);
        fetchContratos();
      } catch (err) {
        setError('Error al eliminar el contrato.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (contrato?: Contrato) => {
    setSelectedContrato(contrato || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContrato(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando contratos...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Contratos de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Contrato</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Contrato</TableCell>
                <TableCell>ID Empleado</TableCell>
                <TableCell>ID Puesto</TableCell>
                <TableCell>ID Dpto</TableCell>
                <TableCell>Fecha Inicio</TableCell>
                <TableCell>Salario Base</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contratos.map((con) => (
                <TableRow key={con.conContratoId}>
                  <TableCell>{con.conContratoId}</TableCell>
                  <TableCell>{con.empEmpleadoId}</TableCell>
                  <TableCell>{con.puePuestoId}</TableCell>
                  <TableCell>{con.depDepartamentoId}</TableCell>
                  <TableCell>{con.conFechaInicio}</TableCell>
                  <TableCell>{con.conSalarioBase}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(con)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(con.conContratoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <ContratoForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedContrato ? handleUpdate : handleCreate} initialData={selectedContrato}/>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este contrato? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default ContratoPage;
