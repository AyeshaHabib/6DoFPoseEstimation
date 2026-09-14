import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, IconBadge } from '@/components/ui';
import { departments, doctors } from '@/constants/data';
import { getDepartmentIcon } from '@/constants/icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function DepartmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const department = departments.find((item) => item.id === id);
  const relatedDoctors = doctors.filter((item) => item.departmentId === id);

  if (!department) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Department not found.</Text>
        <Button label="Back" onPress={() => router.replace('/departments')} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <IconBadge
          name={getDepartmentIcon(department.icon)}
          tone={department.id === 'emergency' ? 'emergency' : 'brand'}
          size={28}
        />
        <Text style={styles.name}>{department.name}</Text>
        <Text style={styles.summary}>{department.summary}</Text>
      </View>

      <Text style={styles.sectionLabel}>About this department</Text>
      <Text style={styles.body}>{department.description}</Text>

      <Text style={styles.sectionLabel}>Doctors</Text>
      {relatedDoctors.length === 0 ? (
        <Text style={styles.body}>Consultants available on request via hospital desk.</Text>
      ) : (
        <View style={styles.list}>
          {relatedDoctors.map((doctor) => (
            <View key={doctor.id} style={styles.doctorRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorMeta}>{doctor.availability}</Text>
              </View>
              <Button
                label="Book"
                variant="secondary"
                onPress={() =>
                  router.push({
                    pathname: '/book',
                    params: { doctorId: doctor.id, departmentId: department.id },
                  })
                }
                style={{ paddingHorizontal: 16, minHeight: 44 }}
              />
            </View>
          ))}
        </View>
      )}

      <Button
        label="Book in this department"
        icon="calendar"
        onPress={() =>
          router.push({
            pathname: '/book',
            params: { departmentId: department.id },
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
  },
  summary: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
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
  list: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  doctorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  doctorName: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
  },
  doctorMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
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
