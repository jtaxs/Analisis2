import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface NominaDetalle {
  nodDetalleId?: number;
  nomNominaId: number;
  conContratoId: number;
  cncConceptoId: number;
  nodCantidad: number;
  nodMontoUnitario: number;
  nodMontoTotal: number;
}

interface NominaDetalleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: NominaDetalle) => void;
  initialData?: NominaDetalle | null;
}

const validationSchema = Yup.object({
  nomNominaId: Yup.number().required('El ID de nómina es requerido').integer('Debe ser un número entero'),
  conContratoId: Yup.number().required('El ID de contrato es requerido').integer('Debe ser un número entero'),
  cncConceptoId: Yup.number().required('El ID de concepto es requerido').integer('Debe ser un número entero'),
  nodCantidad: Yup.number().required('La cantidad es requerida').min(0, 'No puede ser un número negativo'),
  nodMontoUnitario: Yup.number().required('El monto unitario es requerido').min(0, 'No puede ser un número negativo'),
  nodMontoTotal: Yup.number().required('El monto total es requerido').min(0, 'No puede ser un número negativo'),
});

const NominaDetalleForm: React.FC<NominaDetalleFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<NominaDetalle>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        nomNominaId: initialData?.nomNominaId || 0,
        conContratoId: initialData?.conContratoId || 0,
        cncConceptoId: initialData?.cncConceptoId || 0,
        nodCantidad: initialData?.nodCantidad || 0,
        nodMontoUnitario: initialData?.nodMontoUnitario || 0,
        nodMontoTotal: initialData?.nodMontoTotal || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Detalle de Nómina' : 'Crear Detalle de Nómina'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="nomNominaId" name="nomNominaId" label="ID Nómina" type="number"
              value={formik.values.nomNominaId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.nomNominaId && Boolean(formik.errors.nomNominaId)} helperText={formik.touched.nomNominaId && formik.errors.nomNominaId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="conContratoId" name="conContratoId" label="ID Contrato" type="number"
              value={formik.values.conContratoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.conContratoId && Boolean(formik.errors.conContratoId)} helperText={formik.touched.conContratoId && formik.errors.conContratoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="cncConceptoId" name="cncConceptoId" label="ID Concepto" type="number"
              value={formik.values.cncConceptoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.cncConceptoId && Boolean(formik.errors.cncConceptoId)} helperText={formik.touched.cncConceptoId && formik.errors.cncConceptoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="nodCantidad" name="nodCantidad" label="Cantidad" type="number"
              value={formik.values.nodCantidad} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.nodCantidad && Boolean(formik.errors.nodCantidad)} helperText={formik.touched.nodCantidad && formik.errors.nodCantidad} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="nodMontoUnitario" name="nodMontoUnitario" label="Monto Unitario" type="number"
              value={formik.values.nodMontoUnitario} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.nodMontoUnitario && Boolean(formik.errors.nodMontoUnitario)} helperText={formik.touched.nodMontoUnitario && formik.errors.nodMontoUnitario} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="nodMontoTotal" name="nodMontoTotal" label="Monto Total" type="number"
              value={formik.values.nodMontoTotal} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.nodMontoTotal && Boolean(formik.errors.nodMontoTotal)} helperText={formik.touched.nodMontoTotal && formik.errors.nodMontoTotal} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default NominaDetalleForm;