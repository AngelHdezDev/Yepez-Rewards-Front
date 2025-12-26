<template>
    <navbar />
    <div class="history-view">
        <!-- Page Header -->
        <div class="page-header">
            <h1 class="page-title">Mi Historial</h1>

            <div class="summary-cards">
                <div class="summary-card">
                    <span class="summary-label">Total facturas</span>
                    <span class="summary-value">{{ totalTicketsValue.toLocaleString('es-MX') }}</span>
                </div>
                <div class="summary-card">
                    <span class="summary-label">Puntos Totales</span>
                    <span class="summary-value">{{ formattedBalance }} puntos</span>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="tabs-container">
            <div class="tabs">
                <button class="tab-button" :class="{ active: activeTab === 'todo' }" @click="activeTab = 'todo'">
                    Todo
                </button>
                <button class="tab-button" :class="{ active: activeTab === 'facturas' }"
                    @click="activeTab = 'facturas'">
                    Facturas
                </button>
                <button class="tab-button" :class="{ active: activeTab === 'canjes' }" @click="activeTab = 'canjes'">
                    Canjes
                </button>
            </div>
            <button class="more-button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
            </button>
        </div>

        <!-- Content Based on Active Tab -->
        <div class="content-section">
            <!-- Tickets Section -->
            <section v-if="activeTab === 'todo' || activeTab === 'facturas'" class="history-section">
                <div class="section-header">
                    <div class="section-title-wrapper">
                        <h2 class="section-title">Facturas Registrados</h2>
                        <div class="records-badge">
                            <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {{ totalTicketsValue.toLocaleString('es-MX') }} registros
                        </div>
                    </div>
                    <button class="view-all-link" @click="viewAllTickets">
                        Ver todas
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Número de ticket</th>
                                <th>Fecha de emisión</th>
                                <th>Monto</th>
                                <th>Puntos</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="facturas in displayedTickets" :key="facturas.id">
                                <td>
                                    <span class="ticket-number">{{ totalTicketsValue.toLocaleString('es-MX') }}</span>
                                </td>
                                <td>{{ formatDate(facturas.issue_date) }}</td>
                                <td>
                                    <span class="points-value positive">{{ formatPoints(facturas.points_earned) }}
                                        pts</span>
                                </td>
                                <td>
                                    <span class="points-value positive">{{ formatPoints(facturas.points_earned) }}
                                        pts</span>
                                </td>
                                <td>${{ formatCurrency(facturas.amount) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="facturas.length > displayLimit" class="table-footer">
                    <span class="footer-text">{{ displayLimit }}</span>
                    <button class="view-more-button" @click="showMoreTickets">
                        Ver más
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>
            </section>

            <!-- Redemptions Section -->
            <section v-if="activeTab === 'todo' || activeTab === 'canjes'" class="history-section">
                <div class="section-header">
                    <h2 class="section-title">Historial de Canjes</h2>
                    <button class="view-all-link" @click="viewAllRedemptions">
                        Ver más
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <div class="redemptions-list">
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
import { ref, computed, onMounted } from 'vue';
import Navbar from '@/layouts/Sucursales/Navbar.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import ticketService from '@/api/Sucursales/TicketsService';

const totalTicketsValue = ref(0);

const authStore = useAuthStore();
const { formattedBalance } = storeToRefs(authStore);

const loadTotalTickets = async () => {
    try {
        const data = await ticketService.getTotalTickets();
        // Según tu Postman, el valor está en la propiedad 'total_facturas'
        totalTicketsValue.value = data.total_facturas || 0;
    } catch (error) {
        console.error("Error al cargar el total de tickets:", error);
    }
};

// Props
const props = defineProps({
    facturas: {
        type: Array,
        default: () => []
    },
    redemptions: {
        type: Array,
        default: () => []
    },

    totalPoints: {
        type: Number,
        default: 0
    }
});

// State
const activeTab = ref('todo');
const displayLimit = ref(10);

// Computed
const displayedTickets = computed(() => {
    return props.facturas.slice(0, displayLimit.value);
});

const displayedRedemptions = computed(() => {
    return props.redemptions.slice(0, 4);
});

// Methods
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
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

const formatPoints = (points) => {
    return points?.toLocaleString('es-MX') || '0';
};

const formatCurrency = (amount) => {
    return amount?.toLocaleString('es-MX', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) || '0.00';
};

const showMoreTickets = () => {
    displayLimit.value += 10;
};

const viewAllTickets = () => {
    console.log('Ver todos los tickets');
};

const viewAllRedemptions = () => {
    console.log('Ver todos los canjes');
};

onMounted(() => {
    loadTotalTickets();
});
</script>

<style scoped>
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
</style>