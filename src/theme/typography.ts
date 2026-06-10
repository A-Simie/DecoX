import { TextStyle, Platform } from 'react-native';

const fontFamily = {
  serif: Platform.select({
    android: 'serif',
    ios: 'Georgia',
    default: 'serif',
  }),
  sans: Platform.select({
    android: 'sans-serif',
    ios: 'System',
    default: 'System',
  }),
  sansMedium: Platform.select({
    android: 'sans-serif-medium',
    ios: 'System',
    default: 'System',
  }),
  mono: Platform.select({
    android: 'monospace',
    ios: 'Menlo',
    default: 'monospace',
  }),
};

export const typography = {
  displayLarge: {
    fontFamily: fontFamily.serif,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: -0.5,
  } as TextStyle,

  displayMedium: {
    fontFamily: fontFamily.serif,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '400',
    letterSpacing: -0.3,
  } as TextStyle,

  displaySmall: {
    fontFamily: fontFamily.serif,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '400',
  } as TextStyle,

  headlineLarge: {
    fontFamily: fontFamily.serif,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '400',
  } as TextStyle,

  headlineMedium: {
    fontFamily: fontFamily.serif,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '400',
  } as TextStyle,

  titleLarge: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  } as TextStyle,

  titleMedium: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  } as TextStyle,

  bodyLarge: {
    fontFamily: fontFamily.sans,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  } as TextStyle,

  bodyMedium: {
    fontFamily: fontFamily.sans,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
  } as TextStyle,

  bodySmall: {
    fontFamily: fontFamily.sans,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
  } as TextStyle,

  labelLarge: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
  } as TextStyle,

  labelMedium: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  } as TextStyle,

  labelSmall: {
    fontFamily: fontFamily.sansMedium,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '500',
    letterSpacing: 1.0,
    textTransform: 'uppercase',
  } as TextStyle,
} as const;

export type Typography = typeof typography;
