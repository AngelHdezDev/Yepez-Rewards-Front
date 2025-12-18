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
    <!-- Redeem Modal -->
    <transition name="modal-fade">
        <div v-if="showRedeemModal" class="modal-overlay" @click="closeRedeemModal">
            <div class="modal-content" @click.stop>
                <button class="modal-close" @click="closeRedeemModal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div v-if="selectedReward" class="modal-body">
                    <div class="modal-image">
                        <img :src="selectedReward.image || '/placeholder-reward.jpg'" :alt="selectedReward.name">
                    </div>
                    <h3 class="modal-title">{{ selectedReward.name }}</h3>
                    <p class="modal-description">{{ selectedReward.description }}</p>

                    <div class="modal-points">
                        <span class="points-label">Costo:</span>
                        <span class="points-value">{{ formatPoints(selectedReward.cost_points) }} puntos</span>
                    </div>

                    <div class="modal-balance">
                        <span class="balance-label">Tu saldo actual:</span>
                        <span class="balance-value">{{ formatPoints(balance) }} puntos</span>
                    </div>

                    <div class="modal-balance">
                        <span class="balance-label">Saldo después del canje:</span>
                        <span class="balance-value"
                            :class="{ 'text-success': balance - selectedReward.cost_points >= 0 }">
                            {{ formatPoints(balance - selectedReward.cost_points) }} puntos
                        </span>
                    </div>

                    <transition name="error-fade">
                        <div v-if="redeemError" class="modal-error">
                            <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            {{ redeemError }}
                        </div>
                    </transition>

                    <div class="modal-actions">
                        <button class="modal-button secondary" @click="closeRedeemModal" :disabled="isRedeeming">
                            Cancelar
                        </button>
                        <button class="modal-button primary" @click="confirmRedeem" :disabled="isRedeeming">
                            <span v-if="!isRedeeming">Confirmar canje</span>
                            <span v-else class="button-loading">
                                <svg class="spinner-small" viewBox="0 0 24 24">
                                    <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none"
                                        stroke="currentColor" stroke-width="3"></circle>
                                </svg>
                                Procesando...
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import rewardsService from '@/api/Sucursales/RewardsService';
import redeemService from '@/api/Sucursales/RedeemReward';
import Swal from 'sweetalert2';

// Modal state
const showRedeemModal = ref(false);
const selectedReward = ref(null);
const isRedeeming = ref(false);
const redeemError = ref('');

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

const openRedeemModal = (reward) => {
    selectedReward.value = reward;
    showRedeemModal.value = true;
    redeemError.value = '';
};

const closeRedeemModal = () => {
    showRedeemModal.value = false;
    selectedReward.value = null;
    redeemError.value = '';
};

const confirmRedeem = async () => {
    if (!selectedReward.value) return;

    isRedeeming.value = true;
    redeemError.value = null;

    // cliente_id: authStore.currentClient.id,
    //     premio_id: selectedReward.value.id
    try {
        // Obtenemos los IDs según tu estructura de Postman
        const payload = {
            cliente_id: authStore.user.id, // Asegúrate de que el store tenga al cliente
            premio_id: selectedReward.value.id
        };

        console.log("Payload de canje:", payload);

        const response = await redeemService.postRedeem(payload);
        console.log("Respuesta del canje:", response);

        // Notificación de éxito
        await Swal.fire({
            title: '¡Canje Exitoso!',
            text: response.message || 'El premio ha sido canjeado correctamente.',
            icon: 'success',
            confirmButtonColor: '#10b981'
        });

        // Actualizar el saldo localmente para que la UI se refresque
        authStore.balance -= selectedReward.value.cost_in_points;

        closeRedeemModal();
    } catch (error) {
        redeemError.value = error.message || 'No se pudo completar el canje';
        console.error("Error en confirmRedeem:", error);
    } finally {
        isRedeeming.value = false;
    }
};

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

/* Modal */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    backdrop-filter: blur(4px);
}

.modal-content {
    background: white;
    border-radius: 1.5rem;
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    background: #f1f5f9;
    border: none;
    border-radius: 0.5rem;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 1;
}

.modal-close:hover {
    background: #e2e8f0;
    color: #1e293b;
}

.modal-close svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
}

.modal-body {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.modal-image {
    width: 100%;
    height: 250px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
    border-radius: 1rem;
    overflow: hidden;
}

.modal-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.modal-description {
    font-size: 0.9375rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;
}

.modal-points,
.modal-balance {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.75rem;
}

.points-label,
.balance-label {
    font-size: 0.9375rem;
    color: #64748b;
    font-weight: 500;
}

.points-value,
.balance-value {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e3a8a;
}

.balance-value.text-success {
    color: #16a34a;
}

.modal-error {
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.875rem 1rem;
    background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
    color: #991b1b;
    border-radius: 0.75rem;
    font-size: 0.875rem;
    border: 1px solid #fecaca;
    font-weight: 500;
}

.error-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
    flex-shrink: 0;
    color: #dc2626;
}

.modal-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 0.5rem;
}

.modal-button {
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-button.primary {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
}

.modal-button.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
}

.modal-button.secondary {
    background: white;
    color: #64748b;
    border: 2px solid #e2e8f0;
}

.modal-button.secondary:hover:not(:disabled) {
    background: #f8fafc;
    border-color: #cbd5e1;
}

.modal-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.button-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.spinner-small {
    width: 1rem;
    height: 1rem;
    animation: spin 1s linear infinite;
}

.spinner-circle {
    stroke-dasharray: 50;
    stroke-dashoffset: 25;
    stroke-linecap: round;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
    transform: scale(0.9);
}

.error-fade-enter-active,
.error-fade-leave-active {
    transition: all 0.3s ease;
}

.error-fade-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.error-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>