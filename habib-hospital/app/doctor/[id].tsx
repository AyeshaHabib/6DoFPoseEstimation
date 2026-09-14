import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, IconBadge } from '@/components/ui';
import { departments, doctors } from '@/constants/data';
import { getIconForDepartmentId } from '@/constants/icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function DoctorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const doctor = doctors.find((item) => item.id === id);
  const department = departments.find((item) => item.id === doctor?.departmentId);

  if (!doctor) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Doctor not found.</Text>
        <Button label="Back to doctors" onPress={() => router.replace('/doctors')} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <IconBadge name={getIconForDepartmentId(doctor.departmentId)} size={28} />
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.department}>{department?.name}</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Experience</Text>
          <Text style={styles.statValue}>{doctor.experience}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Fee</Text>
          <Text style={styles.statValue}>{doctor.fee}</Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Availability</Text>
      <Text style={styles.body}>{doctor.availability}</Text>

      <Text style={styles.sectionLabel}>About</Text>
      <Text style={styles.body}>{doctor.bio}</Text>

      <Text style={styles.sectionLabel}>Languages</Text>
      <Text style={styles.body}>{doctor.languages.join(' · ')}</Text>

      <Button
        label="Book with this doctor"
        icon="calendar"
        onPress={() =>
          router.push({
            pathname: '/book',
            params: { doctorId: doctor.id, departmentId: doctor.departmentId },
          })
        }
        style={{ marginTop: spacing.xl }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  name: {
    fontFamily: fonts.display,
    fontSize: 30,
    color: colors.text,
    letterSpacing: -0.5,
  },
  specialty: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.brandMid,
  },
  department: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.textSecondary,
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  statLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    marginTop: 4,
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.text,
  },
  sectionLabel: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.text,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  missing: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  missingText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
  },
});
