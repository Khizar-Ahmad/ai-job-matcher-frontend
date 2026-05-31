export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
  },
  // Users
  USERS: {
    ME: '/users/me',
  },
  // AI
  AI: {
    PROCESS: '/ai/process',
    QUESTIONS: '/ai/questions',
  },
} as const;
