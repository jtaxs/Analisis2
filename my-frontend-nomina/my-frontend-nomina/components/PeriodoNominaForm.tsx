import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface PeriodoNomina {
  pnoPeriodoId?: number;
  perPeriodicidadId: number;
  pnoAnio: number;
  pnoNumero: number;
  pnoFechaInicio: string;
  pnoFechaFin: string;
}

interface PeriodoNominaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: PeriodoNomina) => void;
  initialData?: PeriodoNomina | null;
}

const validationSchema = Yup.object({
  perPeriodicidadId: Yup.number().required('El ID de periodicidad es requerido').integer('Debe ser un número entero'),
  pnoAnio: Yup.number().required('El año es requerido').integer('Debe ser un número entero'),
  pnoNumero: Yup.number().required('El número de período es requerido').integer('Debe ser un número entero'),
  pnoFechaInicio: Yup.string().required('La fecha de inicio es requerida'),
  pnoFechaFin: Yup.string().required('La fecha de fin es requerida'),
});

const PeriodoNominaForm: React.FC<PeriodoNominaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<PeriodoNomina>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        perPeriodicidadId: initialData?.perPeriodicidadId || 0,
        pnoAnio: initialData?.pnoAnio || 0,
        pnoNumero: initialData?.pnoNumero || 0,
        pnoFechaInicio: initialData?.pnoFechaInicio || '',
        pnoFechaFin: initialData?.pnoFechaFin || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Período de Nómina' : 'Crear Período de Nómina'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="perPeriodicidadId" name="perPeriodicidadId" label="ID Periodicidad" type="number"
              value={formik.values.perPeriodicidadId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.perPeriodicidadId && Boolean(formik.errors.perPeriodicidadId)} helperText={formik.touched.perPeriodicidadId && formik.errors.perPeriodicidadId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pnoAnio" name="pnoAnio" label="Año" type="number"
              value={formik.values.pnoAnio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pnoAnio && Boolean(formik.errors.pnoAnio)} helperText={formik.touched.pnoAnio && formik.errors.pnoAnio} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pnoNumero" name="pnoNumero" label="Número de Período" type="number"
              value={formik.values.pnoNumero} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pnoNumero && Boolean(formik.errors.pnoNumero)} helperText={formik.touched.pnoNumero && formik.errors.pnoNumero} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pnoFechaInicio" name="pnoFechaInicio" label="Fecha de Inicio" type="date"
              InputLabelProps={{ shrink: true }} value={formik.values.pnoFechaInicio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pnoFechaInicio && Boolean(formik.errors.pnoFechaInicio)} helperText={formik.touched.pnoFechaInicio && formik.errors.pnoFechaInicio} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="pnoFechaFin" name="pnoFechaFin" label="Fecha de Fin" type="date"
              InputLabelProps={{ shrink: true }} value={formik.values.pnoFechaFin} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pnoFechaFin && Boolean(formik.errors.pnoFechaFin)} helperText={formik.touched.pnoFechaFin && formik.errors.pnoFechaFin} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default PeriodoNominaForm;