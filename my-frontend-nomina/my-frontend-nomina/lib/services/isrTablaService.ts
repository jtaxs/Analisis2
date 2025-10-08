import api from '../api';

const ISR_TABLA_URL = '/nom-isr-tabla';

export const getIsrTabla = async () => {
  const response = await api.get(ISR_TABLA_URL);
  return response.data;
};

export const createIsrTabla = async (data: any) => {
  const response = await api.post(ISR_TABLA_URL, data);
  return response.data;
};

export const updateIsrTabla = async (id: number, data: any) => {
  const response = await api.patch(`${ISR_TABLA_URL}/${id}`, data);
  return response.data;
};

export const deleteIsrTabla = async (id: number) => {
  const response = await api.delete(`${ISR_TABLA_URL}/${id}`);
  return response.data;
};
