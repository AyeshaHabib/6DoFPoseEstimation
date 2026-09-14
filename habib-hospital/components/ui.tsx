import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { colors, fonts, radii, spacing } from '@/constants/theme';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'emergency' | 'ghost';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  disabled?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  style,
  disabled,
}: ButtonProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        onPress={onPress}
        onPressIn={() => {
          if (Platform.OS !== 'web') {
            scale.value = withSpring(0.97, { damping: 18, stiffness: 320 });
          }
        }}
        onPressOut={() => {
          if (Platform.OS !== 'web') {
            scale.value = withSpring(1, { damping: 18, stiffness: 320 });
          }
        }}
        style={({ pressed }) => [
          styles.button,
          variant === 'primary' && styles.primary,
          variant === 'secondary' && styles.secondary,
          variant === 'emergency' && styles.emergency,
          variant === 'ghost' && styles.ghost,
          disabled && styles.disabled,
          pressed && Platform.OS === 'web' && styles.pressed,
        ]}>
        {icon ? (
          <Ionicons
            name={icon}
            size={18}
            color={
              variant === 'secondary' || variant === 'ghost'
                ? colors.brand
                : colors.white
            }
            style={{ marginRight: 8 }}
          />
        ) : null}
        <Text
          style={[
            styles.label,
            (variant === 'secondary' || variant === 'ghost') && styles.labelDark,
          ]}>
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function SectionHeader({
  title,
  subtitle,
  actionLabel,
  onAction,
}: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {subtitle ? <Text style={styles.sectionSubtitle}>{subtitle}</Text> : null}
      </View>
      {actionLabel && onAction ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

type IconBadgeProps = {
  name: ComponentProps<typeof MaterialCommunityIcons>['name'];
  tone?: 'brand' | 'accent' | 'emergency' | 'success';
  size?: number;
};

export function IconBadge({ name, tone = 'brand', size = 22 }: IconBadgeProps) {
  const toneStyles = {
    brand: { bg: colors.surfaceMuted, fg: colors.brandMid },
    accent: { bg: colors.accentSoft, fg: colors.brand },
    emergency: { bg: colors.emergencySoft, fg: colors.emergency },
    success: { bg: colors.successSoft, fg: colors.success },
  }[tone];

  return (
    <View style={[styles.iconBadge, { backgroundColor: toneStyles.bg }]}>
      <MaterialCommunityIcons name={name} size={size} color={toneStyles.fg} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: radii.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressed: {
    opacity: 0.88,
  },
  primary: {
    backgroundColor: colors.brand,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  emergency: {
    backgroundColor: colors.emergency,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.white,
  },
  labelDark: {
    color: colors.brand,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.4,
  },
  sectionSubtitle: {
    marginTop: 4,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  sectionAction: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.brandMid,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
