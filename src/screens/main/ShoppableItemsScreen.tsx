import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  StatusBar,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import type { RootStackParamList } from '../../navigation/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

type ShoppableRouteProp = RouteProp<RootStackParamList, 'ShoppableItems'>;

type Product = {
  id: string;
  name: string;
  brand: string;
  price: string;
  matchType: 'Exact Match' | 'Similar Match';
  image: any;
  storeUrl: string;
  description: string;
};

const itemsData: Record<string, Product[]> = {
  room_1: [
    {
      id: 'item_1',
      name: 'Wabi-Sabi Pendant Light',
      brand: 'Noguchi Modern',
      price: '$389',
      matchType: 'Exact Match',
      image: require('../../assets/images/shoppable_pendant.jpg'),
      storeUrl: 'https://example.com/noguchi-light',
      description: 'Handcrafted shoji paper lamp shade with direct soft illumination. Clean, minimal design.',
    },
    {
      id: 'item_2',
      name: 'Japandi Low Armchair',
      brand: 'Karimoku Case Study',
      price: '$1,250',
      matchType: 'Exact Match',
      image: require('../../assets/images/shoppable_chair.jpg'),
      storeUrl: 'https://example.com/karimoku-chair',
      description: 'Solid oak base upholstered with premium light grey Kvadrat textile. Designed by Keiji Ashizawa.',
    },
  ],
  room_2: [
    {
      id: 'item_3',
      name: 'Oak Writing Desk',
      brand: 'Ethnicraft',
      price: '$980',
      matchType: 'Similar Match',
      image: require('../../assets/images/shoppable_desk.jpg'),
      storeUrl: 'https://example.com/ethnicraft-desk',
      description: 'Sustainably sourced varnished solid oak desk with drawers. Minimalist and spacious workspace.',
    },
  ],
  room_new: [
    {
      id: 'item_4',
      name: 'Curved Cream Boucle Sofa',
      brand: 'Gubi',
      price: '$3,800',
      matchType: 'Exact Match',
      image: require('../../assets/images/shoppable_sofa.jpg'),
      storeUrl: 'https://example.com/gubi-sofa',
      description: 'Wonderfully plush curved design, wrapped in custom cream boucle upholstery for ultimate comfort.',
    },
    {
      id: 'item_5',
      name: 'Woven Travertine Coffee Table',
      brand: 'Menu Space',
      price: '$1,100',
      matchType: 'Similar Match',
      image: require('../../assets/images/shoppable_table.jpg'),
      storeUrl: 'https://example.com/menu-table',
      description: 'Sculptural stone statement piece. Hand-polished natural Travertine marble base and top.',
    },
  ],
};

export function ShoppableItemsScreen() {
  const route = useRoute<ShoppableRouteProp>();
  const navigation = useNavigation();
  const { roomId } = route.params;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMock = roomId.startsWith('room_');

  useEffect(() => {
    if (isMock) {
      const mockProducts = itemsData[roomId] || itemsData.room_1;
      setProducts(mockProducts);
      setLoading(false);
      return;
    }

    const fetchRoomItems = async () => {
      try {
        setLoading(true);
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          const data = roomDoc.data();
          const itemsUsed = data.items_used || [];
          
          const mapped: Product[] = itemsUsed.map((item: any, index: number) => ({
            id: `fs_item_${index}`,
            name: item.product_name || 'Recommended Item',
            brand: 'Jumia Store',
            price: 'Buy Now',
            matchType: 'Exact Match',
            image: item.image_url ? { uri: item.image_url } : require('../../assets/images/shoppable_chair.jpg'),
            storeUrl: item.product_url || 'https://www.jumia.com.ng',
            description: item.description || 'Real furniture recommended from the catalog matching your space.'
          }));
          
          setProducts(mapped);
        } else {
          setError('Room design not found.');
        }
      } catch (err: any) {
        console.error('Error fetching room items: ', err);
        setError(err.message || 'Error loading product list');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomItems();
  }, [roomId, isMock]);

  const handleOpenStore = (url: string) => {
    Linking.openURL(url).catch(() => {
      // Fallback
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} style={{ marginTop: spacing.md }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shoppable Items</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.listSubtitle}>
          DecoX AI found {products.length} matches. Tap to see purchase options.
        </Text>

        <View style={styles.productList}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              activeOpacity={0.85}
              onPress={() => setSelectedProduct(product)}
              style={styles.productCard}>
              <Image source={product.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <View style={styles.badgeRow}>
                  <View
                    style={[
                      styles.matchBadge,
                      {
                        backgroundColor:
                          product.matchType === 'Exact Match'
                            ? colors.badge.trending
                            : colors.surfaceElevated,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.matchBadgeText,
                        {
                          color:
                            product.matchType === 'Exact Match'
                              ? colors.text.inverse
                              : colors.text.secondary,
                        },
                      ]}>
                      {product.matchType}
                    </Text>
                  </View>
                </View>
                <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
                <Text style={styles.productBrand}>{product.brand}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Product Detail Commerce Modal */}
      {selectedProduct && (
        <Modal
          animationType="slide"
          transparent
          visible={!!selectedProduct}
          onRequestClose={() => setSelectedProduct(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderTitle}>Product Details</Text>
                <TouchableOpacity
                  onPress={() => setSelectedProduct(null)}
                  style={styles.closeBtn}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
                  <Text style={styles.closeBtnText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Image source={selectedProduct.image} style={styles.modalImage} />

              <View style={styles.modalBody}>
                <View style={styles.modalMeta}>
                  <Text style={styles.modalBrand}>{selectedProduct.brand}</Text>
                  <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                </View>
                <Text style={styles.modalName}>{selectedProduct.name}</Text>
                <Text style={styles.modalDesc}>{selectedProduct.description}</Text>

                <Button
                  title="Purchase on Retailer Site"
                  onPress={() => handleOpenStore(selectedProduct.storeUrl)}
                  style={styles.purchaseButton}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    ...typography.titleMedium,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  errorText: {
    ...typography.bodyLarge,
    color: colors.status.danger,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  backButton: {
    padding: spacing.xs,
  },
  backIcon: {
    fontSize: 24,
    color: colors.text.primary,
  },
  headerTitle: {
    ...typography.titleLarge,
    color: colors.text.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  listSubtitle: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  productList: {
    gap: spacing.md,
  },
  productCard: {
    flexDirection: 'row',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
    alignItems: 'center',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceElevated,
  },
  productDetails: {
    flex: 1,
    marginLeft: spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  matchBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  matchBadgeText: {
    ...typography.labelSmall,
    fontSize: 9,
  },
  productName: {
    ...typography.titleMedium,
    color: colors.text.primary,
    marginBottom: 2,
  },
  productBrand: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  productPrice: {
    ...typography.titleMedium,
    color: colors.secondary,
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 20,
    color: colors.text.muted,
    padding: spacing.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  modalHeaderTitle: {
    ...typography.titleLarge,
    color: colors.text.primary,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  closeBtnText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  modalImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    backgroundColor: colors.surfaceElevated,
  },
  modalBody: {
    padding: spacing.lg,
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  modalBrand: {
    ...typography.labelMedium,
    color: colors.text.secondary,
  },
  modalPrice: {
    ...typography.titleLarge,
    color: colors.secondary,
    fontWeight: '700',
  },
  modalName: {
    ...typography.displaySmall,
    color: colors.text.primary,
    fontSize: 24,
    marginBottom: spacing.md,
  },
  modalDesc: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  purchaseButton: {
    width: '100%',
  },
});
