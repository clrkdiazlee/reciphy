import { Text as RNText, TextProps } from "react-native";

export function Text({
  className = "font-nunito text-text",
  ...props
}: TextProps & { className?: string }) {
  return <RNText className={className} {...props} />;
}