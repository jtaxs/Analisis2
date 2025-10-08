import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface IsrTabla {
  isrTablaId?: number;
  isrAnio: number;
  isrTramoNum: number;
  isrDesde: number;
  isrHasta: number;
  isrTasa: number;
  isrCuotaFija: number;
}

interface IsrTablaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IsrTabla) => void;
  initialData?: IsrTabla | null;
}

const validationSchema = Yup.object({
  isrAnio: Yup.number().required('El año es requerido').integer('Debe ser un número entero').min(1, 'Debe ser un número positivo'),
  isrTramoNum: Yup.number().required('El tramo es requerido').integer('Debe ser un número entero').min(1, 'Debe ser un número positivo'),
  isrDesde: Yup.number().required('El valor "Desde" es requerido').min(0, 'No puede ser un número negativo'),
  isrHasta: Yup.number().nullable().min(0, 'No puede ser un número negativo'),
  isrTasa: Yup.number().required('La tasa es requerida').min(0, 'No puede ser un número negativo'),
  isrCuotaFija: Yup.number().required('La cuota fija es requerida').min(0, 'No puede ser un número negativo'),
});

const IsrTablaForm: React.FC<IsrTablaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<IsrTabla>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        isrAnio: initialData?.isrAnio || 0,
        isrTramoNum: initialData?.isrTramoNum || 0,
        isrDesde: initialData?.isrDesde || 0,
        isrHasta: initialData?.isrHasta || 0,
        isrTasa: initialData?.isrTasa || 0,
        isrCuotaFija: initialData?.isrCuotaFija || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Tabla ISR' : 'Crear Tabla ISR'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrAnio" name="isrAnio" label="Año" type="number"
              value={formik.values.isrAnio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrAnio && Boolean(formik.errors.isrAnio)} helperText={formik.touched.isrAnio && formik.errors.isrAnio} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrTramoNum" name="isrTramoNum" label="Número de Tramo" type="number"
              value={formik.values.isrTramoNum} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrTramoNum && Boolean(formik.errors.isrTramoNum)} helperText={formik.touched.isrTramoNum && formik.errors.isrTramoNum} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrDesde" name="isrDesde" label="Desde" type="number"
              value={formik.values.isrDesde} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrDesde && Boolean(formik.errors.isrDesde)} helperText={formik.touched.isrDesde && formik.errors.isrDesde} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrHasta" name="isrHasta" label="Hasta" type="number"
              value={formik.values.isrHasta} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrHasta && Boolean(formik.errors.isrHasta)} helperText={formik.touched.isrHasta && formik.errors.isrHasta} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrTasa" name="isrTasa" label="Tasa" type="number"
              value={formik.values.isrTasa} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrTasa && Boolean(formik.errors.isrTasa)} helperText={formik.touched.isrTasa && formik.errors.isrTasa} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="isrCuotaFija" name="isrCuotaFija" label="Cuota Fija" type="number"
              value={formik.values.isrCuotaFija} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.isrCuotaFija && Boolean(formik.errors.isrCuotaFija)} helperText={formik.touched.isrCuotaFija && formik.errors.isrCuotaFija} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default IsrTablaForm;