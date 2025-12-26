import { axiosClient } from '@/api/axiosClient';

const REWARDS_URL = '/sucursal/rewards';

const rewardsService = {
    /**
     * Obtiene las recompensas destacadas o principales.
     */
    async fetchTopRewards() {
        try {
            const response = await axiosClient.get(`${REWARDS_URL}/getTopRewards`);
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener recompensas:", error);
            throw error;
        }
    },
    async fetchAllRewards(page = 1) {
        try {
            // Añadimos el parámetro de página a la URL
            const response = await axiosClient.get(`${REWARDS_URL}/allRewards?page=${page}`);

            // Retornamos TODA la respuesta (que contiene .data y .pagination)
            return response.data;
        } catch (error) {
            console.error("Error al obtener las recompensas:", error);
            throw error;
        }
    }
};

export default rewardsService;