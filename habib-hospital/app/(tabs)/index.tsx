import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect } from 'react';
import {
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, IconBadge, SectionHeader } from '@/components/ui';
import { doctors, hospital, services } from '@/constants/data';
import { getIconForDepartmentId } from '@/constants/icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

const heroImage =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80';

export default function HomeScreen() {
  const brandOpacity = useSharedValue(0);
  const brandY = useSharedValue(18);

  useEffect(() => {
    brandOpacity.value = withDelay(120, withTiming(1, { duration: 700 }));
    brandY.value = withDelay(120, withTiming(0, { duration: 700 }));
  }, [brandOpacity, brandY]);

  const brandStyle = useAnimatedStyle(() => ({
    opacity: brandOpacity.value,
    transform: [{ translateY: brandY.value }],
  }));

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ImageBackground source={{ uri: heroImage }} style={styles.hero} imageStyle={styles.heroImage}>
          <LinearGradient
            colors={['rgba(11,61,58,0.35)', 'rgba(11,61,58,0.88)']}
            style={StyleSheet.absoluteFill}
          />
          <SafeAreaView edges={['top']} style={styles.heroContent}>
            <Animated.View style={brandStyle}>
              <Text style={styles.brandMark}>{hospital.name}</Text>
              <Text style={styles.headline}>{hospital.tagline}</Text>
              <Text style={styles.support}>{hospital.description}</Text>
              <View style={styles.ctaRow}>
                <Button
                  label="Book appointment"
                  icon="calendar"
                  onPress={() => router.push('/book')}
                  style={{ flex: 1 }}
                />
                <Button
                  label="Emergency"
                  variant="emergency"
                  icon="call"
                  onPress={() => Linking.openURL(`tel:${hospital.emergencyPhone}`)}
                  style={{ flex: 1 }}
                />
              </View>
            </Animated.View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.body}>
          <Animated.View entering={FadeInUp.delay(180).duration(500)}>
            <View style={styles.trustRow}>
              {hospital.certifications.map((item) => (
                <View key={item} style={styles.trustChip}>
                  <Text style={styles.trustText}>{item}</Text>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(260).duration(550)}>
            <SectionHeader
              title="Care when you need it"
              subtitle="Emergency readiness, specialist clinics, and diagnostics under one roof."
            />
            <View style={styles.serviceList}>
              {services.map((service) => (
                <View key={service.title} style={styles.serviceRow}>
                  <IconBadge name="check-decagram" tone="accent" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.serviceTitle}>{service.title}</Text>
                    <Text style={styles.serviceDetail}>{service.detail}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(360).duration(550)}>
            <SectionHeader
              title="Featured doctors"
              subtitle="Book with trusted consultants at Habib Hospital."
              actionLabel="See all"
              onAction={() => router.push('/doctors')}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.doctorRail}>
              {doctors.slice(0, 4).map((doctor) => (
                <Pressable
                  key={doctor.id}
                  style={styles.doctorTile}
                  onPress={() => router.push(`/doctor/${doctor.id}`)}>
                  <IconBadge
                    name={getIconForDepartmentId(doctor.departmentId)}
                    tone="brand"
                  />
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
                  <Text style={styles.doctorMeta}>{doctor.availability}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(460).duration(550)} style={styles.visitBlock}>
            <Text style={styles.visitEyebrow}>{hospital.established}</Text>
            <Text style={styles.visitTitle}>Visit us in Karimabad</Text>
            <Text style={styles.visitCopy}>{hospital.address}</Text>
            <Text style={styles.visitCopy}>{hospital.hours}</Text>
            <Button
              label="Get directions & contact"
              variant="secondary"
              icon="navigate"
              onPress={() => router.push('/contact')}
              style={{ marginTop: spacing.md }}
            />
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    minHeight: 520,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  brandMark: {
    fontFamily: fonts.displayBold,
    fontSize: 42,
    lineHeight: 46,
    color: colors.white,
    letterSpacing: -1,
    marginBottom: spacing.sm,
  },
  headline: {
    fontFamily: fonts.bodyMedium,
    fontSize: 18,
    lineHeight: 26,
    color: colors.accentSoft,
    maxWidth: 320,
    marginBottom: spacing.sm,
  },
  support: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.86)',
    maxWidth: 340,
    marginBottom: spacing.lg,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  trustChip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  trustText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.brandMid,
  },
  serviceList: {
    gap: spacing.md,
  },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  serviceTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  serviceDetail: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  doctorRail: {
    gap: spacing.md,
    paddingRight: spacing.md,
  },
  doctorTile: {
    width: 196,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  doctorName: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.text,
  },
  doctorSpecialty: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.brandMid,
  },
  doctorMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  visitBlock: {
    backgroundColor: colors.brand,
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  visitEyebrow: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.accentSoft,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  visitTitle: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  visitCopy: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.88)',
  },
});
