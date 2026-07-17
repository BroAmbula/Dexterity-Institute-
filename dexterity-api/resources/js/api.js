import axios from 'axios';

// Get the token from the meta tag safely
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

const api = axios.create({
    baseURL: '/api', 
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        // Add the token directly to the instance headers
        'X-CSRF-TOKEN': csrfToken || ''
    },
});

export default api;