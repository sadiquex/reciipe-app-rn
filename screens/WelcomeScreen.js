import { StatusBar } from "expo-status-bar";
import { View, Text, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen"; // for responsive styles across devices
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const outerRingPadding = useSharedValue(0);
  const innerRingPadding = useSharedValue(0);

  const navigation = useNavigation();

  //   add padding to the rings when component mounts
  useEffect(() => {
    // initialize it to 0 when the component mounts to prevent the padding from increasing everytime
    outerRingPadding.value = 0; // .value comes from the useSharedValue
    innerRingPadding.value = 0;

    setTimeout(() => {
      // withSpring adds spring animation to the paddings
      innerRingPadding.value = withSpring(innerRingPadding.value + hp(5));
    }, 100); // add spring padding after 100ms
    setTimeout(() => {
      outerRingPadding.value = withSpring(outerRingPadding.value + hp(5));
    }, 300);

    // go to the homepage after 2.5s
    setTimeout(() => {
      navigation.navigate("Home");
    }, 2500);
  }, []);

  return (
    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />

      {/* logo image */}
      <Animated.View
        className="bg-white/20 rounded-full"
        style={{ padding: outerRingPadding }}
      >
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: innerRingPadding }}
        >
          <Image
            source={require("../assets/images/welcome.png")}
            style={{
              width: hp(20), // make the aspect ratio of the picture stay the same (hp for width)
              height: hp(20),
            }}
          />
        </Animated.View>
      </Animated.View>

      {/* title and tagline */}
      <View className="flex items-center">
        <Text
          className="font-extrabold text-white tracking-widest"
          style={{ fontSize: hp(7) }}
        >
          Foody
        </Text>
        <Text
          className="font-bold text-white tracking-widest"
          style={{ fontSize: hp(3) }}
        >
          Food is always right
        </Text>
      </View>
    </View>
  );
}
