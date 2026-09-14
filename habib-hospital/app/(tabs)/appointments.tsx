import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, IconBadge, SectionHeader } from '@/components/ui';
import { departments, doctors } from '@/constants/data';
import { getIconForDepartmentId } from '@/constants/icons';
import { useAppointments } from '@/context/AppointmentsContext';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function AppointmentsScreen() {
  const { appointments } = useAppointments();

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Your visits"
        subtitle="Book a consultation or review upcoming appointments."
      />

      <Button
        label="Book new appointment"
        icon="add-circle"
        onPress={() => router.push('/book')}
        style={{ marginBottom: spacing.lg }}
      />

      {appointments.length === 0 ? (
        <View style={styles.empty}>
          <IconBadge name="calendar-blank" tone="brand" size={28} />
          <Text style={styles.emptyTitle}>No appointments yet</Text>
          <Text style={styles.emptyCopy}>
            Choose a department and doctor to reserve your next visit at Habib Hospital.
          </Text>
        </View>
      ) : (
        <View style={styles.list}>
          {appointments.map((appointment) => {
            const doctor = doctors.find((item) => item.id === appointment.doctorId);
            const department = departments.find((item) => item.id === appointment.departmentId);
            return (
              <View key={appointment.id} style={styles.card}>
                <View style={styles.cardTop}>
                  <IconBadge
                    name={getIconForDepartmentId(appointment.departmentId)}
                    tone="success"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{appointment.patientName}</Text>
                    <Text style={styles.cardMeta}>
                      {department?.name ?? 'Consultation'}
                      {doctor ? ` · ${doctor.name}` : ''}
                    </Text>
                  </View>
                </View>
                <Text style={styles.cardSchedule}>
                  {appointment.dateLabel} · {appointment.time}
                </Text>
                {appointment.reason ? (
                  <Text style={styles.cardReason}>{appointment.reason}</Text>
                ) : null}
              </View>
            );
          })}
        </View>
      )}

      <Pressable style={styles.tip} onPress={() => router.push('/departments')}>
        <Text style={styles.tipTitle}>Not sure who to see?</Text>
        <Text style={styles.tipCopy}>Browse departments to find the right clinic.</Text>
      </Pressable>
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
  empty: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.text,
  },
  emptyCopy: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTop: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.text,
  },
  cardMeta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  cardSchedule: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.brandMid,
  },
  cardReason: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  tip: {
    marginTop: spacing.xl,
    padding: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceMuted,
  },
  tipTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
    marginBottom: 4,
  },
  tipCopy: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
