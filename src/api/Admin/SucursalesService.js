import { axiosClient } from '@/api/axiosClient';

const sucursalesService = {

    async getAllSucursales(page = 1) {
        try {
            const response = await axiosClient.get(`admin/users/getAllSucursales?page=${page}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching users');
        }
    },
    async updateSucursal(id, userData) {
        try {
            const response = await axiosClient.put(`admin/users/editSucursal/${id}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error updating sucursal');
        }
    },
    async getSucursalDetails(id) {
        try {
            const response = await axiosClient.get(`admin/users/getSucursalDetails/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching sucursal details');
        }
    },
    async getTotalSucursales() {
        try {
            const response = await axiosClient.get('admin/users/getTotalSucursales');
            return response.data.total_sucursales;
        } catch (error) {
            throw error.response?.data || new Error('Error fetching total sucursales');
        }
    }
};

export default sucursalesService;