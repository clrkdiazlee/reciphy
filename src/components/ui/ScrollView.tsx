import { ScrollView as RNScrollView, ScrollViewProps } from "react-native";

export function ScrollView(props: ScrollViewProps) {
  return (
    <RNScrollView
      bounces={false}
      alwaysBounceVertical={false}
      alwaysBounceHorizontal={false}
      overScrollMode="never"
      {...props}
    />
  );
}
