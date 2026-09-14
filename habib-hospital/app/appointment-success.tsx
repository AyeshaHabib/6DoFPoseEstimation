import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, IconBadge } from '@/components/ui';
import { departments, doctors } from '@/constants/data';
import { useAppointments } from '@/context/AppointmentsContext';
import { colors, fonts, spacing } from '@/constants/theme';

export default function AppointmentSuccessScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { appointments } = useAppointments();
  const appointment = appointments.find((item) => item.id === id);
  const doctor = doctors.find((item) => item.id === appointment?.doctorId);
  const department = departments.find((item) => item.id === appointment?.departmentId);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <IconBadge name="check-circle" tone="success" size={34} />
        <Text style={styles.title}>Appointment reserved</Text>
        <Text style={styles.copy}>
          {appointment
            ? `${appointment.patientName}, your ${department?.name ?? 'clinic'} visit is set for ${appointment.dateLabel} at ${appointment.time}.`
            : 'Your appointment has been saved in the app.'}
        </Text>
        {doctor ? <Text style={styles.doctor}>with {doctor.name}</Text> : null}
        <Text style={styles.note}>
          Please arrive 15 minutes early and bring a valid ID. For changes, call the hospital desk.
        </Text>
        <Button
          label="View appointments"
          onPress={() => router.replace('/appointments')}
          style={{ marginTop: spacing.lg, alignSelf: 'stretch' }}
        />
        <Button
          label="Back to home"
          variant="secondary"
          onPress={() => router.replace('/')}
          style={{ marginTop: spacing.sm, alignSelf: 'stretch' }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    alignItems: 'center',
  },
  title: {
    marginTop: spacing.lg,
    fontFamily: fonts.display,
    fontSize: 34,
    color: colors.text,
    textAlign: 'center',
  },
  copy: {
    marginTop: spacing.md,
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  doctor: {
    marginTop: spacing.sm,
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.brandMid,
  },
  note: {
    marginTop: spacing.lg,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
