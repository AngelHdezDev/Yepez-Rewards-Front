// src/api/authService.js (Ajustado)
// Importamos AMBAS instancias
import { axiosClient, sanctumClient } from './axiosClient'; 

// Esta ruta NO tiene el prefijo /api
const CSRF_COOKIE_ROUTE = '/sanctum/csrf-cookie'; 
// Estas rutas SÍ tienen el prefijo /api (gestionado por axiosClient)
const LOGIN_ROUTE = '/login'; 
// ...

/**
 * Llama al endpoint de Sanctum para obtener el token CSRF (cookie).
 */
async function getCsrfToken() {
    try {
        // Usa la instancia que NO tiene el prefijo /api
        await sanctumClient.get(CSRF_COOKIE_ROUTE); 
        console.log("Token CSRF obtenido. Cookie establecida.");
        return true;
    } catch (error) {
        // ... (manejo de errores)
    }
}

/**
 * Intenta iniciar sesión. (Usa la instancia con prefijo /api)
 */
async function login(email, password) {
    await getCsrfToken(); // Primero obtenemos la cookie
    
    // Luego usamos la instancia normal, ya que /login es una ruta API
    const response = await axiosClient.post(LOGIN_ROUTE, {
        email,
        password
    });
    // ...
}

// ... (El resto de las funciones usan axiosClient)

export default {
    login,
    // ...
};