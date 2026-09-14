# Habib Hospital

Cross-platform mobile app for Habib Hospital (Karachi) — iOS and Android via Expo / React Native.

## Features

- Brand home with emergency call and appointment CTAs
- Appointment booking with department, doctor, date, and time selection
- Departments directory with detail screens
- Doctors directory with search and profiles
- Contact screen with call, emergency, maps, and email actions
- Local in-app appointment history

## Run locally

```bash
cd habib-hospital
npm install
npm run web      # browser preview
npm run ios     # iOS simulator / Expo Go
npm run android # Android emulator / Expo Go
```

Scan the QR code with Expo Go to try on a physical device.

## Project structure

- `app/` — Expo Router screens (tabs + booking flows)
- `components/` — shared UI
- `constants/` — theme, hospital content, icon helpers
- `context/` — appointment state

## Build for stores

```bash
npx eas build --platform ios
npx eas build --platform android
```
