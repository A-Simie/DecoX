import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import type { AuthStackParamList } from '../../navigation/types';

type SplashNav = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export function SplashScreen() {
  const navigation = useNavigation<SplashNav>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.content}>
        <Text style={styles.title}>DecoX</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>See it. Style it. Shop it.</Text>
      </View>
      <View style={styles.indicator}>
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    ...typography.displayLarge,
    fontSize: 42,
    color: colors.text.primary,
  },
  divider: {
    width: 60,
    height: 1,
    backgroundColor: colors.secondary,
    marginVertical: spacing.lg,
  },
  tagline: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    letterSpacing: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: spacing.xxl,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    opacity: 0.6,
  },
});
