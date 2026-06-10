import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { Button } from '../../components/Button';
import type { RootStackParamList } from '../../navigation/types';

type NewRoomNav = NativeStackNavigationProp<RootStackParamList>;

const designStyles = [
  { id: 'japandi', name: 'Japandi', icon: '🎋' },
  { id: 'oldmoney', name: 'Old Money', icon: '🏛️' },
  { id: 'minimalist', name: 'Minimalist', icon: '⚪' },
  { id: 'bohemian', name: 'Bohemian', icon: '🌿' },
  { id: 'industrial', name: 'Industrial', icon: '🧱' },
  { id: 'midcentury', name: 'Mid-Century', icon: '🪵' },
];

export function NewRoomScreen() {
  const navigation = useNavigation<NewRoomNav>();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTakePhoto = async () => {
    try {
      const result = await launchCamera({
        mediaType: 'photo',
        quality: 0.8,
        saveToPhotos: true,
      });

      if (result.assets && result.assets[0].uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Camera Error', 'Could not open the camera. Please use gallery.');
    }
  };

  const handlePickLibrary = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
      });

      if (result.assets && result.assets[0].uri) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Gallery Error', 'Could not open photo library.');
    }
  };

  const handleGenerate = () => {
    if (!photoUri) {
      Alert.alert('Photo Needed', 'Please capture or select a photo of your room first.');
      return;
    }
    if (!selectedStyle) {
      Alert.alert('Style Needed', 'Please select an aesthetic style for the redesign.');
      return;
    }

    setIsProcessing(true);

    // Simulate AI Generation time (3.5s)
    setTimeout(() => {
      setIsProcessing(false);
      // Navigate to the AI Reveal Screen
      navigation.navigate('AIReveal', { roomId: 'room_new' });
    }, 3500);
  };

  if (isProcessing) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <ActivityIndicator size="large" color={colors.secondary} />
        <Text style={styles.loadingTitle}>Re-imagining your space...</Text>
        <Text style={styles.loadingSubtitle}>
          DecoX AI is scanning details and generating shoppable products.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Text style={styles.title}>Redesign Room</Text>

      {/* Upload Box */}
      <View style={styles.photoBoxContainer}>
        {photoUri ? (
          <View style={styles.previewContainer}>
            <Image source={{ uri: photoUri }} style={styles.previewImage} />
            <TouchableOpacity
              style={styles.retakeBtn}
              onPress={() => setPhotoUri(null)}>
              <Text style={styles.retakeBtnText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Text style={styles.placeholderIcon}>📸</Text>
            <Text style={styles.placeholderTitle}>Upload a photo of your space</Text>
            <Text style={styles.placeholderDesc}>
              Make sure the room is well-lit and all major walls/floors are visible.
            </Text>
            <View style={styles.uploadActions}>
              <Button title="Take Photo" onPress={handleTakePhoto} size="medium" />
              <Button
                title="Choose from Library"
                variant="secondary"
                onPress={handlePickLibrary}
                size="medium"
              />
            </View>
          </View>
        )}
      </View>

      {/* Style selector */}
      <View style={styles.styleSection}>
        <Text style={styles.sectionTitle}>Select Redesign Style</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.styleScroll}>
          {designStyles.map((style) => {
            const isSelected = selectedStyle === style.id;
            return (
              <TouchableOpacity
                key={style.id}
                activeOpacity={0.8}
                onPress={() => setSelectedStyle(style.id)}
                style={[styles.styleCard, isSelected && styles.styleCardSelected]}>
                <Text style={styles.styleIcon}>{style.icon}</Text>
                <Text style={[styles.styleName, isSelected && styles.styleNameSelected]}>
                  {style.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Action Button */}
      <Button
        title="Generate Redesign"
        onPress={handleGenerate}
        disabled={!photoUri || !selectedStyle}
        style={styles.generateButton}
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
  photoBoxContainer: {
    width: '100%',
    height: 320,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: spacing.xxl,
  },
  uploadPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  placeholderIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  placeholderTitle: {
    ...typography.titleMedium,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  placeholderDesc: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  uploadActions: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
  },
  previewContainer: {
    flex: 1,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  retakeBtn: {
    position: 'absolute',
    bottom: spacing.md,
    right: spacing.md,
    backgroundColor: colors.overlay,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  retakeBtnText: {
    ...typography.labelLarge,
    color: colors.text.inverse,
  },
  styleSection: {
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    ...typography.titleLarge,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  styleScroll: {
    gap: spacing.md,
  },
  styleCard: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  styleCardSelected: {
    borderColor: colors.secondary,
    borderWidth: 2,
    backgroundColor: colors.surfaceElevated,
  },
  styleIcon: {
    fontSize: 28,
  },
  styleName: {
    ...typography.labelSmall,
    color: colors.text.secondary,
    fontSize: 10,
  },
  styleNameSelected: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  generateButton: {
    marginTop: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  loadingTitle: {
    ...typography.headlineLarge,
    color: colors.text.primary,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  loadingSubtitle: {
    ...typography.bodyLarge,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
