<template>
  <div class="branch-dashboard-wrapper">
    <!-- Header/Navbar -->
    <header class="dashboard-header">
      <div class="header-content">
        <div class="logo-section">
          <img 
            src="/logo-yepez.png" 
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
          <a href="#" class="nav-link" @click.prevent="currentView = 'tickets'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
            <span>Tickets</span>
          </a>
          <a href="#" class="nav-link" @click.prevent="currentView = 'customers'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Clientes</span>
          </a>
          <a href="#" class="nav-link" @click.prevent="currentView = 'rewards'">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="8" r="7"></circle>
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
            </svg>
            <span>Premios</span>
          </a>
        </nav>

        <div class="user-section">
          <div class="user-info">
            <div class="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="user-details">
              <span class="user-name">{{ branch.name }}</span>
              <span class="user-role">Sucursal</span>
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
        <!-- Dashboard View -->
        <div v-if="currentView === 'dashboard'">
          <!-- Welcome Section -->
          <section class="welcome-section">
            <div class="welcome-text">
              <h1 class="welcome-title">¡Hola, {{ branch.name }}! 👋</h1>
              <p class="welcome-subtitle">Gestiona tus tickets, clientes y canje de premios</p>
            </div>
          </section>

          <!-- Balance Card -->
          <section class="balance-section">
            <div class="balance-card">
              <div class="balance-header">
                <div class="balance-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
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
                <button class="action-button primary" @click="openModal('registerTicket')">
                  <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                  Registrar ticket
                </button>
                <button class="action-button secondary" @click="currentView = 'rewards'">
                  <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Canjear premios
                </button>
              </div>
            </div>
          </section>

          <!-- Stats Grid -->
          <section class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">{{ stats.totalTickets }}</span>
                <span class="stat-label">Tickets registrados</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">{{ stats.totalCustomers }}</span>
                <span class="stat-label">Clientes registrados</span>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div class="stat-content">
                <span class="stat-value">{{ stats.totalRedemptions }}</span>
                <span class="stat-label">Premios canjeados</span>
              </div>
            </div>
          </section>

          <!-- Quick Actions -->
          <section class="quick-actions-section">
            <h2 class="section-title">Acciones Rápidas</h2>
            <div class="quick-actions-grid">
              <button class="quick-action-card" @click="openModal('registerTicket')">
                <div class="quick-action-icon blue">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="18" x2="12" y2="12"></line>
                    <line x1="9" y1="15" x2="15" y2="15"></line>
                  </svg>
                </div>
                <h3 class="quick-action-title">Registrar Ticket</h3>
                <p class="quick-action-description">Registra un nuevo ticket de venta y gana puntos</p>
              </button>

              <button class="quick-action-card" @click="openModal('addCustomer')">
                <div class="quick-action-icon green">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <h3 class="quick-action-title">Agregar Cliente</h3>
                <p class="quick-action-description">Registra un nuevo cliente en tu sucursal</p>
              </button>

              <button class="quick-action-card" @click="currentView = 'rewards'">
                <div class="quick-action-icon purple">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
                <h3 class="quick-action-title">Ver Premios</h3>
                <p class="quick-action-description">Explora el catálogo y canjea tus premios</p>
              </button>
            </div>
          </section>

          <!-- Recent Activity Grid -->
          <div class="content-grid">
            <!-- Recent Tickets -->
            <div class="content-card">
              <div class="card-header">
                <h3 class="card-title">Tickets Recientes</h3>
                <button class="view-all-link" @click="currentView = 'tickets'">Ver todos →</button>
              </div>
              <div v-if="recentTickets.length === 0" class="empty-state-small">
                <svg class="empty-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                <p>No hay tickets registrados</p>
              </div>
              <div v-else class="list-container">
                <div v-for="ticket in recentTickets" :key="ticket.id" class="list-item">
                  <div class="list-item-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14 2 14 8 20 8"></polyline>
                    </svg>
                  </div>
                  <div class="list-item-content">
                    <span class="list-item-title">Ticket #{{ ticket.ticket_number }}</span>
                    <span class="list-item-subtitle">{{ formatDate(ticket.date) }} • ${{ formatMoney(ticket.amount) }}</span>
                  </div>
                  <div class="list-item-badge success">
                    +{{ ticket.points_earned }} pts
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Customers -->
            <div class="content-card">
              <div class="card-header">
                <h3 class="card-title">Clientes Recientes</h3>
                <button class="view-all-link" @click="currentView = 'customers'">Ver todos →</button>
              </div>
              <div v-if="recentCustomers.length === 0" class="empty-state-small">
                <svg class="empty-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                </svg>
                <p>No hay clientes registrados</p>
              </div>
              <div v-else class="list-container">
                <div v-for="customer in recentCustomers" :key="customer.id" class="list-item">
                  <div class="list-item-avatar">
                    {{ customer.name.charAt(0).toUpperCase() }}
                  </div>
                  <div class="list-item-content">
                    <span class="list-item-title">{{ customer.name }}</span>
                    <span class="list-item-subtitle">{{ customer.email }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tickets View -->
        <div v-else-if="currentView === 'tickets'" class="view-container">
          <div class="view-header">
            <h2 class="view-title">Mis Tickets</h2>
            <button class="primary-btn" @click="openModal('registerTicket')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Registrar Ticket
            </button>
          </div>

          <div class="table-card">
            <table class="data-table">
              <thead>
                <tr>
                  <th>No. Ticket</th>
                  <th>Fecha</th>
                  <th>Monto</th>
                  <th>Puntos Ganados</th>
                  <th>Registrado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in tickets" :key="ticket.id">
                  <td><strong>#{{ ticket.ticket_number }}</strong></td>
                  <td>{{ formatDate(ticket.date) }}</td>
                  <td>${{ formatMoney(ticket.amount) }}</td>
                  <td>
                    <span class="points-badge success">+{{ ticket.points_earned }} pts</span>
                  </td>
                  <td>{{ formatDateTime(ticket.created_at) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Customers View -->
        <div v-else-if="currentView === 'customers'" class="view-container">
          <div class="view-header">
            <h2 class="view-title">Mis Clientes</h2>
            <button class="primary-btn" @click="openModal('addCustomer')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Agregar Cliente
            </button>
          </div>

          <div class="customers-grid">
            <div v-for="customer in customers" :key="customer.id" class="customer-card">
              <div class="customer-avatar-large">
                {{ customer.name.charAt(0).toUpperCase() }}
              </div>
              <div class="customer-info">
                <h4 class="customer-name">{{ customer.name }}</h4>
                <div class="customer-details">
                  <div class="customer-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>{{ customer.email }}</span>
                  </div>
                  <div class="customer-detail">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>{{ customer.phone }}</span>
                  </div>
                </div>
                <div class="customer-meta">
                  Registrado: {{ formatDate(customer.created_at) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rewards View -->
        <div v-else-if="currentView === 'rewards'" class="view-container">
          <div class="view-header">
            <h2 class="view-title">Catálogo de Premios</h2>
            <div class="balance-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {{ formatPoints(balance) }} puntos
            </div>
          </div>

          <div class="rewards-grid">
            <div v-for="reward in rewards" :key="reward.id" class="reward-card">
              <div class="reward-image">
                <img v-if="reward.image" :src="reward.image" :alt="reward.name">
                <div v-else class="placeholder-image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                  </svg>
                </div>
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
                    class="redeem-btn" 
                    :disabled="reward.stock === 0 || balance < reward.points_required"
                    @click="openRedeemModal(reward)"
                  >
                    {{ reward.stock === 0 ? 'Agotado' : balance < reward.points_required ? 'Puntos insuficientes' : 'Canjear' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Register Ticket Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && modalType === 'registerTicket'" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Registrar Ticket de Venta</h3>
            <button class="modal-close" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Número de Ticket</label>
              <input 
                type="text" 
                v-model="ticketForm.ticket_number" 
                class="form-input"
                placeholder="Ej: 00123456"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">Fecha de Venta</label>
              <input 
                type="date" 
                v-model="ticketForm.date" 
                class="form-input"
                :max="today"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">Monto Total</label>
              <div class="input-with-prefix">
                <span class="input-prefix">$</span>
                <input 
                  type="number" 
                  v-model="ticketForm.amount" 
                  class="form-input with-prefix"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                >
              </div>
              <p class="form-help-text">Este ticket generará aproximadamente <strong>{{ calculatePoints(ticketForm.amount) }} puntos</strong></p>
            </div>

            <transition name="error-fade">
              <div v-if="modalError" class="modal-error">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {{ modalError }}
              </div>
            </transition>
          </div>
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeModal" :disabled="isSubmitting">Cancelar</button>
            <button class="modal-btn primary" @click="submitTicket" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Registrar Ticket</span>
              <span v-else class="loading-text">
                <svg class="spinner-small" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                Registrando...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Add Customer Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && modalType === 'addCustomer'" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Agregar Cliente</h3>
            <button class="modal-close" @click="closeModal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Nombre Completo</label>
              <input 
                type="text" 
                v-model="customerForm.name" 
                class="form-input"
                placeholder="Nombre del cliente"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">Correo Electrónico</label>
              <input 
                type="email" 
                v-model="customerForm.email" 
                class="form-input"
                placeholder="correo@ejemplo.com"
                required
              >
            </div>
            <div class="form-group">
              <label class="form-label">Número de Celular</label>
              <input 
                type="tel" 
                v-model="customerForm.phone" 
                class="form-input"
                placeholder="33 1234 5678"
                required
              >
            </div>

            <transition name="error-fade">
              <div v-if="modalError" class="modal-error">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {{ modalError }}
              </div>
            </transition>
          </div>
          <div class="modal-footer">
            <button class="modal-btn secondary" @click="closeModal" :disabled="isSubmitting">Cancelar</button>
            <button class="modal-btn primary" @click="submitCustomer" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Agregar Cliente</span>
              <span v-else class="loading-text">
                <svg class="spinner-small" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
                </svg>
                Guardando...
              </span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Redeem Modal -->
    <transition name="modal-fade">
      <div v-if="showModal && modalType === 'redeem'" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div v-if="selectedReward" class="modal-body">
            <div class="modal-image">
              <img v-if="selectedReward.image" :src="selectedReward.image" :alt="selectedReward.name">
              <div v-else class="placeholder-image-large">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
              </div>
            </div>
            <h3 class="modal-title-large">{{ selectedReward.name }}</h3>
            <p class="modal-description">{{ selectedReward.description }}</p>
            
            <div class="modal-info-box">
              <div class="info-row">
                <span class="info-label">Costo:</span>
                <span class="info-value">{{ formatPoints(selectedReward.points_required) }} puntos</span>
              </div>
              <div class="info-row">
                <span class="info-label">Tu saldo actual:</span>
                <span class="info-value">{{ formatPoints(balance) }} puntos</span>
              </div>
              <div class="info-row highlight">
                <span class="info-label">Saldo después del canje:</span>
                <span class="info-value" :class="{ 'text-success': balance - selectedReward.points_required >= 0 }">
                  {{ formatPoints(balance - selectedReward.points_required) }} puntos
                </span>
              </div>
            </div>

            <transition name="error-fade">
              <div v-if="modalError" class="modal-error">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                {{ modalError }}
              </div>
            </transition>

            <div class="modal-actions">
              <button class="modal-btn secondary" @click="closeModal" :disabled="isSubmitting">
                Cancelar
              </button>
              <button 
                class="modal-btn primary" 
                @click="confirmRedeem" 
                :disabled="isSubmitting"
              >
                <span v-if="!isSubmitting">Confirmar canje</span>
                <span v-else class="loading-text">
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

const router = useRouter();
const authStore = useAuthStore();

// State
const currentView = ref('dashboard');
const balance = ref(15000);
const showModal = ref(false);
const modalType = ref('');
const isSubmitting = ref(false);
const modalError = ref('');
const selectedReward = ref(null);

const branch = ref({
  id: 1,
  name: 'Sucursal Centro'
});

const stats = ref({
  totalTickets: 45,
  totalCustomers: 128,
  totalRedemptions: 12
});

const today = computed(() => {
  return new Date().toISOString().split('T')[0];
});

const ticketForm = ref({
  ticket_number: '',
  date: today.value,
  amount: ''
});

const customerForm = ref({
  name: '',
  email: '',
  phone: ''
});

const tickets = ref([
  { id: 1, ticket_number: '001234', date: '2024-11-15', amount: 2500, points_earned: 250, created_at: '2024-11-15T10:30:00' },
  { id: 2, ticket_number: '001235', date: '2024-11-14', amount: 1800, points_earned: 180, created_at: '2024-11-14T15:20:00' },
  { id: 3, ticket_number: '001236', date: '2024-11-13', amount: 3200, points_earned: 320, created_at: '2024-11-13T11:45:00' },
  { id: 4, ticket_number: '001237', date: '2024-11-12', amount: 950, points_earned: 95, created_at: '2024-11-12T09:15:00' },
  { id: 5, ticket_number: '001238', date: '2024-11-11', amount: 4100, points_earned: 410, created_at: '2024-11-11T16:30:00' }
]);

const customers = ref([
  { id: 1, name: 'Juan Pérez García', email: 'juan@ejemplo.com', phone: '33 1234 5678', created_at: '2024-11-10' },
  { id: 2, name: 'María López Rodríguez', email: 'maria@ejemplo.com', phone: '33 8765 4321', created_at: '2024-11-09' },
  { id: 3, name: 'Carlos Hernández', email: 'carlos@ejemplo.com', phone: '33 5555 6666', created_at: '2024-11-08' },
  { id: 4, name: 'Ana Martínez', email: 'ana@ejemplo.com', phone: '33 7777 8888', created_at: '2024-11-07' }
]);

const rewards = ref([
  { id: 1, name: 'Tarjeta de regalo $500', description: 'Tarjeta válida en tiendas participantes', points_required: 5000, stock: 10, image: null },
  { id: 2, name: 'Descuento 20% en servicio', description: 'Descuento en tu próximo servicio', points_required: 2000, stock: 25, image: null },
  { id: 3, name: 'Kit de herramientas', description: 'Kit completo de herramientas básicas', points_required: 8000, stock: 3, image: null },
  { id: 4, name: 'Tarjeta de regalo $1000', description: 'Tarjeta de mayor denominación', points_required: 10000, stock: 5, image: null },
  { id: 5, name: 'Cupón de gasolina $200', description: 'Cupón canjeable en estaciones de servicio', points_required: 3000, stock: 15, image: null },
  { id: 6, name: 'Membresía Premium', description: 'Un mes de acceso premium', points_required: 4000, stock: 0, image: null }
]);

const recentTickets = computed(() => tickets.value.slice(0, 5));
const recentCustomers = computed(() => customers.value.slice(0, 5));

// Methods
const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const formatPoints = (points) => {
  return new Intl.NumberFormat('es-MX').format(points || 0);
};

const formatMoney = (amount) => {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount || 0);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatDateTime = (datetime) => {
  return new Date(datetime).toLocaleString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const calculatePoints = (amount) => {
  // Ejemplo: cada $10 = 1 punto
  // Ajusta esta fórmula según tu lógica de negocio
  if (!amount) return 0;
  return Math.floor(amount / 10);
};

const openModal = (type, data = null) => {
  modalType.value = type;
  showModal.value = true;
  modalError.value = '';
  
  if (type === 'redeem' && data) {
    selectedReward.value = data;
  }
};

const closeModal = () => {
  showModal.value = false;
  modalType.value = '';
  modalError.value = '';
  selectedReward.value = null;
  ticketForm.value = { ticket_number: '', date: today.value, amount: '' };
  customerForm.value = { name: '', email: '', phone: '' };
};

const submitTicket = async () => {
  isSubmitting.value = true;
  modalError.value = '';
  
  try {
    // Validaciones
    if (!ticketForm.value.ticket_number || !ticketForm.value.date || !ticketForm.value.amount) {
      modalError.value = 'Por favor completa todos los campos';
      return;
    }

    if (parseFloat(ticketForm.value.amount) <= 0) {
      modalError.value = 'El monto debe ser mayor a 0';
      return;
    }

    // Simulación de llamada API
    // await axios.post('/api/tickets', ticketForm.value);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const pointsEarned = calculatePoints(ticketForm.value.amount);
    
    // Agregar el ticket a la lista
    tickets.value.unshift({
      id: tickets.value.length + 1,
      ticket_number: ticketForm.value.ticket_number,
      date: ticketForm.value.date,
      amount: parseFloat(ticketForm.value.amount),
      points_earned: pointsEarned,
      created_at: new Date().toISOString()
    });
    
    // Actualizar balance y stats
    balance.value += pointsEarned;
    stats.value.totalTickets++;
    
    alert(`¡Ticket registrado! Has ganado ${pointsEarned} puntos`);
    closeModal();
    
  } catch (error) {
    modalError.value = error.response?.data?.message || 'Error al registrar el ticket';
  } finally {
    isSubmitting.value = false;
  }
};

const submitCustomer = async () => {
  isSubmitting.value = true;
  modalError.value = '';
  
  try {
    // Validaciones
    if (!customerForm.value.name || !customerForm.value.email || !customerForm.value.phone) {
      modalError.value = 'Por favor completa todos los campos';
      return;
    }

    // Simulación de llamada API
    // await axios.post('/api/branch/customers', customerForm.value);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Agregar el cliente a la lista
    customers.value.unshift({
      id: customers.value.length + 1,
      name: customerForm.value.name,
      email: customerForm.value.email,
      phone: customerForm.value.phone,
      created_at: new Date().toISOString()
    });
    
    // Actualizar stats
    stats.value.totalCustomers++;
    
    alert('¡Cliente agregado exitosamente!');
    closeModal();
    
  } catch (error) {
    modalError.value = error.response?.data?.message || 'Error al agregar el cliente';
  } finally {
    isSubmitting.value = false;
  }
};

const openRedeemModal = (reward) => {
  selectedReward.value = reward;
  modalType.value = 'redeem';
  showModal.value = true;
  modalError.value = '';
};

const confirmRedeem = async () => {
  if (!selectedReward.value) return;
  
  isSubmitting.value = true;
  modalError.value = '';
  
  try {
    // await axios.post('/api/redeem', { reward_id: selectedReward.value.id });
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Actualizar balance
    balance.value -= selectedReward.value.points_required;
    
    // Actualizar stock
    const rewardIndex = rewards.value.findIndex(r => r.id === selectedReward.value.id);
    if (rewardIndex !== -1) {
      rewards.value[rewardIndex].stock--;
    }
    
    // Actualizar stats
    stats.value.totalRedemptions++;
    
    closeModal();
    alert('¡Canje realizado con éxito!');
    
  } catch (error) {
    modalError.value = error.response?.data?.message || 'Error al procesar el canje';
  } finally {
    isSubmitting.value = false;
  }
};

const handleLogout = async () => {
  await authStore.handleLogout();
  router.push('/login');
};

onMounted(async () => {
  // Cargar datos iniciales
  // await fetchBranchData();
});
</script>