import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon as ArrowRightIconOutlined } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id] {
          ...,
          restaurants[] -> {
            ...,
            dishes[] -> ,
            type -> {
              name
            }
          }
      }[0]
      `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);

  return (
    <View className="pb-2">
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg capitalize">{title}</Text>
        <ArrowRightIconOutlined color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            shortDescription={restaurant.shortDescription}
            dishes={restaurant.dishes}
            longitude={restaurant.lat}
            latitude={restaurant.long}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
