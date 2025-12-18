import { axiosClient } from '@/api/axiosClient';
const transactionService = {
    /**
     * Obtiene las últimas transacciones (canjes y acumulaciones)
     */
    async fetchLastTransactions() {
        try {
            const response = await axiosClient.get('/sucursal/transactions/lastTransactions');
            return response.data.data || response.data.transactions || response.data;
        } catch (error) {
            console.error("Error al obtener transacciones:", error);
            throw error;
        }
    }
};

export default transactionService;