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
  const text = `dr_logesh (1.0 : 2.3) : [' வணக்கம் டாக்டர்']
unknown (1.5 : 2.3) : [' வணக்கம் டாக்டர்']
unknown (2.9 : 6.5) : [' வணக்கம் வாங்க உட்காருங்க சொல்லுங்கள் என்ன பிரச்சனை']
dr_logesh (6.8 : 10.1) : [' கொஞ்சம் நாளாக மூட்டு வலியாக இருக்கு டாக்டர் எந்த வேலையும் பார்க்க முடியல']
unknown (10.1 : 11.4) : [' வீக்காக ஏதாச்சும் இருக்கா']
dr_logesh (11.4 : 13.4) : [' இல்ல டாக்டர் வேகோம் லாம் எதுவும் இல்லை']
unknown (14.4 : 16.6) : [' உ்காந்து எந்திரிக்கப்ப வழி இருக்கா']
dr_logesh (16.8 : 20.4) : [' ஆமாம் டாக்டர் நடக்கிறப்போலாம் வழலியில்ல்லை முட்டி மடக்குன தான் வலிக்குது']
unknown (21.5 : 34.6) : [' சரி ஒன்றும் பிரச்சனை இல்லை நான் மருந்து எழுதி தரேன் அதை காலையில் அப்புறம் நைட்டு போட்டுக்கோங்க வலி குறையும் அதோட சத்து மாத்திரையும் எழுதி தரேன் வலி குறையலனா ஒரு வாரம் அப்புறம் வாங்க']
dr_logesh (34.6 : 35.5) : [' ஓகே டாக்டர் தேங்க் யூ']
unknown (35.5 : 35.7) : [' நறி'];
unknown (10.1 : 11.4) : [' வீக்காக ஏதாச்சும் இருக்கா']
dr_logesh (11.4 : 13.4) : [' இல்ல டாக்டர் வேகோம் லாம் எதுவும் இல்லை']
unknown (14.4 : 16.6) : [' உ்காந்து எந்திரிக்கப்ப வழி இருக்கா']
dr_logesh (16.8 : 20.4) : [' ஆமாம் டாக்டர் நடக்கிறப்போலாம் வழலியில்ல்லை முட்டி மடக்குன தான் வலிக்குது']
unknown (21.5 : 34.6) : [' சரி ஒன்றும் பிரச்சனை இல்லை நான் மருந்து எழுதி தரேன் அதை காலையில் அப்புறம் நைட்டு போட்டுக்கோங்க வலி குறையும் அதோட சத்து மாத்திரையும் எழுதி தரேன் வலி குறையலனா ஒரு வாரம் அப்புறம் வாங்க']
dr_logesh (34.6 : 35.5) : [' ஓகே டாக்டர் தேங்க் யூ']
unknown (35.5 : 35.7) : [' நறி']`;
  return (
    <SafeAreaView className="h-full flex-1 bg-bgColor">
      <Header pageName={"Conversation"} />
      <ScrollView className="flex-1 ">
        {patient.audio && <AudioPlayer uri={patient.audio} />}
        <View className="bg-white p-4 mx-4 rounded-xl mb-8 ">
          <Text className="text-xl">{text}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity className="absolute bottom-8 right-6 bg-blue p-4 rounded-[30] items-center shadow-lg" onPress={handleToSummary}>
        <Image source={icons.document} className="w-10 h-10" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Transcription;
