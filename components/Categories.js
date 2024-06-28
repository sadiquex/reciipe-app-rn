import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({
  activeCategory,
  handleChangeCategory,
  categories,
}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal // horizontal scroll
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-x-4"
      >
        {categories.map((category, i) => {
          return (
            <TouchableOpacity
              key={i}
              className="flex items-center space-y-1"
              onPress={() => handleChangeCategory(category.strCategory)}
            >
              <View
                className={`rounded-full p-2 ${
                  activeCategory === category.strCategory
                    ? "bg-amber-500"
                    : "bg-black/10"
                }`}
              >
                <Image
                  source={{ uri: category.strCategoryThumb }}
                  style={{
                    width: hp(6),
                    height: hp(6),
                  }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
