<template>
    <div class="content-card">
        <div class="card-header">
            <h3 class="card-title">Actividad Reciente</h3>
        </div>

        <div class="activity-list">
            <div v-if="isLoading" class="rewards-loading">
                <div class="spinner-large"></div>
                <p>Cargando actividad...</p>
            </div>

            <div v-else v-for="activity in recentActivity" :key="activity.id" class="activity-item">
                <div class="activity-icon" :class="activity.type">
                    <svg v-if="activity.type === 'user'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="8.5" cy="7" r="4"></circle>
                        <line x1="20" y1="8" x2="20" y2="14"></line>
                        <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    <svg v-else-if="activity.type === 'reward'" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2">
                        <circle cx="12" cy="8" r="7"></circle>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                    <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </div>
                <div class="activity-content">
                    <p class="activity-text">{{ activity.text }}</p>
                    <span class="activity-time">{{ activity.time }}</span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import adminService from '@/api/Admin/adminService'; // Asegúrate que aquí esté el método getLatestLogs

const recentActivity = ref([]);
const isLoading = ref(true);

const fetchLogs = async () => {
    try {
        isLoading.value = true;
        const responseData = await adminService.getLatestLogs();

        // Accedemos a responseData.data porque tu JSON de Postman muestra que 
        // los logs vienen dentro de una propiedad "data"
        const logs = responseData.data || [];

        recentActivity.value = logs.map(log => ({
            id: log.id,
            // Pasamos subject_type o una cadena vacía si no existe para evitar el error
            type: parseLogType(log.subject_type || ''),
            text: log.description,
            time: log.human_time
        }));
    } catch (error) {
        console.error("Error al cargar logs:", error);
    } finally {
        isLoading.value = false;
    }
};

// Función auxiliar para asignar el icono según la tabla afectada
const parseLogType = (subjectType) => {
    // Validación de seguridad: si no hay valor, retorna un tipo por defecto
    if (!subjectType) return 'default';

    const type = subjectType.toLowerCase();

    if (type.includes('user')) return 'user';
    if (type.includes('reward')) return 'reward';
    if (type.includes('branch')) return 'sucursal';

    return 'default';
};

onMounted(() => {
    fetchLogs();
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

.image-upload-container {
    border: 2px dashed #333;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    cursor: pointer;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-preview {
    position: relative;
    width: 100%;
}

.image-preview img {
    max-height: 140px;
    border-radius: 4px;
}

.remove-image {
    position: absolute;
    top: -10px;
    right: -10px;
    background: #ff4d4d;
    color: white;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    border: none;
    cursor: pointer;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.admin-dashboard-wrapper {
    display: flex;
    min-height: 100vh;
    background: #f8fafc;
}

/* Sidebar */
.admin-sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
}

.sidebar-header {
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.sidebar-logo {
    height: 3rem;
    width: auto;
}

.admin-badge {
    padding: 0.375rem 1rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.sidebar-nav {
    flex: 1;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.875rem 1rem;
    border-radius: 0.75rem;
    text-decoration: none;
    color: #64748b;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all 0.2s;
}

.nav-item:hover {
    background: #f1f5f9;
    color: #1e3a8a;
}

.nav-item.active {
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    color: white;
}

.nav-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
    flex-shrink: 0;
}

.sidebar-footer {
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
}

.logout-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1rem;
    background: #fee2e2;
    color: #dc2626;
    border: none;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.9375rem;
    cursor: pointer;
    transition: all 0.2s;
}

.logout-btn:hover {
    background: #fecaca;
    transform: translateY(-2px);
}

.logout-btn svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
}

/* Main Content */
.admin-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.admin-topbar {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
}

.page-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.admin-user {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.user-avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.user-avatar svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke-width: 2;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.user-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #1e293b;
}

.user-role {
    font-size: 0.75rem;
    color: #64748b;
}

.admin-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
}

.view-container {
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Stats Cards */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.stat-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.2s;
    border-left: 4px solid;
}

.stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stat-card.blue {
    border-left-color: #2563eb;
}

.stat-card.green {
    border-left-color: #16a34a;
}

.stat-card.orange {
    border-left-color: #ea580c;
}

.stat-card.purple {
    border-left-color: #9333ea;
}

.stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stat-icon {
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.blue .stat-icon {
    background: #dbeafe;
    color: #2563eb;
}

.green .stat-icon {
    background: #dcfce7;
    color: #16a34a;
}

.orange .stat-icon {
    background: #fed7aa;
    color: #ea580c;
}

.purple .stat-icon {
    background: #f3e8ff;
    color: #9333ea;
}

.stat-icon svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke-width: 2;
}

.stat-label {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
}

.stat-value {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1e293b;
    line-height: 1;
}

.stat-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.stat-trend {
    font-size: 0.8125rem;
    color: #64748b;
}

.stat-trend.positive {
    color: #16a34a;
}

.quick-action {
    background: none;
    border: none;
    color: #2563eb;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    transition: color 0.2s;
}

.quick-action:hover {
    color: #1e40af;
}

/* Content Grid */
.content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.content-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
}

.card-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

/* Activity List */
.activity-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.activity-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.activity-icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.activity-icon.user {
    background: #dbeafe;
    color: #2563eb;
}

.activity-icon.reward {
    background: #dcfce7;
    color: #16a34a;
}

.activity-icon.redemption {
    background: #fed7aa;
    color: #ea580c;
}

.activity-icon svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
}

.activity-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.activity-text {
    font-size: 0.875rem;
    color: #1e293b;
    margin: 0;
}

.activity-time {
    font-size: 0.75rem;
    color: #64748b;
}

/* Quick Actions Grid */
.quick-actions-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.quick-action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1.5rem 1rem;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    border-radius: 0.75rem;
    color: #1e3a8a;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.quick-action-btn:hover {
    background: white;
    border-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}

.quick-action-btn svg {
    width: 2rem;
    height: 2rem;
    stroke-width: 2;
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

/* Rewards Grid Admin */
.rewards-grid-admin {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
}

.reward-card-admin {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s;
}

.reward-card-admin:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
    border-color: #2563eb;
}

.reward-header-admin {
    position: relative;
}

.reward-image-admin {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
}

.reward-image-admin img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.placeholder-image {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cbd5e1;
}

.placeholder-image svg {
    width: 4rem;
    height: 4rem;
    stroke-width: 1.5;
}

.stock-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 0.875rem;
    background: white;
    border-radius: 0.5rem;
    font-size: 0.8125rem;
    font-weight: 600;
    color: #16a34a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stock-indicator.low {
    color: #ea580c;
}

.stock-indicator.out {
    color: #dc2626;
}

.reward-body-admin {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.reward-name-admin {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
}

.reward-description-admin {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
}

.reward-points-admin {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-top: 0.5rem;
}

.reward-points-admin svg {
    width: 1.125rem;
    height: 1.125rem;
    stroke-width: 2;
    fill: currentColor;
}

.reward-actions-admin {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding: 1rem 1.5rem 1.5rem;
    border-top: 1px solid #e2e8f0;
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

/* Responsive */
@media (max-width: 1024px) {
    .admin-sidebar {
        width: 240px;
    }

    .content-grid {
        grid-template-columns: 1fr;
    }

    .quick-actions-grid {
        grid-template-columns: 1fr 1fr;
    }
}

@media (max-width: 768px) {
    .admin-dashboard-wrapper {
        flex-direction: column;
    }

    .admin-sidebar {
        width: 100%;
        height: auto;
        position: relative;
    }

    .sidebar-nav {
        flex-direction: row;
        overflow-x: auto;
        padding: 1rem;
    }

    .nav-item span {
        display: none;
    }

    .sidebar-footer {
        display: none;
    }

    .admin-topbar {
        padding: 1rem;
    }

    .page-title {
        font-size: 1.25rem;
    }

    .admin-content {
        padding: 1rem;
    }

    .view-header {
        flex-direction: column;
        align-items: stretch;
    }

    .search-box {
        max-width: 100%;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .table-container {
        overflow-x: auto;
    }

    .data-table {
        min-width: 800px;
    }

    .rewards-grid-admin {
        grid-template-columns: 1fr;
    }

    .form-row {
        grid-template-columns: 1fr;
    }

    .quick-actions-grid {
        grid-template-columns: 1fr;
    }
}
</style>