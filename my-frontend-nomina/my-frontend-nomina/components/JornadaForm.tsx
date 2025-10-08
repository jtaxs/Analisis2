import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Jornada {
  jorJornadaId?: number;
  jorCodigo: string;
  jorNombre: string;
  jorHorasDiarias: number;
}

interface JornadaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Jornada) => void;
  initialData?: Jornada | null;
}

const validationSchema = Yup.object({
  jorCodigo: Yup.string().required('El código es requerido'),
  jorNombre: Yup.string().required('El nombre es requerido'),
  jorHorasDiarias: Yup.number().required('Las horas diarias son requeridas').min(0.01, 'Debe ser un número positivo'),
});

const JornadaForm: React.FC<JornadaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Jornada>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        jorCodigo: initialData?.jorCodigo || '',
        jorNombre: initialData?.jorNombre || '',
        jorHorasDiarias: initialData?.jorHorasDiarias || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Jornada' : 'Crear Jornada'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="jorCodigo" name="jorCodigo" label="Código"
              value={formik.values.jorCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.jorCodigo && Boolean(formik.errors.jorCodigo)} helperText={formik.touched.jorCodigo && formik.errors.jorCodigo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="jorNombre" name="jorNombre" label="Nombre"
              value={formik.values.jorNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.jorNombre && Boolean(formik.errors.jorNombre)} helperText={formik.touched.jorNombre && formik.errors.jorNombre} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="jorHorasDiarias" name="jorHorasDiarias" label="Horas Diarias" type="number"
              value={formik.values.jorHorasDiarias} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.jorHorasDiarias && Boolean(formik.errors.jorHorasDiarias)} helperText={formik.touched.jorHorasDiarias && formik.errors.jorHorasDiarias} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default JornadaForm;