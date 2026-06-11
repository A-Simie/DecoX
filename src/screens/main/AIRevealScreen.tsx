import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  StatusBar,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import type { RootStackParamList } from '../../navigation/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const { width, height } = Dimensions.get('window');

type AIRevealRouteProp = RouteProp<RootStackParamList, 'AIReveal'>;
type AIRevealNav = NativeStackNavigationProp<RootStackParamList>;

type Hotspot = {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  name: string;
  brand: string;
  price: string;
  image: any;
};

const hotspotsData: Record<string, Hotspot[]> = {
  room_1: [
    {
      id: 'h_1',
      x: 35,
      y: 65,
      name: 'Wabi-Sabi Pendant Light',
      brand: 'Noguchi Modern',
      price: '$389',
      image: require('../../assets/images/shoppable_pendant.jpg'),
    },
    {
      id: 'h_2',
      x: 60,
      y: 75,
      name: 'Japandi Low Armchair',
      brand: 'Karimoku Case Study',
      price: '$1,250',
      image: require('../../assets/images/shoppable_chair.jpg'),
    },
  ],
  room_2: [
    {
      id: 'h_3',
      x: 45,
      y: 50,
      name: 'Oak Writing Desk',
      brand: 'Ethnicraft',
      price: '$980',
      image: require('../../assets/images/shoppable_desk.jpg'),
    },
  ],
  room_new: [
    {
      id: 'h_4',
      x: 30,
      y: 60,
      name: 'Curved Cream Boucle Sofa',
      brand: 'Gubi',
      price: '$3,800',
      image: require('../../assets/images/shoppable_sofa.jpg'),
    },
    {
      id: 'h_5',
      x: 75,
      y: 80,
      name: 'Woven Travertine Coffee Table',
      brand: 'Menu Space',
      price: '$1,100',
      image: require('../../assets/images/shoppable_table.jpg'),
    },
  ],
};

export function AIRevealScreen() {
  const navigation = useNavigation<AIRevealNav>();
  const route = useRoute<AIRevealRouteProp>();
  const { roomId } = route.params;

  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [roomData, setRoomData] = useState<any>(null);
  const [loading, setLoading] = useState(!roomId.startsWith('room_'));
  const [error, setError] = useState<string | null>(null);

  const isMock = roomId.startsWith('room_');
  const hotspots = isMock ? (hotspotsData[roomId] || hotspotsData.room_1) : [];

  useEffect(() => {
    if (isMock) {
      setLoading(false);
      return;
    }

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const roomDocRef = doc(db, 'rooms', roomId);
        const roomDoc = await getDoc(roomDocRef);
        if (roomDoc.exists()) {
          const data = roomDoc.data();
          setRoomData(data);
          setIsSaved(!!data?.isSaved);
        } else {
          setError('Room design not found.');
        }
      } catch (err: any) {
        console.error('Error fetching room: ', err);
        setError(err.message || 'Error loading room data');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, isMock]);

  // Render different images for each room
  const getRoomImage = () => {
    if (!isMock && roomData?.redesigned_image_url) {
      return { uri: roomData.redesigned_image_url };
    }
    if (roomId === 'room_2') {
      return require('../../assets/images/recent_office.jpg');
    }
    return require('../../assets/images/recent_living.jpg');
  };

  const handleOpenList = () => {
    navigation.navigate('ShoppableItems', { roomId });
  };

  const handleToggleSave = async () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    if (!isMock) {
      try {
        const roomDocRef = doc(db, 'rooms', roomId);
        await updateDoc(roomDocRef, { isSaved: nextSaved });
      } catch (err) {
        console.error('Error toggling save:', err);
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={styles.loadingTitle}>Loading your redesign...</Text>
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
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header Overlay */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.circleBtn}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={styles.btnIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Redesign</Text>
        <TouchableOpacity
          onPress={handleToggleSave}
          style={[styles.circleBtn, isSaved && styles.circleBtnActive]}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <Text style={[styles.btnIcon, isSaved && styles.btnIconActive]}>
            {isSaved ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Room Image Canvas */}
      <View style={styles.canvasContainer}>
        <Image source={getRoomImage()} style={styles.canvasImage} />

        {/* Hotspot Markers Overlay */}
        {isMock && hotspots.map((spot) => (
          <TouchableOpacity
            key={spot.id}
            activeOpacity={0.8}
            onPress={() => setActiveHotspot(spot)}
            style={[
              styles.hotspotMarker,
              { left: `${spot.x}%`, top: `${spot.y}%` },
            ]}>
            <View style={styles.hotspotRing} />
            <View style={styles.hotspotDot} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Action Footer */}
      <View style={styles.footer}>
        <Text style={styles.revealHeading}>
          {isMock ? 'Tap hotspots to explore elements' : 'Your room is ready!'}
        </Text>
        <Text style={styles.revealSub}>
          {isMock 
            ? `${hotspots.length} shoppable items matched by AI.`
            : `${roomData?.items_used?.length || 0} shoppable items matched by AI.`}
        </Text>

        {!isMock && roomData?.design_notes ? (
          <ScrollView style={styles.notesContainer} showsVerticalScrollIndicator={true}>
            <Text style={styles.notesText}>{roomData.design_notes}</Text>
          </ScrollView>
        ) : null}

        <Button title="View Shoppable Items List" onPress={handleOpenList} />
      </View>

      {/* Hotspot Modal Tooltip */}
      {activeHotspot && (
        <Modal
          animationType="fade"
          transparent
          visible={!!activeHotspot}
          onRequestClose={() => setActiveHotspot(null)}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => setActiveHotspot(null)}>
            <View style={styles.tooltipCard}>
              <Image source={activeHotspot.image} style={styles.tooltipImage} />
              <View style={styles.tooltipContent}>
                <Text style={styles.tooltipName}>{activeHotspot.name}</Text>
                <Text style={styles.tooltipBrand}>{activeHotspot.brand}</Text>
                <View style={styles.priceRow}>
                  <Text style={styles.tooltipPrice}>{activeHotspot.price}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setActiveHotspot(null);
                      navigation.navigate('ShoppableItems', { roomId });
                    }}
                    style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>Buy →</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingTitle: {
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
    position: 'absolute',
    top: spacing.xxl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  headerTitle: {
    ...typography.titleLarge,
    color: colors.text.inverse,
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  circleBtnActive: {
    backgroundColor: colors.surface,
  },
  btnIcon: {
    fontSize: 20,
    color: colors.text.inverse,
  },
  btnIconActive: {
    color: colors.status.danger,
  },
  canvasContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  canvasImage: {
    width: '100%',
    height: height * 0.7,
    resizeMode: 'cover',
  },
  hotspotMarker: {
    position: 'absolute',
    width: 44,
    height: 44,
    marginLeft: -22,
    marginTop: -22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  hotspotRing: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  hotspotDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    marginTop: -spacing.xl,
  },
  revealHeading: {
    ...typography.headlineMedium,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  revealSub: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  notesContainer: {
    maxHeight: 120,
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  notesText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  tooltipCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  tooltipImage: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceElevated,
  },
  tooltipContent: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'space-between',
  },
  tooltipName: {
    ...typography.titleMedium,
    color: colors.text.primary,
  },
  tooltipBrand: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tooltipPrice: {
    ...typography.titleMedium,
    color: colors.secondary,
    fontWeight: '600',
  },
  viewBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  viewBtnText: {
    ...typography.labelSmall,
    color: colors.text.inverse,
    fontSize: 11,
  },
});
