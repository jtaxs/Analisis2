// hooks/useCrud.ts
import { useState, useEffect, useCallback } from 'react';

// Interfaz para los servicios que el hook necesitará
interface CrudService<T> {
    get: () => Promise<T[]>;
    create: (data: T) => Promise<T>;
    update: (id: number, data: T) => Promise<T>;
    del: (id: number) => Promise<void>;
}

// El hook personalizado
export const useCrud = <T extends { id?: number }>(service: CrudService<T>) => {
    // --- Estados internos del hook ---
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<T | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // --- Lógica para obtener los datos (memoizada con useCallback) ---
    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const data = await service.get();
            setItems(data);
            setError(null);
        } catch (err) {
            setError(`No se pudieron cargar los datos.`);
        } finally {
            setLoading(false);
        }
    }, [service]);

    // --- Efecto para cargar los datos al iniciar ---
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    // --- Funciones de manejo que el hook devolverá ---
    const handleSave = async (data: T) => {
        try {
            if (data.id) {
                await service.update(data.id, data);
            } else {
                await service.create(data);
            }
            await fetchItems(); // Recargar lista
        } catch (err) {
            setError(data.id ? 'Error al actualizar.' : 'Error al crear.');
        } finally {
            setIsDialogOpen(false);
            setSelectedItem(null);
        }
    };

    const handleDelete = async () => {
        if (deleteId) {
            try {
                await service.del(deleteId);
                await fetchItems(); // Recargar lista
            } catch (err) {
                setError('Error al eliminar.');
            } finally {
                setIsDeleteDialogOpen(false);
                setDeleteId(null);
            }
        }
    };

    // --- Manejadores para los diálogos ---
    const handleOpenDialog = (item?: T) => {
        setSelectedItem(item || null);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedItem(null);
    };
    
    const handleOpenDeleteDialog = (id: number) => {
        setDeleteId(id);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeleteId(null);
    };
    
    // --- El hook retorna todo lo que la página necesita ---
    return {
        items,
        loading,
        error,
        isDialogOpen,
        selectedItem,
        isDeleteDialogOpen,
        handleSave,
        handleDelete,
        handleOpenDialog,
        handleCloseDialog,
        handleOpenDeleteDialog,
        handleCloseDeleteDialog,
    };
};
