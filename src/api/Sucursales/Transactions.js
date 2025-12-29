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
    },

    async fetchTransactionCount() {
        try {
            const response = await axiosClient.get('/sucursal/transactions/countTransactions');
            return response.data;
        } catch (error) {
            console.error("Error al obtener el conteo:", error);
            throw error;
        }
    },

    async fetchCanjesCount() {
        try {
            const response = await axiosClient.get('/sucursal/transactions/countCanjes');
            return response.data;
        } catch (error) {
            console.error("Error al obtener el conteo:", error);
            throw error;
        }
    },

    async getTotalTransaccionesCount() {
        try {
            const response = await axiosClient.get('/sucursal/transactions/getTotalCanjesByUser');
            return response.data;

        } catch (error) {
            console.error("Error al obtener el total de transacciones:", error);
            throw error;
        }
    },

    async getTotalTransacitonsByUser(page = 1) {
        try {
            const response = await axiosClient.get(`/sucursal/transactions/getTotalTransacitonsByUser?page=${page}`);
            return response;
        } catch (error) {
            console.error("Error al obtener transacciones:", error);
            throw error;
        }
    },
};

export default transactionService;