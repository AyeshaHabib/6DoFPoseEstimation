import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button, IconBadge, SectionHeader } from '@/components/ui';
import { doctors } from '@/constants/data';
import { getIconForDepartmentId } from '@/constants/icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function DoctorsScreen() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return doctors;
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(q) ||
        doctor.specialty.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled">
      <SectionHeader
        title="Our doctors"
        subtitle="Find a consultant and book a visit."
      />

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search by name or specialty"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
      />

      <View style={styles.list}>
        {filtered.map((doctor) => (
          <View key={doctor.id} style={styles.card}>
            <Pressable onPress={() => router.push(`/doctor/${doctor.id}`)}>
              <View style={styles.cardTop}>
                <IconBadge name={getIconForDepartmentId(doctor.departmentId)} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{doctor.name}</Text>
                  <Text style={styles.specialty}>{doctor.specialty}</Text>
                </View>
              </View>
              <Text style={styles.meta}>
                {doctor.experience} · {doctor.fee}
              </Text>
              <Text style={styles.availability}>{doctor.availability}</Text>
            </Pressable>
            <Button
              label="View profile"
              variant="secondary"
              onPress={() => router.push(`/doctor/${doctor.id}`)}
              style={{ marginTop: spacing.sm }}
            />
          </View>
        ))}
      </View>
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
  search: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.lg,
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
  },
  cardTop: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    color: colors.text,
  },
  specialty: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.brandMid,
    marginTop: 2,
  },
  meta: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textSecondary,
  },
  availability: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
});
