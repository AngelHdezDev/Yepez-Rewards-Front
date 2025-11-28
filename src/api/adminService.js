import { axiosClient } from '@/api/axiosClient';

const ADMIN_USERS_PATH = '/admin/users';

const adminService = {
    /**
     * SIMULACIÓN: Obtiene una lista completa de todos los usuarios.
     * Esto debe ser reemplazado por un endpoint GET /admin/users real
     * cuando esté disponible en el backend.
     */
    getAllUsers: async () => {
        console.warn("ADVERTENCIA: getAllUsers está usando datos simulados. Reemplazar con endpoint real.");
        return [
            { id: 1, name: 'Admin Principal', email: 'admin@rewards.com', balance: 500, roles: [{ name: 'admin' }] },
            { id: 2, name: 'Cliente Ejemplo', email: 'cliente@ejemplo.com', balance: 1200, roles: [{ name: 'sucursal' }] },
        ];
    },

    /**
     * Crea un nuevo usuario (REAL: POST /admin/users).
     * @param {Object} userData - Datos del usuario (name, email, password, role).
     */
    createUser: async (userData) => {
        try {
            const response = await axiosClient.post(ADMIN_USERS_PATH, userData);
            // Retornamos el nuevo usuario creado
            return response.data;
        } catch (error) {
            console.error("Error al crear el usuario:", error.response?.data);
            // Maneja errores de validación
            throw new Error(error.response?.data?.message || error.response?.data?.errors?.email?.[0] || "Fallo al crear usuario.");
        }
    },
};  

export default adminService;