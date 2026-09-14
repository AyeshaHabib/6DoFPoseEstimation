import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button, SectionHeader } from '@/components/ui';
import { departments, doctors, timeSlots } from '@/constants/data';
import { useAppointments } from '@/context/AppointmentsContext';
import { colors, fonts, radii, spacing } from '@/constants/theme';

function upcomingDates(count = 7) {
  const dates: { key: string; label: string }[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i += 1) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);
    dates.push({
      key: date.toISOString().slice(0, 10),
      label: date.toLocaleDateString('en-PK', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    });
  }
  return dates;
}

export default function BookScreen() {
  const params = useLocalSearchParams<{ doctorId?: string; departmentId?: string }>();
  const { addAppointment } = useAppointments();
  const dates = useMemo(() => upcomingDates(), []);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [departmentId, setDepartmentId] = useState(params.departmentId ?? departments[0].id);
  const [doctorId, setDoctorId] = useState(params.doctorId);
  const [dateKey, setDateKey] = useState(dates[0]?.key);
  const [time, setTime] = useState(timeSlots[2]);
  const [reason, setReason] = useState('');

  const departmentDoctors = doctors.filter((doctor) => doctor.departmentId === departmentId);
  const selectedDate = dates.find((date) => date.key === dateKey);
  const canSubmit = patientName.trim().length > 1 && phone.trim().length >= 10 && !!dateKey && !!time;

  const onSubmit = () => {
    if (!canSubmit || !selectedDate) return;
    const appointment = addAppointment({
      patientName: patientName.trim(),
      phone: phone.trim(),
      departmentId,
      doctorId: doctorId || undefined,
      dateLabel: selectedDate.label,
      time,
      reason: reason.trim(),
    });
    router.replace({
      pathname: '/appointment-success',
      params: { id: appointment.id },
    });
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Book a visit"
        subtitle="Share a few details and we will hold your preferred slot."
      />

      <Text style={styles.label}>Patient name</Text>
      <TextInput
        value={patientName}
        onChangeText={setPatientName}
        placeholder="Full name"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Mobile number</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="03XX XXXXXXX"
        keyboardType="phone-pad"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Department</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {departments
          .filter((item) => item.id !== 'emergency')
          .map((department) => {
            const active = department.id === departmentId;
            return (
              <Pressable
                key={department.id}
                onPress={() => {
                  setDepartmentId(department.id);
                  setDoctorId(undefined);
                }}
                style={[styles.chip, active && styles.chipActive]}>
                <Text style={[styles.chipText, active && styles.chipTextActive]}>
                  {department.name}
                </Text>
              </Pressable>
            );
          })}
      </ScrollView>

      {departmentDoctors.length > 0 ? (
        <>
          <Text style={styles.label}>Doctor (optional)</Text>
          <View style={styles.stack}>
            {departmentDoctors.map((doctor) => {
              const active = doctor.id === doctorId;
              return (
                <Pressable
                  key={doctor.id}
                  onPress={() => setDoctorId(active ? undefined : doctor.id)}
                  style={[styles.option, active && styles.optionActive]}>
                  <Text style={styles.optionTitle}>{doctor.name}</Text>
                  <Text style={styles.optionMeta}>
                    {doctor.specialty} · {doctor.fee}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </>
      ) : null}

      <Text style={styles.label}>Preferred date</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {dates.map((date) => {
          const active = date.key === dateKey;
          return (
            <Pressable
              key={date.key}
              onPress={() => setDateKey(date.key)}
              style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{date.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Text style={styles.label}>Time slot</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map((slot) => {
          const active = slot === time;
          return (
            <Pressable
              key={slot}
              onPress={() => setTime(slot)}
              style={[styles.timeChip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{slot}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Reason for visit</Text>
      <TextInput
        value={reason}
        onChangeText={setReason}
        placeholder="Briefly describe symptoms or request"
        placeholderTextColor={colors.textMuted}
        multiline
        style={[styles.input, styles.textarea]}
      />

      <Button
        label="Confirm appointment"
        icon="checkmark-circle"
        onPress={onSubmit}
        disabled={!canSubmit}
        style={{ marginTop: spacing.md }}
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
  label: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.text,
  },
  textarea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  chips: {
    gap: spacing.sm,
    paddingRight: spacing.md,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
  },
  stack: {
    gap: spacing.sm,
  },
  option: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.md,
  },
  optionActive: {
    borderColor: colors.brandSoft,
    backgroundColor: colors.surfaceMuted,
  },
  optionTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
  },
  optionMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textSecondary,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  timeChip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '31%',
    alignItems: 'center',
  },
});
