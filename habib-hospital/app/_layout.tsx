import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
} from '@expo-google-fonts/dm-sans';
import {
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from '@expo-google-fonts/fraunces';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AppointmentsProvider } from '@/context/AppointmentsContext';
import { colors } from '@/constants/theme';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppointmentsProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.brand },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontFamily: 'DMSans_700Bold',
              fontSize: 17,
            },
            contentStyle: { backgroundColor: colors.background },
          }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="doctor/[id]"
            options={{ title: 'Doctor profile', presentation: 'card' }}
          />
          <Stack.Screen
            name="department/[id]"
            options={{ title: 'Department', presentation: 'card' }}
          />
          <Stack.Screen
            name="book"
            options={{ title: 'Book appointment', presentation: 'modal' }}
          />
          <Stack.Screen
            name="appointment-success"
            options={{ title: 'Confirmed', presentation: 'modal', headerShown: false }}
          />
        </Stack>
      </AppointmentsProvider>
    </GestureHandlerRootView>
  );
}
