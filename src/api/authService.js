// src/api/authService.js - SIMPLIFICADO
import { axiosClient } from './axiosClient';

class AuthService {
    constructor() {
        const token = localStorage.getItem('auth_token');
        if (token) {
            axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }

    async login(email, password) {
        try {
            console.log('🔑 Enviando credenciales...');
            
            const response = await axiosClient.post('/login', {
                email,
                password
            });

            console.log('✅ Login exitoso');
            
            if (response.data.token) {
                localStorage.setItem('auth_token', response.data.token);
                axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            }
            
            return response.data;

        } catch (error) {
            console.error('❌ Error en login:', error);
            
            if (error.response?.status === 422) {
                throw new Error('Email o contraseña incorrectos');
            } else {
                throw new Error(error.response?.data?.message || 'Error de conexión');
            }
        }
    }

    async logout() {
        try {
            await axiosClient.post('/logout');
        } catch (error) {
            console.error('Error en logout:', error);
        } finally {
            localStorage.removeItem('auth_token');
            delete axiosClient.defaults.headers.common['Authorization'];
        }
    }

    async getUser() {
        const response = await axiosClient.get('/user');
        return response.data.user;
    }

    isAuthenticated() {
        return !!localStorage.getItem('auth_token');
    }
}

export default new AuthService();