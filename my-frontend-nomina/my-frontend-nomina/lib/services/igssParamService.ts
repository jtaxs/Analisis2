import api from '../api';

const IGSS_PARAM_URL = '/nom-igss-param';

export const getIgssParams = async () => {
  const response = await api.get(IGSS_PARAM_URL);
  return response.data;
};

export const createIgssParam = async (data: any) => {
  const response = await api.post(IGSS_PARAM_URL, data);
  return response.data;
};

export const updateIgssParam = async (id: number, data: any) => {
  const response = await api.patch(`${IGSS_PARAM_URL}/${id}`, data);
  return response.data;
};

export const deleteIgssParam = async (id: number) => {
  const response = await api.delete(`${IGSS_PARAM_URL}/${id}`);
  return response.data;
};
