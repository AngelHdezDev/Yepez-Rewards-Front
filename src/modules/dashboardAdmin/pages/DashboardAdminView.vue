<template>
  <div class="admin-dashboard-wrapper">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <img src="@/assets/logo-yepez.svg" alt="Yépez" class="sidebar-logo" @error="handleImageError" />
        <img src="@/assets/red.png" alt="Red-Conecta" class="sidebar-logo" @error="handleImageError" />
        <span class="admin-badge">Admin</span>
      </div>


      <nav class="sidebar-nav">
        <a href="#" class="nav-item" :class="{ active: currentView === 'overview' }"
          @click.prevent="currentView = 'overview'">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Resumen</span>
        </a>

        <a href="#" class="nav-item" :class="{ active: currentView === 'users' }"
          @click.prevent="currentView = 'users'">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>Sucursales</span>
        </a>

        <a href="#" class="nav-item" :class="{ active: currentView === 'rewards' }"
          @click.prevent="currentView = 'rewards'">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <span>Recompensas</span>
        </a>

        <a href="#" class="nav-item" :class="{ active: currentView === 'redemptions' }"
          @click.prevent="currentView = 'redemptions'">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Canjes</span>
        </a>

        <a href="#" class="nav-item" :class="{ active: currentView === 'transactions' }"
          @click.prevent="currentView = 'transactions'">
          <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          <span>Transacciones</span>
        </a>
      </nav>

      <div class="sidebar-footer">
        <button class="logout-btn" @click="handleLogout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <!-- Top Bar -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <h1 class="page-title">{{ pageTitle }}</h1>
        </div>
        <div class="topbar-right">
          <div class="admin-user">
            <div class="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="user-info">
              <span class="user-name">{{ adminUser.name }}</span>
              <span class="user-role">Administrador</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="admin-content">
        <!-- Overview View -->
        <div v-if="currentView === 'overview'" class="view-container">
          <!-- Stats Cards -->
          <div class="stats-grid">
            <div class="stat-card blue">
              <div class="stat-header">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <span class="stat-label">Total Usuarios</span>
              </div>
              <div class="stat-value">{{ stats.totalUsers }}</div>
              <div class="stat-footer">
                <span class="stat-trend positive">+12% este mes</span>
              </div>
            </div>

            <div class="stat-card green">
              <div class="stat-header">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <span class="stat-label">Recompensas Activas</span>
              </div>
              <div class="stat-value">{{ stats.activeRewards }}</div>
              <div class="stat-footer">
                <span class="stat-trend">{{ stats.totalRewards }} en total</span>
              </div>
            </div>

            <div class="stat-card orange">
              <div class="stat-header">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span class="stat-label">Canjes Pendientes</span>
              </div>
              <div class="stat-value">{{ stats.pendingRedemptions }}</div>
              <div class="stat-footer">
                <button class="quick-action" @click="currentView = 'redemptions'">
                  Ver todos →
                </button>
              </div>
            </div>

            <div class="stat-card purple">
              <div class="stat-header">
                <div class="stat-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon
                      points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                    </polygon>
                  </svg>
                </div>
                <span class="stat-label">Puntos Distribuidos</span>
              </div>
              <div class="stat-value">{{ formatPoints(stats.totalPointsDistributed) }}</div>
              <div class="stat-footer">
                <span class="stat-trend">Este mes</span>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="content-grid">
            <div class="content-card">
              <div class="card-header">
                <h3 class="card-title">Actividad Reciente</h3>
              </div>
              <div class="activity-list">
                <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
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
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div class="activity-content">
                    <p class="activity-text">{{ activity.text }}</p>
                    <span class="activity-time">{{ activity.time }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="content-card">
              <div class="card-header">
                <h3 class="card-title">Acciones Rápidas</h3>
              </div>
              <div class="quick-actions-grid">
                <button class="quick-action-btn" @click="openModal('addUser')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  <span>Agregar Sucursal</span>
                </button>
                <button class="quick-action-btn" @click="openModal('addReward')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                  <span>Nueva Recompensa</span>
                </button>
                <button class="quick-action-btn" @click="openModal('addPoints')">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  <span>Asignar Puntos</span>
                </button>
                <button class="quick-action-btn" @click="currentView = 'redemptions'">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>Procesar Canjes</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Users View -->
        <div v-else-if="currentView === 'users'" class="view-container">
          <!-- <div class="view-header">
            <div class="search-box">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input type="text" v-model="searchQuery" placeholder="Buscar usuarios..." class="search-input" />
            </div>
            <button class="primary-btn" @click="openModal('addUser')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Agregar Usuario
            </button>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Usuario</th>
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
                    <span class="points-badge">{{ formatPoints(user.balance) }}</span>
                  </td>
                  <td>{{ formatDate(user.created_at) }}</td>
                  <td>
                    <div class="action-buttons">
                      <button class="icon-btn" @click="openModal('addPoints', user)" title="Asignar puntos">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <line x1="12" y1="1" x2="12" y2="23"></line>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
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
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                          </path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div> -->

          <user-view></user-view>
        </div>

        <!-- Rewards View -->
        <div v-else-if="currentView === 'rewards'" class="view-container">
          <RewardsView></RewardsView>
        </div>

        <!-- Redemptions View -->
        <div v-else-if="currentView === 'redemptions'" class="view-container">
          <RedemptionView></RedemptionView>
        </div>

        <!-- Transactions View -->
        <div v-else-if="currentView === 'transactions'" class="view-container">
          <TransactionView></TransactionView>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <!-- Add/Edit User Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && (modalType === 'addUser' || modalType === 'editUser')" class="modal-overlay"
        @click="closeModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ modalType === 'addUser' ? 'Agregar Usuario' : 'Editar Usuario' }}</h3>
            <button class="modal-close-btn" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nombre completo</label>
              <input type="text" v-model="userForm.name" class="form-control" placeholder="Nombre del usuario">
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" v-model="userForm.email" class="form-control" placeholder="correo@ejemplo.com">
            </div>
            <div v-if="modalType === 'addUser'" class="form-group">
              <label class="form-label">Contraseña</label>
              <input type="password" v-model="userForm.password" class="form-control" placeholder="••••••••">
            </div>
            <div v-if="modalType === 'addUser'" class="form-group">
              <label class="form-label">Confirmar contraseña</label>
              <input type="password" v-model="userForm.password_confirmation" class="form-control"
                placeholder="••••••••">
            </div>
            <!-- <div class="form-group">
              <label class="form-label">Rol del usuario</label>
              <div class="checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="userForm.role" value="admin">
                  <span class="checkbox-custom"></span>
                  <div class="checkbox-content">
                    <span class="checkbox-title">Administrador</span>
                    <span class="checkbox-description">Acceso completo al panel de administración</span>
                  </div>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="userForm.role" value="client">
                  <span class="checkbox-custom"></span>
                  <div class="checkbox-content">
                    <span class="checkbox-title">Cliente</span>
                    <span class="checkbox-description">Acceso al portal de recompensas</span>
                  </div>
                </label>
              </div>
            </div> -->
            <div class="form-group">
              <label class="form-label">Rol del usuario</label>
              <select v-model="userForm.role" class="form-control">
                <option value="">Seleccionar rol</option>
                <option value="admin">Administrador</option>
                <option value="client">Cliente</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeModal">Cancelar</button>
            <button class="modal-btn primary" @click="saveUser" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ modalType === 'addUser' ? 'Crear Usuario' : 'Guardar Cambios' }}</span>
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

    <!-- Add/Edit Reward Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && (modalType === 'addReward' || modalType === 'editReward')" class="modal-overlay"
        @click="closeModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">{{ modalType === 'addReward' ? 'Nueva Recompensa' : 'Editar Recompensa' }}</h3>
            <button class="modal-close-btn" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nombre de la recompensa</label>
              <input type="text" v-model="rewardForm.name" class="form-control"
                placeholder="Ej: Tarjeta de regalo $500">
            </div>
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <textarea v-model="rewardForm.description" class="form-control" rows="3"
                placeholder="Descripción detallada de la recompensa"></textarea>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Puntos requeridos</label>
                <input type="number" v-model="rewardForm.points_required" class="form-control" placeholder="5000">
              </div>
              <div class="form-group">
                <label class="form-label">Stock disponible</label>
                <input type="number" v-model="rewardForm.stock" class="form-control" placeholder="10">
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">URL de imagen (opcional)</label>
              <input type="url" v-model="rewardForm.image" class="form-control"
                placeholder="https://ejemplo.com/imagen.jpg">
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeModal">Cancelar</button>
            <button class="modal-btn primary" @click="saveReward" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ modalType === 'addReward' ? 'Crear Recompensa' : 'Guardar Cambios' }}</span>
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

    <!-- Add Points Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && modalType === 'addPoints'" class="modal-overlay" @click="closeModal">
        <div class="modal-dialog" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Asignar Puntos</h3>
            <button class="modal-close-btn" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div v-if="!selectedUser" class="form-group">
              <label class="form-label">Seleccionar usuario</label>
              <select v-model="pointsForm.user_id" class="form-control">
                <option value="">-- Selecciona un usuario --</option>
                <option v-for="user in users" :key="user.id" :value="user.id">
                  {{ user.name }} ({{ user.email }})
                </option>
              </select>
            </div>
            <div v-else class="selected-user-info">
              <div class="user-info-card">
                <div class="user-avatar-large">
                  {{ selectedUser.name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <h4 class="user-name-large">{{ selectedUser.name }}</h4>
                  <p class="user-email">{{ selectedUser.email }}</p>
                  <p class="user-balance">Saldo actual: <strong>{{ formatPoints(selectedUser.balance) }} puntos</strong>
                  </p>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Tipo de transacción</label>
              <div class="radio-group">
                <label class="radio-label">
                  <input type="radio" v-model="pointsForm.type" value="add" name="transactionType">
                  <span class="radio-custom"></span>
                  <span>Agregar puntos</span>
                </label>
                <label class="radio-label">
                  <input type="radio" v-model="pointsForm.type" value="subtract" name="transactionType">
                  <span class="radio-custom"></span>
                  <span>Restar puntos</span>
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Cantidad de puntos</label>
              <input type="number" v-model="pointsForm.points" class="form-control" placeholder="500" min="1">
            </div>
            <div class="form-group">
              <label class="form-label">Descripción</label>
              <input type="text" v-model="pointsForm.description" class="form-control"
                placeholder="Ej: Compra de batería 12V">
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeModal">Cancelar</button>
            <button class="modal-btn primary" @click="saveTransaction" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Confirmar Transacción</span>
              <span v-else class="loading-text">
                <svg class="spinner-small" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor"
                    stroke-width="3"></circle>
                </svg>
                Procesando...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import adminService from '@/api/adminService';
import Swal from 'sweetalert2';
import UserView from '@/modules/Admin/UserView.vue';
import TransactionView from '@/modules/Admin/TransactionView.vue';
import RedemptionView from '@/modules/Admin/RedemptionView.vue';
import RewardsView from '@/modules/Admin/RewardsView.vue';

const router = useRouter();
const authStore = useAuthStore();

// State
const currentView = ref('overview');
const searchQuery = ref('');
const searchRewardsQuery = ref('');
const searchTransactionsQuery = ref('');
const redemptionFilter = ref('all');

const adminUser = ref({
  name: 'Admin User',
  email: 'admin@yepez.com'
});

const stats = ref({
  totalUsers: 156,
  activeRewards: 12,
  totalRewards: 15,
  pendingRedemptions: 8,
  totalPointsDistributed: 125000
});



const rewards = ref([
  { id: 1, name: 'Tarjeta de regalo $500', description: 'Tarjeta válida en tiendas participantes', points_required: 5000, stock: 10, image: null },
  { id: 2, name: 'Descuento 20% en servicio', description: 'Descuento en tu próximo servicio', points_required: 2000, stock: 25, image: null },
  { id: 3, name: 'Kit de herramientas', description: 'Kit completo de herramientas básicas', points_required: 8000, stock: 3, image: null },
  { id: 4, name: 'Tarjeta de regalo $1000', description: 'Tarjeta de mayor denominación', points_required: 10000, stock: 5, image: null }
]);


const recentActivity = ref([
  { id: 1, type: 'user', text: 'Nuevo usuario registrado: Ana Martínez', time: 'Hace 2 horas' },
  { id: 2, type: 'redemption', text: 'Juan Pérez canjeó Tarjeta de regalo $500', time: 'Hace 3 horas' },
  { id: 3, type: 'reward', text: 'Nueva recompensa agregada: Kit de herramientas', time: 'Hace 5 horas' },
  { id: 4, type: 'user', text: 'Carlos López alcanzó 20,000 puntos', time: 'Hace 1 día' }
]);

// Modal state
const showModal = ref(false);
const modalType = ref('');
const selectedUser = ref(null);
const isSubmitting = ref(false);

const userForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role: ''
});

const rewardForm = ref({
  name: '',
  description: '',
  points_required: '',
  stock: '',
  image: ''
});

const pointsForm = ref({
  user_id: '',
  type: 'add',
  points: '',
  description: ''
});

// Computed
const pageTitle = computed(() => {
  const titles = {
    overview: 'Panel de Control',
    users: 'Gestión de Sucursales',
    rewards: 'Gestión de Recompensas',
    redemptions: 'Gestión de Canjes',
    transactions: 'Historial de Transacciones'
  };
  return titles[currentView.value] || 'Dashboard';
});

// Methods
const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const formatPoints = (points) => {
  return new Intl.NumberFormat('es-MX').format(points);
};

const openModal = (type, data = null) => {
  modalType.value = type;
  showModal.value = true;

  if (type === 'editUser' && data) {
    userForm.value = { ...data };
  } else if (type === 'editReward' && data) {
    rewardForm.value = { ...data };
  } else if (type === 'addPoints' && data) {
    selectedUser.value = data;
    pointsForm.value.user_id = data.id;
  } else {
    selectedUser.value = null;
  }
};

const closeModal = () => {
  showModal.value = false;
  modalType.value = '';
  selectedUser.value = null;
  userForm.value = { name: '', email: '', password: '', password_confirmation: '', role: '' };
  rewardForm.value = { name: '', description: '', points_required: '', stock: '', image: '' };
  pointsForm.value = { user_id: '', type: 'add', points: '', description: '' };
};

const saveUser = async () => {
  isSubmitting.value = true;
  try {
    if (modalType.value === 'addUser') {
      // Validaciones básicas
      if (!userForm.value.name || !userForm.value.email || !userForm.value.password) {
        await Swal.fire({
          icon: 'warning',
          title: 'Campos incompletos',
          text: 'Por favor complete todos los campos obligatorios',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      if (userForm.value.password !== userForm.value.password_confirmation) {
        await Swal.fire({
          icon: 'warning',
          title: 'Contraseñas no coinciden',
          text: 'Las contraseñas deben ser iguales',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      if (userForm.value.role.length === 0) {
        await Swal.fire({
          icon: 'warning',
          title: 'Rol requerido',
          text: 'Debe seleccionar un rol',
          confirmButtonText: 'Entendido'
        });
        return;
      }

      // Preparar datos para el backend - USAR 'role' EN SINGULAR
      const userData = {
        name: userForm.value.name,
        email: userForm.value.email,
        password: userForm.value.password,
        password_confirmation: userForm.value.password_confirmation,
        role: userForm.value.role // Tomar solo el primer rol seleccionado
      };

      // console.log('Datos a enviar:', userData); // DEBUG

      // Llamada REAL al servicio
      const newUser = await adminService.createUser(userData);

      // Agregar el usuario a la lista local
      users.value.push({
        id: users.value.length + 1,
        name: newUser.name || userForm.value.name,
        email: newUser.email || userForm.value.email,
        balance: 0,
        created_at: new Date().toISOString(),
        role: [{ name: userForm.value.role }] // Mantener como array para la vista
      });

      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario creado exitosamente',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      // Para editar (mantener simulado por ahora)
      await new Promise(resolve => setTimeout(resolve, 1000));
      const index = users.value.findIndex(u => u.id === userForm.value.id);
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...userForm.value };
      }
      alert('Usuario actualizado exitosamente');
    }

    closeModal();
  } catch (error) {
    console.error('Error en saveUser:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Error al guardar usuario',
      confirmButtonText: 'Entendido'
    });
  } finally {
    isSubmitting.value = false;
  }
};

const saveReward = async () => {
  isSubmitting.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (modalType.value === 'addReward') {
      // await axios.post('/api/admin/rewards', rewardForm.value);
      rewards.value.push({
        id: rewards.value.length + 1,
        ...rewardForm.value
      });
      alert('Recompensa creada exitosamente');
    } else {
      // await axios.put(`/api/admin/rewards/${rewardForm.value.id}`, rewardForm.value);
      const index = rewards.value.findIndex(r => r.id === rewardForm.value.id);
      if (index !== -1) {
        rewards.value[index] = { ...rewardForm.value };
      }
      alert('Recompensa actualizada exitosamente');
    }

    closeModal();
  } catch (error) {
    alert('Error al guardar recompensa');
  } finally {
    isSubmitting.value = false;
  }
};

const saveTransaction = async () => {
  isSubmitting.value = true;
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // await axios.post('/api/admin/transactions', pointsForm.value);

    const user = users.value.find(u => u.id === parseInt(pointsForm.value.user_id));
    if (user) {
      if (pointsForm.value.type === 'add') {
        user.balance += parseInt(pointsForm.value.points);
      } else {
        user.balance -= parseInt(pointsForm.value.points);
      }
    }

    transactions.value.unshift({
      id: transactions.value.length + 1,
      user_name: user?.name || 'Usuario',
      type: pointsForm.value.type,
      points: parseInt(pointsForm.value.points),
      description: pointsForm.value.description,
      created_at: new Date().toISOString()
    });

    alert('Transacción registrada exitosamente');
    closeModal();
  } catch (error) {
    alert('Error al procesar transacción');
  } finally {
    isSubmitting.value = false;
  }
};

const deleteUser = async (user) => {
  if (!confirm(`¿Estás seguro de eliminar al usuario ${user.name}?`)) return;

  try {
    // await axios.delete(`/api/admin/users/${user.id}`);
    users.value = users.value.filter(u => u.id !== user.id);
    alert('Usuario eliminado exitosamente');
  } catch (error) {
    alert('Error al eliminar usuario');
  }
};

const deleteReward = async (reward) => {
  if (!confirm(`¿Estás seguro de eliminar la recompensa "${reward.name}"?`)) return;

  try {
    // await axios.delete(`/api/admin/rewards/${reward.id}`);
    rewards.value = rewards.value.filter(r => r.id !== reward.id);
    alert('Recompensa eliminada exitosamente');
  } catch (error) {
    alert('Error al eliminar recompensa');
  }
};

const handleLogout = async () => {
  await authStore.handleLogout();
  router.push('/login');
};

onMounted(async () => {
  // Cargar datos iniciales
  // await Promise.all([
  //   fetchUsers(),
  //   fetchRewards(),
  //   fetchRedemptions(),
  //   fetchTransactions()
  // ]);
});
</script>

<style scoped>
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