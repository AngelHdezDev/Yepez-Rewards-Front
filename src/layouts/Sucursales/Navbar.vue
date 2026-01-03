<template>
    <header class="dashboard-header">
        <div class="header-content">
            <div class="logo-section">
                <img src="@/assets/logo-yepez.svg" alt="Yépez" class="header-logo" @error="handleImageError" />
            </div>
            <div class="logo-section">
                <img src="@/assets/red.png" alt="Red-Conecta    " class="header-logo" @error="handleImageError" />
            </div>

            <nav class="nav-menu">
                <router-link to="/dashboard" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                    <span>Inicio</span>
                </router-link>
                <router-link to="/catalogo" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Catálogo</span>
                </router-link>
                <router-link to="/historial" class="nav-link">
                    <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>Historial</span>
                </router-link>
            </nav>

            <div class="user-section">
                <div class="user-info">
                    <div class="user-avatar">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>
                    <div class="user-details">
                        <span class="user-name">{{ userName }}</span>
                        <span class="user-role">Cliente</span>
                    </div>
                </div>
                <button class="logout-button" @click="handleLogout" title="Cerrar sesión">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const userName = computed(() => {
    return authStore.user?.name || 'Cliente';
});

const handleImageError = (e) => {
    e.target.style.display = 'none';
};

const handleLogout = async () => {
    try {
        await authStore.handleLogout();
        console.log('Logout iniciado desde el componente.');

    } catch (error) {
        console.error('Error al intentar cerrar sesión:', error);
    }
};
</script>

<style>
/* Header */
/* Header */
.dashboard-header {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
}

.logo-section {
    flex-shrink: 0;
}

.header-logo {
    height: 2.5rem;
    width: auto;
}

.nav-menu {
    display: flex;
    gap: 0.5rem;
    flex: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all 0.2s;
}

.nav-link:hover {
    background: #f1f5f9;
    color: #1e3a8a;
}

.nav-link.active {
    background: #1e3a8a;
    color: white;
}

.nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
}

.user-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.user-avatar svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke-width: 2;
}

.user-details {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
}

.user-role {
    font-size: 0.75rem;
    color: #64748b;
}

.logout-button {
    width: 2.5rem;
    height: 2.5rem;
    background: #fee2e2;
    border: none;
    border-radius: 0.5rem;
    color: #dc2626;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.logout-button:hover {
    background: #fecaca;
    transform: translateY(-2px);
}

.logout-button svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
}

@media (max-width: 768px) {

    /* 1. Fijar el Header arriba pero sin el menú */
    .header-content {
        padding: 0.75rem 1rem;
        justify-content: space-between;
        gap: 0;
    }

    /* Ocultamos detalles de usuario para que no empujen el logo */
    .user-details {
        display: none;
    }

    /* 2. Convertir el NAV en una barra inferior */
    .nav-menu {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: white;
        display: flex;
        justify-content: space-around;
        padding: 0.5rem;
        border-top: 1px solid #e2e8f0;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
        z-index: 1000;
        gap: 0;
    }

    .nav-link {
        flex-direction: column;
        /* Icono arriba, texto abajo */
        gap: 0.25rem;
        padding: 0.5rem;
        font-size: 0.7rem;
        flex: 1;
        border-radius: 0;
        background: transparent !important;
        /* Quitamos fondos en móvil */
    }

    .nav-link.active {
        color: #1e3a8a;
        /* Color de marca en lugar de fondo azul */
    }

    .nav-link span {
        display: block !important;
        /* Volvemos a mostrar el texto pero pequeño */
    }

    .nav-icon {
        width: 1.4rem;
        height: 1.4rem;
    }

    /* 3. Ajustes de espaciado para el contenido */
    body {
        padding-bottom: 70px;
        /* Evita que el menú tape el contenido del dashboard */
    }

    /* Ajuste del botón logout para que sea circular en móvil */
    .logout-button {
        background: transparent;
        width: auto;
        height: auto;
    }

}
</style>