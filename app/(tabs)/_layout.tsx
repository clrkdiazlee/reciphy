import { ActivityIndicator, Pressable, View } from "react-native";
import { Redirect, Tabs, router } from "expo-router";
import { Image } from "expo-image";
import { SCREEN_CONTENT_STYLE } from "../../src/constants/layout";
import { Text } from "../../src/components/ui/Text";
import { signOut } from "../../src/features/auth/api/auth.api";
import { useAuthStore } from "../../src/store/auth.store";

const TAB_ICON_SIZE = 26;
const ADD_ICON_SIZE = 32;

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
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: SCREEN_CONTENT_STYLE,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/icon_home.png")}
              style={{ width: TAB_ICON_SIZE, height: TAB_ICON_SIZE }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/icon_recipe.png")}
              style={{ width: TAB_ICON_SIZE, height: TAB_ICON_SIZE }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          tabBarShowLabel: false,
          tabBarLabel: () => null,
          tabBarAccessibilityLabel: "Add",
          tabBarButton: ({ children: _children, style, onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              accessibilityState={accessibilityState}
              accessibilityRole="button"
              accessibilityLabel="Add"
              style={style}
              className="flex-1 items-center justify-center"
            >
              <Image
                source={require("../../assets/icons/icon_add.png")}
                style={{ width: ADD_ICON_SIZE, height: ADD_ICON_SIZE }}
                contentFit="contain"
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/icon_favorites.png")}
              style={{ width: TAB_ICON_SIZE, height: TAB_ICON_SIZE }}
              contentFit="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/icons/icon_profile.png")}
              style={{ width: TAB_ICON_SIZE, height: TAB_ICON_SIZE }}
              contentFit="contain"
            />
          ),
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


