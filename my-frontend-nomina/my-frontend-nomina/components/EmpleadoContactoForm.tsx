import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface EmpleadoContacto {
  ecoContactoId?: number;
  empEmpleadoId: number;
  ecoTipo: string;
  ecoNombre: string;
}

interface EmpleadoContactoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: EmpleadoContacto) => void;
  initialData?: EmpleadoContacto | null;
}

const validationSchema = Yup.object({
  empEmpleadoId: Yup.number().required('El ID del empleado es requerido'),
  ecoTipo: Yup.string().required('El tipo de contacto es requerido'),
  ecoNombre: Yup.string().required('El nombre es requerido'),
});

const EmpleadoContactoForm: React.FC<EmpleadoContactoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<EmpleadoContacto>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        empEmpleadoId: initialData?.empEmpleadoId || 0,
        ecoTipo: initialData?.ecoTipo || '',
        ecoNombre: initialData?.ecoNombre || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Contacto' : 'Crear Contacto'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="empEmpleadoId" name="empEmpleadoId" label="ID Empleado" type="number"
              value={formik.values.empEmpleadoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.empEmpleadoId && Boolean(formik.errors.empEmpleadoId)} helperText={formik.touched.empEmpleadoId && formik.errors.empEmpleadoId} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="ecoTipo" name="ecoTipo" label="Tipo"
              value={formik.values.ecoTipo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.ecoTipo && Boolean(formik.errors.ecoTipo)} helperText={formik.touched.ecoTipo && formik.errors.ecoTipo} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="ecoNombre" name="ecoNombre" label="Nombre"
              value={formik.values.ecoNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.ecoNombre && Boolean(formik.errors.ecoNombre)} helperText={formik.touched.ecoNombre && formik.errors.ecoNombre} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default EmpleadoContactoForm;