<template>
    <div class="view-header">
        <div class="search-box">
            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" v-model="searchQuery" placeholder="Buscar sucursales..." class="search-input" />
        </div>
        <button class="primary-btn" @click="openModal('addUser')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar Sucursal
        </button>
    </div>

    <div class="table-container">
        <div v-if="isLoading" class="rewards-loading">
            <div class="spinner-large"></div>
            <p>Cargando sucursales...</p>
        </div>
        <table class="data-table" v-else>
            <thead>
                <tr>
                    <th>Sucursal</th>
                    <th>Email</th>
                    <th>Puntos</th>
                    <th>Registrado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in filteredUsers" :key="user.id">
                    <td>
                        <div class="user-cell">
                            <div class="user-avatar-small">
                                {{ user.name.charAt(0).toUpperCase() }}
                            </div>
                            <span class="user-name-cell">{{ user.name }}</span>
                        </div>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>
                        <span class="points-badge">{{ formatPoints(user.current_balance) }}</span>
                    </td>
                    <td>{{ formatDate(user.created_at) }}</td>
                    <td>
                        <div class="action-buttons">
                            <!-- <button class="icon-btn" @click="openModal('addPoints', user)" title="Asignar puntos">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                </svg>
                            </button> -->
                            <button class="icon-btn info" @click="viewBranch(user.id)" title="Ver detalles">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="icon-btn" @click="openModal('editUser', user)" title="Editar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                            </button>
                            <button class="icon-btn danger" @click="deleteUser(user)" title="Eliminar">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                    </path>
                                </svg>
                            </button>
                        </div>
                    </td>

                </tr>


            </tbody>

        </table>
        <div class="pagination-controls">
            <button :disabled="paginationInfo.current_page === 1" @click="fetchUsers(paginationInfo.current_page - 1)">
                Anterior
            </button>

            <span>Página {{ paginationInfo.current_page }} de {{ paginationInfo.total_pages }}</span>

            <button :disabled="paginationInfo.current_page === paginationInfo.total_pages"
                @click="fetchUsers(paginationInfo.current_page + 1)">
                Siguiente
            </button>
        </div>
    </div>
    
    <transition name="modal-fade">
        <div v-if="showModal && (modalType === 'addUser' || modalType === 'editUser')" class="modal-overlay"
            @click="closeModal">
            <div class="modal-dialog" @click.stop>
                <div class="modal-header">
                    <h3 class="modal-title">{{ modalType === 'addUser' ? 'Agregar Sucursal' : 'Editar Sucursal' }}</h3>
                    <button class="modal-close-btn" @click="closeModal">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="saveUser">
                        <h4 class="section-divider">Datos de la Sucursal</h4>
                        <div class="form-group">
                            <label class="form-label">Nombre de la Sucursal</label>
                            <input type="text" v-model="userForm.branch_name" class="form-control"
                                placeholder="Ej. Sucursal Matriz" required>
                        </div>
                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <!-- <div class="form-group">
                                <label class="form-label">Teléfono</label>
                                <input type="text" v-model="userForm.phone" class="form-control"
                                    placeholder="3312345678">
                            </div> -->
                            <div class="form-group">
                                <label class="form-label">Ciudad</label>
                                <input type="text" v-model="userForm.city" class="form-control" placeholder="Ciudad">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Dirección</label>
                                <input type="text" v-model="userForm.address" class="form-control"
                                    placeholder="Calle #123, Col...">
                            </div>
                        </div>

                        <hr class="modal-hr">

                        <h4 class="section-divider">Datos de Acceso</h4>
                        <div class="form-group">
                            <label class="form-label">Nombre de la cuenta de la sucursal</label>
                            <input type="text" v-model="userForm.name" class="form-control"
                                placeholder="Nombre de quien usará la cuenta" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email de la cuenta</label>
                            <input type="email" v-model="userForm.email" class="form-control"
                                placeholder="sucursal@ejemplo.com" autocomplete="email" required>
                        </div>

                        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div class="form-group">
                                <label class="form-label">Contraseña</label>
                                <input type="password" v-model="userForm.password" class="form-control"
                                    placeholder="••••••••" autocomplete="new-password"
                                    :required="modalType === 'addUser'">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirmar contraseña</label>
                                <input type="password" v-model="userForm.password_confirmation" class="form-control"
                                    placeholder="••••••••" autocomplete="new-password"
                                    :required="modalType === 'addUser'">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="modal-btn secondary" @click="closeModal">Cancelar</button>
                    <button class="modal-btn primary" @click="saveUser" :disabled="isSubmitting">
                        <span v-if="!isSubmitting">{{ modalType === 'addUser' ? 'Crear Usuario' : 'Guardar Cambios'
                        }}</span>
                        <span v-else class="loading-text">
                            <svg class="spinner-small" viewBox="0 0 24 24">
                                <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor"
                                    stroke-width="3"></circle>
                            </svg>
                            Guardando...
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </transition>

</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import adminService from '@/api/adminService';
import Swal from 'sweetalert2';
import sucursalesService from '@/api/Admin/SucursalesService';
import branchService from '@/api/Admin/BranchService';

const router = useRouter();
const users = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');

const viewBranch = (id) => {
    console.log('Navegando a detalles de sucursal con ID:', id);
    router.push({ name: 'DetailsBranch', params: { id: id } });
};

const paginationInfo = ref({
    current_page: 1,
    total_pages: 1
});

// State
const currentView = ref('overview');

const fetchUsers = async (page = 1) => {
    isLoading.value = true;
    try {
        const response = await sucursalesService.getAllSucursales(page);
        users.value = response.data || [];
        paginationInfo.value = {
            current_page: response.pagination.current_page || 1,
            total_pages: response.pagination.last_page || 1
        };

    } catch (error) {
        console.error('Error al cargar sucursales:', error);
    } finally {
        isLoading.value = false;
    }
};

// Computed para filtrar (usado en tu v-for)
const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;
    return users.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Funciones de formato
const formatPoints = (points) => {
    return points?.toLocaleString('es-MX') || '0';
};

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
};



// Modal state
const showModal = ref(false);
const modalType = ref('');
const selectedUser = ref(null);
const isSubmitting = ref(false);

const openModal = (type, data = null) => {
    modalType.value = type;
    showModal.value = true;

    if (type === 'editUser' && data) {
        userForm.value = {
            id: data.id, // ID del usuario o de la sucursal según tu lógica
            branch_id: data.branch_id, // Asegúrate de tener el ID de la sucursal
            branch_name: data.branch?.name || '', // O el campo que traiga el nombre de la sucursal
            city: data.branch?.city || '',    // <--- CORRECCIÓN
            address: data.branch?.address || '', // <--- CORRECCIÓN
            // phone: data.phone || '',
            name: data.name,
            email: data.email,
            password: '',
            password_confirmation: ''
        };
    } else {
        // Reset para nuevo
        userForm.value = {
            branch_name: '', city: '', address: '', phone: '',
            name: '', email: '', password: '', password_confirmation: ''
        };
    }
};

const closeModal = () => {
    showModal.value = false;
    modalType.value = '';
    selectedUser.value = null;
    userForm.value = { name: '', email: '', password: '', password_confirmation: '', role: '' };
};

// ... dentro de saveUser ...
const saveUser = async () => {
    isSubmitting.value = true;
    try {
        if (modalType.value === 'addUser') {
            // Validamos que las contraseñas coincidan localmente
            if (userForm.value.password !== userForm.value.password_confirmation) {
                throw new Error('Las contraseñas no coinciden');
            }

            // Preparamos los datos según tu controlador Laravel
            const payload = {
                branch_name: userForm.value.branch_name,
                city: userForm.value.city,
                address: userForm.value.address,
                // phone: userForm.value.phone,
                name: userForm.value.name, // Nombre del encargado o usuario
                email: userForm.value.email,
                password: userForm.value.password,
                password_confirmation: userForm.value.password_confirmation
            };

            await branchService.store(payload);

            Swal.fire({
                icon: 'success',
                title: '¡Creado!',
                text: 'La sucursal y su cuenta han sido registradas',
                timer: 2000,
                showConfirmButton: false
            });

            await fetchUsers(1); // Volver a la página 1 para ver el nuevo registro
            closeModal();

        } else if (modalType.value === 'editUser') {
            // 1. Preparamos el payload
            const payload = {
                branch_name: userForm.value.branch_name,
                city: userForm.value.city,
                address: userForm.value.address,
                // phone: userForm.value.phone,
                name: userForm.value.name,
                email: userForm.value.email,
            };

            // Solo enviamos password si el usuario escribió algo
            if (userForm.value.password) {
                if (userForm.value.password !== userForm.value.password_confirmation) {
                    throw new Error('Las contraseñas no coinciden');
                }
                payload.password = userForm.value.password;
                payload.password_confirmation = userForm.value.password_confirmation;
            }

            // 2. Llamada al endpoint PATCH
            // Nota: Usa el ID de la sucursal (branch_id)
            await branchService.update(userForm.value.branch_id, payload);

            Swal.fire({
                icon: 'success',
                title: '¡Actualizado!',
                text: 'La sucursal se ha actualizado correctamente',
                timer: 2000,
                showConfirmButton: false
            });

            await fetchUsers(paginationInfo.value.current_page);
            closeModal();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || error.message || 'Error al procesar la solicitud'
        });
    } finally {
        isSubmitting.value = false;
    }
};

// Asegúrate de resetear estos campos en closeModal y openModal
const userForm = ref({
    branch_name: '',
    city: '',
    address: '',
    // phone: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
});



const deleteUser = async (user) => {
    const result = await Swal.fire({
        title: '¿Eliminar sucursal?',
        text: `La sucursal ${user.name} se eliminará.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        try {
            isLoading.value = true;
            await branchService.changeStatus(user.branch_id);

            await Swal.fire({
                icon: 'success',
                title: '¡Eliminada!',
                text: 'La sucursal ha sido eliminada correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
            await fetchUsers(paginationInfo.value.current_page);

        } catch (error) {
            console.error('Error al cambiar status:', error);
            Swal.fire(
                'Error',
                'No se pudo cambiar el estatus de la sucursal.',
                'error'
            );
        } finally {
            isLoading.value = false;
        }
    }
};




onMounted(async () => {
    fetchUsers(1)
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

.modal-dialog {
    background: white;
    border-radius: 1.5rem;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid #e2e8f0;
}

.modal-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.modal-close-btn {
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
}

.modal-close-btn:hover {
    background: #e2e8f0;
    color: #1e293b;
}

.modal-close-btn svg {
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

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
}

.form-control {
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    outline: none;
    transition: all 0.2s;
    font-family: inherit;
}

.form-control:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

textarea.form-control {
    resize: vertical;
    min-height: 100px;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.selected-user-info {
    background: #f8fafc;
    border-radius: 0.75rem;
    padding: 1.5rem;
}

.user-info-card {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-avatar-large {
    width: 4rem;
    height: 4rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.user-name-large {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 0.25rem 0;
}

.user-email {
    font-size: 0.875rem;
    color: #64748b;
    margin: 0 0 0.5rem 0;
}

.user-balance {
    font-size: 0.875rem;
    color: #1e293b;
    margin: 0;
}

.radio-group {
    display: flex;
    gap: 1.5rem;
}

.radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.9375rem;
    color: #1e293b;
}

.radio-label input[type="radio"] {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #cbd5e1;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
}

.radio-label input[type="radio"]:checked {
    border-color: #2563eb;
    background: #2563eb;
}

.radio-label input[type="radio"]:checked::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.5rem;
    height: 0.5rem;
    background: white;
    border-radius: 50%;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
}

.checkbox-label:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
}

.checkbox-label:has(input:checked) {
    border-color: #2563eb;
    background: #eff6ff;
}

.checkbox-label input[type="checkbox"] {
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #cbd5e1;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
    margin-top: 0.125rem;
}

.checkbox-label input[type="checkbox"]:checked {
    border-color: #2563eb;
    background: #2563eb;
}

.checkbox-label input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    left: 1.375rem;
    top: 1.25rem;
    width: 0.375rem;
    height: 0.625rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.checkbox-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex: 1;
}

.checkbox-title {
    font-size: 0.9375rem;
    font-weight: 600;
    color: #1e293b;
}

.checkbox-description {
    font-size: 0.8125rem;
    color: #64748b;
    line-height: 1.4;
}

.modal-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 1rem;
    padding: 1.5rem 2rem;
    border-top: 1px solid #e2e8f0;
}

.modal-btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.modal-btn.primary {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
}

.modal-btn.primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
}

.modal-btn.secondary {
    background: white;
    color: #64748b;
    border: 2px solid #e2e8f0;
}

.modal-btn.secondary:hover {
    background: #f8fafc;
    border-color: #cbd5e1;
}

.modal-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.loading-text {
    display: flex;
    align-items: center;
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

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-from .modal-dialog,
.modal-fade-leave-to .modal-dialog {
    transform: scale(0.9);
}

/* View Header */
.view-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.search-box {
    position: relative;
    flex: 1;
    max-width: 400px;
}

.search-icon {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #94a3b8;
    stroke-width: 2;
    pointer-events: none;
}

.search-input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 3rem;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    outline: none;
    transition: all 0.2s;
}

.search-input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.primary-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
    border: none;
    border-radius: 0.75rem;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
}

.primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
}

.primary-btn svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
}

/* Filter Tabs */
.filter-tabs {
    display: flex;
    gap: 0.5rem;
    background: #f1f5f9;
    padding: 0.375rem;
    border-radius: 0.75rem;
}

.filter-tab {
    padding: 0.625rem 1.25rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    color: #64748b;
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.filter-tab.active {
    background: white;
    color: #1e3a8a;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Table */
.table-container {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
}

.data-table thead {
    background: #f8fafc;
}

.data-table th {
    padding: 1rem 1.5rem;
    text-align: left;
    font-size: 0.8125rem;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.data-table td {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e2e8f0;
    font-size: 0.9375rem;
    color: #1e293b;
}

.data-table tbody tr {
    transition: background 0.2s;
}

.data-table tbody tr:hover {
    background: #f8fafc;
}

.user-cell {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar-small {
    width: 2.25rem;
    height: 2.25rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.875rem;
}

.user-name-cell {
    font-weight: 600;
}

.points-badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    background: #dbeafe;
    color: #1e40af;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
}

.status-badge {
    display: inline-block;
    padding: 0.375rem 0.875rem;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
}

.status-badge.pending {
    background: #fed7aa;
    color: #c2410c;
}

.status-badge.completed {
    background: #dcfce7;
    color: #166534;
}

.type-badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
}

.type-badge.add {
    background: #dcfce7;
    color: #166534;
}

.type-badge.subtract {
    background: #fee2e2;
    color: #991b1b;
}

.points-change {
    font-weight: 700;
}

.points-change.add {
    color: #16a34a;
}

.points-change.subtract {
    color: #dc2626;
}

.text-muted {
    color: #94a3b8;
}

/* Action Buttons */
.action-buttons {
    display: flex;
    gap: 0.5rem;
}

.icon-btn {
    width: 2rem;
    height: 2rem;
    background: #f1f5f9;
    border: none;
    border-radius: 0.5rem;
    color: #64748b;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.icon-btn:hover {
    background: #e2e8f0;
    color: #1e3a8a;
}

.icon-btn.danger:hover {
    background: #fee2e2;
    color: #dc2626;
}

.icon-btn svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
}

.action-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.action-btn svg {
    width: 1rem;
    height: 1rem;
    stroke-width: 2;
}

.action-btn.primary {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
}

.action-btn.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.action-btn.secondary {
    background: #f1f5f9;
    color: #1e3a8a;
}

.action-btn.secondary:hover {
    background: #e2e8f0;
}

.action-btn.danger {
    background: #fee2e2;
    color: #dc2626;
}

.action-btn.danger:hover {
    background: #fecaca;
}

.action-btn.small {
    padding: 0.375rem 0.875rem;
    font-size: 0.8125rem;
}
</style>