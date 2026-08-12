import axios from 'axios';
import { getApiBaseUrl } from './apiConfig';

const API = axios.create({
    baseURL: `${getApiBaseUrl()}/api`,
    withCredentials: true,
    headers: {
        Accept: 'application/json'
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    } else {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
});

export default API;