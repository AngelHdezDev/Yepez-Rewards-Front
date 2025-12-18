import { axiosClient } from '@/api/axiosClient';

const redeemService = {
    /**
     * Realiza el canje de un premio para un cliente específico.
     * @param {Object} data { cliente_id: Number, premio_id: Number }
     */
    async postRedeem(data) {
        try {
            // Usamos la ruta exacta que tienes en tu Postman
            const response = await axiosClient.post('/sucursal/redeem', data);
            return response.data;
        } catch (error) {
            // Capturamos el error detallado de Laravel si existe
            throw error.response?.data || new Error('Error al procesar el canje');
        }
    }
};

export default redeemService;