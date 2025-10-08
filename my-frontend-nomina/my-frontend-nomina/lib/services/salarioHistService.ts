import api from '../api';

const SALARIO_HIST_URL = '/nom-salario-hist';

export const getSalariosHist = async () => {
  const response = await api.get(SALARIO_HIST_URL);
  return response.data;
};

export const createSalarioHist = async (data: any) => {
  const response = await api.post(SALARIO_HIST_URL, data);
  return response.data;
};

export const updateSalarioHist = async (id: number, data: any) => {
  const response = await api.patch(`${SALARIO_HIST_URL}/${id}`, data);
  return response.data;
};

export const deleteSalarioHist = async (id: number) => {
  const response = await api.delete(`${SALARIO_HIST_URL}/${id}`);
  return response.data;
};
