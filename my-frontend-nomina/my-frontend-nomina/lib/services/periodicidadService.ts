import api from '../api';

const PERIODICIDAD_URL = '/nom-periodicidad';

export const getPeriodicidades = async () => {
  const response = await api.get(PERIODICIDAD_URL);
  return response.data;
};

export const createPeriodicidad = async (data: any) => {
  const response = await api.post(PERIODICIDAD_URL, data);
  return response.data;
};

export const updatePeriodicidad = async (id: number, data: any) => {
  const response = await api.patch(`${PERIODICIDAD_URL}/${id}`, data);
  return response.data;
};

export const deletePeriodicidad = async (id: number) => {
  const response = await api.delete(`${PERIODICIDAD_URL}/${id}`);
  return response.data;
};
