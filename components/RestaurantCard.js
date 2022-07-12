import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LocationMarkerIcon, StarIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  shortDescription,
  dishes,
  longitude,
  latitude,
}) => {
  return (
    <TouchableOpacity className="bg-white mr-3 mb-3 shadow rounded-md">
      <Image
        source={{
          uri: urlFor(imgUrl)?.url(),
        }}
        resizeMode="cover"
        className="h-36 w-64 rounded-tl-md rounded-tr-md"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.3} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1 overflow-clip">
          <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
          <Text
            className="text-xs text-gray-500 break-words"
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            Nearby · {address}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
