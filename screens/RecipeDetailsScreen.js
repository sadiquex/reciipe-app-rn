import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon, Square3Stack3DIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubePlayer from "react-native-youtube-iframe";

export default function RecipeDetailsScreen({ route, navigation }) {
  const item = route.params;

  const [isFavourite, setIsFavourite] = useState(false);
  const [mealData, setMealData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipeData = async (id) => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        setMealData(response.data.meals[0]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getRecipeData(item.idMeal);
  }, []);

  const getYoutubeVideoId = (videoUrl) => {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = videoUrl.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  };

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style="light" />
      <View className="flex-row justify-center">
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            marginTop: 4,
          }}
          sharedTransitionTag={item.strMealThumb} // animate from the previous screen with the same tag (Recipes screen)
        />
      </View>

      {/* back button */}
      <View className="w-full absolute px-4 flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      {/* meal description */}
      {isLoading ? (
        <Loading />
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          {/* name and area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="text-neutral-700 font-bold flex-1"
            >
              {mealData?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="text-neutral-500 font-medium flex-1"
            >
              {mealData?.strArea}
            </Text>
          </View>
          {/* other info */}
          <View className="flex-row justify-around">
            {/* time */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2.4) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  mins
                </Text>
              </View>
            </View>

            {/* servings */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2.4) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>

            {/* calories */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2.4) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Calories
                </Text>
              </View>
            </View>

            {/* ease to cook */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color={"#525252"}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2.4) }}
                  className="font-bold text-neutral-700"
                >
                  {/* 35 */}
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* ingredient */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-4 ml-3">
              {/* Iterate through ingredients and measures */}
              {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                const ingredient = mealData[`strIngredient${index}`];
                const measure = mealData[`strMeasure${index}`];

                // Render ingredient only if it exists
                if (ingredient && ingredient.trim() !== "") {
                  return (
                    <Text key={index} style={{ fontSize: hp(2) }}>
                      {measure} {ingredient}
                    </Text>
                  );
                } else {
                  return null;
                }
              })}
            </View>
          </View>

          {/* instructions */}
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>

            <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
              {mealData?.strInstructions}
            </Text>
          </View>

          {/* youtube video */}
          {mealData.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Recipe video
              </Text>
              {/* video */}
              <View>
                <YoutubePlayer
                  height={hp(30)}
                  videoId={getYoutubeVideoId(mealData.strYoutube)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
