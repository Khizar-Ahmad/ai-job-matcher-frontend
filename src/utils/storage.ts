import type { User } from '@/types';

export const STORAGE_KEYS = {
  TOKEN: 'jm_token',
  USER: 'jm_user',
} as const;

export const storage = {
  // Token
  getToken: (): string | null => localStorage.getItem(STORAGE_KEYS.TOKEN),
  setToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.TOKEN, token),
  removeToken: (): void => localStorage.removeItem(STORAGE_KEYS.TOKEN),

  // User
  getUser: (): User | null => {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  },
  setUser: (user: User): void => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),
  removeUser: (): void => localStorage.removeItem(STORAGE_KEYS.USER),

  // Clear all auth
  clearAuth: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
};
