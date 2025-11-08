// src/router/index.js (Ejemplo de protección)
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
    // ...
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/modules/auth/pages/LoginView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/register',
        name: 'Register', // <-- Nueva ruta
        component: () => import('@/modules/auth/pages/RegisterView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/password-reset',
        name: 'PasswordReset', // <-- Nueva ruta
        component: () => import('@/modules/auth/pages/PasswordResetView.vue'),
        meta: { requiresAuth: false }
    },

    {
        path: '/dashboard',
        name: 'Dashboard', // <-- Nueva ruta
        component: () => import('@/modules/dashboard/pages/DashboardView.vue'),
        meta: { requiresAuth: false }
    },
    // {
    //     path: '/rewards',
    //     name: 'Rewards',
    //     component: () => import('@/modules/rewards/pages/RewardsView.vue'),
    //     meta: { requiresAuth: true } // <-- Indica que requiere autenticación
    // },
    // ...
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

// 🛡️ Global Navigation Guard (Guarda de Navegación Global)
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Si la ruta requiere autenticación y el usuario NO está autenticado, redirige a /login
        next({ name: 'Login' });
    } else if (to.name === 'Login' && authStore.isAuthenticated) {
        // Si el usuario está autenticado e intenta ir a /login, redirige a /rewards
        next({ name: 'Rewards' });
    } else {
        // Continúa la navegación normal
        next();
    }
});

export default router;