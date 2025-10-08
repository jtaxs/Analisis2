"use client";
import React, { useState, useEffect } from 'react';
import { getIgssParams, createIgssParam, updateIgssParam, deleteIgssParam } from '@/lib/services/igssParamService';
import AppLayout from '@/components/AppLayout';
import IgssParamForm from '@/components/IgssParamForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface IgssParam {
  igsParamId?: number;
  igsAnio: number;
  igsTasaPatronal: number;
  igsTasaLaboral: number;
  igsTopeBase: number;
}

const IgssParamPage: React.FC = () => {
  const [params, setParams] = useState<IgssParam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedParam, setSelectedParam] = useState<IgssParam | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchParams();
  }, []);

  const fetchParams = async () => {
    try {
      setLoading(true);
      const data = await getIgssParams();
      setParams(data);
    } catch (err) {
      setError('No se pudo cargar la lista de parámetros IGSS.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: IgssParam) => {
    try {
      await createIgssParam(data);
      fetchParams();
    } catch (err) {
      setError('Error al crear el parámetro IGSS.');
    }
  };

  const handleUpdate = async (data: IgssParam) => {
    if (selectedParam?.igsParamId) {
      try {
        await updateIgssParam(selectedParam.igsParamId, data);
        fetchParams();
      } catch (err) {
        setError('Error al actualizar el parámetro IGSS.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteIgssParam(deleteId);
        fetchParams();
      } catch (err) {
        setError('Error al eliminar el parámetro IGSS.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (param?: IgssParam) => {
    setSelectedParam(param || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedParam(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando parámetros IGSS...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Parámetros IGSS</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Parámetro</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Año</TableCell>
                <TableCell>Tasa Patronal (%)</TableCell>
                <TableCell>Tasa Laboral (%)</TableCell>
                <TableCell>Tope Base</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {params.map((param) => (
                <TableRow key={param.igsParamId}>
                  <TableCell>{param.igsParamId}</TableCell>
                  <TableCell>{param.igsAnio}</TableCell>
                  <TableCell>{param.igsTasaPatronal}</TableCell>
                  <TableCell>{param.igsTasaLaboral}</TableCell>
                  <TableCell>{param.igsTopeBase}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(param)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(param.igsParamId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <IgssParamForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedParam ? handleUpdate : handleCreate} initialData={selectedParam} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este parámetro IGSS? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default IgssParamPage;
