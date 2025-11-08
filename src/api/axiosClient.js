// src/api/axiosClient.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; 

// 1. Instancia para Rutas de API (/api/*)
const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`, // <-- Con el prefijo /api
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// 2. Instancia para Rutas de Sanctum y Raíz (/*)
const sanctumClient = axios.create({
    baseURL: API_BASE_URL, // <-- Sin el prefijo /api
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


// 3. Configuración crucial para Sanctum (Aplica a AMBAS instancias si fuera necesario,
// pero solo la necesitamos para el cliente que hace login/logout. 
// Para el CSRF es crucial que use `withCredentials = true;` )

// Para axiosClient (rutas API):
axiosClient.defaults.withCredentials = true;
axiosClient.defaults.withXSRFToken = true;
axiosClient.defaults.xsrfCookieName = 'XSRF-TOKEN';
axiosClient.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';


// Para sanctumClient (Ruta CSRF):
sanctumClient.defaults.withCredentials = true; // CRUCIAL para que reciba la cookie

export { axiosClient, sanctumClient }; // Exportamos ambas instancias
// NOTA: Cambiamos el export por defecto a un export con nombre