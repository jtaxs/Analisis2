import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Departamento {
  depDepartamentoId?: number;
  depCodigo: string;
  depNombre: string;
}

interface DepartamentoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Departamento) => void;
  initialData?: Departamento | null;
}

const validationSchema = Yup.object({
  depCodigo: Yup.string().required('El código es requerido'),
  depNombre: Yup.string().required('El nombre es requerido'),
});

const DepartamentoForm: React.FC<DepartamentoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Departamento>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{ depCodigo: initialData?.depCodigo || '', depNombre: initialData?.depNombre || '' }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Departamento' : 'Crear Departamento'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="depCodigo" name="depCodigo" label="Código"
              value={formik.values.depCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.depCodigo && Boolean(formik.errors.depCodigo)} helperText={formik.touched.depCodigo && formik.errors.depCodigo} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="depNombre" name="depNombre" label="Nombre"
              value={formik.values.depNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.depNombre && Boolean(formik.errors.depNombre)} helperText={formik.touched.depNombre && formik.errors.depNombre} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default DepartamentoForm;