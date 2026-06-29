import { Stack } from "expo-router";

import { SCREEN_CONTENT_STYLE } from "../../src/constants/layout";

export default function RecipeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: SCREEN_CONTENT_STYLE,
      }}
    />
  );
}
