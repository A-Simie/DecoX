import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
  ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import type { AuthStackParamList } from '../../navigation/types';

type OnboardingNav = NativeStackNavigationProp<AuthStackParamList, 'Onboarding'>;

const { width, height } = Dimensions.get('window');

type Slide = {
  id: string;
  title: string;
  description: string;
  buttonLabel: string;
  image: number;
};

const slides: Slide[] = [
  {
    id: '1',
    title: 'Start with what you have.',
    description: 'Upload a photo or 360° scan of any room — empty or furnished.',
    buttonLabel: '📷  Scan Room',
    image: require('../../assets/images/onboarding_scan.jpg'),
  },
  {
    id: '2',
    title: 'Tell us how you want to feel.',
    description:
      'Choose a style, describe a mood, or pick from curated aesthetics. DecoX does the rest.',
    buttonLabel: 'Continue  →',
    image: require('../../assets/images/onboarding_style.jpg'),
  },
  {
    id: '3',
    title: 'Every item.\nInstantly shoppable.',
    description:
      'Tap anything in your generated room to find it — or something strikingly similar — from verified stores.',
    buttonLabel: 'Get Started  →',
    image: require('../../assets/images/onboarding_shop.jpg'),
  },
];

export function OnboardingScreen() {
  const navigation = useNavigation<OnboardingNav>();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handlePress = () => {
    if (activeIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      navigation.replace('ChoiceGate');
    }
  };

  const handleSkip = () => {
    navigation.replace('ChoiceGate');
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={slideStyles.container}>
      <Image source={item.image} style={slideStyles.image} resizeMode="cover" />
      <TouchableOpacity style={slideStyles.skipButton} onPress={handleSkip}>
        <Text style={slideStyles.skipText}>Skip</Text>
      </TouchableOpacity>
      <View style={slideStyles.card}>
        <View style={slideStyles.indicators}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                slideStyles.indicator,
                i === activeIndex
                  ? slideStyles.indicatorActive
                  : slideStyles.indicatorInactive,
              ]}
            />
          ))}
        </View>
        <Text style={slideStyles.title}>{item.title}</Text>
        <Text style={slideStyles.description}>{item.description}</Text>
        <Button title={item.buttonLabel} onPress={handlePress} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});

const slideStyles = StyleSheet.create({
  container: {
    width,
    height,
  },
  image: {
    width,
    height: height * 0.55,
  },
  skipButton: {
    position: 'absolute',
    top: spacing.xxl + spacing.md,
    right: spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  skipText: {
    ...typography.labelLarge,
    color: colors.text.primary,
  },
  card: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    justifyContent: 'space-between',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  indicator: {
    height: 4,
    borderRadius: 2,
  },
  indicatorActive: {
    width: 32,
    backgroundColor: colors.secondary,
  },
  indicatorInactive: {
    width: 20,
    backgroundColor: colors.border,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
    textAlign: 'center',
  },
  description: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
});
