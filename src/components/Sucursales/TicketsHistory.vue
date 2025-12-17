<template>
    <section class="tickets-history">
        <div class="section-header">
            <h3 class="section-title">Últimos 10 tickets registrados</h3>
            <button class="view-all-btn">Ver todo</button>
        </div>

        <div v-if="loading" class="loading-state">
            <div class="spinner"></div>
            <p>Cargando tickets...</p>
        </div>

        <div v-else-if="tickets.length > 0" class="table-container">
            <table class="tickets-table">
                <thead>
                    <tr>
                        <th>Número de ticket</th>
                        <th>Fecha de emisión</th>
                        <th class="text-right">Monto</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ticket in tickets" :key="ticket.id" class="ticket-row">
                        <td>
                            <span class="ticket-number">#{{ ticket.ticket_number }}</span>
                        </td>
                        <td>
                            <span class="ticket-date">{{ formatDate(ticket.issue_date) }}</span>
                        </td>
                        <td class="text-right">
                            <span class="ticket-amount">${{ formatCurrency(ticket.amount) }}</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-else class="empty-state">
            <div class="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="16" rx="2"></rect>
                    <line x1="7" y1="9" x2="17" y2="9"></line>
                    <line x1="7" y1="13" x2="13" y2="13"></line>
                </svg>
            </div>
            <p class="empty-text">{{ errorMessage || 'No tienes tickets registrados' }}</p>
            <p class="empty-subtext">Los tickets que registres aparecerán aquí</p>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ticketsService from '@/api/Sucursales/TicketsService'; // ✅ Importamos el servicio

const tickets = ref([]);
const loading = ref(true);
const errorMessage = ref(''); // Para mostrar errores de API

// --- Métodos de Ayuda ---

// Asume que la fecha viene en formato ISO (ej. "2025-12-16 10:30:00")
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '0.00';
    return parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// --- Lógica de Carga de Datos ---
const loadTickets = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        // Obtenemos los tickets del servicio
        const responseData = await ticketsService.fetchLatestTickets();
        console.log("Tickets obtenidos:", responseData);
        tickets.value = responseData.tickets;

    } catch (error) {
        console.error('Fallo al obtener tickets:', error);
        errorMessage.value = error.message || 'Error al cargar el historial.';

    } finally {
        loading.value = false;
    }
};

// Cargar los datos al montar el componente
onMounted(() => {
    loadTickets();
});

// Opcional: Si quieres que esta tabla se actualice al registrar un ticket (como hicimos con el saldo), 
// puedes recibir una prop o usar un evento global, pero para este componente, onMounted es suficiente.
</script>

<style scoped>
.tickets-history {
    margin-top: 2rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
}

.view-all-btn {
    color: #3b5998;
    background: none;
    border: none;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0.5rem 0;
    text-decoration: underline;
}

.view-all-btn:hover {
    color: #2d4373;
}

.loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background: #f8f9fa;
    border-radius: 8px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #e0e0e0;
    border-top-color: #3b5998;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.table-container {
    background: white;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    overflow: hidden;
}

.tickets-table {
    width: 100%;
    border-collapse: collapse;
}

.tickets-table thead {
    background: #f8f9fa;
}

.tickets-table th {
    padding: 1rem;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 600;
    color: #666;
    border-bottom: 1px solid #e0e0e0;
}

.tickets-table th.text-right {
    text-align: right;
}

.ticket-row {
    border-bottom: 1px solid #f0f0f0;
    transition: background-color 0.2s;
}

.ticket-row:last-child {
    border-bottom: none;
}

.ticket-row:hover {
    background-color: #f8f9fa;
}

.tickets-table td {
    padding: 1rem;
    font-size: 0.9375rem;
}

.tickets-table td.text-right {
    text-align: right;
}

.ticket-number {
    font-weight: 600;
    color: #1a1a1a;
}

.ticket-date {
    color: #666;
}

.ticket-amount {
    font-weight: 600;
    color: #1a1a1a;
    font-size: 1rem;
}

.action-btn {
    background: #3b5998;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
}

.action-btn:hover {
    background: #2d4373;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
}

.empty-icon {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: #cbd5e0;
}

.empty-icon svg {
    width: 100%;
    height: 100%;
}

.empty-text {
    font-size: 1rem;
    font-weight: 500;
    color: #1a1a1a;
    margin: 0 0 0.5rem 0;
}

.empty-subtext {
    font-size: 0.875rem;
    color: #666;
    margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .section-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .tickets-table th,
    .tickets-table td {
        padding: 0.75rem 0.5rem;
        font-size: 0.875rem;
    }

    .action-btn {
        padding: 0.4rem 1rem;
        font-size: 0.8125rem;
    }
}
</style>