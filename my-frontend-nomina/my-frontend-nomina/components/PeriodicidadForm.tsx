import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Periodicidad {
  perPeriodicidadId?: number;
  perCodigo: string;
  perNombre: string;
  perDiasPromedio: number;
}

interface PeriodicidadFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Periodicidad) => void;
  initialData?: Periodicidad | null;
}

const validationSchema = Yup.object({
  perCodigo: Yup.string().required('El código es requerido'),
  perNombre: Yup.string().required('El nombre es requerido'),
  perDiasPromedio: Yup.number().required('Los días promedio son requeridos').positive('Debe ser un número positivo').integer('Debe ser un número entero'),
});

const PeriodicidadForm: React.FC<PeriodicidadFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Periodicidad>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        perCodigo: initialData?.perCodigo || '',
        perNombre: initialData?.perNombre || '',
        perDiasPromedio: initialData?.perDiasPromedio || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Periodicidad' : 'Crear Periodicidad'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="perCodigo" name="perCodigo" label="Código"
              value={formik.values.perCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.perCodigo && Boolean(formik.errors.perCodigo)} helperText={formik.touched.perCodigo && formik.errors.perCodigo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="perNombre" name="perNombre" label="Nombre"
              value={formik.values.perNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.perNombre && Boolean(formik.errors.perNombre)} helperText={formik.touched.perNombre && formik.errors.perNombre} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="perDiasPromedio" name="perDiasPromedio" label="Días Promedio" type="number"
              value={formik.values.perDiasPromedio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.perDiasPromedio && Boolean(formik.errors.perDiasPromedio)} helperText={formik.touched.perDiasPromedio && formik.errors.perDiasPromedio} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default PeriodicidadForm;