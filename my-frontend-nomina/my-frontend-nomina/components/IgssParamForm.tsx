import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface IgssParam {
  igsParamId?: number;
  igsAnio: number;
  igsTasaPatronal: number;
  igsTasaLaboral: number;
  igsTopeBase: number;
}

interface IgssParamFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: IgssParam) => void;
  initialData?: IgssParam | null;
}

const validationSchema = Yup.object({
  igsAnio: Yup.number().required('El año es requerido').integer('Debe ser un número entero'),
  igsTasaPatronal: Yup.number().required('La tasa patronal es requerida').min(0, 'Debe ser un número positivo'),
  igsTasaLaboral: Yup.number().required('La tasa laboral es requerida').min(0, 'Debe ser un número positivo'),
  igsTopeBase: Yup.number().required('El tope base es requerido').min(0, 'Debe ser un número positivo'),
});

const IgssParamForm: React.FC<IgssParamFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<IgssParam>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        igsAnio: initialData?.igsAnio || 0,
        igsTasaPatronal: initialData?.igsTasaPatronal || 0,
        igsTasaLaboral: initialData?.igsTasaLaboral || 0,
        igsTopeBase: initialData?.igsTopeBase || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Parámetro IGSS' : 'Crear Parámetro IGSS'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="igsAnio" name="igsAnio" label="Año" type="number"
              value={formik.values.igsAnio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.igsAnio && Boolean(formik.errors.igsAnio)} helperText={formik.touched.igsAnio && formik.errors.igsAnio} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="igsTasaPatronal" name="igsTasaPatronal" label="Tasa Patronal (%)" type="number"
              value={formik.values.igsTasaPatronal} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.igsTasaPatronal && Boolean(formik.errors.igsTasaPatronal)} helperText={formik.touched.igsTasaPatronal && formik.errors.igsTasaPatronal} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="igsTasaLaboral" name="igsTasaLaboral" label="Tasa Laboral (%)" type="number"
              value={formik.values.igsTasaLaboral} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.igsTasaLaboral && Boolean(formik.errors.igsTasaLaboral)} helperText={formik.touched.igsTasaLaboral && formik.errors.igsTasaLaboral} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="igsTopeBase" name="igsTopeBase" label="Tope Base" type="number"
              value={formik.values.igsTopeBase} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.igsTopeBase && Boolean(formik.errors.igsTopeBase)} helperText={formik.touched.igsTopeBase && formik.errors.igsTopeBase} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default IgssParamForm;