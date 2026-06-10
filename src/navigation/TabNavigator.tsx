import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/main/HomeScreen';
import { NewRoomScreen } from '../screens/main/NewRoomScreen';
import { SavedScreen } from '../screens/main/SavedScreen';
import { ExploreScreen } from '../screens/main/ExploreScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tab.active,
        tabBarInactiveTintColor: colors.tab.inactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          ...typography.labelSmall,
          fontSize: 9,
          textTransform: 'none',
          letterSpacing: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ) as any,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🔍</Text>
          ) as any,
        }}
      />
      <Tab.Screen
        name="NewRoom"
        component={NewRoomScreen}
        options={{
          tabBarLabel: 'Redesign',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 22, color }}>📸</Text>
          ) as any,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Saved',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>♥</Text>
          ) as any,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>👤</Text>
          ) as any,
        }}
      />
    </Tab.Navigator>
  );
}

// Inline Text import hack to bypass compiler limits
import { Text } from 'react-native';
