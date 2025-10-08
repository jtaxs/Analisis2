// components/GenericCrudDialog.tsx
import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, Grid, Box, Typography, TextField, IconButton, 
    Divider 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// Interfaz para definir la configuración de un campo del formulario
export interface FieldConfig {
    name: string;
    label: string;
    gridProps?: { xs?: number, sm?: number }; // Para controlar el layout
}

// Props del componente genérico. Usamos <T> para que acepte cualquier tipo de objeto.
interface GenericDialogProps<T> {
    item: T | null;
    open: boolean;
    onClose: () => void;
    onSave: (item: T) => void;
    title: string; // Título del modal (ej. "Departamento")
    fields: FieldConfig[]; // Array de configuración de los campos
}

// Definimos que el tipo genérico T debe tener al menos una propiedad 'id'
const GenericCrudDialog = <T extends { id: any }>({ 
    item, 
    open, 
    onClose, 
    onSave, 
    title, 
    fields 
}: GenericDialogProps<T>) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<T | null>(item);

    useEffect(() => {
        setFormData(item);
        // Si el item es nuevo (no tiene id), entra en modo edición directamente.
        setIsEditing(!item?.id); 
    }, [item]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({ ...formData, [event.target.name]: event.target.value });
        }
    };

    const handleSave = () => {
        if (formData) {
            onSave(formData);
            if(formData.id) setIsEditing(false); // Si no es nuevo, vuelve a modo vista
        }
    };

    const handleCancel = () => {
        setFormData(item);
        if (item?.id) { // Solo vuelve a modo vista si es un registro existente
            setIsEditing(false);
        } else {
            onClose(); // Si es nuevo, cierra el modal
        }
    };

    if (!item) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{isEditing ? `Editar ${title}` : `Detalles de ${title}`}</Typography>
                <IconButton onClick={onClose}><CloseIcon /></IconButton>
            </DialogTitle>
            <Divider />

            <DialogContent>
                {isEditing ? (
                    /* ----- MODO EDICIÓN: Renderiza TextFields a partir de 'fields' ----- */
                    <Grid container spacing={2} sx={{ p: 1, mt: 1 }}>
                        {fields.map((field) => (
                            <Grid item key={field.name} {...(field.gridProps || { xs: 12 })}>
                                <TextField
                                    fullWidth
                                    name={field.name}
                                    label={field.label}
                                    value={(formData as any)[field.name] || ''}
                                    onChange={handleInputChange}
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    /* ----- MODO VISTA: Renderiza texto a partir de 'fields' ----- */
                    <Box sx={{ p: 2 }}>
                        {fields.map((field) => (
                            <Box key={field.name} sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">{field.label}</Typography>
                                <Typography variant="h6" component="p">{(item as any)[field.name]}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </DialogContent>

            <Divider />
            <DialogActions sx={{ p: '16px 24px' }}>
                {isEditing ? (
                    <>
                        <Button onClick={handleCancel} color="inherit">Cancelar</Button>
                        <Button onClick={handleSave} variant="contained" color="secondary">Guardar</Button>
                    </>
                ) : (
                    <Button variant="contained" startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                        Editar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default GenericCrudDialog;
