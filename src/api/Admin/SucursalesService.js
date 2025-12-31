import { axiosClient } from '@/api/axiosClient';

const sucursalesService = {

    async getAllSucursales(page = 1) {
        try {
            const response = await axiosClient.get(`admin/users/getAllSucursales?page=${page}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching users');
        }
    }
};

export default sucursalesService;