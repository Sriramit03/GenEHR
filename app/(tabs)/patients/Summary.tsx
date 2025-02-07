import { View, Text, ScrollView, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { usePatientContext } from "@/context/PatientProvider";
import AudioPlayer from "@/components/AudioPlayer";
import Button from "@/components/Button";
import { router } from "expo-router";
import CustomAlertBox from "@/components/CustomAlertBox";

const Summary = () => {
  const { patient } = usePatientContext();
  const [modalVisible, setModalVisible] = useState(false);
  const patients = {
    name: "Sriram",
    age: "21",
    sex: "Male",
    mobNo: "7806828463",
    abhaNo: "1",
    place: "Pudukkottai",
    summary:
      "The patient reports joint pain, especially when bending the knee, though walking is unaffected. The doctor rules out swelling and prescribes medication for pain relief, along with a supplement for joint strength. The patient is advised to take the medication daily and return if the pain persists after a week. The consultation concludes with reassurance, ensuring the patient follows the prescribed treatment for recovery",
    spo2: "120",
    bp: "140",
    pr: "130",
    temp: "46",
    wg: "76",
    co: ["Fever", "Cough", "Abdominal Pain", "Vomiting"],
  };
  const handleSave = () => {
    setModalVisible(true);
  };
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Summarization"} />
      <ScrollView>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <CustomAlertBox
            message={"Successfully Saved 😊 "}
            closeFunc={() => setModalVisible(false)}
            buttonName={"Next Patient"}
            buttonFunc={() => {
              setModalVisible(false);
              router.push("/(tabs)/patients");
            }}
          />
        </Modal>
        <View className="bg-white p-4 mx-4 rounded-xl">
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Name:</Text>
            <Text className="text-xl font-iregular">{patients.name}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Age:</Text>
            <Text className="text-xl font-iregular">{patients.age}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Sex:</Text>
            <Text className="text-xl font-iregular">{patients.sex}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Mobile No:</Text>
            <Text className="text-xl font-iregular">{patients.mobNo}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Place:</Text>
            <Text className="text-xl font-iregular">{patients.place}</Text>
          </View>
        </View>
        <Text className="text-xl font-imedium ml-4 mt-4">Audio Record</Text>
        {patient.audio && <AudioPlayer uri={patient.audio} />}
        <Text className="text-xl font-imedium ml-4 my-6">C/O</Text>
        <View className="justify-center p-4 mx-4 rounded-xl bg-white items-center">
          <Text className="text-xl font-iregular mb-4">
            {" "}
            {patients.co.join(", ")}
          </Text>
        </View>

        <Text className="text-xl font-imedium ml-4 my-6">Health Metrics</Text>
        <View className="flex flex-row justify-around  p-4 mx-4 rounded-xl bg-white mb-6">
          <View>
            <Text className="text-xl font-imedium mb-4">Spo2: </Text>
            <Text className="text-xl font-imedium mb-4">BP: </Text>
            <Text className="text-xl font-imedium mb-4">PR: </Text>
            <Text className="text-xl font-imedium mb-4">Temperature: </Text>
            <Text className="text-xl font-imedium mb-4">Weight: </Text>
          </View>
          <View className="ml-4">
            <Text className="text-xl font-iregular mb-4">{patients.spo2}</Text>
            <Text className="text-xl font-iregular mb-4">{patients.bp}</Text>
            <Text className="text-xl font-iregular mb-4">{patients.pr}</Text>
            <Text className="text-xl font-iregular mb-4">{patients.temp}</Text>
            <Text className="text-xl font-iregular mb-4">{patients.wg}</Text>
          </View>
        </View>

        <Text className="text-xl font-imedium ml-4 mb-6">Summary</Text>
        <View className="bg-white p-4 mx-4 rounded-xl ">
          <Text className="text-xl">{patients.summary}</Text>
        </View>
        <View className="items-center my-8">
          <Button
            title={"Save"}
            handlePress={handleSave}
            containerStyles={"min-w-[80]"}
            titleStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Summary;
