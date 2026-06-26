import "../global.css";

import { useFonts } from "expo-font";

import {
  Fredoka_400Regular,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from "@expo-google-fonts/fredoka";

import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "../src/features/auth/hooks/useAuth";
import { useAuthStore } from "../src/store/auth.store";

function RootNavigator() {
  useAuth();
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#E76F51" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,

    Fredoka_400Regular,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
  });

  if (!fontsLoaded) return null;

  return <RootNavigator />;
}
