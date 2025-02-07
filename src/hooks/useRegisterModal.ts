import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  onToggle: () => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onToggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useRegisterModal;
