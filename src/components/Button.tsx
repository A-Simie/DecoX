import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { borderRadius, spacing } from '../theme/spacing';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'large' | 'medium' | 'small';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.button.primaryText : colors.primary}
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.text,
              variantTextStyles[variant],
              icon ? { marginLeft: spacing.sm } : undefined,
              textStyle,
            ]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
  },
  text: {
    ...typography.titleMedium,
  },
  disabled: {
    backgroundColor: colors.button.disabledBg,
    borderColor: colors.button.disabledBg,
  },
});

const sizeStyles: Record<ButtonSize, ViewStyle> = {
  large: { height: 56, paddingHorizontal: spacing.xl },
  medium: { height: 48, paddingHorizontal: spacing.lg },
  small: { height: 40, paddingHorizontal: spacing.md },
};

const variantStyles: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: colors.button.primaryBg,
  },
  secondary: {
    backgroundColor: colors.button.secondaryBg,
    borderWidth: 1,
    borderColor: colors.button.secondaryBorder,
  },
  text: {
    backgroundColor: 'transparent',
  },
};

const variantTextStyles: Record<ButtonVariant, TextStyle> = {
  primary: { color: colors.button.primaryText },
  secondary: { color: colors.button.secondaryText },
  text: { color: colors.primary, textDecorationLine: 'underline' },
};
