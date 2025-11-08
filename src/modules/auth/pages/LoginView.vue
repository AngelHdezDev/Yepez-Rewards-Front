<template>
  <div class="login-wrapper">
    <!-- Elementos decorativos animados -->
    <div class="background-decoration">
      <div class="decoration-circle decoration-red"></div>
      <div class="decoration-circle decoration-blue"></div>
      <div class="decoration-gradient"></div>
    </div>

    <!-- Tarjeta de Login -->
    <div class="login-card">
      <!-- Header con logo -->
      <div class="login-header">
        <div class="logo-container">
          <!-- Cambia esta ruta por tu logo local -->
          <img 
            src="@/assets/logo-yepez.svg"  
            alt="Yépez" 
            class="logo"
            @error="handleImageError"
          />
        </div>
        <h1 class="title">Portal de Recompensas</h1>
        <div class="subtitle">
          <svg class="award-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <span>Accede a tus beneficios exclusivos</span>
        </div>
      </div>

      <!-- Formulario -->
      <div class="login-form-container">
        <form @submit.prevent="submitLogin" class="login-form">
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
          </div>

          <!-- Password -->
          <div class="form-group">
            <label for="password" class="form-label">Contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-input with-icon-right"
                placeholder="••••••••"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="toggle-password"
                :disabled="isLoading"
                tabindex="-1"
              >
                <svg v-if="!showPassword" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error message -->
          <transition name="error-fade">
            <div v-if="authStore.loginError" class="error-message">
              <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>{{ authStore.loginError }}</span>
            </div>
          </transition>

          <!-- Remember me & Forgot password -->
          <div class="form-options">
            <label class="remember-checkbox">
              <input
                type="checkbox"
                v-model="rememberMe"
                :disabled="isLoading"
              />
              <span class="checkbox-label">Recordarme</span>
            </label>
            <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="submit-button"
            :disabled="isLoading"
          >
            <span v-if="!isLoading" class="button-content">
              <span>Iniciar Sesión</span>
              <svg class="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span v-else class="loading-spinner">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
              </svg>
              <span>Ingresando...</span>
            </span>
          </button>
        </form>

        <!-- Register link -->
        <div class="register-section">
          <p class="register-text">
            ¿No tienes cuenta?
            <a href="#" class="register-link" @click.prevent="handleRegister">Regístrate aquí</a>
          </p>
        </div>

        <!-- Divider -->
        <!-- <div class="divider">
          <span class="divider-text">O continúa con</span>
        </div> -->

        <!-- Social login -->
        <!-- <div class="social-login">
          <button 
            type="button" 
            class="social-button" 
            :disabled="isLoading"
            @click="handleGoogleLogin"
          >
            <svg class="social-icon" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span>Google</span>
          </button>
          <button 
            type="button" 
            class="social-button" 
            :disabled="isLoading"
            @click="handleFacebookLogin"
          >
            <svg class="social-icon" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </button>
        </div> -->
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
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';  

const router = useRouter();

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const isLoading = ref(false);
const showPassword = ref(false);
const rememberMe = ref(false);

const submitLogin = async () => {
  isLoading.value = true;
  await authStore.handleLogin(email.value, password.value);
  isLoading.value = false;
};

const handleImageError = (e) => {
  // Fallback si el logo no carga
  e.target.style.display = 'none';
};

const handleForgotPassword = () => {
  router.push('/password-reset');
  // Agregar tu lógica aquí
};

const handleRegister = () => {
  router.push('/register');
  // Agregar tu lógica de navegación aquí
};

const handleGoogleLogin = () => {
  console.log('Login con Google');
  // Agregar tu lógica de Google OAuth aquí
};

const handleFacebookLogin = () => {
  console.log('Login con Facebook');
  // Agregar tu lógica de Facebook OAuth aquí
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.login-wrapper {
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

/* Decoraciones de fondo mejoradas */
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

/* Tarjeta principal mejorada */
.login-card {
  position: relative;
  width: 100%;
  max-width: 26rem;
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

/* Header mejorado */
.login-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  padding: 2.5rem 2rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.login-header::before {
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
}

.award-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

/* Formulario mejorado */
.login-form-container {
  padding: 2rem;
}

.login-form {
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

.form-input.with-icon-right {
  padding-right: 3rem;
}

.form-input:hover:not(:disabled) {
  border-color: #d1d5db;
}

.form-input:focus {
  border-color: #1e3a8a;
  box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
  background: #ffffff;
}

.form-input:disabled {
  background-color: #f9fafb;
  cursor: not-allowed;
  opacity: 0.7;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-password:hover:not(:disabled) {
  color: #1e3a8a;
}

.toggle-password:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.eye-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

/* Error message mejorado */
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

/* Opciones del formulario */
.form-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -0.25rem;
}

.remember-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.remember-checkbox input {
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  margin-right: 0.5rem;
  accent-color: #1e3a8a;
  cursor: pointer;
  border-radius: 0.25rem;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #4b5563;
  font-weight: 500;
}

.forgot-link {
  font-size: 0.875rem;
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  position: relative;
}

.forgot-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #ef4444;
  transition: width 0.3s ease;
}

.forgot-link:hover {
  color: #ef4444;
}

.forgot-link:hover::after {
  width: 100%;
}

/* Botón submit mejorado */
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
  gap: 0.5rem;
}

.button-arrow {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2.5;
  transition: transform 0.3s ease;
}

.submit-button:hover:not(:disabled) .button-arrow {
  transform: translateX(4px);
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

/* Sección de registro */
.register-section {
  margin-top: 1.5rem;
  text-align: center;
}

.register-text {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.register-link {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s;
  margin-left: 0.25rem;
}

.register-link:hover {
  color: #ef4444;
}

/* Divisor mejorado */
.divider {
  position: relative;
  margin: 1.75rem 0 1.5rem;
  text-align: center;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d1d5db 20%, #d1d5db 80%, transparent);
}

.divider-text {
  position: relative;
  display: inline-block;
  padding: 0 1rem;
  background: white;
  color: #9ca3af;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Social login mejorado */
.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  font-size: 0.875rem;
}

.social-button:hover:not(:disabled) {
  background: #f9fafb;
  border-color: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.social-button:active:not(:disabled) {
  transform: translateY(0);
}

.social-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.social-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

/* Footer */
.footer {
  text-align: center;
  margin-top: 1.5rem;
  color: white;
  font-size: 0.75rem;
  opacity: 0.9;
  max-width: 26rem;
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
  .login-wrapper {
    padding: 1rem 0.75rem;
  }

  .login-card {
    max-width: 100%;
  }

  .login-header {
    padding: 2rem 1.5rem 1.75rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.8125rem;
  }

  .login-form-container {
    padding: 1.5rem;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .social-login {
    grid-template-columns: 1fr;
  }

  .decoration-red,
  .decoration-blue {
    width: 20rem;
    height: 20rem;
  }
}

@media (max-width: 380px) {
  .login-header {
    padding: 1.5rem 1rem;
  }

  .login-form-container {
    padding: 1.25rem;
  }

  .title {
    font-size: 1.375rem;
  }
}
</style>