import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { usePatientContext } from "@/context/PatientProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import AudioPlayer from "@/components/AudioPlayer";
import Header from "@/components/Header";
import icons from "@/constants/icons";
import { router } from "expo-router";

const Transcription = () => {
  const { patient } = usePatientContext();
  const handleToSummary = () =>{
    router.push("/(tabs)/visits/Summary");
  }

  return (
    <SafeAreaView className="h-full flex-1 bg-bgColor">
      <Header pageName={"Conversation"} />
      <ScrollView className="flex-1 ">
        {patient.audio && <AudioPlayer uri={patient.audio} />}
        <View className="bg-white p-4 mx-4 rounded-xl mb-8 ">
          <Text className="text-xl">{patient.transcription}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-8 right-6 bg-blue p-4 rounded-[30] items-center shadow-lg" onPress={handleToSummary}>
        <Image source={icons.document} className="w-10 h-10" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Transcription;
