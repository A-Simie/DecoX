import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { useAuthStore } from '../../store/authStore';
import type { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type HomeNav = NativeStackNavigationProp<RootStackParamList>;

const recentScans = [
  {
    id: 'room_1',
    title: 'Living Room',
    style: 'Japandi',
    date: '2 hours ago',
    image: require('../../assets/images/recent_living.jpg'),
  },
  {
    id: 'room_2',
    title: 'Home Office',
    style: 'Minimalist',
    date: 'Yesterday',
    image: require('../../assets/images/recent_office.jpg'),
  },
];

const designTrends = [
  {
    id: 'style_japandi',
    name: 'Japandi',
    image: require('../../assets/images/trend_japandi.jpg'),
    description: 'Blends Japanese minimalism with warm Scandinavian comfort.',
  },
  {
    id: 'style_old_money',
    name: 'Old Money',
    image: require('../../assets/images/trend_oldmoney.jpg'),
    description: 'Timeless luxury featuring rich woods and plush textiles.',
  },
  {
    id: 'style_mid_century',
    name: 'Mid-Century Modern',
    image: require('../../assets/images/trend_midcentury.jpg'),
    description: 'Clean organic lines and bold retro aesthetics.',
  },
];

export function HomeScreen() {
  const navigation = useNavigation<HomeNav>();
  const user = useAuthStore((s) => s.user);

  const handleStartRedesign = () => {
    // Navigation helper to switch tab
    navigation.navigate('MainTabs', { screen: 'NewRoom' });
  };

  const handleOpenReveal = (roomId: string) => {
    navigation.navigate('AIReveal', { roomId });
  };

  const handleOpenStyleDetail = (styleId: string, styleName: string) => {
    navigation.navigate('StyleDetail', { styleId, styleName });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Greeting Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingLabel}>GOOD MORNING,</Text>
          <Text style={styles.userName}>{user?.fullName || 'Eleanor Vance'}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('MainTabs', { screen: 'Profile' })}
          style={styles.avatarContainer}>
          <Text style={styles.avatarPlaceholder}>
            {(user?.fullName || 'E').charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Redesign CTA Card */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handleStartRedesign}
        style={styles.ctaCard}>
        <Image
          source={require('../../assets/images/cta_hero.jpg')}
          style={styles.ctaCardImage}
        />
        <View style={styles.ctaOverlay}>
          <Text style={styles.ctaHeading}>Visualize your next room.</Text>
          <Text style={styles.ctaButtonText}>Start Redesign  →</Text>
        </View>
      </TouchableOpacity>

      {/* Recent Redesigns */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Redesigns</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalScroll}>
          {recentScans.map((scan) => (
            <TouchableOpacity
              key={scan.id}
              activeOpacity={0.85}
              onPress={() => handleOpenReveal(scan.id)}
              style={styles.scanCard}>
              <Image source={scan.image} style={styles.scanImage} />
              <View style={styles.scanInfo}>
                <Text style={styles.scanTitle}>{scan.title}</Text>
                <Text style={styles.scanDetails}>
                  {scan.style} • {scan.date}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Design Trends */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.sectionTitle}>Explore Styles</Text>
        {designTrends.map((trend) => (
          <TouchableOpacity
            key={trend.id}
            activeOpacity={0.9}
            onPress={() => handleOpenStyleDetail(trend.id, trend.name)}
            style={styles.trendCard}>
            <Image source={trend.image} style={styles.trendImage} />
            <View style={styles.trendOverlay}>
              <View>
                <Text style={styles.trendName}>{trend.name}</Text>
                <Text style={styles.trendDescription}>{trend.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  greetingLabel: {
    ...typography.labelSmall,
    color: colors.text.secondary,
  },
  userName: {
    ...typography.displaySmall,
    color: colors.text.primary,
    fontWeight: '500',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    ...typography.titleMedium,
    color: colors.secondary,
  },
  ctaCard: {
    marginHorizontal: spacing.lg,
    height: 220,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  ctaCardImage: {
    width: '100%',
    height: '100%',
  },
  ctaOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  ctaHeading: {
    ...typography.displaySmall,
    color: colors.text.inverse,
    marginBottom: spacing.sm,
    fontSize: 26,
  },
  ctaButtonText: {
    ...typography.titleMedium,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  section: {
    marginBottom: spacing.xxl,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    ...typography.headlineLarge,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  horizontalScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  scanCard: {
    width: width * 0.65,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  scanImage: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surfaceElevated,
  },
  scanInfo: {
    padding: spacing.md,
  },
  scanTitle: {
    ...typography.titleMedium,
    color: colors.text.primary,
  },
  scanDetails: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  trendCard: {
    height: 180,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    position: 'relative',
  },
  trendImage: {
    width: '100%',
    height: '100%',
  },
  trendOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: spacing.lg,
    justifyContent: 'flex-end',
  },
  trendName: {
    ...typography.displaySmall,
    color: colors.text.inverse,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  trendDescription: {
    ...typography.bodyMedium,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 18,
  },
});
