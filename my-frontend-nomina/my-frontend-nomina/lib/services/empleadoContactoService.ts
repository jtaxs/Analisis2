import api from '../api';

const EMPLEADO_CONTACTO_URL = '/nom-empleado-contacto';

export const getEmpleadosContacto = async () => {
  const response = await api.get(EMPLEADO_CONTACTO_URL);
  return response.data;
};

export const createEmpleadoContacto = async (data: any) => {
  const response = await api.post(EMPLEADO_CONTACTO_URL, data);
  return response.data;
};

export const updateEmpleadoContacto = async (id: number, data: any) => {
  const response = await api.patch(`${EMPLEADO_CONTACTO_URL}/${id}`, data);
  return response.data;
};

export const deleteEmpleadoContacto = async (id: number) => {
  const response = await api.delete(`${EMPLEADO_CONTACTO_URL}/${id}`);
  return response.data;
};
