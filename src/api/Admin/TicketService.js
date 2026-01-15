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
    }
};

export default ticketService;