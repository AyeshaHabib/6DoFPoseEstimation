import type { ComponentProps } from 'react';
import type { MaterialCommunityIcons } from '@expo/vector-icons';

import { departmentIcons } from '@/constants/data';

type IconName = ComponentProps<typeof MaterialCommunityIcons>['name'];

const iconMap: Record<keyof typeof departmentIcons, IconName> = {
  pediatrics: 'baby-carriage',
  medicine: 'stethoscope',
  cardiology: 'heart-pulse',
  gynecology: 'human-female',
  dental: 'tooth',
  ophthalmology: 'eye-outline',
  physiotherapy: 'walk',
  dermatology: 'face-man-outline',
  emergency: 'ambulance',
  diagnostics: 'flask-outline',
};

export function getDepartmentIcon(key: keyof typeof departmentIcons): IconName {
  return iconMap[key];
}

const departmentIdToIcon: Record<string, keyof typeof departmentIcons> = {
  pediatrics: 'pediatrics',
  'general-medicine': 'medicine',
  cardiology: 'cardiology',
  gynecology: 'gynecology',
  dental: 'dental',
  optical: 'ophthalmology',
  physiotherapy: 'physiotherapy',
  dermatology: 'dermatology',
  emergency: 'emergency',
  diagnostics: 'diagnostics',
};

export function getIconForDepartmentId(departmentId: string): IconName {
  const key = departmentIdToIcon[departmentId] ?? 'medicine';
  return getDepartmentIcon(key);
}
