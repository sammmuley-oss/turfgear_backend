import type { AdminUser, AuthState } from '../types';
import { UserRole } from '../types';

const delay = (ms = 500) => new Promise(r => setTimeout(r, ms));

const MOCK_USER: AdminUser = {
  id: 'admin-001',
  name: 'Admin',
  email: 'admin@turfgear.com',
  role: UserRole.SUPER_ADMIN,
  lastLogin: new Date().toISOString(),
};

export const authService = {
  async login(email: string, _password: string): Promise<{ user: AdminUser; token: string }> {
    await delay(800);
    if (email === 'admin@turfgear.com') {
      const token = 'mock-jwt-' + Date.now();
      localStorage.setItem('turfgear_admin_token', token);
      return { user: MOCK_USER, token };
    }
    throw new Error('Invalid credentials');
  },

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem('turfgear_admin_token');
  },

  async getCurrentUser(): Promise<AdminUser | null> {
    await delay(200);
    const token = localStorage.getItem('turfgear_admin_token');
    if (token) return MOCK_USER;
    return null;
  },

  getInitialAuthState(): AuthState {
    const token = localStorage.getItem('turfgear_admin_token');
    return {
      user: token ? MOCK_USER : null,
      token,
      isAuthenticated: !!token,
      isLoading: false,
    };
  },
};
