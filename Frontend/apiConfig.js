const DEFAULT_API_BASE_URL = 'https://dexterity-institute-production.up.railway.app';
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const isValidApiBaseUrl = (value) => {
  if (!value || value.includes('](') || /[\[\]\s]/.test(value)) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

const API_BASE_URL = isValidApiBaseUrl(configuredApiBaseUrl)
  ? configuredApiBaseUrl
  : DEFAULT_API_BASE_URL;

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
    credentials: 'include', // <--- THIS LINE FIXES THE CROSS-DOMAIN COOKIE ISSUE
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