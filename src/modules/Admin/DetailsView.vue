<template>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="header-left">
                    <button @click="goBack" class="btn-back">
                        <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 class="header-title">Detalles de Sucursal</h1>
                </div>
                <div class="header-right">
                    <span class="user-name">Admin User</span>
                    <div class="avatar">A</div>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="card">
                <div class="sucursal-header">
                    <div class="sucursal-avatar">S</div>
                    <div>
                        <h2 class="sucursal-title">{{ sucursal.nombre }}</h2>
                        <p class="sucursal-email">{{ sucursal.email }}</p>
                    </div>
                </div>

                <div class="info-grid">
                    <div class="info-item">
                        <p class="info-label">Ubicación</p>
                        <p class="info-value">{{ sucursal.ubicacion }}</p>
                    </div>
                    <div class="info-item">
                        <p class="info-label">Ciudad</p>
                        <p class="info-value">{{ sucursal.ciudad }}</p>
                    </div>
                    <div class="info-item">
                        <p class="info-label">Puntos Acumulados</p>
                        <p class="info-value puntos">{{ formatPuntos(sucursal.puntos) }}</p>
                    </div>
                    <div class="info-item">
                        <p class="info-label">Fecha de Registro</p>
                        <p class="info-value">{{ sucursal.date }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- <DetailsTable :sucursalId="sucursal.id" /> -->
        <DetailsTable v-if="route.params.id" :sucursalId="route.params.id" />


    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import sucursalesService from '@/api/Admin/SucursalesService';
import DetailsTable from '@/components/Admin/DetailsTable.vue';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const selectedDate = ref('');
const sucursal = ref({
    nombre: "",
    email: "",
    ubicacion: "",
    ciudad: "",
    puntos: 0,
    date: ""
});

const fetchDetalles = async () => {
    try {
        loading.value = true;
        const branchId = route.params.id; 
        const response = await sucursalesService.getSucursalDetails(branchId);
        const userData = response.data;
        sucursal.value = {
            id: userData.id,
            nombre: userData.branch?.name || userData.name,
            email: userData.email,
            ubicacion: userData.branch?.address || 'No especificada',
            ciudad: userData.branch?.city || 'No especificada',
            puntos: userData.puntos || 0,
            date: userData.date || 'Desconocida'

        };

    } catch (error) {
        console.error("Error cargando sucursal:", error);
    } finally {
        loading.value = false;
    }
};

const formatPuntos = (puntos) => {
    return new Intl.NumberFormat().format(puntos);
};


const goBack = () => {
    router.push({ name: 'DashboardAdmin' });
};


onMounted(() => {
    fetchDetalles();
})
</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f9fafb;
    color: #1f2937;
}

.container {
    min-height: 100vh;
    background-color: #f9fafb;
}

/* Header */
.header {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 1rem 2rem;
}

.header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.btn-back {
    padding: 0.5rem;
    background: none;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
}

.btn-back:hover {
    background-color: #f3f4f6;
}

.header-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.user-name {
    font-size: 0.875rem;
    color: #6b7280;
}

.avatar {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #2563eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
}

/* Main Content */
.main-content {
    padding: 2rem;
}

.card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

/* Sucursal Info */
.sucursal-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.sucursal-avatar {
    width: 4rem;
    height: 4rem;
    background-color: #2563eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
}

.sucursal-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.sucursal-email {
    color: #6b7280;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
}

.info-item {
    display: flex;
    flex-direction: column;
}

.info-label {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
}

.info-value {
    font-weight: 600;
    color: #1f2937;
}

.info-value.puntos {
    color: #2563eb;
    font-size: 1.25rem;
}

/* Table Section */
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.table-title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #1f2937;
}

.date-filter {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 0.5rem 0.75rem;
}

.date-filter input {
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.875rem;
    color: #1f2937;
}

/* Table */
.table-container {
    overflow-x: auto;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead tr {
    border-bottom: 1px solid #e5e7eb;
}

th {
    text-align: left;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
}

tbody tr {
    border-bottom: 1px solid #e5e7eb;
    transition: background-color 0.2s;
}

tbody tr:hover {
    background-color: #f9fafb;
}

td {
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    color: #1f2937;
}

.monto-positivo {
    color: #059669;
    font-weight: 600;
}

.monto-negativo {
    color: #dc2626;
    font-weight: 600;
}

/* Status Badge */
.status-badge {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
}

.status-completado {
    background-color: #d1fae5;
    color: #065f46;
}

.status-procesando {
    background-color: #fef3c7;
    color: #92400e;
}

.status-entregado {
    background-color: #d1fae5;
    color: #065f46;
}

.status-pendiente {
    background-color: #fef3c7;
    color: #92400e;
}

.status-cancelado {
    background-color: #fee2e2;
    color: #991b1b;
}

/* Icons */
.icon {
    width: 1.25rem;
    height: 1.25rem;
}

.icon-sm {
    width: 1rem;
    height: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
    .info-grid {
        grid-template-columns: 1fr;
    }

    .main-content {
        padding: 1rem;
    }

    .header {
        padding: 1rem;
    }
}
</style>
