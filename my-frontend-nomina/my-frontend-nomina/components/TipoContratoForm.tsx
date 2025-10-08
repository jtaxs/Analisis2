import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface TipoContrato {
  tcoTipoContratoId?: number;
  tcoCodigo: string;
  tcoNombre: string;
}

interface TipoContratoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: TipoContrato) => void;
  initialData?: TipoContrato | null;
}

const validationSchema = Yup.object({
  tcoCodigo: Yup.string().required('El código es requerido'),
  tcoNombre: Yup.string().required('El nombre es requerido'),
});

const TipoContratoForm: React.FC<TipoContratoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<TipoContrato>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        tcoCodigo: initialData?.tcoCodigo || '',
        tcoNombre: initialData?.tcoNombre || '',
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Tipo de Contrato' : 'Crear Tipo de Contrato'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="tcoCodigo" name="tcoCodigo" label="Código"
              value={formik.values.tcoCodigo} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.tcoCodigo && Boolean(formik.errors.tcoCodigo)} helperText={formik.touched.tcoCodigo && formik.errors.tcoCodigo} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="tcoNombre" name="tcoNombre" label="Nombre"
              value={formik.values.tcoNombre} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.tcoNombre && Boolean(formik.errors.tcoNombre)} helperText={formik.touched.tcoNombre && formik.errors.tcoNombre} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default TipoContratoForm;