import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { usePatientContext } from "@/context/PatientProvider";
import AudioPlayer from "@/components/AudioPlayer";
import Button from "@/components/Button";
import { router } from "expo-router";

const MedicalReport = () => {
  const { patient } = usePatientContext();
  const patients = {
    name: "Sriram",
    age: "21",
    sex: "Male",
    mobNo: "7806828463",
    abhaNo: "1",
    place: "Pudukkottai",
    summary:
      "The patient reports joint pain, especially when bending the knee, though walking is unaffected. The doctor rules out swelling and prescribes medication for pain relief, along with a supplement for joint strength. The patient is advised to take the medication daily and return if the pain persists after a week. The consultation concludes with reassurance, ensuring the patient follows the prescribed treatment for recovery",
  };
  return (
    <SafeAreaView className="h-full">
      <Header pageName={"Summarization"} />
      <ScrollView>
        <View className="bg-white p-4 mx-4 rounded-xl">
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Name:</Text>
            <Text className="text-xl">{patients.name}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Age:</Text>
            <Text className="text-xl">{patients.age}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Sex:</Text>
            <Text className="text-xl">{patients.sex}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Mobile No:</Text>
            <Text className="text-xl">{patients.mobNo}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Place:</Text>
            <Text className="text-xl">{patients.place}</Text>
          </View>
        </View>
        <Text className="text-xl font-imedium ml-4 mt-4">Audio Record</Text>
        {patient.audio && <AudioPlayer uri={patient.audio} />}
        <Text className="text-xl font-imedium ml-4 mb-6">Summary</Text>
        <View className="bg-white p-4 mx-4 rounded-xl ">
          <Text className="text-xl">{patient.summary}</Text>
        </View>
        <View className="items-center my-8">
            <Button title={"New Patient"} handlePress={()=> router.push("/(tabs)/patients")} containerStyles={"min-w-[150]"} titleStyles={"text-white"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalReport;
