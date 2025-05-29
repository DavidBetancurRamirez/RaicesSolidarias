/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModalState {
  body: string;
  closeModal: () => void;
  header: string;
  onAccept?: () => any;
  open: boolean;
  setModal: (modal: {
    body: string;
    header: string;
    onAccept?: () => any;
  }) => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      body: '',
      closeModal: () =>
        set({
          body: '',
          header: '',
          onAccept: undefined,
          open: false,
        }),
      header: '',
      onAccept: undefined,
      open: false,
      setModal: ({ body, header, onAccept }) =>
        set({ body, header, onAccept, open: true }),
    }),
    { name: 'modal-store' },
  ),
);
