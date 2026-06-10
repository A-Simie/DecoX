import React, { useState } from 'react';
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
import type { RootStackParamList } from '../../navigation/types';

const { width } = Dimensions.get('window');

type SavedNav = NativeStackNavigationProp<RootStackParamList>;

const savedRedesigns = [
  {
    id: 'room_1',
    title: 'Living Room',
    style: 'Japandi Style',
    image: require('../../assets/images/recent_living.jpg'),
  },
  {
    id: 'room_2',
    title: 'Home Office',
    style: 'Minimalist Workspace',
    image: require('../../assets/images/recent_office.jpg'),
  },
];

const savedItems = [
  {
    id: 'item_1',
    name: 'Wabi-Sabi Pendant Light',
    brand: 'Noguchi Modern',
    price: '$389',
    image: require('../../assets/images/shoppable_pendant.jpg'),
  },
  {
    id: 'item_2',
    name: 'Japandi Low Armchair',
    brand: 'Karimoku Case Study',
    price: '$1,250',
    image: require('../../assets/images/shoppable_chair.jpg'),
  },
];

export function SavedScreen() {
  const navigation = useNavigation<SavedNav>();
  const [activeTab, setActiveTab] = useState<'redesigns' | 'items'>('redesigns');

  const handleOpenReveal = (roomId: string) => {
    navigation.navigate('AIReveal', { roomId });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Text style={styles.title}>Saved Inspiration</Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'redesigns' && styles.tabActive]}
          onPress={() => setActiveTab('redesigns')}>
          <Text style={[styles.tabText, activeTab === 'redesigns' && styles.tabTextActive]}>
            Redesigns ({savedRedesigns.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'items' && styles.tabActive]}
          onPress={() => setActiveTab('items')}>
          <Text style={[styles.tabText, activeTab === 'items' && styles.tabTextActive]}>
            Shoppable Items ({savedItems.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'redesigns' ? (
          <View style={styles.grid}>
            {savedRedesigns.map((design) => (
              <TouchableOpacity
                key={design.id}
                activeOpacity={0.85}
                onPress={() => handleOpenReveal(design.id)}
                style={styles.designCard}>
                <Image source={design.image} style={styles.designImage} />
                <View style={styles.designInfo}>
                  <Text style={styles.designTitle}>{design.title}</Text>
                  <Text style={styles.designStyle}>{design.style}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {savedItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                style={styles.itemRow}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <TouchableOpacity style={styles.heartButton}>
                  <Text style={styles.heartIcon}>♥</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.displayMedium,
    color: colors.text.primary,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.secondary,
  },
  tabText: {
    ...typography.labelSmall,
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  designCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  designImage: {
    width: '100%',
    height: 120,
    backgroundColor: colors.surfaceElevated,
  },
  designInfo: {
    padding: spacing.md,
  },
  designTitle: {
    ...typography.titleMedium,
    color: colors.text.primary,
  },
  designStyle: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  list: {
    gap: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceElevated,
  },
  itemInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  itemName: {
    ...typography.titleMedium,
    color: colors.text.primary,
  },
  itemBrand: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginVertical: 2,
  },
  itemPrice: {
    ...typography.titleMedium,
    color: colors.secondary,
    fontWeight: '600',
  },
  heartButton: {
    padding: spacing.sm,
  },
  heartIcon: {
    color: colors.status.danger,
    fontSize: 22,
  },
});
