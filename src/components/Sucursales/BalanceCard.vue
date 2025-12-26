<template>
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
                        <span class="amount-number">{{ formattedBalance }}</span>
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
                    <span class="button-text">Canjear puntos</span>
                    <span class="button-text-short">Canjear</span>
                </button>
                <button class="action-button secondary" @click="viewTransactions">
                    <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span class="button-text">Ver transacciones</span>
                    <span class="button-text-short">Historial</span>
                </button>
            </div>
        </div>
    </section>
</template>


<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia'; // 🛑 Importa la utilidad de Pinia

// 1. Obtén la instancia del store
const authStore = useAuthStore();

// 2. Extrae la propiedad del getter como una ref.
// Aunque 'formattedBalance' es un getter, Pinia recomienda usar storeToRefs 
// para cualquier propiedad que vayas a usar directamente en el template si proviene del estado/getters.
const { formattedBalance } = storeToRefs(authStore);

// NOTA: Si usas storeToRefs, ya NO necesitas la computed local 'saldoActual'. 
// Simplemente usas 'formattedBalance' en el template.

// Si prefieres mantener la computed local (por si quieres aplicar más lógica local):
/*
const saldoActual = computed(() => {
    // Si usas storeToRefs, accedes a ellas como si fueran refs normales
    return formattedBalance.value; 
});
*/

</script>


<style scoped>
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
    min-width: 0;
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
    flex-wrap: wrap;
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
    white-space: nowrap;
}

.action-button.primary {
    background: white;
    color: #1e3a8a;
}

.action-button.primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
}

.action-button.primary:active {
    transform: translateY(0);
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

.action-button.secondary:active {
    transform: translateY(0);
}

.button-icon {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2;
    flex-shrink: 0;
}

.button-text-short {
    display: none;
}

/* Tablet - 768px */
@media (max-width: 768px) {
    .balance-card {
        padding: 1.5rem;
        border-radius: 1.25rem;
    }

    .balance-header {
        gap: 1.25rem;
    }

    .balance-icon {
        width: 3.5rem;
        height: 3.5rem;
    }

    .balance-icon svg {
        width: 1.75rem;
        height: 1.75rem;
    }

    .amount-number {
        font-size: 2.25rem;
    }

    .amount-text {
        font-size: 1rem;
    }

    .action-button {
        padding: 0.75rem 1.25rem;
        font-size: 0.875rem;
    }
}

/* Móvil - 640px */
@media (max-width: 640px) {
    .balance-card {
        padding: 1.25rem;
        gap: 1.25rem;
    }

    .balance-header {
        gap: 1rem;
    }

    .balance-icon {
        width: 3rem;
        height: 3rem;
        border-radius: 0.875rem;
    }

    .balance-icon svg {
        width: 1.5rem;
        height: 1.5rem;
    }

    .balance-label {
        font-size: 0.8125rem;
        margin-bottom: 0.375rem;
    }

    .amount-number {
        font-size: 2rem;
    }

    .amount-text {
        font-size: 0.9375rem;
    }

    .action-button {
        padding: 0.75rem 1rem;
        font-size: 0.8125rem;
        gap: 0.375rem;
    }

    .button-icon {
        width: 1.125rem;
        height: 1.125rem;
    }
}

/* Móvil pequeño - 480px */
@media (max-width: 480px) {
    .balance-card {
        padding: 1rem;
        border-radius: 1rem;
    }

    .balance-actions {
        gap: 0.75rem;
    }

    .action-button {
        padding: 0.875rem 0.75rem;
        font-size: 0.75rem;
    }

    /* Texto corto en móviles pequeños */
    .button-text {
        display: none;
    }

    .button-text-short {
        display: inline;
    }
}

/* Móvil muy pequeño - 360px */
@media (max-width: 360px) {
    .balance-card {
        padding: 0.875rem;
    }

    .balance-header {
        gap: 0.875rem;
    }

    .balance-icon {
        width: 2.5rem;
        height: 2.5rem;
    }

    .balance-icon svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    .amount-number {
        font-size: 1.75rem;
    }

    .amount-text {
        font-size: 0.875rem;
    }

    .action-button {
        padding: 0.75rem 0.5rem;
        gap: 0.25rem;
    }

    .button-icon {
        width: 1rem;
        height: 1rem;
    }
}

/* Orientación horizontal en móviles */
@media (max-height: 500px) and (orientation: landscape) {
    .balance-card {
        padding: 1rem 1.5rem;
    }

    .amount-number {
        font-size: 1.75rem;
    }

    .balance-actions {
        gap: 0.75rem;
    }

    .action-button {
        padding: 0.625rem 1rem;
    }
}
</style>