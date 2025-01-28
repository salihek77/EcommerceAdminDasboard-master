import { create } from 'zustand';

interface AuthState {
  user: Record<string, any> | null; // Adjust the type according to your user object structure
  token: string | null;
  login: (data: { user: Record<string, any>; token: string }) => void;
  logout: () => void;
  updateProfile: (data: Record<string, any>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,
  login: (data) => {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
    set({ user: data.user, token: data.token });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },
  updateProfile: (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    set({ user: data });
  },
}));
