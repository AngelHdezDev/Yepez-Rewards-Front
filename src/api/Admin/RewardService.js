import { axiosClient } from '@/api/axiosClient';

const rewardService = {
    async getAllRewards(page = 1) {
        try {
            const response = await axiosClient.get(`admin/reward/getAllRewards`, {
                params: { page }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al obtener recompensas');
        }
    },
    async addReward(formData) {
        try {
            const response = await axiosClient.post('admin/reward/addReward', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al crear recompensa');
        }
    },
    async updateReward(id, formData) {
        try {
            const response = await axiosClient.post(`admin/reward/update/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    async desactivateReward(id) {
        try {
            const response = await axiosClient.patch(`admin/reward/desactivate/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al desactivar la recompensa');
        }
    },

    async getTotalRewards() {
        try {
            const response = await axiosClient.get('admin/reward/getTotalRewards');
            return response.data.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al obtener el total de recompensas');
        }
    }
};
export default rewardService;