import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Banco {
  banBancoId?: number;
  banCodigo: string;
  banNombre: string;
}

interface BancoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Banco) => void;
  initialData?: Banco | null;
}

const validationSchema = Yup.object({
  banCodigo: Yup.string()
    .required('El código es requerido')
    .min(2, 'El código debe tener al menos 2 caracteres')
    .max(10, 'El código no puede tener más de 10 caracteres'),
  banNombre: Yup.string()
    .required('El nombre es requerido')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
});

const BancoForm: React.FC<BancoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Banco>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{ banCodigo: initialData?.banCodigo || '', banNombre: initialData?.banNombre || '' }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Banco' : 'Crear Banco'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="banCodigo"
              name="banCodigo"
              label="Código"
              variant="outlined"
              value={formik.values.banCodigo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.banCodigo && Boolean(formik.errors.banCodigo)}
              helperText={formik.touched.banCodigo && formik.errors.banCodigo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="banNombre"
              name="banNombre"
              label="Nombre"
              variant="outlined"
              value={formik.values.banNombre}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.banNombre && Boolean(formik.errors.banNombre)}
              helperText={formik.touched.banNombre && formik.errors.banNombre}
            />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default BancoForm;