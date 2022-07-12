import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  UserIcon as UserIconOutlined,
  ChevronDownIcon as ChevronDownIconOutlined,
  SearchIcon as SearchIconOutlined,
  AdjustmentsIcon as AdjustmentsOutlined,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
  // useNavigation lets us access the header of the app
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"] {
            ...,
            restaurants[] -> {
              ...,
              dishes[] -> ,
               }
            }
        `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);


  return (
    <SafeAreaView className="bg-white pt-5">
      {/* Header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image
          source={{
            uri: "https://res.cloudinary.com/manavkaushal/image/upload/v1657286439/Projects/deliveroo_clone/icons/delivery_guy_pq7qmv.png",
          }}
          className="w-7 h-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location{" "}
            <ChevronDownIconOutlined color="#00CCBB" size={20} />
          </Text>
        </View>
        <UserIconOutlined color="#00CCBB" size={35} />
      </View>

      {/* SearchBar */}
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <SearchIconOutlined color="gray" size={20} />
          <TextInput placeholder="Search Restaurants" keyboardType="default" />
        </View>
        <AdjustmentsOutlined color="#00CCBB" size={24} />
      </View>

      {/* Body */}
      <ScrollView>
        {/* Categories */}
        <Categories />
        {/* Featured Rows */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.shortDescription}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
