// lib/services/departamentoService.ts
import api from '../api';

const DEPARTAMENTOS_URL = '/nom-departamento';

export const getDepartamentos = async () => {
  try {
    const response = await api.get(DEPARTAMENTOS_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los departamentos:', error);
    throw error;
  }
};

export const createDepartamento = async (data: any) => {
  try {
    const response = await api.post(DEPARTAMENTOS_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el departamento:', error);
    throw error;
  }
};

export const getDepartamentoById = async (id: number) => {
  try {
    const response = await api.get(`${DEPARTAMENTOS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el departamento con ID ${id}:`, error);
    throw error;
  }
};

export const updateDepartamento = async (id: number, data: any) => {
  try {
    const response = await api.patch(`${DEPARTAMENTOS_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el departamento con ID ${id}:`, error);
    throw error;
  }
};

export const deleteDepartamento = async (id: number) => {
  try {
    const response = await api.delete(`${DEPARTAMENTOS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el departamento con ID ${id}:`, error);
    throw error;
  }
};
