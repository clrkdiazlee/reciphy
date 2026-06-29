import { Stack } from "expo-router";

import { SCREEN_CONTENT_STYLE } from "../../src/constants/layout";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: SCREEN_CONTENT_STYLE,
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="email" options={{ title: "Email Login" }} />
      <Stack.Screen name="register" options={{ title: "Register" }} />
    </Stack>
  )
}