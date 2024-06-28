import { View, Text, Pressable, Image } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import { mealData } from "../dummy-data";
import Animated, { FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, recipes }) {
  //   console.log(recipes.map((recipe, i) => i));

  //   we have access to useNavigation because the Recipes was defined in the screens
  const navigation = useNavigation();

  return (
    <View className="mx-4 space-y-3">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipes
      </Text>
      {/* when the categories is loaded, the masonry vanishes,
      the workaround that is to only show the masonry layout when categories is fully loaded */}
      {categories?.length === 0 ? (
        <Loading size="large" className="mt-20" />
      ) : (
        <MasonryList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecipeCard item={item} index={index} navigation={navigation} />
          )}
          onEndReachedThreshold={0.1}
        />
      )}
    </View>
  );
}

// render each individual recipe
const RecipeCard = ({ item, navigation }) => {
  // i need the index from each renderItem from the Flatlist (MasonryList), but this isn't accurate
  const index = mealData.findIndex(
    (dataItem) => dataItem.strMeal === item.strMeal
  );

  // add padding to only even images
  const isEven = index % 2 === 0;

  return (
    <Animated.View
      entering={
        FadeInDown.delay(index * 100) // delay between each element's animation
          .duration(600) // 600ms to complete the animation
          .springify() // adds a spring effect
          .damping(20) // how quickly the spring stops moving
      }
    >
      <Pressable
        style={{
          width: "100%",
          // add padding to even index elements
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 space-y-1"
        // navigate to recipe details screen
        onPress={() => {
          // pass 'item' to route.params
          navigation.navigate("RecipeDetails", { ...item });
        }}
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            //   adding extra height to every third element in the layout to create the masonry layout
            height: index % 2 === 0 ? hp(20) : hp(35),
            borderRadius: 35,
          }}
          sharedTransitionTag={item.strMealThumb} // supposed to animate to the next screen with the same tag
        />
        <Text
          className="font-semibold ml-2 text-neutral-600"
          style={{
            fontSize: hp(1.5),
          }}
        >
          {
            // slice the item name
            item.strMeal.length >= 20
              ? item.strMeal.slice(0, 20) + "..."
              : item.strMeal
          }
        </Text>
      </Pressable>
    </Animated.View>
  );
};
