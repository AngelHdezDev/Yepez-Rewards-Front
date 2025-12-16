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

        console.log("📤 Enviando ticket...", payload);

        // Guardar balance inicial para comparar después
        const initialBalance = authStore.balance;
        console.log("💰 Balance inicial:", initialBalance);

        const response = await ticketsService.registerTicket(payload);
        console.log("✅ Respuesta del backend:", response);

        // 🔥 OPCIÓN 1: ESPERAR Y LUEGO REFRESCAR
        // Mostrar mensaje de procesamiento
        const processingAlert = Swal.fire({
            title: 'Procesando Ticket...',
            text: 'El ticket está siendo procesado. El balance se actualizará en unos segundos.',
            icon: 'info',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 4000, // Cerrar automáticamente después de 4 segundos
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Esperar 4 segundos para que el Job termine de procesar
        setTimeout(async () => {
            try {
                console.log("🔄 Refrescando balance después de espera...");

                // Forzar actualización del balance
                await authStore.refreshUserBalance();

                const newBalance = authStore.balance;
                const pointsEarned = newBalance - initialBalance;

                console.log("📊 Resultado después de espera:", {
                    initialBalance,
                    newBalance,
                    pointsEarned,
                    actualizado: newBalance > initialBalance
                });

                // Cerrar alerta de procesamiento si aún está abierta
                if (Swal.isVisible()) {
                    Swal.close();
                }

                // Mostrar mensaje de éxito con balance actualizado
                Swal.fire({
                    icon: 'success',
                    title: '¡Ticket Procesado!',
                    html: `
                        <p>${response.message}</p>
                        ${pointsEarned > 0 ?
                            `<p><strong>Puntos ganados:</strong> ${pointsEarned}</p>`
                            : '<p><small>Este ticket no generó puntos</small></p>'
                        }
                        <p><strong>Nuevo saldo:</strong> ${authStore.formattedBalance} puntos</p>
                        <hr>
                        <small class="text-muted">Balance anterior: ${initialBalance.toLocaleString()} puntos</small>
                    `,
                    confirmButtonText: 'Aceptar',
                    showCloseButton: true
                });

            } catch (refreshError) {
                console.error("❌ Error al actualizar balance:", refreshError);

                if (Swal.isVisible()) {
                    Swal.close();
                }

                // Mostrar éxito pero con advertencia
                Swal.fire({
                    icon: 'warning',
                    title: 'Ticket Registrado',
                    html: `
                        <p>${response.message}</p>
                        <p class="text-warning"><small>El balance se actualizará automáticamente en breve.</small></p>
                        <p><strong>Saldo actual:</strong> ${authStore.formattedBalance} puntos</p>
                    `,
                    confirmButtonText: 'Entendido'
                });
            }

            // Limpiar formulario después de todo
            ticketForm.value = {
                numero: '',
                fecha: new Date().toISOString().split('T')[0],
                monto: null
            };

            // Emitir evento al padre
            emit('ticket-registered', {
                success: true,
                ticketNumber: payload.ticket_number,
                pointsEarned: pointsEarned || 0
            });

        }, 4000); // Esperar 4 segundos

        // ⚠️ NOTA: El finally se ejecuta inmediatamente, no espera el setTimeout
        // Por eso movemos el finally lógico dentro del setTimeout

    } catch (error) {
        console.error("❌ Error al registrar ticket:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });

        // Mostrar error específico
        let errorMessage = error.message || 'Error al registrar el ticket';

        // Si es error de validación del backend
        if (error.response?.status === 422 && error.response?.data?.errors) {
            const errors = error.response.data.errors;
            errorMessage = Object.values(errors).flat().join(', ');
        }

        Swal.fire({
            icon: 'error',
            title: 'Error al Registrar',
            text: errorMessage,
            confirmButtonText: 'Entendido',
            showCloseButton: true
        });

    } finally {
        // Solo desactivamos el loading, pero el formulario se limpia después del setTimeout
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