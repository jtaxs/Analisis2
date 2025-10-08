// lib/services/puestoService.ts
import api from '../api';

const PUESTOS_URL = '/nom-puesto';

export const getPuestos = async () => {
  try {
    const response = await api.get(PUESTOS_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los puestos:', error);
    throw error;
  }
};

export const createPuesto = async (data: any) => {
  try {
    const response = await api.post(PUESTOS_URL, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear el puesto:', error);
    throw error;
  }
};

export const updatePuesto = async (id: number, data: any) => {
  try {
    const response = await api.patch(`${PUESTOS_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar el puesto con ID ${id}:`, error);
    throw error;
  }
};

export const deletePuesto = async (id: number) => {
  try {
    const response = await api.delete(`${PUESTOS_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar el puesto con ID ${id}:`, error);
    throw error;
  }
};
