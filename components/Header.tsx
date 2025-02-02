import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "@/constants/icons";
import { router, useNavigation } from "expo-router";

const Header = ({pageName}) => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row items-center gap-8 m-4">
      <TouchableOpacity
      onPress={()=>(navigation.goBack())}
      >
        <Image source={icons.arrow} resizeMode="contain" className="w-6 h-6" />
      </TouchableOpacity>
      <Text className="text-2xl font-ibold text-black">
        {pageName}
      </Text>
    </View>
  );
};

export default Header;
