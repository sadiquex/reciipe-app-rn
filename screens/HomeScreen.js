import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getFoodCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // receives categoryName as arg and gets the recipes in that category
  const getRecipesByCategory = async (activeCategory) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`
      );
      setRecipes(response.data.meals);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getRecipesByCategory(activeCategory); // the the meals from the active category
    getFoodCategories(); // get all meal categories
  }, []);

  // do all these things when the category changes
  const handleChangeCategory = (categoryName) => {
    setActiveCategory(categoryName);
    getRecipesByCategory(categoryName);
    setRecipes([]); // reinitialize recipes
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 mb-2 flex-row justify-between items-center">
          <Image
            source={require("../assets/images/avatar.png")}
            style={{
              height: hp(5),
              width: hp(5),
            }}
          />
          <BellIcon size={hp(4)} color={"gray"} />
        </View>

        {/* greeting and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Saddik
          </Text>
          <View>
            <Text
              className="font-semibold text-neutral-600"
              style={{ fontSize: hp(3.8) }}
            >
              Make your own food
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search a recipe..."
            placeholderTextColor={"gray"}
            style={{
              fontSize: hp(1.7),
            }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* only show when the categories are available */}
        <View>
          {categories?.length > 0 && (
            <Categories
              handleChangeCategory={handleChangeCategory}
              activeCategory={activeCategory}
              categories={categories}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes
            categories={categories}
            activeCategory={activeCategory}
            recipes={recipes}
          />
        </View>
      </ScrollView>
    </View>
  );
}
