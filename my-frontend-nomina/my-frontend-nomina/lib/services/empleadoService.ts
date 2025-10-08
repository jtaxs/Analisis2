import api from '../api';

const EMPLEADOS_URL = '/nom-empleado';

export const getEmpleados = async () => {
  const response = await api.get(EMPLEADOS_URL);
  return response.data;
};

export const createEmpleado = async (data: any) => {
  const response = await api.post(EMPLEADOS_URL, data);
  return response.data;
};

export const updateEmpleado = async (id: number, data: any) => {
  const response = await api.patch(`${EMPLEADOS_URL}/${id}`, data);
  return response.data;
};

export const deleteEmpleado = async (id: number) => {
  const response = await api.delete(`${EMPLEADOS_URL}/${id}`);
  return response.data;
};
