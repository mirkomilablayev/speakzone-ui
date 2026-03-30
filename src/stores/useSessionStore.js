import { create } from "zustand";

export const useSessionStore = create((set) => ({
  // Navigation within mock exam
  screen: "list", // "list" | "flow" | "evaluating" | "result"
  selectedMock: null,
  currentQuestionIndex: 0,

  // Recording
  isRecording: false,
  timer: 0,

  // Actions
  setScreen: (screen) => set({ screen }),
  setSelectedMock: (mock) => set({ selectedMock: mock }),
  setCurrentQuestionIndex: (i) => set({ currentQuestionIndex: i }),
  setIsRecording: (v) => set({ isRecording: v }),
  incrementTimer: () => set((s) => ({ timer: s.timer + 1 })),
  resetTimer: () => set({ timer: 0 }),

  // Compound actions
  startSession: (mock) =>
    set({ selectedMock: mock, screen: "flow", isRecording: true, timer: 0, currentQuestionIndex: 0 }),
  stopSession: () => set({ isRecording: false, screen: "evaluating" }),
  resetSession: () =>
    set({ screen: "list", selectedMock: null, isRecording: false, timer: 0, currentQuestionIndex: 0 }),
}));
