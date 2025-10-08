import api from '../api';

const CONCEPTO_URL = '/nom-concepto';

export const getConceptos = async () => {
  const response = await api.get(CONCEPTO_URL);
  return response.data;
};

export const createConcepto = async (data: any) => {
  const response = await api.post(CONCEPTO_URL, data);
  return response.data;
};

export const updateConcepto = async (id: number, data: any) => {
  const response = await api.patch(`${CONCEPTO_URL}/${id}`, data);
  return response.data;
};

export const deleteConcepto = async (id: number) => {
  const response = await api.delete(`${CONCEPTO_URL}/${id}`);
  return response.data;
};
