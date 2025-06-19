import { create } from 'zustand';

interface DreamDetail {
  result?: string;
  number?: (string | number)[];
}

interface DreamStore {
  dreamDetail?: DreamDetail;
  setDreamDetail: (detail: DreamDetail) => void;
}

export const useDreamStore = create<DreamStore>((set) => ({
  dreamDetail: undefined,
  setDreamDetail: (detail) => set({ dreamDetail: detail }),
})); 