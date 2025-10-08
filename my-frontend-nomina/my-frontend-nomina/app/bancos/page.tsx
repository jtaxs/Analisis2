// app/bancos/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { getBancos, createBanco, updateBanco, deleteBanco } from '@/lib/services/bancoService';
import AppLayout from '@/components/AppLayout';
import BancoForm from '@/components/BancoForm';
import { Container, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, Alert, Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination, TextField, InputAdornment, Tooltip, Grid } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

interface Banco {
  banBancoId?: number;
  banCodigo: string;
  banNombre: string;
}

const BancoPage: React.FC = () => {
  const [bancos, setBancos] = useState<Banco[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedBanco, setSelectedBanco] = useState<Banco | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchBancos();
  }, []);

  const fetchBancos = async () => {
    try {
      setLoading(true);
      const data = await getBancos();
      setBancos(data);
    } catch (err) {
      setError('No se pudo cargar la lista de bancos.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: Banco) => {
    try {
      await createBanco(data);
      fetchBancos();
      handleCloseModal();
    } catch (err) {
      setError('Error al crear el banco.');
    }
  };

  const handleUpdate = async (data: Banco) => {
    if (selectedBanco?.banBancoId) {
      try {
        await updateBanco(selectedBanco.banBancoId, data);
        fetchBancos();
        handleCloseModal();
      } catch (err) {
        setError('Error al actualizar el banco.');
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        await deleteBanco(deleteId);
        fetchBancos();
      } catch (err) {
        setError('Error al eliminar el banco.');
      } finally {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
      }
    }
  };

  const handleOpenModal = (banco?: Banco) => {
    setSelectedBanco(banco || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBanco(null);
  };

  const handleOpenDeleteDialog = (id: number) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredBancos = bancos.filter(banco =>
    banco.banNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    banco.banCodigo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBancos = filteredBancos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) return (<AppLayout><Box sx={{ textAlign: 'center', mt: 4 }}><CircularProgress /><Typography variant="body1">Cargando bancos...</Typography></Box></AppLayout>);
  if (error) return (<AppLayout><Box sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Box></AppLayout>);

  return (
    <AppLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>Gestión de Bancos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal()} color="primary">Agregar Banco</Button>
      </Box>

      <Paper elevation={0} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Lista de Bancos</Typography>
          <TextField
            label="Buscar banco"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: 'action.hover' }}>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedBancos.length > 0 ? (
                paginatedBancos.map((b) => (
                  <TableRow key={b.banBancoId}>
                    <TableCell>{b.banBancoId}</TableCell>
                    <TableCell>{b.banCodigo}</TableCell>
                    <TableCell>{b.banNombre}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Editar">
                        <IconButton color="primary" onClick={() => handleOpenModal(b)}><EditIcon /></IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton color="error" onClick={() => handleOpenDeleteDialog(b.banBancoId!)}><DeleteIcon /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">No se encontraron bancos.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBancos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página"
        />
      </Paper>

      <BancoForm
        open={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={selectedBanco ? handleUpdate : handleCreate}
        initialData={selectedBanco}
      />

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent><DialogContentText>¿Estás seguro de que quieres eliminar este banco? Esta acción no se puede deshacer.</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default BancoPage;