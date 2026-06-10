export const colors = {
  background: '#FAF6F1',
  surface: '#FFFFFF',
  surfaceElevated: '#F5F0EB',

  primary: '#1A1A1A',
  secondary: '#8B7355',
  accent: '#3D2B1F',

  text: {
    primary: '#1A1A1A',
    secondary: '#6B6B6B',
    muted: '#9B9B9B',
    inverse: '#FFFFFF',
  },

  border: '#E5E0DA',
  divider: '#F0ECE7',

  status: {
    danger: '#C0392B',
    success: '#27AE60',
    warning: '#E67E22',
    info: '#2980B9',
  },

  overlay: 'rgba(0, 0, 0, 0.5)',

  // Component-specific
  button: {
    primaryBg: '#1A1A1A',
    primaryText: '#FFFFFF',
    secondaryBg: 'transparent',
    secondaryText: '#1A1A1A',
    secondaryBorder: '#D1CCC6',
    disabledBg: '#D1CCC6',
    disabledText: '#9B9B9B',
  },

  input: {
    border: '#E5E0DA',
    borderFocused: '#8B7355',
    placeholder: '#9B9B9B',
  },

  tab: {
    active: '#1A1A1A',
    inactive: '#9B9B9B',
  },

  badge: {
    trending: '#8B7355',
    lowStock: '#C0392B',
  },
} as const;

export type Colors = typeof colors;
