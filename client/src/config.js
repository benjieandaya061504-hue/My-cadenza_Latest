/**
 * API Configuration for Cadenza Music Center
 * 
 * In development: uses localhost:5000
 * In production: uses the VITE_API_URL environment variable set in Vercel
 */

const getApiBaseUrl = () => {
  // In production (Vercel), VITE_API_URL will be set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Fallback to localhost for development
  return 'http://localhost:5000';
};

export const API_BASE_URL = getApiBaseUrl();
export const API_ADMIN = `${API_BASE_URL}/api/admin`;
export const API_AUTH = `${API_BASE_URL}/api/auth`;

export default {
  API_BASE_URL,
  API_ADMIN,
  API_AUTH,
};