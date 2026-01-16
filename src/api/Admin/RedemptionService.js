import { axiosClient } from '@/api/axiosClient';

const redemptionService = {
    async getAllRedemptions(page = 1, status = 'all') {
        try {
            const response = await axiosClient.get(`admin/redemptions/getAllRedemptions`, {
                params: {
                    page: page,
                    status: status !== 'all' ? status : null
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching redemptions');
        }
    },
    async updateStatus(id, status) {
        try {
            const response = await axiosClient.patch(`/admin/redemptions/${id}/status`, {
                status: status
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al actualizar el estado');
        }
    },

    async getTotalRedemptionsPending() {
        try {
            const response = await axiosClient.get(`/admin/redemptions/getTotalRedemptionsPending`);
            return response.data.data;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching total pending redemptions');
        }
    }

};

export default redemptionService;