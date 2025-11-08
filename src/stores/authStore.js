// src/stores/authStore.js
import { defineStore } from 'pinia';
import authService from '@/api/authService';
import router from '@/router'; // Importamos el router si lo quieres usar directamente en las acciones

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null, // Objeto de usuario si está autenticado
        isAuthenticated: false,
        loginError: null,
        loading: false, // Estado de carga para evitar doble envío
    }),

    actions: {
        /**
         * 🔒 Intenta iniciar sesión y carga los datos del usuario.
         */
        async handleLogin(email, password) {
            this.loginError = null;
            this.loading = true;
            try {
                // 1. Ejecutar el login (obtiene CSRF y envía credenciales)
                await authService.login(email, password);
                
                // 2. Si el login es exitoso, obtenemos los datos del usuario autenticado
                await this.fetchUser(); 
                
                // 3. Redirige al usuario a la página de recompensas
                router.push('/rewards'); 

            } catch (error) {
                // Manejo de errores de autenticación
                this.isAuthenticated = false;
                this.user = null;
                // Si Laravel devuelve 401/422, el error estará en response.data
                this.loginError = error.response?.data?.message || 'Error desconocido al iniciar sesión. Verifica tu email y contraseña.';
                console.error("Fallo de Login:", error);

            } finally {
                this.loading = false;
            }
        },

        /**
         * 🔄 Carga el objeto de usuario usando el endpoint /user si hay una sesión válida.
         */
        async fetchUser() {
            try {
                const userData = await authService.fetchUser();
                this.user = userData;
                this.isAuthenticated = true;
                return true;
            } catch (error) {
                // 401 Unauthorized u otros fallos de sesión.
                this.user = null;
                this.isAuthenticated = false;
                // No lanzamos error aquí, solo lo registramos.
                return false;
            }
        },

        /**
         * 🛡️ Verifica si hay una sesión activa al cargar la aplicación.
         */
        async checkAuth() {
            this.loading = true;
            await this.fetchUser();
            this.loading = false;
        },

        /**
         * 🚪 Cierra la sesión del usuario.
         */
        async handleLogout() {
            try {
                await authService.logout();
            } catch (error) {
                console.error("Error al cerrar sesión, forzando cierre local:", error);
                // No importa si falla el logout de Laravel, la sesión local debe borrarse.
            } finally {
                // Limpia el estado local en Pinia y redirige al login.
                this.user = null;
                this.isAuthenticated = false;
                this.loginError = null;
                router.push('/login'); 
            }
        },
    }
});