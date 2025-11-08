<template>
  <div class="forgot-password-wrapper">
    <!-- Elementos decorativos animados -->
    <div class="background-decoration">
      <div class="decoration-circle decoration-red"></div>
      <div class="decoration-circle decoration-blue"></div>
      <div class="decoration-gradient"></div>
    </div>

    <!-- Tarjeta de Recuperación -->
    <div class="forgot-password-card">
      <!-- Header con logo -->
      <div class="forgot-password-header">
        <div class="logo-container">
          <img 
            src="@/assets/logo-yepez.svg"  
            alt="Yépez" 
            class="logo"
            @error="handleImageError"
          />
        </div>
        
        <!-- Estado: Formulario -->
        <div v-if="!emailSent">
          <h1 class="title">¿Olvidaste tu contraseña?</h1>
          <div class="subtitle">
            <svg class="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Te enviaremos instrucciones para restablecer tu contraseña</span>
          </div>
        </div>
        
        <!-- Estado: Email enviado -->
        <div v-else>
          <div class="success-icon-circle">
            <svg class="check-large" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h1 class="title">¡Revisa tu correo!</h1>
          <div class="subtitle">
            <span>Te hemos enviado las instrucciones para recuperar tu contraseña</span>
          </div>
        </div>
      </div>

      <!-- Formulario -->
      <div class="forgot-password-form-container">
        <!-- Formulario de email -->
        <form v-if="!emailSent" @submit.prevent="submitForgotPassword" class="forgot-password-form">
          <!-- Email -->
          <div class="form-group">
            <label for="email" class="form-label">Correo electrónico</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-input"
                placeholder="tu@email.com"
                required
                :disabled="isLoading"
              />
            </div>
            <p class="help-text">
              Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
            </p>
          </div>

          <!-- Error message -->
          <transition name="error-fade">
            <div v-if="errorMessage" class="error-message">
              <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>{{ errorMessage }}</span>
            </div>
          </transition>

          <!-- Submit button -->
          <button
            type="submit"
            class="submit-button"
            :disabled="isLoading"
          >
            <span v-if="!isLoading" class="button-content">
              <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>Enviar instrucciones</span>
            </span>
            <span v-else class="loading-spinner">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
              </svg>
              <span>Enviando...</span>
            </span>
          </button>
        </form>

        <!-- Confirmación de email enviado -->
        <div v-else class="email-sent-container">
          <div class="sent-info">
            <div class="email-display">
              <svg class="mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span class="email-address">{{ email }}</span>
            </div>
            <p class="instruction-text">
              Hemos enviado un correo con un enlace para restablecer tu contraseña. 
              El enlace expirará en 60 minutos.
            </p>
            <div class="help-box">
              <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div>
                <p class="help-title">¿No recibiste el correo?</p>
                <p class="help-description">Revisa tu carpeta de spam o correo no deseado</p>
              </div>
            </div>
          </div>

          <!-- Resend button -->
          <button
            type="button"
            class="resend-button"
            :disabled="isResendDisabled"
            @click="resendEmail"
          >
            <svg class="resend-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"></polyline>
              <polyline points="1 20 1 14 7 14"></polyline>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
            <span v-if="!isResendDisabled">Reenviar correo</span>
            <span v-else>Reenviar en {{ resendCountdown }}s</span>
          </button>
        </div>

        <!-- Back to login -->
        <div class="back-to-login">
          <a href="#" class="back-link" @click.prevent="handleBackToLogin">
            <svg class="arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Volver al inicio de sesión</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>© 2024 Acumuladores Yépez</p>
      <p>Todos los derechos reservados</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const isLoading = ref(false);
const errorMessage = ref('');
const emailSent = ref(false);
const isResendDisabled = ref(false);
const resendCountdown = ref(60);

let countdownInterval = null;

const submitForgotPassword = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Aquí haces tu llamada al API
    // Ejemplo:
    // const response = await axios.post('/api/forgot-password', { email: email.value });
    
    // Simulación de llamada API
    console.log('Datos a enviar:', { email: email.value });
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Si el email se envió correctamente:
    emailSent.value = true;
    startResendCountdown();
    
  } catch (error) {
    if (error.response?.status === 404) {
      errorMessage.value = 'No encontramos una cuenta con este correo electrónico';
    } else {
      errorMessage.value = error.response?.data?.message || 'Error al enviar el correo. Intenta nuevamente.';
    }
  } finally {
    isLoading.value = false;
  }
};

const resendEmail = async () => {
  if (isResendDisabled.value) return;
  
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Llamada al API para reenviar
    console.log('Reenviando correo a:', email.value);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reiniciar countdown
    startResendCountdown();
    
  } catch (error) {
    errorMessage.value = 'Error al reenviar el correo. Intenta nuevamente.';
  } finally {
    isLoading.value = false;
  }
};

const startResendCountdown = () => {
  isResendDisabled.value = true;
  resendCountdown.value = 60;
  
  countdownInterval = setInterval(() => {
    resendCountdown.value--;
    if (resendCountdown.value <= 0) {
      clearInterval(countdownInterval);
      isResendDisabled.value = false;
    }
  }, 1000);
};

const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const handleBackToLogin = () => {
  router.push('/login');
};

// Limpiar el interval cuando el componente se desmonte
onUnmounted(() => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
});
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.forgot-password-wrapper {
  min-height: 100vh;
  height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 35%, #2563eb 65%, #1e3a8a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem;
  position: relative;
  overflow: hidden;
}

/* Decoraciones de fondo */
.background-decoration {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.decoration-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(239, 68, 68, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.15) 0%, transparent 50%);
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  animation: float 8s ease-in-out infinite;
}

.decoration-red {
  width: 25rem;
  height: 25rem;
  top: -5rem;
  left: -5rem;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, transparent 70%);
  animation-delay: 0s;
}

.decoration-blue {
  width: 30rem;
  height: 30rem;
  bottom: -8rem;
  right: -8rem;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.4) 0%, transparent 70%);
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% { 
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% { 
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.4;
  }
  66% { 
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.35;
  }
}

/* Tarjeta principal */
.forgot-password-card {
  position: relative;
  width: 100%;
  max-width: 28rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
              0 0 100px rgba(30, 58, 138, 0.2);
  overflow: hidden;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Header */
.forgot-password-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  padding: 2.5rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.forgot-password-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, transparent 0%, rgba(239, 68, 68, 0.1) 100%);
  pointer-events: none;
}

.logo-container {
  background: white;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  display: inline-block;
  margin-bottom: 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.logo {
  height: 3.5rem;
  width: auto;
  display: block;
  max-width: 180px;
}

.success-icon-circle {
  width: 5rem;
  height: 5rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.25rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
  animation: scaleIn 0.5s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.check-large {
  width: 2.5rem;
  height: 2.5rem;
  color: #16a34a;
}

.title {
  color: white;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;
}

.subtitle {
  color: #bfdbfe;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  position: relative;
  z-index: 1;
  line-height: 1.5;
  padding: 0 1rem;
}

.lock-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

/* Formulario */
.forgot-password-form-container {
  padding: 2rem;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.01em;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #9ca3af;
  pointer-events: none;
  z-index: 1;
  stroke-width: 2;
}

.form-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  outline: none;
  transition: all 0.2s ease;
  background: #ffffff;
}

.form-input:hover:not(:disabled) {
  border-color: #d1d5db;
}

.form-input:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
}

.form-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}

.help-text {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

/* Error message */
.error-message {
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

/* Submit button */
.submit-button {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.4);
  margin-top: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.submit-button:hover:not(:disabled)::before {
  left: 100%;
}

.submit-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(30, 58, 138, 0.5);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
}

.button-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2.5;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
}

.spinner {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

.spinner-circle {
  stroke-dasharray: 50;
  stroke-dashoffset: 25;
  stroke-linecap: round;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Email sent container */
.email-sent-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sent-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.email-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 2px solid #bfdbfe;
  border-radius: 0.75rem;
}

.mail-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: #1e40af;
  flex-shrink: 0;
  stroke-width: 2;
}

.email-address {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1e40af;
  word-break: break-all;
}

.instruction-text {
  font-size: 0.9rem;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.help-box {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
}

.info-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  flex-shrink: 0;
  stroke-width: 2;
  margin-top: 0.125rem;
}

.help-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.help-description {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

/* Resend button */
.resend-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: white;
  color: #1e3a8a;
  border: 2px solid #1e3a8a;
  border-radius: 0.75rem;
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.resend-button:hover:not(:disabled) {
  background: #1e3a8a;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
}

.resend-button:active:not(:disabled) {
  transform: translateY(0);
}

.resend-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.resend-icon {
  width: 1.125rem;
  height: 1.125rem;
  stroke-width: 2;
}

/* Back to login */
.back-to-login {
  margin-top: 1.5rem;
  text-align: center;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s;
  padding: 0.5rem;
}

.back-link:hover {
  color: #ef4444;
}

.arrow-left {
  width: 1.125rem;
  height: 1.125rem;
  stroke-width: 2.5;
  transition: transform 0.2s;
}

.back-link:hover .arrow-left {
  transform: translateX(-4px);
}

/* Footer */
.footer {
  text-align: center;
  margin-top: 1.5rem;
  color: white;
  font-size: 0.75rem;
  opacity: 0.9;
  max-width: 28rem;
  line-height: 1.4;
}

.footer p {
  margin: 0;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.footer p:first-child {
  margin-bottom: 0.125rem;
}

/* Responsive */
@media (max-width: 640px) {
  .forgot-password-wrapper {
    padding: 1rem 0.75rem;
  }

  .forgot-password-card {
    max-width: 100%;
  }

  .forgot-password-header {
    padding: 2rem 1.5rem 1.75rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.8125rem;
  }

  .forgot-password-form-container {
    padding: 1.5rem;
  }

  .decoration-red,
  .decoration-blue {
    width: 20rem;
    height: 20rem;
  }
}

@media (max-width: 380px) {
  .forgot-password-header {
    padding: 1.5rem 1rem;
  }

  .forgot-password-form-container {
    padding: 1.25rem;
  }

  .title {
    font-size: 1.375rem;
  }
}
</style>