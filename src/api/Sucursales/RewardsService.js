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
    }
};

export default rewardsService;