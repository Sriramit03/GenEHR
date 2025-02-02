import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Link, router, Tabs } from "expo-router";
import { Route } from "expo-router/build/Route";

const index = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/(tabs)/home");
    }, 1000); 
    return () => clearTimeout(timer);
  });
  return (
    <View className="flex justify-center items-center h-full">
      <Text className="font-ibold text-2xl">GenEHR</Text>
      <Link href={"/(tabs)/home"} className="m-4">Go to Home</Link>
    </View>
  );
};

export default index;
