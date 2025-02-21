import React, { useState } from "react";
import Header from "@/components/Header";
import { SafeAreaView, TouchableOpacity, View, Text } from "react-native";
import FormField from "@/components/FormField";
import { router } from "expo-router";

const DoctorDetail = () => {
  const [docName, setDocName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [regNo, setRegNo] = useState("");
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Doctor Details"} />
      <View className="flex items-center">
        <FormField
          title={"Doctor's Name"}
          value={docName}
          placeholder={"Enter Doctor name:"}
          handleChangeText={(e) => setDocName(e)}
          otherStyles={"mt-6"}
        />
        <FormField
          title={"Specialization"}
          value={docName}
          placeholder={"Enter Specialization:"}
          handleChangeText={(e) => setSpecialization(e)}
          otherStyles={"mt-6"}
        />
        <FormField
          title={"Registration Number"}
          value={docName}
          placeholder={"Enter Registration Number:"}
          handleChangeText={(e) => setRegNo(e)}
          otherStyles={"mt-6"}
        />

        <View className="mt-6">
          <TouchableOpacity
            className="m-4 bg-blue p-4 rounded-[25] w-[250] justify-center items-center"
            onPress={() => router.push("/(tabs)/home/DoctorRecording")}
          >
            <Text className="text-white font-imedium text-xl items-center">
              Go To Recording
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorDetail;
