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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import type { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type StyleDetailRouteProp = RouteProp<RootStackParamList, 'StyleDetail'>;
type StyleDetailNav = NativeStackNavigationProp<RootStackParamList>;

const designStyleData: Record<string, {
  name: string;
  description: string;
  history: string;
  images: any[];
  characteristics: string[];
}> = {
  style_japandi: {
    name: 'Japandi',
    description: 'Blends Japanese minimalism with warm Scandinavian comfort.',
    history:
      'Originating from historical trade and travel connection between Scandinavia and Japan, Japandi synthesizes their common appreciation of simplicity, natural elements, craftsmanship, and functionality.',
    characteristics: [
      'Warm natural color schemes',
      'Clean lines & low-profile furniture',
      'Natural textures (cotton, linen, light wood)',
      'A focus on wabi-sabi (finding beauty in imperfection)',
    ],
    images: [
      require('../../assets/images/trend_japandi.jpg'),
      require('../../assets/images/recent_living.jpg'),
    ],
  },
  style_old_money: {
    name: 'Old Money',
    description: 'Timeless luxury featuring rich woods and plush textiles.',
    history:
      'Rooted in classical architecture, historic country estates, and generational family houses. Old Money aesthetic balances traditional status symbols with restraint.',
    characteristics: [
      'Dark mahogany and walnut tones',
      'Antique portrait frames & books',
      'Rich velvets, wools, and brocades',
      'Ornate architectural mouldings & details',
    ],
    images: [
      require('../../assets/images/trend_oldmoney.jpg'),
      require('../../assets/images/explore_oldmoney_1.jpg'),
    ],
  },
  style_mid_century: {
    name: 'Mid-Century Modern',
    description: 'Clean organic lines and bold retro aesthetics.',
    history:
      'Developed during the mid-20th century (1940s-1960s), prioritizing form following function, bringing architectural details, glass walls, and organic materials inside.',
    characteristics: [
      'Organic curves & tapered legs',
      'Contrasting wood finishes & brass',
      'Earthy statement colors (mustard, olive, rust)',
      'Integration of indoor/outdoor spaces',
    ],
    images: [
      require('../../assets/images/trend_midcentury.jpg'),
      require('../../assets/images/recent_office.jpg'),
    ],
  },
};

export function StyleDetailScreen() {
  const navigation = useNavigation<StyleDetailNav>();
  const route = useRoute<StyleDetailRouteProp>();
  const { styleId, styleName } = route.params;

  // Fallback if not found in dictionary
  const styleData = designStyleData[styleId] || {
    name: styleName,
    description: 'A custom premium aesthetic layout.',
    history: 'A curated selection of details.',
    characteristics: ['Minimalist lines', 'Curated textures', 'Premium finishes'],
    images: [require('../../assets/images/cta_hero.jpg')],
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Header */}
        <View style={styles.heroContainer}>
          <Image source={styleData.images[0]} style={styles.heroImage} />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.heroOverlay}>
            <Text style={styles.styleName}>{styleData.name}</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Aesthetic Definition</Text>
          <Text style={styles.bodyText}>{styleData.description}</Text>
          <Text style={styles.bodyText}>{styleData.history}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Key Characteristics</Text>
          {styleData.characteristics.map((char, index) => (
            <View key={index} style={styles.characteristicRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.characteristicText}>{char}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Inspiration Gallery</Text>
          <View style={styles.gallery}>
            {styleData.images.map((img, i) => (
              <Image key={i} source={img} style={styles.galleryImage} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 22,
    color: colors.text.inverse,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  styleName: {
    ...typography.displayLarge,
    color: colors.text.inverse,
  },
  contentCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  sectionTitle: {
    ...typography.headlineMedium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  bodyText: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  characteristicRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: 18,
    color: colors.secondary,
    marginRight: spacing.sm,
    lineHeight: 22,
  },
  characteristicText: {
    ...typography.bodyLarge,
    color: colors.text.primary,
    flex: 1,
    lineHeight: 22,
  },
  gallery: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  galleryImage: {
    flex: 1,
    height: 120,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
  },
});
