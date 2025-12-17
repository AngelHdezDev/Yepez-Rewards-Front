<template>
    <section class="rewards-section">
        <div class="section-header">
            <h2 class="section-title">Recompensas destacadas</h2>
            <button class="view-all-button" @click="goToCatalog">
                Ver todas
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>

        <div v-if="isLoadingRewards" class="rewards-loading">
            <div class="spinner-large"></div>
            <p>Cargando recompensas...</p>
        </div>

        <div v-else class="rewards-grid">
            <div v-for="reward in rewards" :key="reward.id" class="reward-card">
                <div class="reward-image">
                    <img :src="reward.image || '/placeholder-reward.jpg'" :alt="reward.name">

                    <div v-if="reward.stock < 5 && reward.stock > 0" class="stock-badge low">
                        ¡Últimas unidades!
                    </div>
                    <div v-else-if="reward.stock === 0" class="stock-badge out">
                        Agotado
                    </div>
                </div>

                <div class="reward-content">
                    <h3 class="reward-name">{{ reward.name }}</h3>
                    <p class="reward-description">{{ reward.description }}</p>

                    <div class="reward-footer">
                        <div class="reward-points">
                            <svg class="points-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                                </polygon>
                            </svg>
                            <span>{{ formatPoints(reward.cost_points) }}</span>
                        </div>

                        <button class="redeem-button" :disabled="reward.stock === 0 || balance < reward.cost_points"
                            @click="openRedeemModal(reward)">

                            <template v-if="reward.stock === 0">
                                Agotado
                            </template>

                            <template v-else-if="balance < reward.cost_points">
                                Puntos insuficientes
                            </template>

                            <template v-else>
                                Canjear
                            </template>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import rewardsService from '@/api/Sucursales/RewardsService';

const authStore = useAuthStore();
const { balance } = storeToRefs(authStore);
// console.log("Balance del usuario:", balance.value);

const rewards = ref([]); // Iniciamos como un array vacío
const isLoadingRewards = ref(true);

const fetchRewards = async () => {
    isLoadingRewards.value = true;
    try {
        const response = await rewardsService.fetchTopRewards();
        rewards.value = response || [];

        // PRUEBA DE DEPURACIÓN:
        if (rewards.value.length > 0) {
            const costo = rewards.value[0].cost_in_points;
            // console.log(`Comparando Balance: ${balance.value} < Costo: ${costo}`);
            // console.log("¿Es insuficiente?:", balance.value < costo);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        isLoadingRewards.value = false;
    }
};

const formatPoints = (points) => new Intl.NumberFormat('es-MX').format(points);

const openRedeemModal = (reward) => console.log("Canjeando:", reward.name);

onMounted(fetchRewards);
</script>

<style scoped>
/* Rewards Section */
.rewards-section,
.transactions-section {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
}

.section-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.view-all-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    color: #2563eb;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    transition: all 0.2s;
}

.view-all-button:hover {
    background: #eff6ff;
}

.arrow-icon {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
    transition: transform 0.2s;
}

.view-all-button:hover .arrow-icon {
    transform: translateX(4px);
}

.rewards-loading,
.transactions-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
    color: #64748b;
}

.spinner-large {
    width: 3rem;
    height: 3rem;
    border: 3px solid #e2e8f0;
    border-top-color: #2563eb;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.rewards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.reward-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s;
}

.reward-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border-color: #2563eb;
}

.reward-image {
    position: relative;
    width: 100%;
    height: 180px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    overflow: hidden;
}

.reward-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.stock-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.stock-badge.low {
    background: #fed7aa;
    color: #ea580c;
}

.stock-badge.out {
    background: #fee2e2;
    color: #dc2626;
}

.reward-content {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.reward-name {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.reward-description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
}

.reward-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
}

.reward-points {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e3a8a;
}

.points-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
    fill: currentColor;
}

.redeem-button {
    padding: 0.625rem 1.25rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.redeem-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
}

.redeem-button:disabled {
    background: #e2e8f0;
    color: #94a3b8;
    cursor: not-allowed;
    transform: none;
}
</style>