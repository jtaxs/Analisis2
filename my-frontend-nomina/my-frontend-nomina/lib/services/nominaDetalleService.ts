import api from '../api';

const NOMINA_DETALLE_URL = '/nom-nomina-detalle';

export const getNominasDetalle = async () => {
  const response = await api.get(NOMINA_DETALLE_URL);
  return response.data;
};

export const createNominaDetalle = async (data: any) => {
  const response = await api.post(NOMINA_DETALLE_URL, data);
  return response.data;
};

export const updateNominaDetalle = async (id: number, data: any) => {
  const response = await api.patch(`${NOMINA_DETALLE_URL}/${id}`, data);
  return response.data;
};

export const deleteNominaDetalle = async (id: number) => {
  const response = await api.delete(`${NOMINA_DETALLE_URL}/${id}`);
  return response.data;
};
