import api from '../api';

const CONTRATO_URL = '/nom-contrato';

export const getContratos = async () => {
  const response = await api.get(CONTRATO_URL);
  return response.data;
};

export const createContrato = async (data: any) => {
  const response = await api.post(CONTRATO_URL, data);
  return response.data;
};

export const updateContrato = async (id: number, data: any) => {
  const response = await api.patch(`${CONTRATO_URL}/${id}`, data);
  return response.data;
};

export const deleteContrato = async (id: number) => {
  const response = await api.delete(`${CONTRATO_URL}/${id}`);
  return response.data;
};
