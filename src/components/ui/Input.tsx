import { forwardRef } from "react";
import {
  TextInput,
  TextInputProps,
  View,
} from "react-native";

import { Text } from "./Text";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerClassName?: string;
};

export const Input = forwardRef<TextInput, InputProps>(function Input(
  {
    label,
    error,
    containerClassName = "",
    className = "",
    ...props
  },
  ref
) {
  return (
    <View className={`gap-1.5 ${containerClassName}`}>
      {label ? (
        <Text className="font-nunito-semibold text-sm text-text">{label}</Text>
      ) : null}

      <TextInput
        ref={ref}
        placeholderTextColor="#C9C9C9"
        className={`h-[53px] rounded-md border px-4 font-nunito text-base text-text ${
          error ? "border-red-500" : "border-[#E3E3E3]"
        } bg-white ${className}`}
        {...props}
      />

      {error ? (
        <Text className="font-nunito text-sm text-red-500">{error}</Text>
      ) : null}
    </View>
  );
});
