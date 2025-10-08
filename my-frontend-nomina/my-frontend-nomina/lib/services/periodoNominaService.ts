import api from '../api';

const PERIODO_NOMINA_URL = '/nom-periodo-nomina';

export const getPeriodosNomina = async () => {
  const response = await api.get(PERIODO_NOMINA_URL);
  return response.data;
};

export const createPeriodoNomina = async (data: any) => {
  const response = await api.post(PERIODO_NOMINA_URL, data);
  return response.data;
};

export const updatePeriodoNomina = async (id: number, data: any) => {
  const response = await api.patch(`${PERIODO_NOMINA_URL}/${id}`, data);
  return response.data;
};

export const deletePeriodoNomina = async (id: number) => {
  const response = await api.delete(`${PERIODO_NOMINA_URL}/${id}`);
  return response.data;
};
