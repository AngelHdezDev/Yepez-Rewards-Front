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
        // ✅ NUEVO: Indica si la verificación inicial de autenticación ya se ha ejecutado.
        authChecked: false, 
    }),


    getters: {
        // ✅ AGREGAR ESTOS GETTERS PARA EL BALANCE
        balance: (state) => state.user?.balance || 0,
        formattedBalance: (state) => {
            const balance = state.user?.balance || 0;
            return new Intl.NumberFormat('es-MX').format(balance);
        },
        userName: (state) => state.user?.name || 'sucursal'
    },

    actions: {
        async handleLogin(email, password) {
            this.loginError = null;
            this.loading = true;
            
            try {
                // Tu controller devuelve { user, token }
                const response = await authService.login(email, password);
                const userData = response.user;
                
                this.user = userData;
                this.isAuthenticated = true;

                // Spatie roles
                if (userData.roles && userData.roles.length > 0) {
                    this.userRole = userData.roles[0].name;
                } else {
                    this.userRole = 'sucursal';
                }

                // La propiedad authChecked ahora se maneja en el router guard en la recarga inicial.
                // Aquí en el login, no es estrictamente necesaria.
                
                // Redirigir (La lógica de redirección aquí puede ser redundante si el router guard también la tiene, 
                // pero la mantendremos para inmediatez después del login exitoso).
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

        // ✅ MODIFICADO: Ahora establece 'authChecked'
        async checkAuth() {
            // Si ya se ha ejecutado y estamos cargando, no hacer nada para evitar llamadas duplicadas.
            if (this.authChecked && this.user) return true; 

            // Si no estamos autenticados según el servicio (no hay token/cookie), limpiamos y marcamos.
            if (!authService.isAuthenticated()) {
                this.clearAuth();
                this.authChecked = true; // ✅ Marcar como verificado.
                return false;
            }

            // Si hay token, intentamos cargar los datos del usuario.
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
                // Falla al cargar usuario (token inválido, expirado, etc.)
                this.clearAuth();
                return false;
            } finally {
                this.authChecked = true; // ✅ MUY IMPORTANTE: Marcar al finalizar.
            }
        },

        async handleLogout() {
            await authService.logout();
            this.clearAuth();
            router.push('/login');
        },

        clearAuth() {
            this.user = null;
            this.userRole = null;
            this.isAuthenticated = false;
            this.loginError = null;
            // No reseteamos authChecked aquí, ya que sigue siendo true (ya se ejecutó).
        }
    }
});