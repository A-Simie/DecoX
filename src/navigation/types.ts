import type { NavigatorScreenParams } from '@react-navigation/native';

// Auth flow screens (before login)
export type AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  ChoiceGate: undefined;
  CreateAccount: undefined;
  Login: undefined;
  StylePreferences: undefined;
};

// Main tab screens (after login)
export type MainTabParamList = {
  Home: undefined;
  NewRoom: undefined;
  Saved: undefined;
  Explore: undefined;
  Profile: undefined;
};

// Screens accessible from any tab via stack push
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  AIReveal: { roomId: string };
  ShoppableItems: { roomId: string };
  StyleDetail: { styleId: string; styleName: string };
};

// Top-level navigator: either auth or main app
export type AppParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Root: NavigatorScreenParams<RootStackParamList>;
};

// Utility type for screen props
declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppParamList {}
  }
}
