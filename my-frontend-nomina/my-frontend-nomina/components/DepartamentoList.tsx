// components/DepartamentoList.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { getDepartamentos } from '@/lib/services/departamentoService';
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
  Alert
} from '@mui/material';

interface Departamento {
  depDepartamentoId: number;
  depCodigo: string;
  depNombre: string;
  depActivo: string;
}

const DepartamentoList: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await getDepartamentos();
        setDepartamentos(data);
      } catch (err) {
        setError('No se pudo cargar la lista de departamentos.');
      } finally {
        setLoading(false);
      }
    };
    fetchDepartamentos();
  }, []);

  if (loading) {
    return (
      <Container style={{ textAlign: 'center', marginTop: '20px' }}>
        <CircularProgress />
        <Typography variant="body1">Cargando departamentos...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ marginTop: '20px' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Departamentos de Nómina
      </Typography>
      <Paper elevation={3}>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Código</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departamentos.map((dep) => (
                <TableRow key={dep.depDepartamentoId}>
                  <TableCell>{dep.depDepartamentoId}</TableCell>
                  <TableCell>{dep.depCodigo}</TableCell>
                  <TableCell>{dep.depNombre}</TableCell>
                  <TableCell>{dep.depActivo === 'S' ? 'Activo' : 'Inactivo'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default DepartamentoList;
