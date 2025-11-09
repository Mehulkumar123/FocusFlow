import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PomodoroHistoryEntry {
  date: string;
  count: number;
}

interface PomodoroState {
  timeLeft: number;
  isRunning: boolean;
  mode: 'work' | 'break' | 'longBreak';
  completedPomodoros: number;
  totalPomodoros: number;
  pomodorosUntilLongBreak: number;
  pomodoroHistory: PomodoroHistoryEntry[];
  workDuration: number;
  breakDuration: number;
  longBreakDuration: number;
  
  start: () => void;
  pause: () => void;
  reset: () => void;
  skip: () => void;
  tick: () => void;
  setWorkDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  setLongBreakDuration: (duration: number) => void;
  completePomodoro: () => void;
  resetDaily: () => void;
}

export const usePomodoroStore = create<PomodoroState>()(
  persist(
    (set, get) => ({
      timeLeft: 25 * 60,
      isRunning: false,
      mode: 'work',
      completedPomodoros: 0,
      totalPomodoros: 0,
      pomodorosUntilLongBreak: 4,
      pomodoroHistory: [],
      workDuration: 25 * 60,
      breakDuration: 5 * 60,
      longBreakDuration: 15 * 60,

      start: () => {
        set({ isRunning: true });
      },

      pause: () => {
        set({ isRunning: false });
      },

      reset: () => {
        const state = get();
        set({
          isRunning: false,
          timeLeft: state.mode === 'work' 
            ? state.workDuration 
            : state.mode === 'break' 
            ? state.breakDuration 
            : state.longBreakDuration,
        });
      },

      skip: () => {
        const state = get();
        if (state.mode === 'work') {
          const newPomodorosUntilLongBreak = state.pomodorosUntilLongBreak - 1;
          if (newPomodorosUntilLongBreak === 0) {
            set({
              mode: 'longBreak',
              timeLeft: state.longBreakDuration,
              isRunning: false,
              pomodorosUntilLongBreak: 4,
            });
          } else {
            set({
              mode: 'break',
              timeLeft: state.breakDuration,
              isRunning: false,
              pomodorosUntilLongBreak: newPomodorosUntilLongBreak,
            });
          }
          get().completePomodoro();
        } else {
          set({
            mode: 'work',
            timeLeft: state.workDuration,
            isRunning: false,
          });
        }
      },

      tick: () => {
        const state = get();
        if (state.isRunning && state.timeLeft > 0) {
          set({ timeLeft: state.timeLeft - 1 });
        } else if (state.isRunning && state.timeLeft === 0) {
          if (state.mode === 'work') {
            const newPomodorosUntilLongBreak = state.pomodorosUntilLongBreak - 1;
            if (newPomodorosUntilLongBreak === 0) {
              set({
                mode: 'longBreak',
                timeLeft: state.longBreakDuration,
                isRunning: false,
                pomodorosUntilLongBreak: 4,
              });
            } else {
              set({
                mode: 'break',
                timeLeft: state.breakDuration,
                isRunning: false,
                pomodorosUntilLongBreak: newPomodorosUntilLongBreak,
              });
            }
            get().completePomodoro();
          } else {
            set({
              mode: 'work',
              timeLeft: state.workDuration,
              isRunning: false,
            });
          }
        }
      },

      setWorkDuration: (duration: number) => {
        set({ workDuration: duration });
        if (get().mode === 'work' && !get().isRunning) {
          set({ timeLeft: duration });
        }
      },

      setBreakDuration: (duration: number) => {
        set({ breakDuration: duration });
        if (get().mode === 'break' && !get().isRunning) {
          set({ timeLeft: duration });
        }
      },

      setLongBreakDuration: (duration: number) => {
        set({ longBreakDuration: duration });
        if (get().mode === 'longBreak' && !get().isRunning) {
          set({ timeLeft: duration });
        }
      },

      completePomodoro: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const existingEntry = state.pomodoroHistory.find((entry) => entry.date === today);
          const newHistory = existingEntry
            ? state.pomodoroHistory.map((entry) =>
                entry.date === today ? { ...entry, count: entry.count + 1 } : entry
              )
            : [...state.pomodoroHistory, { date: today, count: 1 }];

          return {
            completedPomodoros: state.completedPomodoros + 1,
            totalPomodoros: state.totalPomodoros + 1,
            pomodoroHistory: newHistory,
          };
        });
      },

      resetDaily: () => {
        set({ completedPomodoros: 0 });
      },
    }),
    {
      name: 'pomodoro-storage',
    }
  )
);

// Timer interval
let timerInterval: ReturnType<typeof setInterval> | null = null;

export const startPomodoroTimer = () => {
  if (timerInterval) return;
  timerInterval = setInterval(() => {
    usePomodoroStore.getState().tick();
  }, 1000);
};

export const stopPomodoroTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};
