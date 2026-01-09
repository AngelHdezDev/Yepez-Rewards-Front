import { axiosClient } from '@/api/axiosClient';

const rewardService = {
    async getAllRewards(page = 1) {
        try {
            const response = await axiosClient.get(`admin/reward/getAllRewards`, {
                params: { page }
            });
            // console.log('Respuesta de recompensas:', response.data);

            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al obtener recompensas');
        }
    }
};
export default rewardService;