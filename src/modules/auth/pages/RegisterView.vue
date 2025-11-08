<template>
  <div class="register-wrapper">
    <!-- Elementos decorativos animados -->
    <div class="background-decoration">
      <div class="decoration-circle decoration-red"></div>
      <div class="decoration-circle decoration-blue"></div>
      <div class="decoration-gradient"></div>
    </div>

    <!-- Tarjeta de Registro -->
    <div class="register-card">
      <!-- Header con logo -->
      <div class="register-header">
        <div class="logo-container">
          <img 
            src="@/assets/logo-yepez.svg" 
            alt="Yépez" 
            class="logo"
            @error="handleImageError"
          />
        </div>
        <h1 class="title">Crear Cuenta</h1>
        <div class="subtitle">
          <svg class="gift-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 12 20 22 4 22 4 12"></polyline>
            <rect x="2" y="7" width="20" height="5"></rect>
            <line x1="12" y1="22" x2="12" y2="7"></line>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
          </svg>
          <span>Únete y empieza a acumular recompensas</span>
        </div>
      </div>

      <!-- Formulario -->
      <div class="register-form-container">
        <form @submit.prevent="submitRegister" class="register-form">
          <!-- Nombre completo -->
          <div class="form-group">
            <label for="name" class="form-label">Nombre completo</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input
                type="text"
                id="name"
                v-model="formData.name"
                class="form-input"
                placeholder="Tu nombre completo"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

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
                v-model="formData.email"
                class="form-input"
                placeholder="tu@email.com"
                required
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- Contraseña -->
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
                v-model="formData.password"
                class="form-input with-icon-right"
                placeholder="Mínimo 8 caracteres"
                required
                minlength="8"
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
            <!-- Indicador de fortaleza de contraseña -->
            <div v-if="formData.password" class="password-strength">
              <div class="strength-bar">
                <div 
                  class="strength-fill" 
                  :class="passwordStrength.class"
                  :style="{ width: passwordStrength.width }"
                ></div>
              </div>
              <span class="strength-text" :class="passwordStrength.class">
                {{ passwordStrength.text }}
              </span>
            </div>
          </div>

          <!-- Confirmar Contraseña -->
          <div class="form-group">
            <label for="password_confirmation" class="form-label">Confirmar contraseña</label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <input
                :type="showPasswordConfirm ? 'text' : 'password'"
                id="password_confirmation"
                v-model="formData.password_confirmation"
                class="form-input with-icon-right"
                placeholder="Repite tu contraseña"
                required
                :disabled="isLoading"
              />
              <button
                type="button"
                @click="showPasswordConfirm = !showPasswordConfirm"
                class="toggle-password"
                :disabled="isLoading"
                tabindex="-1"
              >
                <svg v-if="!showPasswordConfirm" class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </button>
            </div>
            <!-- Mensaje de coincidencia -->
            <div v-if="formData.password_confirmation && !passwordsMatch" class="password-mismatch">
              <svg class="warning-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Las contraseñas no coinciden
            </div>
            <div v-else-if="formData.password_confirmation && passwordsMatch" class="password-match">
              <svg class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Las contraseñas coinciden
            </div>
          </div>

          <!-- Error message -->
          <transition name="error-fade">
            <div v-if="registerError" class="error-message">
              <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <span>{{ registerError }}</span>
            </div>
          </transition>

          <!-- Success message -->
          <transition name="success-fade">
            <div v-if="registerSuccess" class="success-message">
              <svg class="success-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span>¡Registro exitoso! Redirigiendo...</span>
            </div>
          </transition>

          <!-- Términos y condiciones -->
          <div class="form-group">
            <label class="terms-checkbox">
              <input
                type="checkbox"
                v-model="acceptTerms"
                :disabled="isLoading"
                required
              />
              <span class="terms-text">
                Acepto los 
                <a href="#" @click.prevent="showTerms" class="terms-link">Términos y Condiciones</a>
                y la 
                <a href="#" @click.prevent="showPrivacy" class="terms-link">Política de Privacidad</a>
              </span>
            </label>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="submit-button"
            :disabled="isLoading || !acceptTerms || !passwordsMatch"
          >
            <span v-if="!isLoading" class="button-content">
              <span>Crear mi cuenta</span>
              <svg class="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span v-else class="loading-spinner">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle class="spinner-circle" cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3"></circle>
              </svg>
              <span>Creando cuenta...</span>
            </span>
          </button>
        </form>

        <!-- Login link -->
        <div class="login-section">
          <p class="login-text">
            ¿Ya tienes una cuenta?
            <a href="#" class="login-link" @click.prevent="handleGoToLogin">Inicia sesión aquí</a>
          </p>
        </div>

        <!-- Divider -->
        <!-- <div class="divider">
          <span class="divider-text">O regístrate con</span>
        </div> -->

        <!-- Social register -->
        <!-- <div class="social-login">
          <button 
            type="button" 
            class="social-button" 
            :disabled="isLoading"
            @click="handleGoogleRegister"
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
            @click="handleFacebookRegister"
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
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const formData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const isLoading = ref(false);
const showPassword = ref(false);
const showPasswordConfirm = ref(false);
const acceptTerms = ref(false);
const registerError = ref('');
const registerSuccess = ref(false);

// Computed para verificar si las contraseñas coinciden
const passwordsMatch = computed(() => {
  if (!formData.value.password_confirmation) return true;
  return formData.value.password === formData.value.password_confirmation;
});

// Computed para la fortaleza de la contraseña
const passwordStrength = computed(() => {
  const password = formData.value.password;
  if (!password) return { width: '0%', class: '', text: '' };
  
  let strength = 0;
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;
  
  if (strength <= 2) {
    return { width: '33%', class: 'weak', text: 'Débil' };
  } else if (strength <= 3) {
    return { width: '66%', class: 'medium', text: 'Media' };
  } else {
    return { width: '100%', class: 'strong', text: 'Fuerte' };
  }
});

const submitRegister = async () => {
  // Validar que las contraseñas coincidan
  if (!passwordsMatch.value) {
    registerError.value = 'Las contraseñas no coinciden';
    return;
  }
  
  isLoading.value = true;
  registerError.value = '';
  registerSuccess.value = false;
  
  try {
    // Aquí haces tu llamada al API
    // Ejemplo:
    // await authStore.handleRegister(formData.value);
    
    // Simulación de llamada API
    console.log('Datos a enviar:', formData.value);
    
    // Si el registro es exitoso:
    registerSuccess.value = true;
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      router.push('/login'); // o donde quieras redirigir
    }, 2000);
    
  } catch (error) {
    registerError.value = error.response?.data?.message || 'Error al crear la cuenta. Intenta nuevamente.';
  } finally {
    isLoading.value = false;
  }
};

const handleImageError = (e) => {
  e.target.style.display = 'none';
};

const handleGoToLogin = () => {
  router.push('/login');
};

const showTerms = () => {
  console.log('Mostrar términos y condiciones');
  // Agregar lógica para mostrar términos
};

const showPrivacy = () => {
  console.log('Mostrar política de privacidad');
  // Agregar lógica para mostrar política
};

const handleGoogleRegister = () => {
  console.log('Registro con Google');
  // Agregar lógica de Google OAuth
};

const handleFacebookRegister = () => {
  console.log('Registro con Facebook');
  // Agregar lógica de Facebook OAuth
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.register-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 35%, #2563eb 65%, #1e3a8a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow-y: auto;
}

/* Decoraciones de fondo */
.background-decoration {
  position: fixed;
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
.register-card {
  position: relative;
  width: 100%;
  max-width: 28rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 
              0 0 100px rgba(30, 58, 138, 0.2);
  overflow: hidden;
  animation: slideIn 0.5s ease-out;
  margin: 1rem 0;
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
.register-header {
  background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%);
  padding: 2rem 2rem 1.75rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.register-header::before {
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
  padding: 0.875rem 1.25rem;
  display: inline-block;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1;
}

.logo {
  height: 3rem;
  width: auto;
  display: block;
  max-width: 160px;
}

.title {
  color: white;
  font-size: 1.625rem;
  font-weight: 700;
  margin: 0 0 0.625rem 0;
  letter-spacing: -0.025em;
  position: relative;
  z-index: 1;
}

.subtitle {
  color: #bfdbfe;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 0;
  position: relative;
  z-index: 1;
}

.gift-icon {
  width: 1.1rem;
  height: 1.1rem;
  flex-shrink: 0;
}

/* Formulario */
.register-form-container {
  padding: 1.75rem 2rem 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
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

/* Password strength indicator */
.password-strength {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.strength-bar {
  flex: 1;
  height: 0.375rem;
  background: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease, background-color 0.3s ease;
  border-radius: 0.25rem;
}

.strength-fill.weak {
  background: #ef4444;
}

.strength-fill.medium {
  background: #f59e0b;
}

.strength-fill.strong {
  background: #10b981;
}

.strength-text {
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 4rem;
}

.strength-text.weak {
  color: #ef4444;
}

.strength-text.medium {
  color: #f59e0b;
}

.strength-text.strong {
  color: #10b981;
}

/* Password match indicator */
.password-mismatch,
.password-match {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  margin-top: 0.375rem;
  font-weight: 500;
}

.password-mismatch {
  color: #dc2626;
}

.password-match {
  color: #16a34a;
}

.warning-icon,
.check-icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 2.5;
  flex-shrink: 0;
}

/* Error and Success messages */
.error-message,
.success-message {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  border: 1px solid;
  font-weight: 500;
}

.error-message {
  background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
  color: #991b1b;
  border-color: #fecaca;
}

.success-message {
  background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
  color: #166534;
  border-color: #bbf7d0;
}

.error-icon,
.success-icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
  flex-shrink: 0;
}

.error-icon {
  color: #dc2626;
}

.success-icon {
  color: #16a34a;
}

.error-fade-enter-active,
.error-fade-leave-active,
.success-fade-enter-active,
.success-fade-leave-active {
  transition: all 0.3s ease;
}

.error-fade-enter-from,
.success-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.error-fade-leave-to,
.success-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Terms checkbox */
.terms-checkbox {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
  gap: 0.5rem;
}

.terms-checkbox input {
  width: 1.125rem;
  height: 1.125rem;
  margin: 0;
  margin-top: 0.125rem;
  accent-color: #1e3a8a;
  cursor: pointer;
  border-radius: 0.25rem;
  flex-shrink: 0;
}

.terms-text {
  font-size: 0.8125rem;
  color: #4b5563;
  line-height: 1.5;
}

.terms-link {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.terms-link:hover {
  color: #ef4444;
  text-decoration: underline;
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
  opacity: 0.6;
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

/* Login section */
.login-section {
  margin-top: 1.5rem;
  text-align: center;
}

.login-text {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.login-link {
  color: #1e3a8a;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.2s;
  margin-left: 0.25rem;
}

.login-link:hover {
  color: #ef4444;
}

/* Divider */
.divider {
  position: relative;
  margin: 1.5rem 0;
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

/* Social login */
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
  margin-bottom: 1rem;
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
  .register-wrapper {
    padding: 1.5rem 0.75rem;
  }

  .register-card {
    max-width: 100%;
  }

  .register-header {
    padding: 1.75rem 1.5rem 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 0.8125rem;
  }

  .register-form-container {
    padding: 1.5rem;
  }

  .register-form {
    gap: 1rem;
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
  .register-header {
    padding: 1.5rem 1rem;
  }

  .register-form-container {
    padding: 1.25rem;
  }

  .title {
    font-size: 1.375rem;
  }
  
  .form-input {
    font-size: 0.875rem;
  }
}
</style>