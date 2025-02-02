import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Button from "./Button";
import icons from "@/constants/icons";

const PatientCardRegistered = ({ name, id, acceptFunc }) => {
  return (
    <View className="flex flex-row justify-around items-center  bg-white p-4 rounded-[10] mx-4 mb-4 ">
      <Text className="font-iregular text-xl w-[30] ">{id}</Text>
      <Text className="font-imedium text-xl w-[100]">{name}</Text>
      <TouchableOpacity onPress={acceptFunc}>
        {<Image
          source={icons.accept}
          className="w-12 h-12"
          resizeMode={"contain"}
        />}
      </TouchableOpacity>
      <TouchableOpacity>
       { <Image
          source={icons.reject}
          className="w-12 h-12"
          resizeMode={"contain"}
        />}
      </TouchableOpacity>
    </View>
  );
};

export default PatientCardRegistered;
