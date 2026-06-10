import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/Button';

export function ProfileScreen() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const menuItems = [
    { id: 'edit_profile', title: 'Edit Profile', icon: '👤' },
    { id: 'saved_preferences', title: 'Design Preferences', icon: '🎨' },
    { id: 'purchase_history', title: 'Order History', icon: '📦' },
    { id: 'help', title: 'Help & Support', icon: '💬' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Text style={styles.title}>Profile</Text>

      {/* User Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarTextLarge}>
            {(user?.fullName || 'Eleanor Vance').charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.profileName}>{user?.fullName || 'Eleanor Vance'}</Text>
        <Text style={styles.profileEmail}>{user?.email || 'eleanor.vance@example.com'}</Text>

        {/* Preference Chips */}
        {user?.preferences && user.preferences.length > 0 && (
          <View style={styles.prefSection}>
            <Text style={styles.prefTitle}>MY PREFERRED AESTHETICS</Text>
            <View style={styles.chipsContainer}>
              {user.preferences.map((pref) => (
                <View key={pref} style={styles.chip}>
                  <Text style={styles.chipText}>{pref}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Settings Menu List */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <Text style={styles.arrowIcon}>→</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Log out */}
      <Button
        title="Log Out"
        variant="secondary"
        onPress={logout}
        style={styles.logoutButton}
        textStyle={{ color: colors.status.danger }}
      />
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  avatarLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarTextLarge: {
    ...typography.displaySmall,
    color: colors.secondary,
  },
  profileName: {
    ...typography.titleLarge,
    color: colors.text.primary,
  },
  profileEmail: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  prefSection: {
    width: '100%',
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: spacing.md,
  },
  prefTitle: {
    ...typography.labelSmall,
    color: colors.text.muted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.text.primary,
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuItemTitle: {
    ...typography.bodyLarge,
    color: colors.text.primary,
  },
  arrowIcon: {
    ...typography.bodyLarge,
    color: colors.text.muted,
  },
  logoutButton: {
    borderColor: colors.status.danger + '40', // 25% opacity
  },
});
