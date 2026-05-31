import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { AuthContextType, AuthData, User } from '@/types';
import { storage } from '@/utils/storage';
import { isTokenValid } from '@/utils/tokenUtils';

const AuthContext = createContext<AuthContextType | null>(null);

const resolveInitialState = (): { user: User | null; token: string | null } => {
  const token = storage.getToken();
  const user = storage.getUser();

  if (token && user && isTokenValid(token)) {
    return { token, user };
  }

  // Expired or missing — wipe stale data
  storage.clearAuth();
  return { token: null, user: null };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initial = resolveInitialState();
  const [token, setToken] = useState<string | null>(initial.token);
  const [user, setUser] = useState<User | null>(initial.user);

  const login = useCallback((data: AuthData) => {
    storage.setToken(data.access_token);
    storage.setUser(data.user);
    setToken(data.access_token);
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    storage.clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const isAuthenticated = Boolean(token && user && isTokenValid(token));

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
