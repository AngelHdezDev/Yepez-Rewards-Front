<template>
    <section class="transactions-section">
        <div class="section-header">
            <h2 class="section-title">Transacciones recientes</h2>
            <button class="view-all-button" @click="viewTransactions">
                Ver todas
                <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>
        </div>

        <div v-if="isLoadingTransactions" class="transactions-loading">
            <div class="spinner-large"></div>
            <p>Cargando transacciones...</p>
        </div>

        <div v-else-if="recentTransactions.length === 0" class="empty-state">
            <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>No tienes transacciones recientes</p>
        </div>

        <div v-else class="transactions-list">
            <div v-for="transaction in recentTransactions" :key="transaction.id" class="transaction-item">
                <div class="transaction-icon" :class="transaction.type">
                    <svg v-if="transaction.type === 'CREDIT'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                </div>
                <div class="transaction-details">
                    <span class="transaction-description">{{ transaction.description }}</span>
                    <span class="transaction-date">{{ formatDate(transaction.created_at) }}</span>
                </div>
                <div class="transaction-amount" :class="transaction.type">
                    {{ transaction.type === 'CREDIT' ? '+' : '-' }}{{ formatPoints(transaction.amount) }}
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import transactionService from '@/api/Sucursales/Transactions';

const transactions = ref([]);
const isLoadingTransactions = ref(true);

// Computed para mostrar solo las últimas 5
const recentTransactions = computed(() => {
    return Array.isArray(transactions.value) ? transactions.value.slice(0, 5) : [];
});

const loadTransactions = async () => {
    isLoadingTransactions.value = true;
    try {
        const data = await transactionService.fetchLastTransactions();
        transactions.value = data;
    } catch (error) {
        console.error("Error al cargar transacciones:", error);
    } finally {
        isLoadingTransactions.value = false;
    }
};

// Formateadores
const formatPoints = (points) => new Intl.NumberFormat('es-MX').format(points);
const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const viewTransactions = () => {
    console.log("Navegando al historial completo...");
    // Aquí puedes usar router.push('/historial')
};

onMounted(loadTransactions);

// Exponer loadTransactions por si necesitas llamarlo desde afuera (ej. después de un canje)
defineExpose({ loadTransactions });
</script>

<style scoped>
/* Transactions List */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 1rem;
    color: #64748b;
}

.empty-icon {
    width: 3rem;
    height: 3rem;
    stroke-width: 2;
    opacity: 0.5;
}

.transactions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.transaction-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: #f8fafc;
    border-radius: 0.75rem;
    transition: all 0.2s;
}

.transaction-item:hover {
    background: #f1f5f9;
}

.transaction-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.transaction-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
}

.transaction-icon.CREDIT {
    background: #dcfce7;
    color: #16a34a;
}

.transaction-icon.DEBIT {
    background: #fee2e2;
    color: #dc2626;
}

.transaction-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.transaction-description {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1e293b;
}

.transaction-date {
    font-size: 0.8125rem;
    color: #64748b;
}

.transaction-amount {
    font-size: 1.125rem;
    font-weight: 700;
}

.transaction-amount.CREDIT {
    color: #16a34a;
}

.transaction-amount.DEBIT {
    color: #dc2626;
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
</style>