import { axiosClient } from '@/api/axiosClient';
const transactionService = {
    async getTransactions(page = 1, filters = {}) {
        try {
            const response = await axiosClient.get(`admin/transactions/getTransactions`, {
                params: {
                    page: page,
                    start_date: filters.start || null, // Enviamos start_date al back
                    end_date: filters.end || null     // Enviamos end_date al back
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error al obtener transacciones');
        }
    }
};
export default transactionService;