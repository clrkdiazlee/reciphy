import { View } from "react-native";
import { router } from "expo-router";
import { Text } from "../../src/components/ui/Text";
import { AuthButton } from "../../src/components/ui/AuthButton";

export default function LoginScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-12">
      <Text className="text-5xl text-primary font-fredoka-bold">
        ReciPHy
      </Text>

      <View className="min-w-[340px] gap-10">
        <Text className="text-left font-nunito-semibold text-base">
          Sign up or Login
        </Text>

        <View className="gap-8">
          <AuthButton
            text="Continue with Facebook"
            backgroundColor="#3875E9"
            textColor="#FFFFFF"
            icon={require("../../assets/logos/logo_fb.png")}
          />

          <AuthButton
            text="Continue with Google"
            variant="outlined"
            backgroundColor="#FFFFFF"
            borderColor="#D5D5D5"
            textColor="#949494"
            icon={require("../../assets/logos/logo_google.png")}
          />

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-[#E3E3E3]" />
            <Text className="mx-4 text-[#C9C9C9] font-nunito-medium">or</Text>
            <View className="flex-1 h-px bg-[#E3E3E3]" />
          </View>

          <AuthButton
            text="Continue with Email"
            variant="outlined"
            backgroundColor="#FFFFFF"
            borderColor="#F97316"
            textColor="#F97316"
            onPress={() => router.push("/(auth)/email")}
          />
        </View>
      </View>
    </View>
  );
}