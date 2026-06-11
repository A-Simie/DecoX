import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../services/firebase';

type CreateAccountNav = NativeStackNavigationProp<AuthStackParamList, 'CreateAccount'>;

type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < 4) return 'weak';
  if (password.length < 6) return 'fair';
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const score = [hasUpper, hasNumber, hasSpecial, password.length >= 8].filter(Boolean).length;
  if (score >= 3) return 'strong';
  if (score >= 2) return 'good';
  return 'fair';
}

const strengthColors: Record<PasswordStrength, string> = {
  weak: colors.status.danger,
  fair: colors.status.warning,
  good: colors.secondary,
  strong: colors.status.success,
};

const strengthSegments: Record<PasswordStrength, number> = {
  weak: 1,
  fair: 2,
  good: 3,
  strong: 4,
};

export function CreateAccountScreen() {
  const navigation = useNavigation<CreateAccountNav>();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);
  const activeSegments = strengthSegments[strength];

  const isValid =
    fullName.trim().length > 0 &&
    email.includes('@') &&
    password.length >= 6 &&
    password === confirmPassword;

  const handleCreateAccount = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message || 'Please check your information.');
    } finally {
      setLoading(false);
    }
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

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>DECOX</Text>

      <View style={styles.form}>
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
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

        {password.length > 0 && (
          <View style={styles.strengthContainer}>
            <View style={styles.strengthBar}>
              {[1, 2, 3, 4].map((seg) => (
                <View
                  key={seg}
                  style={[
                    styles.strengthSegment,
                    {
                      backgroundColor:
                        seg <= activeSegments
                          ? strengthColors[strength]
                          : colors.border,
                    },
                  ]}
                />
              ))}
            </View>
            <Text
              style={[
                styles.strengthLabel,
                { color: strengthColors[strength] },
              ]}>
              {strength.toUpperCase()}
            </Text>
          </View>
        )}

        <Input
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          showPasswordToggle
        />
      </View>

      <Button
        title="Create Account"
        onPress={handleCreateAccount}
        disabled={!isValid || loading}
        loading={loading}
      />

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
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
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerLink}>Log In</Text>
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
    marginBottom: spacing.lg,
  },
  strengthContainer: {
    marginTop: -spacing.md,
    marginBottom: spacing.lg,
  },
  strengthBar: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  strengthLabel: {
    ...typography.labelSmall,
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
