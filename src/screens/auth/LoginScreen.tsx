import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import type { AuthStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/authStore';

type LoginNav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<LoginNav>();
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);
  const setOnboardingComplete = useAuthStore((s) => s.setOnboardingComplete);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isValid = email.includes('@') && password.length >= 6;

  const handleLogin = () => {
    setAuthenticated({
      id: '1',
      fullName: 'Eleanor Vance',
      email,
      preferences: ['Japandi', 'Minimalist'],
    });
    setOnboardingComplete();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled">
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>DECOX</Text>

      <View style={styles.form}>
        <Input
          label="Email Address"
          placeholder="jane@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showPasswordToggle
        />
      </View>

      <TouchableOpacity style={styles.forgotRow}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <Button title="Log In" onPress={handleLogin} disabled={!isValid} />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR LOG IN WITH</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialLabel}>Apple</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
  },
  backButton: {
    marginBottom: spacing.lg,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.labelMedium,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },
  form: {
    marginBottom: spacing.sm,
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginBottom: spacing.xl,
  },
  forgotText: {
    ...typography.bodyMedium,
    color: colors.secondary,
    textDecorationLine: 'underline',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    ...typography.labelSmall,
    color: colors.text.muted,
    marginHorizontal: spacing.md,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLabel: {
    ...typography.titleMedium,
    color: colors.text.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
  },
  footerLink: {
    ...typography.bodyMedium,
    color: colors.text.primary,
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
});
