// Archivo: src/stores/authStore.js
import { defineStore } from 'pinia';
import authService from '@/api/authService';
import router from '@/router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        userRole: null,
        isAuthenticated: false,
        loginError: null,
        loading: false,
        authChecked: false, // Indica si la verificación inicial de autenticación ya se ha ejecutado.
    }),

    getters: {
        // GETTERS para el saldo (reactivos)
        balance: (state) => state.user?.current_balance || 0,
        formattedBalance: (state) => {
            const balance = state.user?.current_balance || 0;
            return new Intl.NumberFormat('es-MX').format(balance);
        },
        userName: (state) => state.user?.name || 'sucursal'
    },

    actions: {
        // --- Acciones de Autenticación Principal ---
        async handleLogin(email, password) {
            this.loginError = null;
            this.loading = true;

            try {
                const response = await authService.login(email, password);
                const userData = response.user;

                this.user = userData;
                this.isAuthenticated = true;

                if (userData.roles && userData.roles.length > 0) {
                    this.userRole = userData.roles[0].name;
                } else {
                    this.userRole = 'sucursal';
                }

                if (this.userRole === 'admin') {
                    router.push('/dashboard-admin');
                } else {
                    router.push('/dashboard');
                }
            } catch (error) {
                this.loginError = error.message;
                this.clearAuth();
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async handleLogout() {
            await authService.logout();
            this.clearAuth();
            router.push('/login');
        },

        // --- Acciones de Verificación y Refresco ---
        async checkAuth() {
            if (this.authChecked && this.user) return true;

            if (!authService.isAuthenticated()) {
                this.clearAuth();
                this.authChecked = true;
                return false;
            }

            try {
                const userData = await authService.getUser();
                this.user = userData;
                this.isAuthenticated = true;

                if (userData.roles && userData.roles.length > 0) {
                    this.userRole = userData.roles[0].name;
                } else {
                    this.userRole = 'sucursal';
                }
                return true;
            } catch (error) {
                this.clearAuth();
                return false;
            } finally {
                this.authChecked = true;
            }
        },

        /**
         * Llama al API para obtener los datos más recientes del usuario 
         * (incluyendo el saldo) y actualiza el store.
         */
        async refreshUserBalance() {
            try {
                // Llama al servicio, que usa el endpoint /api/user
                const userData = await authService.getUser();
                this.user = userData; // ✅ Actualiza el estado y, por ende, todos los getters reactivos
                console.log("🔄 Refrescado el saldo del usuario:", userData.current_balance);
                console.log("PINIA: Saldo y datos del usuario actualizados.");
            } catch (error) {
                console.error("Fallo al actualizar el saldo del usuario:", error);
                // Aquí podrías forzar el logout si el error es de autenticación
            }
        },

        // --- Utilidades ---
        clearAuth() {
            this.user = null;
            this.userRole = null;
            this.isAuthenticated = false;
            this.loginError = null;
        }
    }
});