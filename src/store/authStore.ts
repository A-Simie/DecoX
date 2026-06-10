import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  user: User | null;
  setAuthenticated: (user: User) => void;
  setOnboardingComplete: () => void;
  logout: () => void;
};

type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  preferences: string[];
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  hasCompletedOnboarding: false,
  user: null,

  setAuthenticated: (user) =>
    set({ isAuthenticated: true, user }),

  setOnboardingComplete: () =>
    set({ hasCompletedOnboarding: true }),

  logout: () =>
    set({ isAuthenticated: false, user: null, hasCompletedOnboarding: false }),
}));
