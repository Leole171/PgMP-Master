import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type GameState = {
  score: number;
  highScore: number;
  addPoint: () => void;
  reset: () => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      score: 0,
      highScore: 0,
      addPoint: () =>
        set((s) => ({ score: s.score + 1, highScore: Math.max(s.highScore, s.score + 1) })),
      reset: () => set({ score: 0 }),
    }),
    {
      name: 'leo-game',
      storage: createJSONStorage(() => AsyncStorage),
      // Only the high score survives restarts.
      partialize: (s) => ({ highScore: s.highScore }),
    },
  ),
);
