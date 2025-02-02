import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ title, handlePress, containerStyles, titleStyles }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-blue min-h-[25]  justify-center items-center rounded-xl ${containerStyles} `}
    >
      <Text className={`font-imedium text-lg  p-2  ${titleStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
