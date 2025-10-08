import api from '../api';

const EMPLEADO_CUENTA_URL = '/nom-empleado-cuenta';

export const getEmpleadosCuenta = async () => {
  const response = await api.get(EMPLEADO_CUENTA_URL);
  return response.data;
};

export const createEmpleadoCuenta = async (data: any) => {
  const response = await api.post(EMPLEADO_CUENTA_URL, data);
  return response.data;
};

export const updateEmpleadoCuenta = async (id: number, data: any) => {
  const response = await api.patch(`${EMPLEADO_CUENTA_URL}/${id}`, data);
  return response.data;
};

export const deleteEmpleadoCuenta = async (id: number) => {
  const response = await api.delete(`${EMPLEADO_CUENTA_URL}/${id}`);
  return response.data;
};
