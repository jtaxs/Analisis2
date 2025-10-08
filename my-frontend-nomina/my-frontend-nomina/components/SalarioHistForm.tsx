import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface SalarioHist {
  salHistId?: number;
  conContratoId: number;
  salFechaEfectiva: string;
  salarioBase: number;
}

interface SalarioHistFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: SalarioHist) => void;
  initialData?: SalarioHist | null;
}

const validationSchema = Yup.object({
  conContratoId: Yup.number().required('El ID del contrato es requerido').integer('Debe ser un número entero'),
  salFechaEfectiva: Yup.string().required('La fecha efectiva es requerida'),
  salarioBase: Yup.number()
    .required('El salario base es requerido')
    .positive('El salario debe ser un número positivo'),
});

const SalarioHistForm: React.FC<SalarioHistFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<SalarioHist>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        conContratoId: initialData?.conContratoId || 0,
        salFechaEfectiva: initialData?.salFechaEfectiva || '',
        salarioBase: initialData?.salarioBase || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Historial de Salario' : 'Crear Historial de Salario'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="conContratoId" name="conContratoId" label="ID Contrato" type="number"
              value={formik.values.conContratoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.conContratoId && Boolean(formik.errors.conContratoId)} helperText={formik.touched.conContratoId && formik.errors.conContratoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="salFechaEfectiva" name="salFechaEfectiva" label="Fecha Efectiva" type="date"
              InputLabelProps={{ shrink: true }} value={formik.values.salFechaEfectiva} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.salFechaEfectiva && Boolean(formik.errors.salFechaEfectiva)} helperText={formik.touched.salFechaEfectiva && formik.errors.salFechaEfectiva} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth margin="dense" id="salarioBase" name="salarioBase" label="Salario Base" type="number"
              value={formik.values.salarioBase} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.salarioBase && Boolean(formik.errors.salarioBase)} helperText={formik.touched.salarioBase && formik.errors.salarioBase} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default SalarioHistForm;