import { Redirect } from "expo-router";
import { useAuthStore } from "../src/store/auth.store";

export default function Index() {
  const user = useAuthStore((state) => state.user);

  if (user) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/login" />;
}