import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { IconBadge, SectionHeader } from '@/components/ui';
import { departments } from '@/constants/data';
import { getDepartmentIcon } from '@/constants/icons';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function DepartmentsScreen() {
  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Departments"
        subtitle="Multispecialty clinics for the whole family."
      />
      <View style={styles.list}>
        {departments.map((department) => (
          <Pressable
            key={department.id}
            style={styles.row}
            onPress={() => router.push(`/department/${department.id}`)}>
            <IconBadge
              name={getDepartmentIcon(department.icon)}
              tone={department.id === 'emergency' ? 'emergency' : 'brand'}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{department.name}</Text>
              <Text style={styles.summary}>{department.summary}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
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
  list: {
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.text,
    marginBottom: 2,
  },
  summary: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: 28,
    color: colors.textMuted,
    marginTop: -4,
  },
});
