<template>
  <div class="dashboard-wrapper">
    <!-- Header/Navbar -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-section">
          <img 
            src="@/assets/logo-yepez.svg"  
            alt="Yépez" 
            class="header-logo"
            @error="handleImageError"
          />
        </div>
        
        <nav class="nav-menu">
          <a href="#" class="nav-link active" @click.prevent="currentView = 'dashboard'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Inicio</span>
          </a>
          <a href="#" class="nav-link" @click.prevent="currentView = 'catalog'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Catálogo</span>
          </a>
          <a href="#" class="nav-link" @click.prevent="currentView = 'history'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Historial</span>
          </a>
        </nav>

        <div class="user-section">
          <div class="user-info">
            <div class="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div class="user-details">
              <span class="user-name">{{ user.name }}</span>
              <span class="user-role">Cliente</span>
            </div>
          </div>
          <button class="logout-button" @click="handleLogout" title="Cerrar sesión">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="dashboard-main">
      <div class="dashboard-container">
        <!-- Welcome Section -->
        <section class="welcome-section">
          <div class="welcome-text">
            <h1 class="welcome-title">¡Hola, {{ user.name }}! 👋</h1>
            <p class="welcome-subtitle">Bienvenido a tu portal de recompensas</p>
          </div>
        </section>

        <!-- Balance Card -->
        <section class="balance-section">
          <div class="balance-card">
            <div class="balance-header">
              <div class="balance-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
              </div>
              <div class="balance-info">
                <span class="balance-label">Puntos disponibles</span>
                <div class="balance-amount">
                  <span class="amount-number">{{ formatPoints(balance) }}</span>
                  <span class="amount-text">puntos</span>
                </div>
              </div>
            </div>
            <div class="balance-actions">
              <button class="action-button primary" @click="goToCatalog">
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                Canjear puntos
              </button>
              <button class="action-button secondary" @click="viewTransactions">
                <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                Ver transacciones
              </button>
            </div>
          </div>
        </section>

        <!-- Stats Grid -->
        <section class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ transactions.length }}</span>
              <span class="stat-label">Transacciones</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon green">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ redemptions.length }}</span>
              <span class="stat-label">Canjes realizados</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <div class="stat-content">
              <span class="stat-value">{{ availableRewards }}</span>
              <span class="stat-label">Recompensas disponibles</span>
            </div>
          </div>
        </section>

        <!-- Featured Rewards -->
        <section class="rewards-section">
          <div class="section-header">
            <h2 class="section-title">Recompensas destacadas</h2>
            <button class="view-all-button" @click="goToCatalog">
              Ver todas
              <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <div v-if="isLoadingRewards" class="rewards-loading">
            <div class="spinner-large"></div>
            <p>Cargando recompensas...</p>
          </div>

          <div v-else class="rewards-grid">
            <div 
              v-for="reward in featuredRewards" 
              :key="reward.id" 
              class="reward-card"
            >
              <div class="reward-image">
                <img :src="reward.image || '/placeholder-reward.jpg'" :alt="reward.name">
                <div v-if="reward.stock < 5 && reward.stock > 0" class="stock-badge low">
                  ¡Últimas unidades!
                </div>
                <div v-else-if="reward.stock === 0" class="stock-badge out">
                  Agotado
                </div>
              </div>
              <div class="reward-content">
                <h3 class="reward-name">{{ reward.name }}</h3>
                <p class="reward-description">{{ reward.description }}</p>
                <div class="reward-footer">
                  <div class="reward-points">
                    <svg class="points-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{{ formatPoints(reward.points_required) }}</span>
                  </div>
                  <button 
                    class="redeem-button" 
                    :disabled="reward.stock === 0 || balance < reward.points_required"
                    @click="openRedeemModal(reward)"
                  >
                    {{ reward.stock === 0 ? 'Agotado' : balance < reward.points_required ? 'Puntos insuficientes' : 'Canjear' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Recent Transactions -->
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
            <div 
              v-for="transaction in recentTransactions" 
              :key="transaction.id"
              class="transaction-item"
            >
              <div class="transaction-icon" :class="transaction.type">
                <svg v-if="transaction.type === 'add'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                {{ transaction.type === 'add' ? '+' : '-' }}{{ formatPoints(transaction.points) }}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Redeem Modal -->
    <transition name="modal-fade">
      <div v-if="showRedeemModal" class="modal-overlay" @click="closeRedeemModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeRedeemModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div v-if="selectedReward" class="modal-body">
            <div class="modal-image">
              <img :src="selectedReward.image || '/placeholder-reward.jpg'" :alt="selectedReward.name">
            </div>
            <h3 class="modal-title">{{ selectedReward.name }}</h3>
            <p class="modal-description">{{ selectedReward.description }}</p>
            
            <div class="modal-points">
              <span class="points-label">Costo:</span>
              <span class="points-value">{{ formatPoints(selectedReward.points_required) }} puntos</span>
            </div>

            <div class="modal-balance">
              <span class="balance-label">Tu saldo actual:</span>
              <span class="balance-value">{{ formatPoints(balance) }} puntos</span>
            </div>

            <div class="modal-balance">
              <span class="balance-label">Saldo después del canje:</span>
              <span class="balance-value" :class="{ 'text-success': balance - selectedReward.points_required >= 0 }">
                {{ formatPoints(balance - selectedReward.points_required) }} puntos
              </span>
            </div>

            <transition name="error-fade">
              <div v-if="redeemError" class="modal-error">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {{ redeemError }}
              </div>
            </transition>

            <div class="modal-actions">
              <button class="modal-button secondary" @click="closeRedeemModal" :disabled="isRedeeming">
                Cancelar
              </button>
              <button 
                class="modal-button primary" 
                @click="confirmRedeem" 
                :disabled="isRedeeming"
              >
                <span v-if="!isRedeeming">Confirmar canje</span>
                <span v-else class="button-loading">
                  <svg class="spinner-small" viewBox="0 0 24 24">
                    <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
                  </svg>
                  Procesando...
                </span>
              </button>
            </div>
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
// import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

// State
const user = ref({
  name: 'Juan Pérez',
  email: 'juan@ejemplo.com'
});

const balance = ref(0);
const transactions = ref([]);
const redemptions = ref([]);
const rewards = ref([]);
const isLoadingRewards = ref(true);
const isLoadingTransactions = ref(true);
const currentView = ref('dashboard');

// Modal state
const showRedeemModal = ref(false);
const selectedReward = ref(null);
const isRedeeming = ref(false);
const redeemError = ref('');

// Computed
const featuredRewards = computed(() => {
  return rewards.value.slice(0, 6);
});

const availableRewards = computed(() => {
  return rewards.value.filter(r => r.stock > 0 && r.points_required <= balance.value).length;
});

const recentTransactions = computed(() => {
  return transactions.value.slice(0, 5);
});

// Methods
const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const formatPoints = (points) => {
  return new Intl.NumberFormat('es-MX').format(points);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const fetchBalance = async () => {
  try {
    // const response = await axios.get('/api/balance');
    // balance.value = response.data.balance;
    
    // Datos de ejemplo
    balance.value = 15000;
  } catch (error) {
    console.error('Error al obtener saldo:', error);
  }
};

const fetchTransactions = async () => {
  isLoadingTransactions.value = true;
  try {
    // const response = await axios.get('/api/transactions');
    // transactions.value = response.data;
    
    // Datos de ejemplo
    transactions.value = [
      { id: 1, type: 'add', description: 'Compra de batería 12V', points: 500, created_at: '2024-11-05' },
      { id: 2, type: 'subtract', description: 'Canje: Tarjeta de regalo $500', points: 1000, created_at: '2024-11-04' },
      { id: 3, type: 'add', description: 'Compra de batería 24V', points: 800, created_at: '2024-11-03' },
      { id: 4, type: 'add', description: 'Bonificación especial', points: 200, created_at: '2024-11-02' },
      { id: 5, type: 'subtract', description: 'Canje: Descuento $100', points: 300, created_at: '2024-11-01' }
    ];
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
  } finally {
    isLoadingTransactions.value = false;
  }
};

const fetchRedemptions = async () => {
  try {
    // const response = await axios.get('/api/redemptions');
    // redemptions.value = response.data;
    
    // Datos de ejemplo
    redemptions.value = [
      { id: 1, reward_name: 'Tarjeta de regalo $500', status: 'completed' },
      { id: 2, reward_name: 'Descuento $100', status: 'completed' }
    ];
  } catch (error) {
    console.error('Error al obtener canjes:', error);
  }
};

const fetchRewards = async () => {
  isLoadingRewards.value = true;
  try {
    // const response = await axios.get('/api/rewards');
    // rewards.value = response.data;
    
    // Datos de ejemplo
    rewards.value = [
      { 
        id: 1, 
        name: 'Tarjeta de regalo $500', 
        description: 'Tarjeta de regalo válida en tiendas participantes',
        points_required: 5000, 
        stock: 10,
        image: null
      },
      { 
        id: 2, 
        name: 'Descuento 20% en servicio', 
        description: 'Descuento aplicable en tu próximo servicio',
        points_required: 2000, 
        stock: 25,
        image: null
      },
      { 
        id: 3, 
        name: 'Kit de herramientas', 
        description: 'Kit completo de herramientas básicas',
        points_required: 8000, 
        stock: 3,
        image: null
      },
      { 
        id: 4, 
        name: 'Tarjeta de regalo $1000', 
        description: 'Tarjeta de regalo de mayor denominación',
        points_required: 10000, 
        stock: 5,
        image: null
      },
      { 
        id: 5, 
        name: 'Cupón de gasolina $200', 
        description: 'Cupón canjeable en estaciones de servicio',
        points_required: 3000, 
        stock: 15,
        image: null
      },
      { 
        id: 6, 
        name: 'Membresía Premium 1 mes', 
        description: 'Un mes de acceso premium con beneficios exclusivos',
        points_required: 4000, 
        stock: 0,
        image: null
      }
    ];
  } catch (error) {
    console.error('Error al obtener recompensas:', error);
  } finally {
    isLoadingRewards.value = false;
  }
};

const openRedeemModal = (reward) => {
  selectedReward.value = reward;
  showRedeemModal.value = true;
  redeemError.value = '';
};

const closeRedeemModal = () => {
  showRedeemModal.value = false;
  selectedReward.value = null;
  redeemError.value = '';
};

const confirmRedeem = async () => {
  if (!selectedReward.value) return;
  
  isRedeeming.value = true;
  redeemError.value = '';
  
  try {
    // const response = await axios.post('/api/redeem', {
    //   reward_id: selectedReward.value.id
    // });
    
    // Simulación
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Actualizar saldo
    balance.value -= selectedReward.value.points_required;
    
    // Actualizar stock
    const rewardIndex = rewards.value.findIndex(r => r.id === selectedReward.value.id);
    if (rewardIndex !== -1) {
      rewards.value[rewardIndex].stock--;
    }
    
    // Cerrar modal
    closeRedeemModal();
    
    // Mostrar mensaje de éxito (puedes usar un toast/notification)
    alert('¡Canje realizado con éxito!');
    
    // Recargar datos
    await Promise.all([
      fetchBalance(),
      fetchTransactions(),
      fetchRedemptions()
    ]);
    
  } catch (error) {
    redeemError.value = error.response?.data?.message || 'Error al procesar el canje. Intenta nuevamente.';
  } finally {
    isRedeeming.value = false;
  }
};

const goToCatalog = () => {
  router.push('/catalog');
};

const viewTransactions = () => {
  router.push('/transactions');
};

const handleLogout = async () => {
  await authStore.handleLogout();
  router.push('/login');
};

// Lifecycle
onMounted(async () => {
  await Promise.all([
    fetchBalance(),
    fetchTransactions(),
    fetchRedemptions(),
    fetchRewards()
  ]);
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.dashboard-wrapper {
  min-height: 100vh;
  background: #f8fafc;
}

/* Header */
.dashboard-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.logo-section {
  flex-shrink: 0;
}

.header-logo {
  height: 2.5rem;
  width: auto;
}

.nav-menu {
  display: flex;
  gap: 0.5rem;
  flex: 1;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.nav-link:hover {
  background: #f1f5f9;
  color: #1e3a8a;
}

.nav-link.active {
  background: #1e3a8a;
  color: white;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
}

.user-info {
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

.user-details {
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

.logout-button {
  width: 2.5rem;
  height: 2.5rem;
  background: #fee2e2;
  border: none;
  border-radius: 0.5rem;
  color: #dc2626;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.logout-button:hover {
  background: #fecaca;
  transform: translateY(-2px);
}

.logout-button svg {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

/* Main Content */
.dashboard-main {
  padding: 2rem;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Welcome Section */
.welcome-section {
  animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.welcome-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.welcome-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0;
}

/* Balance Card */
.balance-section {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.balance-card {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  border-radius: 1.5rem;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(30, 58, 138, 0.3);
  color: white;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.balance-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.balance-icon {
  width: 4rem;
  height: 4rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.balance-icon svg {
  width: 2rem;
  height: 2rem;
  stroke-width: 2;
}

.balance-info {
  flex: 1;
}

.balance-label {
  font-size: 0.875rem;
  opacity: 0.9;
  display: block;
  margin-bottom: 0.5rem;
}

.balance-amount {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.amount-number {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.amount-text {
  font-size: 1.125rem;
  opacity: 0.9;
}

.balance-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.action-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button.primary {
  background: white;
  color: #1e3a8a;
}

.action-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

.action-button.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.action-button.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1.75rem;
  height: 1.75rem;
  stroke-width: 2;
}

.stat-icon.blue {
  background: #dbeafe;
  color: #2563eb;
}

.stat-icon.green {
  background: #dcfce7;
  color: #16a34a;
}

.stat-icon.orange {
  background: #fed7aa;
  color: #ea580c;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;
}

/* Rewards Section */
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
  to { transform: rotate(360deg); }
}

.rewards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.reward-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s;
}

.reward-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  border-color: #2563eb;
}

.reward-image {
  position: relative;
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  overflow: hidden;
}

.reward-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.stock-badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.stock-badge.low {
  background: #fed7aa;
  color: #ea580c;
}

.stock-badge.out {
  background: #fee2e2;
  color: #dc2626;
}

.reward-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.reward-name {
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.reward-description {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
}

.reward-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.reward-points {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: #1e3a8a;
}

.points-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
  fill: currentColor;
}

.redeem-button {
  padding: 0.625rem 1.25rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.redeem-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
}

.redeem-button:disabled {
  background: #e2e8f0;
  color: #94a3b8;
  cursor: not-allowed;
  transform: none;
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

.transaction-icon.add {
  background: #dcfce7;
  color: #16a34a;
}

.transaction-icon.subtract {
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

.transaction-amount.add {
  color: #16a34a;
}

.transaction-amount.subtract {
  color: #dc2626;
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

.modal-content {
  background: white;
  border-radius: 1.5rem;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
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
  z-index: 1;
}

.modal-close:hover {
  background: #e2e8f0;
  color: #1e293b;
}

.modal-close svg {
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

.modal-image {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border-radius: 1rem;
  overflow: hidden;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.modal-description {
  font-size: 0.9375rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
}

.modal-points,
.modal-balance {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8fafc;
  border-radius: 0.75rem;
}

.points-label,
.balance-label {
  font-size: 0.9375rem;
  color: #64748b;
  font-weight: 500;
}

.points-value,
.balance-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e3a8a;
}

.balance-value.text-success {
  color: #16a34a;
}

.modal-error {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  border: 1px solid #fecaca;
  font-weight: 500;
}

.error-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
  flex-shrink: 0;
  color: #dc2626;
}

.modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
}

.modal-button {
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-button.primary {
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
}

.modal-button.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
}

.modal-button.secondary {
  background: white;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.modal-button.secondary:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #cbd5e1;
}

.modal-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.button-loading {
  display: flex;
  align-items: center;
  justify-content: center;
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

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  transform: scale(0.9);
}

.error-fade-enter-active,
.error-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 1024px) {
  .header-content {
    padding: 1rem 1.5rem;
  }

  .nav-menu {
    gap: 0.25rem;
  }

  .nav-link span {
    display: none;
  }

  .nav-link {
    padding: 0.625rem;
  }

  .dashboard-main {
    padding: 1.5rem 1rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }

  .balance-actions {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .rewards-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 640px) {
  .header-content {
    padding: 1rem;
    gap: 1rem;
  }

  .user-details {
    display: none;
  }

  .dashboard-main {
    padding: 1rem;
  }

  .dashboard-container {
    gap: 1.5rem;
  }

  .welcome-title {
    font-size: 1.25rem;
  }

  .welcome-subtitle {
    font-size: 0.9375rem;
  }

  .balance-card {
    padding: 1.5rem;
  }

  .amount-number {
    font-size: 2rem;
  }

  .rewards-section,
  .transactions-section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .rewards-grid {
    grid-template-columns: 1fr;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .modal-actions {
    grid-template-columns: 1fr;
  }
}
</style>