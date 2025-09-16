// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  endpoints: {
    health: '/health',
    login: '/auth/login',
    verify: '/auth/verify',
    analytics: '/analytics',
    analyticsByType: '/analytics/type',
  },
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${apiConfig.baseURL}${endpoint}`;
};

export default apiConfig;
