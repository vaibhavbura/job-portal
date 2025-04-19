import { useAuth } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL;

export const useApi = () => {
  const { getToken } = useAuth();

  const fetchWithAuth = async (endpoint, options = {}) => {
    const token = await getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return {
    get: (endpoint) => fetchWithAuth(endpoint, { method: 'GET' }),
    post: (endpoint, data) => fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    put: (endpoint, data) => fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (endpoint) => fetchWithAuth(endpoint, { method: 'DELETE' }),
  };
}; 