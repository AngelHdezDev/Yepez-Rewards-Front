import { axiosClient } from '@/api/axiosClient';

const ticketService = {
    async getAllTicketsByUser(id, page = 1) {
        try {
            const response = await axiosClient.get(`admin/tickets/getAllTicketsByUser/${id}?page=${page}`);
            return response.data;
        } catch (error) {
            console.error("Error en servicio de tickets:", error);
            throw error;
        }
    },

    async getPointsMonth() {
        try {
            const response = await axiosClient.get('admin/tickets/getPointsMonth');
            return response.data.data;
        } catch (error) {
            console.error("Error al obtener puntos del mes:", error);
            throw error;
        }
    },
};

export default ticketService;