import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Button from "./Button";
import icons from "@/constants/icons";

const PatientCardRegistered = ({ patient, addRecording, cancel }) => {
  return (
    <View className="flex flex-row justify-around items-center  bg-white p-4 rounded-[10] mx-4 mb-4 ">
      <Text className="font-iregular text-xl w-[80] ">{patient.PatientID}</Text>
      <Text className="font-imedium text-xl w-[100]">{patient.Name}</Text>
      <TouchableOpacity onPress={()=> addRecording(patient)}>
        {<Image
          source={icons.accept}
          className="w-12 h-12"
          resizeMode={"contain"}
        />}
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> cancel(patient.MobileNo,patient.Name)}>
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
