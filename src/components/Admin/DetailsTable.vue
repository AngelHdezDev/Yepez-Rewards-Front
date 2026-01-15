<template>
    <div class="history-view">
        <!-- Content Based on Active Tab -->
        <div class="content-section">
            <!-- Tickets Section -->
            <section v-if="activeTab === 'todo' || activeTab === 'facturas'" class="history-section">
                <div class="section-header">
                    <div class="section-title-wrapper">
                        <h2 class="section-title">Facturas Registrados</h2>
                    </div>
                </div>

                <div v-if="isLoadingTickets" class="transactions-loading">
                    <div class="spinner-large"></div>
                    <p>Cargando facturas...</p>
                </div>

                <div v-else-if="totalTickets > 0" class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Número de factura</th>
                                <th>Fecha de emisión</th>
                                <th>Monto</th>
                                <th>Puntos Ganados</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="ticket in displayedTickets" :key="ticket.id">
                                <td>
                                    <span class="ticket-number">{{ ticket.ticket_number }}</span>
                                </td>
                                <td>{{ formatDate(ticket.issue_date) }}</td>
                                <td>
                                    ${{ formatCurrency(ticket.amount) }}
                                </td>
                                <td>
                                    <span class="points-value positive">
                                        +{{ formatPoints(ticket.points_earned) }} pts
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pagination-controls" v-if="paginationInfo && paginationInfo.current_page">
                        <button :disabled="paginationInfo.current_page === 1"
                            @click="loadHistoryData(paginationInfo.current_page - 1)">
                            Anterior
                        </button>

                        <span>
                            Página {{ paginationInfo.current_page }} de {{ paginationInfo.last_page }}
                        </span>

                        <button :disabled="paginationInfo.current_page === paginationInfo.last_page"
                            @click="loadHistoryData(paginationInfo.current_page + 1)">
                            Siguiente
                        </button>
                    </div>
                </div>
                <div v-else class="empty-state">
                    <div class="empty-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                            <line x1="7" y1="9" x2="17" y2="9"></line>
                            <line x1="7" y1="13" x2="13" y2="13"></line>
                        </svg>
                    </div>
                    <p class="empty-text">{{ errorMessage || 'No tienes facturas registradas' }}</p>
                    <p class="empty-subtext">Las facturas que registres aparecerán aquí</p>
                </div>
            </section>

            <!-- Redemptions Section -->
            <section v-if="activeTab === 'todo' || activeTab === 'canjes'" class="history-section">
                <div class="section-header">
                    <div class="section-title-wrapper">
                        <h2 class="section-title">Historial de Transacciones</h2>
                    </div>
                </div>

                <div class="table-container">
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
                                <svg v-if="transaction.type === 'CREDIT'" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2">
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
                    <div class="pagination-controls" v-if="paginationInfo2 && paginationInfo2.current_page">
                        <button :disabled="paginationInfo2.current_page === 1"
                            @click="loadTransactions(paginationInfo2.current_page - 1)">
                            Anterior
                        </button>

                        <span>
                            Página {{ paginationInfo2.current_page }} de {{ paginationInfo2.last_page }}
                        </span>

                        <button :disabled="paginationInfo2.current_page === paginationInfo2.last_page"
                            @click="loadTransactions(paginationInfo2.current_page + 1)">
                            Siguiente
                        </button>
                    </div>
                </div>

                <!-- Si realmente necesitas una sección de redenciones, define las variables necesarias -->
                <div v-if="displayedRedemptions && displayedRedemptions.length > 0" class="redemptions-list">
                    <div v-for="redemption in displayedRedemptions" :key="redemption.id" class="redemption-item">
                        <div class="redemption-icon negative">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        <div class="redemption-info">
                            <h4 class="redemption-title">{{ redemption.title }}</h4>
                            <p class="redemption-date">{{ formatDateTime(redemption.date) }}</p>
                        </div>
                        <div class="redemption-points negative">
                            -{{ formatPoints(redemption.points) }}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import ticketService from '@/api/Admin/TicketService';
import transactionService from '@/api/Admin/TransactionService';

const props = defineProps({
    sucursalId: {
        type: [String, Number],
        required: true
    }
});

// State
const activeTab = ref('todo');
const displayLimit = ref(10);
const facturasList = ref([]);
const transactions = ref([]);
const redemptions = ref([]); // Agregada esta variable si realmente necesitas redenciones
const paginationInfo = ref({ current_page: 1, last_page: 1, per_page: 10 });
const paginationInfo2 = ref({ current_page: 1, last_page: 1, per_page: 10 });
const isLoadingTickets = ref(true);
const isLoadingTransactions = ref(true);
const errorMessage = ref('');
const totalTicketsValue = ref(0);
const totalTickets = ref(0);
const totalTransactionsValue = ref(0);

// Computed
const displayedTickets = computed(() => {
    return facturasList.value.slice(0, displayLimit.value);
});

const recentTransactions = computed(() => {
    return Array.isArray(transactions.value) ? transactions.value.slice(0, 10) : [];
});

const displayedRedemptions = computed(() => {
    // Si realmente necesitas redenciones, define esta variable
    // Por ahora retornamos un array vacío o puedes cargarlo de una API
    return redemptions.value.slice(0, displayLimit.value);
});

// Funciones
const loadHistoryData = async (page = 1) => {
    const pageNumber = Number(page);

    isLoadingTickets.value = true;
    try {
        const responseData = await ticketService.getAllTicketsByUser(props.sucursalId, pageNumber);

        facturasList.value = responseData.data.tickets || [];
        totalTicketsValue.value = responseData.data.total_facturas || 0;
        totalTickets.value = facturasList.value.length;

        paginationInfo.value = {
            current_page: responseData.pagination.current_page,
            last_page: responseData.pagination.last_page,
            per_page: responseData.pagination.per_page
        };

    } catch (error) {
        console.error("Error al cargar historial de tickets:", error);
        errorMessage.value = 'Error al cargar las facturas';
    } finally {
        isLoadingTickets.value = false;
    }
};

const loadTransactions = async (page = 1) => {
    const pageNumber = Number(page);

    isLoadingTransactions.value = true;
    try {
        const data = await transactionService.getTotalTransacitonsByUser(props.sucursalId, pageNumber);
        transactions.value = data.data?.data?.transactions || data.data?.transactions || [];
        totalTransactionsValue.value = transactions.value.length;

        if (data.data?.pagination) {
            paginationInfo2.value = {
                current_page: data.data.pagination.current_page,
                last_page: data.data.pagination.last_page,
                per_page: data.data.pagination.per_page
            };
        }
    } catch (error) {
        console.error("Error al cargar transacciones:", error);
    } finally {
        isLoadingTransactions.value = false;
    }
};

// Formateadores
const formatDate = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
};

const formatDateTime = (date) => {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

const formatCurrency = (amount) => {
    return amount?.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) || '0.00';
};

const formatPoints = (points) => {
    return points?.toLocaleString('es-MX') || '0';
};

// Watcher para cambios en sucursalId
watch(() => props.sucursalId, (newId) => {
    if (newId) {
        paginationInfo.value.current_page = 1;
        paginationInfo2.value.current_page = 1;
        loadHistoryData(1);
        loadTransactions(1);
    }
});

// Inicialización
onMounted(() => {
    if (props.sucursalId) {
        loadHistoryData(1);
        loadTransactions(1);
    }
});
</script>
<style scoped>
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

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 3rem;
    padding: 1.5rem 0;
    border-top: 1px solid #e5e7eb;
    /* Línea sutil superior */
}

.pagination-controls button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    cursor: pointer;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Efecto Hover para botones activos */
.pagination-controls button:not(:disabled):hover {
    background-color: #f9fafb;
    border-color: #3b82f6;
    /* Azul primario acorde a tu app */
    color: #3b82f6;
    transform: translateY(-1px);
}

/* Estado Desactivado (Disabled) */
.pagination-controls button:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
    border-color: #e5e7eb;
    cursor: not-allowed;
    box-shadow: none;
}

/* Estilo del texto "Página X de Y" */
.pagination-controls span {
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
    padding: 0.5rem 1rem;
    background-color: #f3f4f6;
    border-radius: 2rem;
}

.history-view {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
}

/* Page Header */
.page-header {
    margin-bottom: 2rem;
}

.page-title {
    font-size: 2rem;
    font-weight: 800;
    color: #1e293b;
    margin: 0 0 1.5rem 0;
}

.summary-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.summary-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.summary-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
}

.summary-value {
    font-size: 1.875rem;
    font-weight: 700;
    color: #1e293b;
}

/* Tabs */
.tabs-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
}

.tabs {
    display: flex;
    background: white;
    border-radius: 0.5rem;
    padding: 0.25rem;
    gap: 0.25rem;
    border: 1px solid #e2e8f0;
}

.tab-button {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    border-radius: 0.375rem;
    font-size: 0.9375rem;
    font-weight: 600;
    color: #64748b;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-button:hover {
    color: #1e293b;
}

.tab-button.active {
    background: #1e3a8a;
    color: white;
}

.more-button {
    width: 2.5rem;
    height: 2.5rem;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    color: #64748b;
}

.more-button:hover {
    background: #f8fafc;
    color: #1e293b;
}

.more-button svg {
    width: 1.25rem;
    height: 1.25rem;
}

/* Content Section */
.content-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.history-section {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    padding: 1.5rem;
}

.section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    gap: 1rem;
}

.section-title-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.records-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: #dbeafe;
    color: #1e3a8a;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.badge-icon {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
}

.view-all-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: #2563eb;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.view-all-link:hover {
    color: #1d4ed8;
}

.view-all-link svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
}

/* Table */
.table-container {
    overflow-x: auto;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table thead {
    background: #f8fafc;
}

.data-table th {
    padding: 1rem 1.25rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: #64748b;
    border-bottom: 1px solid #e2e8f0;
}

.data-table tbody tr {
    border-bottom: 1px solid #f1f5f9;
    transition: background-color 0.2s;
}

.data-table tbody tr:last-child {
    border-bottom: none;
}

.data-table tbody tr:hover {
    background: #f8fafc;
}

.data-table td {
    padding: 1rem 1.25rem;
    font-size: 0.9375rem;
    color: #1e293b;
}

.ticket-number {
    font-weight: 600;
    color: #1e3a8a;
}

.points-value {
    font-weight: 600;
}

.points-value.positive {
    color: #16a34a;
}

.points-value.negative {
    color: #dc2626;
}

/* Table Footer */
.table-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0 0;
    margin-top: 1rem;
    border-top: 1px solid #e2e8f0;
}

.footer-text {
    font-size: 0.9375rem;
    color: #64748b;
}

.view-more-button {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    color: #2563eb;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.view-more-button:hover {
    color: #1d4ed8;
}

.view-more-button svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2.5;
}

/* Redemptions List */
.redemptions-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.redemption-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem;
    background: #fef2f2;
    border-radius: 0.75rem;
    transition: all 0.2s;
}

.redemption-item:hover {
    background: #fee2e2;
}

.redemption-icon {
    width: 2.5rem;
    height: 2.5rem;
    background: white;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.redemption-icon.negative {
    color: #dc2626;
}

.redemption-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
}

.redemption-info {
    flex: 1;
    min-width: 0;
}

.redemption-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 0.25rem 0;
}

.redemption-date {
    font-size: 0.8125rem;
    color: #64748b;
    margin: 0;
}

.redemption-points {
    font-size: 1.125rem;
    font-weight: 700;
    flex-shrink: 0;
}

.redemption-points.negative {
    color: #dc2626;
}

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

/* Responsive */
@media (max-width: 1024px) {
    .history-view {
        padding: 1.5rem;
    }

    .table-container {
        overflow-x: scroll;
    }

    .data-table {
        min-width: 800px;
    }
}

@media (max-width: 768px) {
    .history-view {
        padding: 1.25rem;
    }

    .page-title {
        font-size: 1.75rem;
    }

    .summary-value {
        font-size: 1.5rem;
    }

    .tabs-container {
        flex-direction: column;
        align-items: stretch;
    }

    .tabs {
        width: 100%;
    }

    .tab-button {
        flex: 1;
        padding: 0.625rem 1rem;
        font-size: 0.875rem;
    }

    .section-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .section-title-wrapper {
        flex-wrap: wrap;
    }

    .history-section {
        padding: 1.25rem;
    }

    .data-table th,
    .data-table td {
        padding: 0.875rem 1rem;
        font-size: 0.875rem;
    }

    .redemption-item {
        padding: 1rem;
    }
}

@media (max-width: 640px) {
    .history-view {
        padding: 1rem;
    }

    .page-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .summary-cards {
        grid-template-columns: 1fr;
    }

    .section-title {
        font-size: 1.125rem;
    }

    .records-badge {
        font-size: 0.8125rem;
        padding: 0.25rem 0.625rem;
    }

    .history-section {
        padding: 1rem;
    }

    .redemption-icon {
        width: 2.25rem;
        height: 2.25rem;
    }

    .redemption-title {
        font-size: 0.875rem;
    }

    .redemption-date {
        font-size: 0.75rem;
    }

    .redemption-points {
        font-size: 1rem;
    }
}

/* --- Añade esto al final de tu <style scoped> --- */

@media (max-width: 768px) {

    /* Mejora la paginación para que no se amontone */
    .pagination-controls {
        flex-wrap: wrap;
        gap: 1rem;
        padding: 1rem 0;
    }

    .pagination-controls span {
        order: -1;
        /* Pone el texto de página arriba de los botones */
        width: 100%;
        text-align: center;
        background-color: transparent;
    }

    .pagination-controls button {
        flex: 1;
        /* Los botones crecen para ser más fáciles de tocar */
        justify-content: center;
    }
}

@media (max-width: 640px) {

    /* Evita que la tabla rompa el layout si el número de factura es largo */
    .table-container {
        margin: 0 -1rem;
        /* Aprovecha el espacio de los bordes */
        border-radius: 0;
        border-left: none;
        border-right: none;
    }

    /* Ajuste para las listas de transacciones y canjes */
    .transaction-item,
    .redemption-item {
        padding: 0.75rem;
    }

    .transaction-amount,
    .redemption-points {
        font-size: 0.95rem;
        white-space: nowrap;
    }

    /* Si los tabs son muchos, permite scroll horizontal en lugar de aplastarlos */
    .tabs-container {
        overflow-x: auto;
        padding-bottom: 0.5rem;
        -webkit-overflow-scrolling: touch;
    }

    .tabs {
        min-width: max-content;
        /* Mantiene los botones en una sola línea con scroll */
    }

    .tab-button {
        padding: 0.5rem 1rem;
    }

    /* Ajuste de los títulos de las secciones para ganar espacio */
    .section-title-wrapper {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}

/* Ajuste fino para pantallas muy pequeñas (iPhone SE, etc) */
@media (max-width: 380px) {
    .summary-value {
        font-size: 1.25rem;
    }

    .page-title {
        font-size: 1.35rem;
    }
}
</style>