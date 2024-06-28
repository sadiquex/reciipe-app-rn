import { View, Text, ActivityIndicator } from "react-native";

export default function Loading(props) {
  return (
    <View className="flex justify-center items-center">
      <ActivityIndicator size="large" color="#000" {...props} />
    </View>
  );
}
