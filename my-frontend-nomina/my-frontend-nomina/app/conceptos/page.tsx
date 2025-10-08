"use client";
import React, { useState, useEffect } from 'react';
import { getConceptos, createConcepto, updateConcepto, deleteConcepto } from '@/lib/services/conceptoService';
import AppLayout from '@/components/AppLayout';
import ConceptoForm from '@/components/ConceptoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

interface Concepto {
  cncConceptoId?: number;
  cncCodigo: string;
  cncNombre: string;
  cncTipo: string;
  cncGravaIgss: string;
  cncGravaIsr: string;
  cncActivo: string;
}

const ConceptoPage: React.FC = () => {
  const [conceptos, setConceptos] = useState<Concepto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedConcepto, setSelectedConcepto] = useState<Concepto | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchConceptos();
  }, []);

  const fetchConceptos = async () => {
    try {
      setLoading(true);
      const data = await getConceptos();
      setConceptos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de conceptos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Concepto) => {
    try {
      await createConcepto(data);
      fetchConceptos();
    } catch (err) {
      setError('Error al crear el concepto.');
    }
  };

  const handleUpdate = async (data: Concepto) => {
    if (selectedConcepto?.cncConceptoId) {
      try {
        await updateConcepto(selectedConcepto.cncConceptoId, data);
        fetchConceptos();
      } catch (err) {
        setError('Error al actualizar el concepto.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteConcepto(deleteId);
        fetchConceptos();
      } catch (err) {
        setError('Error al eliminar el concepto.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (concepto?: Concepto) => {
    setSelectedConcepto(concepto || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedConcepto(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando conceptos...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1">Conceptos de Nómina</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()}>Agregar Concepto</Button>
      </Box>
      <Paper elevation={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Grava IGSS</TableCell>
                <TableCell>Grava ISR</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {conceptos.map((conc) => (
                <TableRow key={conc.cncConceptoId}>
                  <TableCell>{conc.cncConceptoId}</TableCell>
                  <TableCell>{conc.cncCodigo}</TableCell>
                  <TableCell>{conc.cncNombre}</TableCell>
                  <TableCell>{conc.cncTipo}</TableCell>
                  <TableCell>{conc.cncGravaIgss === 'S' ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{conc.cncGravaIsr === 'S' ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{conc.cncActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleOpenModal(conc)}><EditIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleOpenDeleteDialog(conc.cncConceptoId!)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <ConceptoForm open={isModalOpen} onClose={handleCloseModal} onSubmit={selectedConcepto ? handleUpdate : handleCreate} initialData={selectedConcepto} />
      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este concepto? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default ConceptoPage;
