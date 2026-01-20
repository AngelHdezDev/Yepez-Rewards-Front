// src/api/axiosClient.js - SIN CSRF COOKIES
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';
// const API_BASE_URL = 'https://acumuladoresyep.com';

const axiosClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// ELIMINAMOS todo lo relacionado con CSRF cookies
// No más withCredentials, no más interceptores de CSRF

export { axiosClient };