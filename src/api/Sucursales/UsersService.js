import { axiosClient } from '@/api/axiosClient';

const userService = {
    async fetchgetPurchaseCapacity() {
        try {
            const response = await axiosClient.get('/sucursal/users/purchaseCapacity');
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener las recompensas:", error);
            throw error;
        }
    }
}

export default userService;