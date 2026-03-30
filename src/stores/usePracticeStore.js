import { create } from "zustand";

export const usePracticeStore = create((set) => ({
  // Navigation within practice
  screen: "home", // "home" | "improve" | "vocab_topics" | "vocab_detail"

  // Partner matching
  isSearching: false,

  // Session history
  sessionHistory: [],

  // Actions
  setScreen: (screen) => set({ screen }),
  setIsSearching: (v) => set({ isSearching: v }),
  addSession: (session) =>
    set((s) => ({ sessionHistory: [session, ...s.sessionHistory] })),
  clearHistory: () => set({ sessionHistory: [] }),
}));
