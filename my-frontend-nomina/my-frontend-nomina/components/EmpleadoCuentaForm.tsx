import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface EmpleadoCuenta {
  ebcCuentaId?: number;
  empEmpleadoId: number;
  banBancoId: number;
  ebcTipo: string;
  ebcNumero: string;
}

interface EmpleadoCuentaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: EmpleadoCuenta) => void;
  initialData?: EmpleadoCuenta | null;
}

const validationSchema = Yup.object({
  empEmpleadoId: Yup.number().required('El ID del empleado es requerido'),
  banBancoId: Yup.number().required('El ID del banco es requerido'),
  ebcTipo: Yup.string().required('El tipo de cuenta es requerido'),
  ebcNumero: Yup.string().required('El número de cuenta es requerido'),
});

const EmpleadoCuentaForm: React.FC<EmpleadoCuentaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<EmpleadoCuenta>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        empEmpleadoId: initialData?.empEmpleadoId || 0,
        banBancoId: initialData?.banBancoId || 0,
        ebcTipo: initialData?.ebcTipo || '',
        ebcNumero: initialData?.ebcNumero || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Cuenta de Empleado' : 'Crear Cuenta de Empleado'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="empEmpleadoId" name="empEmpleadoId" label="ID Empleado" type="number"
              value={formik.values.empEmpleadoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.empEmpleadoId && Boolean(formik.errors.empEmpleadoId)} helperText={formik.touched.empEmpleadoId && formik.errors.empEmpleadoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="banBancoId" name="banBancoId" label="ID Banco" type="number"
              value={formik.values.banBancoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.banBancoId && Boolean(formik.errors.banBancoId)} helperText={formik.touched.banBancoId && formik.errors.banBancoId} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="ebcTipo" name="ebcTipo" label="Tipo"
              value={formik.values.ebcTipo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.ebcTipo && Boolean(formik.errors.ebcTipo)} helperText={formik.touched.ebcTipo && formik.errors.ebcTipo} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="ebcNumero" name="ebcNumero" label="Número de Cuenta"
              value={formik.values.ebcNumero} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.ebcNumero && Boolean(formik.errors.ebcNumero)} helperText={formik.touched.ebcNumero && formik.errors.ebcNumero} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default EmpleadoCuentaForm;