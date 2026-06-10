import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import type { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type ExploreNav = NativeStackNavigationProp<RootStackParamList>;

const exploreCategories = ['All Styles', 'Living Room', 'Bedroom', 'Kitchen', 'Workspace', 'Outdoor'];

const feedItems = [
  {
    id: 'room_japandi_1',
    styleName: 'Japandi Harmony',
    category: 'Living Room',
    likes: 1204,
    image: require('../../assets/images/explore_japandi_1.jpg'),
  },
  {
    id: 'room_minimal_1',
    styleName: 'Minimalist Sanctuary',
    category: 'Bedroom',
    likes: 852,
    image: require('../../assets/images/explore_minimal_1.jpg'),
  },
  {
    id: 'room_industrial_1',
    styleName: 'Loft Industrialism',
    category: 'Kitchen',
    likes: 641,
    image: require('../../assets/images/explore_industrial_1.jpg'),
  },
  {
    id: 'room_oldmoney_1',
    styleName: 'Vintage Old Money Library',
    category: 'Workspace',
    likes: 2154,
    image: require('../../assets/images/explore_oldmoney_1.jpg'),
  },
];

export function ExploreScreen() {
  const navigation = useNavigation<ExploreNav>();
  const [selectedCategory, setSelectedCategory] = useState('All Styles');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenStyleDetail = (styleId: string, styleName: string) => {
    navigation.navigate('StyleDetail', { styleId, styleName });
  };

  const filteredItems = feedItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Styles' || item.category === selectedCategory;
    const matchesSearch = item.styleName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Spaces</Text>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search styles, elements, trends..."
            placeholderTextColor={colors.input.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Horizontal Category Scroll */}
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}>
          {exploreCategories.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <TouchableOpacity
                key={category}
                activeOpacity={0.8}
                onPress={() => setSelectedCategory(category)}
                style={[styles.categoryBtn, isActive && styles.categoryBtnActive]}>
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Explore Grid Feed */}
      <ScrollView contentContainerStyle={styles.feedScroll}>
        <View style={styles.grid}>
          {filteredItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.9}
              onPress={() => handleOpenStyleDetail(item.id, item.styleName)}
              style={styles.feedCard}>
              <Image source={item.image} style={styles.feedImage} />
              <View style={styles.feedCardOverlay}>
                <View>
                  <Text style={styles.cardCategory}>{item.category.toUpperCase()}</Text>
                  <Text style={styles.cardStyleName}>{item.styleName}</Text>
                </View>
                <View style={styles.likeRow}>
                  <Text style={styles.likeIcon}>♥</Text>
                  <Text style={styles.likeCount}>{item.likes}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.text.primary,
    padding: 0,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  categoryBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    ...typography.labelSmall,
    color: colors.text.secondary,
    textTransform: 'none',
  },
  categoryTextActive: {
    color: colors.text.inverse,
    fontWeight: '600',
  },
  feedScroll: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  grid: {
    gap: spacing.md,
  },
  feedCard: {
    height: 240,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  feedImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.surfaceElevated,
  },
  feedCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardCategory: {
    ...typography.labelSmall,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  cardStyleName: {
    ...typography.displaySmall,
    color: colors.text.inverse,
    fontSize: 20,
    marginTop: spacing.xs,
  },
  likeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
  },
  likeIcon: {
    color: colors.text.inverse,
    fontSize: 12,
  },
  likeCount: {
    ...typography.labelSmall,
    color: colors.text.inverse,
    fontSize: 11,
  },
});
