import { ActivityIndicator, Pressable, PressableProps } from "react-native";

import { Text } from "./Text";

type ButtonProps = PressableProps & {
  title: string;
  variant?: "primary" | "outline";
  loading?: boolean;
};

export function Button({
  title,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps & { className?: string }) {
  const isDisabled = disabled || loading;
  const isPrimary = variant === "primary";

  return (
    <Pressable
      disabled={isDisabled}
      className={`h-[53px] items-center justify-center rounded-md ${
        isPrimary ? "bg-primary" : "border border-primary bg-white"
      } ${isDisabled ? "opacity-60" : ""} ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#FFFFFF" : "#E76F51"} />
      ) : (
        <Text
          className={`font-nunito-bold text-base ${
            isPrimary ? "text-white" : "text-primary"
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
