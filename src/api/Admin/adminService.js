import { axiosClient } from '@/api/axiosClient';

const adminService = {

    async getLatestLogs() {
        try {
            const response = await axiosClient.get('admin/logs/getLatestLogs');
            return response.data;
        } catch (error) {
            console.error("Error al obtener los logs más recientes:", error);
            throw error;
        }
    },
};
export default adminService;