import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
    // --- RUTAS PÚBLICAS (NO REQUIEREN AUTENTICACIÓN) ---
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/modules/auth/pages/LoginView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/modules/auth/pages/RegisterView.vue'),
        meta: { requiresAuth: false }
    },
    {
        path: '/password-reset',
        name: 'PasswordReset',
        component: () => import('@/modules/auth/pages/PasswordResetView.vue'),
        meta: { requiresAuth: false }
    },

    // --- RUTAS PRIVADAS (REQUIEREN AUTENTICACIÓN Y ROL) ---
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/modules/dashboard/pages/DashboardView.vue'),
        meta: { requiresAuth: true, requiredRole: 'sucursal' } 
    },
    {
        path: '/dashboard-admin',
        name: 'DashboardAdmin',
        component: () => import('@/modules/dashboardAdmin/pages/DashboardAdminView.vue'),
        meta: { requiresAuth: true, requiredRole: 'yepez' }
    },
    // Añade el resto de tus rutas protegidas aquí
    
    // Ruta Raíz: Interceptada por el guard para redirigir según el rol
    {
        path: '/',
        name: 'Home',
        component: () => import('@/modules/dashboard/pages/DashboardView.vue'), 
        meta: { requiresAuth: true } 
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'NotFound',
    //     component: () => import('@/views/NotFoundView.vue')
    // }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 🛡️ Global Navigation Guard (Guarda de Navegación Global) - Implementa la lógica de Roles
router.beforeEach(async (to, from, next) => { // ✅ HACER ASÍNCRONO
    const authStore = useAuthStore();

    // 🔑 CLAVE PARA LA PERSISTENCIA: Esperar a que la autenticación inicial se complete
    if (!authStore.authChecked) {
        // console.log("Verificando sesión inicial...");
        await authStore.checkAuth(); // Llama y espera la verificación de token/cookie
    }
    
    // Re-leer el estado (ahora ya actualizado por checkAuth)
    const isAuthenticated = authStore.isAuthenticated;
    const userRole = authStore.userRole; 
    const requiredRole = to.meta.requiredRole;

    // --- LÓGICA DE REDIRECCIÓN DE LA RUTA RAÍZ ('/') ---
    if (to.path === '/') {
        if (!isAuthenticated) {
            // console.log("Ruta '/' - No autenticado, redirigiendo a Login.");
            return next({ name: 'Login' });
        }
        
        // Si está logueado, redirigir al dashboard correcto
        if (userRole === 'yepez') {
            // console.log("Ruta '/' - Autenticado como Admin, redirigiendo a DashboardAdmin.");
            return next({ name: 'DashboardAdmin' });
        } else if (userRole === 'sucursal') {
            // console.log("Ruta '/' - Autenticado como Client, redirigiendo a Dashboard.");
            return next({ name: 'Dashboard' });
        }
        // Si tiene un rol nulo/no reconocido, ir al login
        return next({ name: 'Login' });
    }
    // --- FIN DE LÓGICA DE REDIRECCIÓN DE RUTA RAÍZ ---
    
    // 1. Caso: Rutas Protegidas sin Autenticación
    if (to.meta.requiresAuth && !isAuthenticated) {
        // console.warn(`Acceso denegado a ${to.path}. No autenticado.`);
        return next({ name: 'Login', query: { redirect: to.fullPath } });
    }

    // 2. Caso: Rutas Protegidas con Autenticación pero Rol Incorrecto
    if (to.meta.requiresAuth && requiredRole && userRole !== requiredRole) {
        // console.warn(`Acceso denegado a ${to.path}. Rol requerido: ${requiredRole}, Rol de usuario: ${userRole}.`);
        
        // Redirige al dashboard apropiado según el rol del usuario logueado
        if (userRole === 'yepez') {
            return next({ name: 'DashboardAdmin' });
        } else if (userRole === 'sucursal') {
            return next({ name: 'Dashboard' });
        } else {
            return next({ name: 'Login' });
        }
    }

    // 3. Caso: Usuario Autenticado intenta ir a /login o /register, etc.
    if (!to.meta.requiresAuth && isAuthenticated) {
        // Redirige al dashboard apropiado
        if (userRole === 'yepez') {
            return next({ name: 'DashboardAdmin' });
        }
        return next({ name: 'Dashboard' });
    }

    // 4. Caso: Permite la navegación
    next();
});

export default router;