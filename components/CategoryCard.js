import { TouchableOpacity, View, Text, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-32 w-32 rounded-md"
      />
      <View
        className="absolute h-full w-full rounded-md"
        style={{
          background: "linear-gradient(transparent 50%,#000000)",
        }}
      />
      <Text className="absolute bottom-2 left-2 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
