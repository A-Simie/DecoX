import React from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { Button } from '../../components/Button';
import type { AuthStackParamList } from '../../navigation/types';

type ChoiceGateNav = NativeStackNavigationProp<AuthStackParamList, 'ChoiceGate'>;

const { height } = Dimensions.get('window');

export function ChoiceGateScreen() {
  const navigation = useNavigation<ChoiceGateNav>();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Image
        source={require('../../assets/images/choice_gate_hero.jpg')}
        style={styles.heroImage}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <Text style={styles.title}>DecoX</Text>

        <View style={styles.actions}>
          <Button
            title="Create an Account"
            onPress={() => navigation.navigate('CreateAccount')}
          />
          <Button
            title="I already have an account"
            variant="secondary"
            onPress={() => navigation.navigate('Login')}
          />
        </View>

        <Text style={styles.legal}>
          By continuing, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and acknowledge
          you've read our <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: height * 0.45,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...typography.displayLarge,
    color: colors.text.primary,
    marginBottom: spacing.xl,
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  legal: {
    ...typography.bodySmall,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    lineHeight: 18,
  },
  link: {
    textDecorationLine: 'underline',
    color: colors.text.primary,
  },
});
