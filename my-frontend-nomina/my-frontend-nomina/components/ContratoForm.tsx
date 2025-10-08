import React from 'react';
import { TextField, Grid } from '@mui/material';
import * as Yup from 'yup';
import { GenericFormDialog } from './GenericFormDialog';

interface Contrato {
  conContratoId?: number;
  empEmpleadoId: number;
  puePuestoId: number;
  depDepartamentoId: number;
  tcoTipoContratoId: number;
  perPeriodicidadId: number;
  jorJornadaId: number;
  conFechaInicio: string;
  conSalarioBase: number;
}

interface ContratoFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: Contrato) => void;
  initialData?: Contrato | null;
}

const validationSchema = Yup.object({
  empEmpleadoId: Yup.number().required('El ID de empleado es requerido'),
  puePuestoId: Yup.number().required('El ID de puesto es requerido'),
  depDepartamentoId: Yup.number().required('El ID de departamento es requerido'),
  tcoTipoContratoId: Yup.number().required('El ID de tipo de contrato es requerido'),
  perPeriodicidadId: Yup.number().required('El ID de periodicidad es requerido'),
  jorJornadaId: Yup.number().required('El ID de jornada es requerido'),
  conFechaInicio: Yup.string().required('La fecha de inicio es requerida'),
  conSalarioBase: Yup.number()
    .required('El salario base es requerido')
    .min(0.01, 'El salario debe ser un número positivo'),
});

const ContratoForm: React.FC<ContratoFormProps> = ({ open, onClose, onSubmit, initialData }) => {
  return (
    <GenericFormDialog<Contrato>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      initialValues={{
        empEmpleadoId: initialData?.empEmpleadoId || 0,
        puePuestoId: initialData?.puePuestoId || 0,
        depDepartamentoId: initialData?.depDepartamentoId || 0,
        tcoTipoContratoId: initialData?.tcoTipoContratoId || 0,
        perPeriodicidadId: initialData?.perPeriodicidadId || 0,
        jorJornadaId: initialData?.jorJornadaId || 0,
        conFechaInicio: initialData?.conFechaInicio || '',
        conSalarioBase: initialData?.conSalarioBase || 0,
      }}
      validationSchema={validationSchema}
      title={initialData ? 'Editar Contrato' : 'Crear Contrato'}
    >
      {(formik) => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="empEmpleadoId" name="empEmpleadoId" label="ID Empleado" type="number"
              value={formik.values.empEmpleadoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.empEmpleadoId && Boolean(formik.errors.empEmpleadoId)} helperText={formik.touched.empEmpleadoId && formik.errors.empEmpleadoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="puePuestoId" name="puePuestoId" label="ID Puesto" type="number"
              value={formik.values.puePuestoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.puePuestoId && Boolean(formik.errors.puePuestoId)} helperText={formik.touched.puePuestoId && formik.errors.puePuestoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="depDepartamentoId" name="depDepartamentoId" label="ID Departamento" type="number"
              value={formik.values.depDepartamentoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.depDepartamentoId && Boolean(formik.errors.depDepartamentoId)} helperText={formik.touched.depDepartamentoId && formik.errors.depDepartamentoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="tcoTipoContratoId" name="tcoTipoContratoId" label="ID Tipo Contrato" type="number"
              value={formik.values.tcoTipoContratoId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.tcoTipoContratoId && Boolean(formik.errors.tcoTipoContratoId)} helperText={formik.touched.tcoTipoContratoId && formik.errors.tcoTipoContratoId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="perPeriodicidadId" name="perPeriodicidadId" label="ID Periodicidad" type="number"
              value={formik.values.perPeriodicidadId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.perPeriodicidadId && Boolean(formik.errors.perPeriodicidadId)} helperText={formik.touched.perPeriodicidadId && formik.errors.perPeriodicidadId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="jorJornadaId" name="jorJornadaId" label="ID Jornada" type="number"
              value={formik.values.jorJornadaId} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.jorJornadaId && Boolean(formik.errors.jorJornadaId)} helperText={formik.touched.jorJornadaId && formik.errors.jorJornadaId} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="conFechaInicio" name="conFechaInicio" label="Fecha Inicio" type="date"
              InputLabelProps={{ shrink: true }} value={formik.values.conFechaInicio} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.conFechaInicio && Boolean(formik.errors.conFechaInicio)} helperText={formik.touched.conFechaInicio && formik.errors.conFechaInicio} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth margin="dense" id="conSalarioBase" name="conSalarioBase" label="Salario Base" type="number"
              value={formik.values.conSalarioBase} onChange={formik.handleChange} onBlur={formik.handleBlur}
              error={formik.touched.conSalarioBase && Boolean(formik.errors.conSalarioBase)} helperText={formik.touched.conSalarioBase && formik.errors.conSalarioBase} />
          </Grid>
        </Grid>
      )}
    </GenericFormDialog>
  );
};

export default ContratoForm;