<template>
    <section class="stats-grid">
        <div class="stat-card">
            <div class="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <div class="stat-content">
                <span class="stat-value">{{ stats.total_transactions }}</span>
                <span class="stat-label">Transacciones</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <div class="stat-content">
                <span class="stat-value">{{ stats.total_redemptions }}</span>
                <span class="stat-label">Canjes realizados</span>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            </div>
            <div class="stat-content">
                <span class="stat-value">{{ stats.availableRewards }}</span>
                <span class="stat-label">Recompensas disponibles</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import transactionService from '@/api/Sucursales/Transactions';
import userService from '@/api/Sucursales/UsersService';

const authStore = useAuthStore();

// Centralizamos las estadísticas en un solo objeto reactivo
const stats = ref({
    total_transactions: 0,
    total_redemptions: 0,
    availableRewards: 0 // Aquí irá el available_rewards_count
});

const loadDashboardData = async () => {
    try {
        // Ejecutamos las peticiones necesarias
        // Nota: Eliminamos rewardsService porque el backend ya te da el conteo
        const [countData, canjesData, capacityData] = await Promise.all([
            transactionService.fetchTransactionCount(),
            transactionService.fetchCanjesCount(),
            userService.fetchgetPurchaseCapacity(),
        ]);

        // console.log("Datos de capacidad de compra:", capacityData.available_rewards_count);

        // Mapeo de datos según la nueva estructura de tu API
        stats.value = {
            // Ajusta estos nombres según lo que devuelvan tus otros endpoints de transacciones
            total_transactions: countData.transaction_count || 0,
            total_redemptions: canjesData.canje_count || 0,

            // Accedemos a .data.available_rewards_count de la nueva respuesta
            availableRewards: capacityData?.available_rewards_count || 0
        };

        // console.log("Capacidad de compra cargada:", stats.value.availableRewards);

    } catch (error) {
        console.error("Error cargando estadísticas del Dashboard:", error);
    }
};

onMounted(loadDashboardData);
</script>

<style scoped>
/* Stats Grid */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.stat-icon svg {
    width: 1.75rem;
    height: 1.75rem;
    stroke-width: 2;
}

.stat-icon.blue {
    background: #dbeafe;
    color: #2563eb;
}

.stat-icon.green {
    background: #dcfce7;
    color: #16a34a;
}

.stat-icon.orange {
    background: #fed7aa;
    color: #ea580c;
}

.stat-content {
    display: flex;
    flex-direction: column;
}

.stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
}

.stat-label {
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.25rem;
}
</style>