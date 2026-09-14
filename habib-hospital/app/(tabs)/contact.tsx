import { Ionicons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button, SectionHeader } from '@/components/ui';
import { hospital } from '@/constants/data';
import { colors, fonts, radii, spacing } from '@/constants/theme';

export default function ContactScreen() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hospital.address,
  )}`;

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <SectionHeader
        title="Contact Habib"
        subtitle="Reach the hospital desk, emergency line, or visit us in F.B. Area."
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>{hospital.name}</Text>
        <Text style={styles.panelCopy}>{hospital.address}</Text>
        <Text style={styles.panelCopy}>{hospital.hours}</Text>
      </View>

      <View style={styles.actions}>
        <Button
          label="Call hospital"
          icon="call"
          onPress={() => Linking.openURL(`tel:${hospital.phone}`)}
        />
        <Button
          label="Call emergency"
          variant="emergency"
          icon="warning"
          onPress={() => Linking.openURL(`tel:${hospital.emergencyPhone}`)}
        />
        <Button
          label="Open in Maps"
          variant="secondary"
          icon="map"
          onPress={() => Linking.openURL(mapsUrl)}
        />
        <Button
          label="Email care team"
          variant="ghost"
          icon="mail"
          onPress={() => Linking.openURL(`mailto:${hospital.email}`)}
        />
      </View>

      <View style={styles.infoList}>
        {[
          { icon: 'time-outline' as const, label: 'OPD hours', value: '9 AM – 11 PM daily' },
          { icon: 'medkit-outline' as const, label: 'Emergency', value: 'Open 24 hours' },
          { icon: 'location-outline' as const, label: 'Location', value: 'Karimabad, Block 4' },
        ].map((item) => (
          <View key={item.label} style={styles.infoRow}>
            <Ionicons name={item.icon} size={20} color={colors.brandMid} />
            <View>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
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
  panel: {
    backgroundColor: colors.brand,
    borderRadius: radii.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  panelTitle: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  panelCopy: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.88)',
  },
  actions: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  infoList: {
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  infoLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  infoValue: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.text,
    marginTop: 2,
  },
});
