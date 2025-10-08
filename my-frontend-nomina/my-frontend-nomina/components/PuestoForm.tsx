import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Puesto {
  puePuestoId?: number;
  pueCodigo: string;
  pueNombre: string;
}

interface PuestoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Puesto) => void;
  initialData?: Puesto | null;
}

const validationSchema = Yup.object({
  pueCodigo: Yup.string().required('El código es requerido'),
  pueNombre: Yup.string().required('El nombre es requerido'),
});

const PuestoForm: React.FC<PuestoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Puesto>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        pueCodigo: initialData?.pueCodigo || '',
        pueNombre: initialData?.pueNombre || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Puesto' : 'Crear Puesto'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pueCodigo" name="pueCodigo" label="Código"
              value={formik.values.pueCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pueCodigo && Boolean(formik.errors.pueCodigo)} helperText={formik.touched.pueCodigo && formik.errors.pueCodigo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pueNombre" name="pueNombre" label="Nombre"
              value={formik.values.pueNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pueNombre && Boolean(formik.errors.pueNombre)} helperText={formik.touched.pueNombre && formik.errors.pueNombre} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default PuestoForm;