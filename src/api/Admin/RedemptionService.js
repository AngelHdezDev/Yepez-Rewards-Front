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
    }

};

export default redemptionService;