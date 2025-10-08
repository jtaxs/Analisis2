import api from '../api';

const BANCO_URL = '/nom-banco';

export const getBancos = async () => {
  const response = await api.get(BANCO_URL);
  return response.data;
};

export const createBanco = async (data: any) => {
  const response = await api.post(BANCO_URL, data);
  return response.data;
};

export const updateBanco = async (id: number, data: any) => {
  const response = await api.patch(`${BANCO_URL}/${id}`, data);
  return response.data;
};

export const deleteBanco = async (id: number) => {
  const response = await api.delete(`${BANCO_URL}/${id}`);
  return response.data;
};
