import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  sub?: string;
  [key: string]: unknown;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    // Add 10s buffer
    return Date.now() / 1000 >= exp - 10;
  } catch {
    return true;
  }
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  return !isTokenExpired(token);
};
