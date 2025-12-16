<template>
    <section class="register-ticket-section">
        <h2 class="section-title">Registrar nuevo ticket</h2>
        <form @submit.prevent="registerTicket" class="ticket-form">
            <input type="text" placeholder="Número de ticket" v-model="ticketForm.numero" required />
            <input type="date" placeholder="Fecha" v-model="ticketForm.fecha" required />
            <input type="number" placeholder="Monto total" v-model="ticketForm.monto" required min="0" />
            <button type="submit" class="action-button primary" :disabled="isRegisteringTicket">
                <span v-if="!isRegisteringTicket">Registrar ticket</span>
                <span v-else>Cargando...</span>
            </button>
        </form>
        <div v-if="ticketError" class="modal-error" style="margin-top:12px;">{{ ticketError }}</div>
        <div v-if="ticketSuccess" class="modal-success" style="margin-top:12px;">{{ ticketSuccess }}</div>
    </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import ticketsService from '@/api/Sucursales/TicketsService';
import Swal from 'sweetalert2';

const emit = defineEmits(['ticket-registered']);

const authStore = useAuthStore();

// Datos del formulario
const ticketForm = ref({
    numero: '',
    fecha: new Date().toISOString().split('T')[0],
    monto: null,
});

const isRegisteringTicket = ref(false);
const validationErrors = reactive({
    numero: [],
    fecha: [],
    monto: [],
    general: ''
});

// Formatear fecha
const formatIssueDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);

    date.setHours(now.getHours());
    date.setMinutes(now.getMinutes());
    date.setSeconds(now.getSeconds());

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Limpiar errores
const clearErrors = () => {
    validationErrors.numero = [];
    validationErrors.fecha = [];
    validationErrors.monto = [];
    validationErrors.general = '';
};

// Registrar ticket
const registerTicket = async () => {
    clearErrors();
    isRegisteringTicket.value = true;

    // Validación básica del frontend
    let hasError = false;

    if (!ticketForm.value.numero.trim()) {
        validationErrors.numero.push('El número de ticket es requerido');
        hasError = true;
    }

    if (!ticketForm.value.fecha) {
        validationErrors.fecha.push('La fecha es requerida');
        hasError = true;
    }

    if (!ticketForm.value.monto || ticketForm.value.monto <= 0) {
        validationErrors.monto.push('El monto debe ser mayor a 0');
        hasError = true;
    }

    if (hasError) {
        isRegisteringTicket.value = false;
        Swal.fire({
            icon: 'warning',
            title: 'Revisa los campos',
            html: Object.values(validationErrors)
                .filter(err => Array.isArray(err) && err.length > 0)
                .map(err => `<p>${err[0]}</p>`)
                .join(''),
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Validar datos de usuario
    if (!authStore.user?.id || !authStore.user?.branch_id) {
        Swal.fire({
            icon: 'error',
            title: 'Error de sesión',
            text: 'No se pudo obtener la información de la sucursal',
            confirmButtonText: 'Entendido'
        });
        isRegisteringTicket.value = false;
        return;
    }

    try {
        // Preparar payload
        const payload = {
            user_id: authStore.user.id,
            branch_id: authStore.user.branch_id,
            amount: parseFloat(ticketForm.value.monto),
            ticket_number: ticketForm.value.numero.trim(),
            issue_date: formatIssueDate(ticketForm.value.fecha),
        };


        const response = await ticketsService.registerTicket(payload);
        console.log("Respuesta completa al registrar:", response);
        console.log("Entra try");

        // Éxito
        Swal.fire({
            icon: 'success',
            title: '¡Registro Exitoso!',
            html: response.message || 'Ticket registrado correctamente',
            confirmButtonText: 'Aceptar',
        });

        // Limpiar formulario
        ticketForm.value = {
            numero: '',
            fecha: new Date().toISOString().split('T')[0],
            monto: null
        };

        // Emitir evento
        emit('ticket-registered');

    } catch (error) {
        console.error("Error completo al registrar:", error);

        // Mostrar error específico
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Error al registrar el ticket',
            confirmButtonText: 'Entendido',
        });

    } finally {
        isRegisteringTicket.value = false;
    }
};
</script>

<style scoped>
.register-ticket-section,
.tickets-history {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.ticket-form {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.ticket-form input {
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e2e8f0;
    font-size: 1rem;
    min-width: 180px;
    flex: 1;
}

.ticket-form button {
    min-width: 180px;
}

.tickets-history table {
    width: 100%;
    border-spacing: 0;
    margin-top: 1rem;
}

.tickets-history th,
.tickets-history td {
    padding: 0.6rem 1rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    font-size: 1rem;
}
</style>