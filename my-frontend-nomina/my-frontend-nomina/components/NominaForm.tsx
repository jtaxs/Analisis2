import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Nomina {
  nomNominaId?: number;
  pnoPeriodoId: number;
  nomDescripcion: string;
}

interface NominaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Nomina) => void;
  initialData?: Nomina | null;
}

const validationSchema = Yup.object({
  pnoPeriodoId: Yup.number().required('El ID de período es requerido').integer('Debe ser un número entero'),
  nomDescripcion: Yup.string().required('La descripción es requerida'),
});

const NominaForm: React.FC<NominaFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Nomina>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        pnoPeriodoId: initialData?.pnoPeriodoId || 0,
        nomDescripcion: initialData?.nomDescripcion || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Nómina' : 'Crear Nómina'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="pnoPeriodoId" name="pnoPeriodoId" label="ID Período" type="number"
              value={formik.values.pnoPeriodoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.pnoPeriodoId && Boolean(formik.errors.pnoPeriodoId)} helperText={formik.touched.pnoPeriodoId && formik.errors.pnoPeriodoId} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="nomDescripcion" name="nomDescripcion" label="Descripción"
              value={formik.values.nomDescripcion} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.nomDescripcion && Boolean(formik.errors.nomDescripcion)} helperText={formik.touched.nomDescripcion && formik.errors.nomDescripcion} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default NominaForm;