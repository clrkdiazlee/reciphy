import { View, Pressable } from "react-native";
import { Image } from "expo-image";
import { Text } from "../ui/Text";

type AuthButtonProps = {
  text: string;
  variant?: "filled" | "outlined";
  backgroundColor?: string;
  textColor: string;
  borderColor?: string;
  icon?: any;
  onPress?: () => void;
};

export function AuthButton({
  text,
  variant = "filled",
  backgroundColor,
  textColor,
  borderColor,
  icon,
  onPress,
}: AuthButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex-row items-center justify-center rounded-md w-full h-[53px] relative"
        style={{
          backgroundColor,
          borderWidth: variant === "outlined" ? 1 : 0,
          borderColor,
        }}
      >
        {icon && (
          <Image
            source={icon}
            style={{
              width: 26,
              height: 26,
              position: "absolute",
              left: 24,
            }}
            contentFit="contain"
          />
        )}

        <Text
          className="font-nunito-bold"
          style={{ color: textColor }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}