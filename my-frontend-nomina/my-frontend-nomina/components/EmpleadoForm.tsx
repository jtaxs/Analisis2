import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  useTheme,
} from '@mui/material';

interface Empleado {
  empEmpleadoId?: number;
  empCodigoEmp: string;
  empNombres: string;
  empApellidos: string;
  empDpi?: string;
  empNit?: string;
  empFechaNac?: string;
}

interface EmpleadoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Empleado) => void;
  initialData?: Empleado | null;
}

const validationSchema = Yup.object({
  empCodigoEmp: Yup.string().required('El código es requerido'),
  empNombres: Yup.string().required('El nombre es requerido'),
  empApellidos: Yup.string().required('El apellido es requerido'),
  empDpi: Yup.string()
    .nullable()
    .max(13, 'El DPI debe tener 13 dígitos'),
  empNit: Yup.string()
    .nullable()
    .max(9, 'El NIT no puede tener más de 9 caracteres'),
  empFechaNac: Yup.string().nullable(),
});

const EmpleadoForm: React.FC<EmpleadoFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const formik = useFormik({
    initialValues: {
      empCodigoEmp: initialData?.empCodigoEmp || '',
      empNombres: initialData?.empNombres || '',
      empApellidos: initialData?.empApellidos || '',
      empDpi: initialData?.empDpi || '',
      empNit: initialData?.empNit || '',
      empFechaNac: initialData?.empFechaNac || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
    },
    enableReinitialize: true,
  });

  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 16,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
        },
      }}
    >
      <DialogTitle>{initialData ? 'Editar Empleado' : 'Crear Empleado'}</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empCodigoEmp"
                name="empCodigoEmp"
                label="Código de Empleado"
                variant="outlined"
                value={formik.values.empCodigoEmp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.empCodigoEmp &&
                  Boolean(formik.errors.empCodigoEmp)
                }
                helperText={
                  formik.touched.empCodigoEmp && formik.errors.empCodigoEmp
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empNombres"
                name="empNombres"
                label="Nombres"
                variant="outlined"
                value={formik.values.empNombres}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.empNombres &&
                  Boolean(formik.errors.empNombres)
                }
                helperText={
                  formik.touched.empNombres && formik.errors.empNombres
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empApellidos"
                name="empApellidos"
                label="Apellidos"
                variant="outlined"
                value={formik.values.empApellidos}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.empApellidos &&
                  Boolean(formik.errors.empApellidos)
                }
                helperText={
                  formik.touched.empApellidos && formik.errors.empApellidos
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empDpi"
                name="empDpi"
                label="DPI"
                variant="outlined"
                value={formik.values.empDpi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.empDpi && Boolean(formik.errors.empDpi)}
                helperText={formik.touched.empDpi && formik.errors.empDpi}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empNit"
                name="empNit"
                label="NIT"
                variant="outlined"
                value={formik.values.empNit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.empNit && Boolean(formik.errors.empNit)}
                helperText={formik.touched.empNit && formik.errors.empNit}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="empFechaNac"
                name="empFechaNac"
                label="Fecha de Nacimiento"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={formik.values.empFechaNac}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.empFechaNac &&
                  Boolean(formik.errors.empFechaNac)
                }
                helperText={
                  formik.touched.empFechaNac && formik.errors.empFechaNac
                }
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 8,
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} variant="outlined" color="error">
            Cancelar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EmpleadoForm;