import axios from 'axios';
import { getApiBaseUrl } from './apiConfig';

const API = axios.create({
    baseURL: `${getApiBaseUrl()}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;