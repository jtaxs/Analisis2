import React from 'react';
import { TextField, Button, Box, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Concepto {
  cncConceptoId?: number;
  cncCodigo: string;
  cncNombre: string;
  cncTipo: string;
  cncGravaIgss: string;
  cncGravaIsr: string;
}

interface ConceptoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Concepto) => void;
  initialData?: Concepto | null;
}

const validationSchema = Yup.object({
  cncCodigo: Yup.string().required('El código es requerido'),
  cncNombre: Yup.string().required('El nombre es requerido'),
  cncTipo: Yup.string().required('El tipo es requerido'),
  cncGravaIgss: Yup.string().required('Este campo es requerido'),
  cncGravaIsr: Yup.string().required('Este campo es requerido'),
});

const ConceptoForm: React.FC<ConceptoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Concepto>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        cncCodigo: initialData?.cncCodigo || '',
        cncNombre: initialData?.cncNombre || '',
        cncTipo: initialData?.cncTipo || 'PERCEPCION',
        cncGravaIgss: initialData?.cncGravaIgss || 'S',
        cncGravaIsr: initialData?.cncGravaIsr || 'S',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Concepto' : 'Crear Concepto'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="cncCodigo" name="cncCodigo" label="Código"
              value={formik.values.cncCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.cncCodigo && Boolean(formik.errors.cncCodigo)} helperText={formik.touched.cncCodigo && formik.errors.cncCodigo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="cncNombre" name="cncNombre" label="Nombre"
              value={formik.values.cncNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.cncNombre && Boolean(formik.errors.cncNombre)} helperText={formik.touched.cncNombre && formik.errors.cncNombre} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="cncTipo-label">Tipo</InputLabel>
              <Select labelId="cncTipo-label" id="cncTipo" name="cncTipo" value={formik.values.cncTipo} onChange={formik.handleChange}
                error={formik.touched.cncTipo && Boolean(formik.errors.cncTipo)}>
                <MenuItem value="PERCEPCION">PERCEPCION</MenuItem>
                <MenuItem value="DEDUCCION">DEDUCCION</MenuItem>
                <MenuItem value="APORTE_PATRONAL">APORTE_PATRONAL</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="cncGravaIgss-label">Grava IGSS</InputLabel>
              <Select labelId="cncGravaIgss-label" id="cncGravaIgss" name="cncGravaIgss" value={formik.values.cncGravaIgss} onChange={formik.handleChange}
                error={formik.touched.cncGravaIgss && Boolean(formik.errors.cncGravaIgss)}>
                <MenuItem value="S">Sí</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="cncGravaIsr-label">Grava ISR</InputLabel>
              <Select labelId="cncGravaIsr-label" id="cncGravaIsr" name="cncGravaIsr" value={formik.values.cncGravaIsr} onChange={formik.handleChange}
                error={formik.touched.cncGravaIsr && Boolean(formik.errors.cncGravaIsr)}>
                <MenuItem value="S">Sí</MenuItem>
                <MenuItem value="N">No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default ConceptoForm;