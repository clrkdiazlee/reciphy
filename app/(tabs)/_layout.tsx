import { ActivityIndicator, Pressable, View } from "react-native";
import { Redirect, Tabs, router } from "expo-router";

import { Text } from "../../src/components/ui/Text";
import { signOut } from "../../src/features/auth/api/auth.api";
import { useAuthStore } from "../../src/store/auth.store";

async function handleLogout() {
  await signOut();
  router.replace("/(auth)/login");
}

export default function TabsLayout() {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#E76F51" />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Log out",
          tabBarButton: () => (
            <Pressable
              onPress={handleLogout}
              accessibilityRole="button"
              accessibilityLabel="Log out"
              className="flex-1 items-center justify-center border-l border-[#E3E3E3] px-2"
            >
              <Text className="font-nunito-semibold text-xs text-primary">
                Log out
              </Text>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
