import { create } from "zustand";

export const useUserStore = create((set) => ({
  // Profile
  name: "Mirkomil",
  initial: "M",
  targetBand: "8.5",
  currentBand: "6.5",
  streak: 5,

  // Status
  isPremium: false,
  onboarded: true,

  // i18n
  language: "uz",

  // Actions
  setOnboarded: (v) => set({ onboarded: v }),
  setIsPremium: (v) => set({ isPremium: v }),
  setLanguage: (lang) => set({ language: lang }),
  setTargetBand: (band) => set({ targetBand: band }),
  setName: (name) => set({ name, initial: name[0]?.toUpperCase() ?? "U" }),
}));
