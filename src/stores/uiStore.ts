import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AlertState {
  closeAlert: () => void;
  message: string;
  open: boolean;
  setAlert: (message: string) => void;
}

export const useUIStore = create<AlertState>()(
  persist(
    (set) => ({
      closeAlert: () => set({ open: false }),
      message: '',
      open: true,
      setAlert: (message) => set({ message, open: true }),
    }),
    { name: 'ui-store' },
  ),
);
