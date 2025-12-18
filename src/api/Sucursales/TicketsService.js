// src/api/Sucursales/TicketsService.js
import { axiosClient } from '@/api/axiosClient';

const SALES_URL = '/sucursal/tickets';

const ticketsService = {
  async registerTicket(saleData) {
    try {
      const response = await axiosClient.post(SALES_URL, saleData);
      return response.data;
    } catch (error) {
      console.error("Error al registrar el ticket - Detalles:", {
        error: error,
        response: error.response,
        data: error.response?.data
      });

      const errorResponse = error.response;

      // 🛑 ERROR 422 - VALIDACIÓN
      if (errorResponse && errorResponse.status === 422) {
        const validationErrors = errorResponse.data.errors;

        if (validationErrors) {
          // Extraer el primer error
          let errorMessage = '';
          for (const field in validationErrors) {
            if (validationErrors[field] && validationErrors[field].length > 0) {
              // Tomar solo el primer error por campo
              errorMessage = validationErrors[field][0];
              break; // Solo mostramos el primer error
            }
          }
          throw new Error(errorMessage || 'Error de validación');
        }
      }

      // 🛑 OTROS ERRORES
      if (errorResponse && errorResponse.data?.message) {
        throw new Error(errorResponse.data.message);
      }

      throw new Error('Error de conexión con el servidor.');
    }
  },
  async fetchLatestTickets() {
    try {
      const response = await axiosClient.get(`${SALES_URL}/lastTickets`);
      return response.data;

    } catch (error) {
      console.error("Error al cargar el historial de tickets:", error);
      throw new Error(error.response?.data?.message || 'Fallo de conexión al cargar tickets.');
    }
  },
};

export default ticketsService;