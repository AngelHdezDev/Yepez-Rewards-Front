// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router'; // <-- Asegúrate de que esto exista
import { useAuthStore } from './stores/authStore';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 🛡️ Llama a checkAuth antes de montar la app
// Esto asegura que Pinia sabe si el usuario está autenticado al cargar.
const authStore = useAuthStore();
authStore.checkAuth().finally(() => {
    app.mount('#app');
});