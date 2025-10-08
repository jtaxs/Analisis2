import api from '../api';

const NOMINA_URL = '/nom-nomina';

export const getNominas = async () => {
  const response = await api.get(NOMINA_URL);
  return response.data;
};

export const createNomina = async (data: any) => {
  const response = await api.post(NOMINA_URL, data);
  return response.data;
};

export const updateNomina = async (id: number, data: any) => {
  const response = await api.patch(`${NOMINA_URL}/${id}`, data);
  return response.data;
};

export const deleteNomina = async (id: number) => {
  const response = await api.delete(`${NOMINA_URL}/${id}`);
  return response.data;
};
