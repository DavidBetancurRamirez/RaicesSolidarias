import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UserRoles } from '@/constants/roles';

export interface User {
  _id: string;
  email: string;
  roles: UserRoles[];
  userName: string;
}

interface AuthState {
  logout: () => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  refreshToken: string | null;
  token: string | null;
  user: User | null;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      logout: () => set({ refreshToken: null, token: null, user: null }),
      refreshToken: null,
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      token: null,
      user: null,
    }),
    {
      name: 'auth-storage',
    },
  ),
);
