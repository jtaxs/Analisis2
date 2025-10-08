import React from 'react';
import { useFormik, FormikProps } from 'formik';
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, IconButton } from '@mui/material';
import * as Yup from 'yup';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface GenericFormDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: T) => void;
  initialValues: T;
  validationSchema: Yup.ObjectSchema<any>;
  title: string;
  children: (formik: FormikProps<T>) => React.ReactNode;
}

export function GenericFormDialog<T>({ 
  open, 
  onClose, 
  onSubmit, 
  initialValues, 
  validationSchema, 
  title, 
  children 
}: GenericFormDialogProps<T>) {
  const formik = useFormik<T>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 16, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' } }}>
      <DialogTitle>{title}</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent dividers>
          {children(formik)}
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
          {/* Botón de Cancelar con un ícono 3 veces más grande */}
          <IconButton onClick={handleClose} color="error" aria-label="cancelar">
            <CloseIcon sx={{ fontSize: '3rem' }} /> 
          </IconButton>
          {/* Botón de Guardar con un ícono 3 veces más grande */}
          <IconButton type="submit" color="primary" aria-label="guardar">
            <SaveIcon sx={{ fontSize: '3rem' }} />
          </IconButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
}