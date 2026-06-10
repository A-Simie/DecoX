import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
};

export function Input({
  label,
  error,
  showPasswordToggle = false,
  secureTextEntry,
  style,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const shouldHidePassword = secureTextEntry && !isPasswordVisible;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.input,
            isFocused && styles.inputFocused,
            error ? styles.inputError : undefined,
            style,
          ]}
          placeholderTextColor={colors.input.placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={shouldHidePassword}
          {...rest}
        />
        {showPasswordToggle && secureTextEntry !== undefined && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.toggle}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.toggleText}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.labelMedium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  inputRow: {
    position: 'relative',
  },
  input: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.input.border,
    paddingVertical: spacing.sm,
    paddingRight: spacing.xl,
  },
  inputFocused: {
    borderBottomColor: colors.input.borderFocused,
  },
  inputError: {
    borderBottomColor: colors.status.danger,
  },
  toggle: {
    position: 'absolute',
    right: 0,
    bottom: spacing.sm,
  },
  toggleText: {
    fontSize: 18,
  },
  error: {
    ...typography.bodySmall,
    color: colors.status.danger,
    marginTop: spacing.xs,
  },
});
