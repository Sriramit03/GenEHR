import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, router, Tabs } from "expo-router";

const index = () => {
  return (
    <View className="h-full bg-bgColor items-center">
      <View className="items-center justify-center h-full">
        <View className="flex items-center justify-center">
          <Text className="font-imedium text-4xl text-blue">GenEHR</Text>
        </View>
        <View>
          <Text className="text-xl mx-[10%] mt-4 font-iregular">
            " The best way to find yourself is to lose yourself in the service
            of others."
          </Text>
          <View className="flex items-end">
            <Text className=" font-imedium text-xl m-2 ">- Mahatma Gandhi</Text>
          </View>
        </View>
      </View>
      <View className="items-center absolute bottom-4">
        <TouchableOpacity
          className="m-4 bg-blue p-4 rounded-[25] w-[250] justify-center items-center"
          onPress={() => router.push("/(tabs)/home")}
        >
          <Text className="text-white font-imedium text-xl items-center">
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default index;
