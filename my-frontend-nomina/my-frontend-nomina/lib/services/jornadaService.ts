import api from '../api';

const JORNADA_URL = '/nom-jornada';

export const getJornadas = async () => {
  const response = await api.get(JORNADA_URL);
  return response.data;
};

export const createJornada = async (data: any) => {
  const response = await api.post(JORNADA_URL, data);
  return response.data;
};

export const updateJornada = async (id: number, data: any) => {
  const response = await api.patch(`${JORNADA_URL}/${id}`, data);
  return response.data;
};

export const deleteJornada = async (id: number) => {
  const response = await api.delete(`${JORNADA_URL}/${id}`);
  return response.data;
};
