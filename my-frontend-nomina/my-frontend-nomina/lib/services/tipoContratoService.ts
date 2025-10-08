import api from '../api';

const TIPO_CONTRATO_URL = '/nom-tipo-contrato';

export const getTiposContrato = async () => {
  const response = await api.get(TIPO_CONTRATO_URL);
  return response.data;
};

export const createTipoContrato = async (data: any) => {
  const response = await api.post(TIPO_CONTRATO_URL, data);
  return response.data;
};

export const updateTipoContrato = async (id: number, data: any) => {
  const response = await api.patch(`${TIPO_CONTRATO_URL}/${id}`, data);
  return response.data;
};

export const deleteTipoContrato = async (id: number) => {
  const response = await api.delete(`${TIPO_CONTRATO_URL}/${id}`);
  return response.data;
};
