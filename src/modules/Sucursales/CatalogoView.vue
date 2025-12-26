<template>
    <Navbar></Navbar>
    <div class="catalog-page">
        <header class="catalog-header">
            <div class="header-info">
                <h1 class="main-title">Catálogo de <span class="text-blue">Recompensas</span></h1>
                <p class="subtitle">Canjea tus puntos acumulados por beneficios exclusivos.</p>
            </div>

            <div class="balance-card">
                <div class="balance-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                        </polygon>
                    </svg>
                </div>
                <div class="balance-details">
                    <span class="label">Tu saldo actual</span>
                    <span class="amount">18,080 <small>PTS</small></span>
                </div>
            </div>
        </header>

        <div class="controls-section">
            <div class="search-bar">
                <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input type="text" placeholder="Buscar recompensa..." value="Café">
            </div>
            <div class="filter-pills">
                <button class="pill active">Todos</button>
                <button class="pill">Alimentos</button>
                <button class="pill">Descuentos</button>
                <button class="pill">Premium</button>
            </div>
        </div>

        <section class="rewards-grid-premium">

            <div class="premium-card">
                <div class="reward-media">
                    <img src="https://images.unsplash.com/photo-1541167760496-162955ed8a9f?auto=format&fit=crop&q=80&w=400"
                        alt="Taza de Café">
                    <div class="pts-floating-tag">100 pts</div>
                </div>
                <div class="reward-body">
                    <h3 class="reward-name">Taza de Café Regular</h3>
                    <p class="reward-description">Canje por una taza de café caliente de tamaño regular en sucursal.</p>
                    <button class="action-button">
                        <span>Canjear Recompensa</span>
                        <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="premium-card">
                <div class="reward-media">
                    <img src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400"
                        alt="Descuento">
                    <div class="pts-floating-tag">250 pts</div>
                    <div class="premium-badge low">¡Últimas unidades!</div>
                </div>
                <div class="reward-body">
                    <h3 class="reward-name">Descuento $50 MXN</h3>
                    <p class="reward-description">Un descuento fijo de $50 pesos aplicable en tu próxima compra de
                        acumuladores.</p>
                    <button class="action-button">
                        <span>Canjear Recompensa</span>
                        <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <div class="premium-card">
                <div class="reward-media" style="filter: grayscale(1);">
                    <img src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=400"
                        alt="Kit Pro">
                    <div class="pts-floating-tag">25,000 pts</div>
                    <div class="premium-badge out">Agotado</div>
                </div>
                <div class="reward-body">
                    <h3 class="reward-name">Kit de Herramientas Pro</h3>
                    <p class="reward-description">Set industrial completo para mantenimiento profesional de baterías.
                    </p>
                    <button class="action-button" disabled>
                        <span>Faltan 6,920 pts</span>
                        <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

        </section>
    </div>
</template>

<script setup>
import Navbar from '@/layouts/Sucursales/Navbar.vue';
</script>

<style scoped>
/* Contenedor Principal */
.catalog-page {
    padding: 2.5rem;
    max-width: 1400px;
    margin: 0 auto;
    background-color: #f8fafc;
    min-height: 100vh;
}

/* Header Estilo Luxury */
.catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3rem;
    gap: 2rem;
}

.main-title {
    font-size: 2.5rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin: 0;
}

.text-blue {
    color: #2563eb;
}

.subtitle {
    color: #64748b;
    font-size: 1.125rem;
    margin-top: 0.5rem;
}

/* Tarjeta de Saldo Glassmorphism */
.balance-card {
    background: white;
    padding: 1.25rem 2rem;
    border-radius: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.8);
}

.balance-icon {
    background: #eff6ff;
    color: #2563eb;
    padding: 0.75rem;
    border-radius: 1rem;
    display: flex;
}

.balance-icon svg {
    width: 1.75rem;
    height: 1.75rem;
}

.balance-details .label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.balance-details .amount {
    font-size: 1.75rem;
    font-weight: 800;
    color: #1e3a8a;
}

/* Filtros y Buscador */
.controls-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.search-bar {
    position: relative;
    max-width: 500px;
}

.search-bar input {
    width: 100%;
    padding: 1rem 1rem 1rem 3.5rem;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    font-size: 1rem;
    transition: all 0.2s;
}

.search-bar input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
    outline: none;
}

.search-icon {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5rem;
    color: #94a3b8;
}

.filter-pills {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
}

.pill {
    padding: 0.625rem 1.5rem;
    border-radius: 1rem;
    border: 1px solid #e2e8f0;
    background: white;
    color: #64748b;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
}

.pill.active {
    background: #1e3a8a;
    color: white;
    border-color: #1e3a8a;
}

/* Grid de Tarjetas Premium */
.rewards-grid-premium {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
}

.premium-card {
    background: white;
    border-radius: 1.5rem;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    border: 1px solid #f1f5f9;
}

.premium-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}

.reward-media {
    position: relative;
    height: 220px;
    overflow: hidden;
}

.reward-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.premium-card:hover .reward-media img {
    transform: scale(1.1);
}

.pts-floating-tag {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(8px);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-weight: 700;
    font-size: 0.875rem;
}

.premium-badge {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    font-size: 0.75rem;
    font-weight: 700;
}

.premium-badge.low {
    background: #ffedd5;
    color: #9a3412;
}

.premium-badge.out {
    background: #fee2e2;
    color: #991b1b;
}

.reward-body {
    padding: 1.75rem;
}

.reward-name {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.75rem;
}

.reward-description {
    color: #64748b;
    line-height: 1.6;
    font-size: 0.9375rem;
    margin-bottom: 1.5rem;
}

/* Botón de Acción Estilo Apple */
.action-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 1rem;
    border: none;
    background: #1e3a8a;
    color: white;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s;
}

.action-button:hover:not(:disabled) {
    background: #2563eb;
    gap: 1.25rem;
}

.btn-arrow {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform 0.3s;
}

.action-button:disabled {
    background: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
    .catalog-header {
        flex-direction: column;
        align-items: flex-start;
    }

    .balance-card {
        width: 100%;
    }
}
</style>