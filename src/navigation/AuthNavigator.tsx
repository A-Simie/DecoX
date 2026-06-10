import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { ChoiceGateScreen } from '../screens/auth/ChoiceGateScreen';
import { CreateAccountScreen } from '../screens/auth/CreateAccountScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { StylePreferencesScreen } from '../screens/onboarding/StylePreferencesScreen';
import type { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="ChoiceGate" component={ChoiceGateScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="StylePreferences" component={StylePreferencesScreen} />
    </Stack.Navigator>
  );
}
