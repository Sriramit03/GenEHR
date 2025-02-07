import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import React from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router } from "expo-router";

const PatientHistory = () => {
  const patient = {
    name: "Sriram",
    age: "21",
    sex: "Male",
    mobNo: "7806828463",
    abhaNo: "1",
    place: "Pudukkottai",
    summary:
      "The patient reports joint pain, especially when bending the knee, though walking is unaffected. The doctor rules out swelling and prescribes medication for pain relief, along with a supplement for joint strength. The patient is advised to take the medication daily and return if the pain persists after a week. The consultation concludes with reassurance, ensuring the patient follows the prescribed treatment for recovery",
  };

  const ToMedicalReport = () => {
    router.push("/(tabs)/history/MedicalReport");
  };
  const history = [{ date: "21.2.2024" }, { date: "22.3.2024" }];
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Patient History"} />
      <ScrollView>
        <View className="bg-white p-4 mx-4 rounded-xl">
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Name:</Text>
            <Text className="text-xl">{patient.name}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Age:</Text>
            <Text className="text-xl">{patient.age}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Sex:</Text>
            <Text className="text-xl">{patient.sex}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Mobile No:</Text>
            <Text className="text-xl">{patient.mobNo}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Place:</Text>
            <Text className="text-xl">{patient.place}</Text>
          </View>
        </View>
        <View className="w-full items-center my-4">
          <Button title={"Upload Prescription"} handlePress={()=> router.push("/(tabs)/history/CameraScreen")} containerStyles={"min-w-150"} titleStyles={"text-white"} />
        </View>
        <View className="  m-4 rounded-xl border-2 border-borderColor">
          <View className="flex flex-row justify-around p-4 border-b border-borderColor bg-[#cde2ea] rounded-t-lg">
            <Text className="text-xl font-imedium ">Date</Text>
            <Text className="text-xl font-imedium">Details</Text>
          </View>
          <FlatList
            data={history}
            keyExtractor={(item) => item.date}
            renderItem={({ item, index }) => (
              <View
                className={` flex flex-row  justify-around  p-4 items-center ${
                  index !== history.length - 1 && "border-b border-borderColor"
                } `}
              >
                <Text className="text-xl">{item.date}</Text>
                <View className="items-center">
                  <Button
                    title={"Fetch"}
                    handlePress={ToMedicalReport}
                    containerStyles={"min-w-[70]"}
                    titleStyles={"text-white"}
                  />
                </View>
              </View>
            )}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PatientHistory;
