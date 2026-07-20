const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dexterity-institute-production.up.railway.app';

export const getApiBaseUrl = () => API_BASE_URL.replace(/\/$/, '');

export const getAuthHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiRequest = async (path, options = {}) => {
  const token = options.token ?? localStorage.getItem('dex_token');
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...options.headers
    }
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : await response.text();

  if (!response.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
};
