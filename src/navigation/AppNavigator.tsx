import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { AuthNavigator } from './AuthNavigator';
import { TabNavigator } from './TabNavigator';
import { AIRevealScreen } from '../screens/main/AIRevealScreen';
import { ShoppableItemsScreen } from '../screens/main/ShoppableItemsScreen';
import { StyleDetailScreen } from '../screens/main/StyleDetailScreen';
import type { AppParamList, RootStackParamList } from './types';

const AppStack = createNativeStackNavigator<AppParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function MainNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="MainTabs" component={TabNavigator} />
      <RootStack.Screen
        name="AIReveal"
        component={AIRevealScreen}
        options={{ animation: 'fade' }}
      />
      <RootStack.Screen
        name="ShoppableItems"
        component={ShoppableItemsScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <RootStack.Screen
        name="StyleDetail"
        component={StyleDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </RootStack.Navigator>
  );
}

export function AppNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasCompletedOnboarding = useAuthStore((s) => s.hasCompletedOnboarding);

  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated || !hasCompletedOnboarding ? (
          <AppStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <AppStack.Screen name="Root" component={MainNavigator} />
        )}
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
