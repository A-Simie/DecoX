import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../store/authStore';

const { width } = Dimensions.get('window');

const stylesList = [
  'Minimalist',
  'Japandi',
  'Old Money',
  'Maximalist',
  'Mid-Century',
  'Nordic',
  'Wabi-Sabi',
  'Coastal',
  'Art Deco',
  'Industrial',
  'Bohemian',
  'Eclectic',
];

export function StylePreferencesScreen() {
  const setOnboardingComplete = useAuthStore((s) => s.setOnboardingComplete);
  const user = useAuthStore((s) => s.user);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);

  const handleToggleStyle = (styleName: string) => {
    setSelectedStyles((prev) =>
      prev.includes(styleName)
        ? prev.filter((s) => s !== styleName)
        : [...prev, styleName]
    );
  };

  const handleNext = () => {
    if (user) {
      setAuthenticated({
        ...user,
        preferences: selectedStyles,
      });
    }
    // Set onboarding complete to switch root navigator to Main App
    setOnboardingComplete();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.progressContainer}>
        <View style={styles.progressBarActive} />
        <View style={styles.progressBarInactive} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>What draws you in?</Text>
        <Text style={styles.subtitle}>Pick as many as you like.</Text>

        <View style={styles.grid}>
          {stylesList.map((styleName) => {
            const isSelected = selectedStyles.includes(styleName);
            return (
              <TouchableOpacity
                key={styleName}
                activeOpacity={0.8}
                onPress={() => handleToggleStyle(styleName)}
                style={[
                  styles.card,
                  isSelected && styles.cardSelected,
                ]}>
                <Text
                  style={[
                    styles.cardText,
                    isSelected && styles.cardTextSelected,
                  ]}>
                  {styleName}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Next Step"
          onPress={handleNext}
          disabled={selectedStyles.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    flexDirection: 'row',
    height: 4,
    width: '100%',
    backgroundColor: colors.border,
  },
  progressBarActive: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  progressBarInactive: {
    flex: 1,
    backgroundColor: colors.border,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: spacing.md,
  },
  card: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    height: 90,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  cardSelected: {
    borderColor: colors.secondary,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
  },
  cardText: {
    ...typography.bodyMedium,
    fontFamily: typography.bodyMedium.fontFamily === 'serif' ? 'serif' : 'monospace',
    color: colors.text.secondary,
    textAlign: 'center',
  },
  cardTextSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
