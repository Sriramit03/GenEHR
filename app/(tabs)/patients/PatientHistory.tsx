import { View, Text, SafeAreaView, ScrollView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Button from "@/components/Button";
import { router } from "expo-router";
import { usePatientContext } from "@/context/PatientProvider";
/* import ip from "@/constants/IP" */
import { useIPContext } from "@/context/IPProvider";

const PatientHistory = () => {
  const { patient, setPatient } = usePatientContext();
  const {ip, setIP} = useIPContext();
  const [date, setDate] = useState([]);

  useEffect(()=>{
    pastVisits();
  },[])

  const pastVisits = async () => {
    try {
      const response = await fetch(
        `http://${ip}:8000/visitedDates/${patient.mobNo}/${patient.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setDate([]);
      }
      const data = await response.json();
      setPatient({ ...patient, gender: data.Gender,age:data.Age });
      setDate(data.Visited_Dates);
    } catch (error) {
      console.error("Error fetching patient:", error.message);
    }
  };

  const ToMedicalReport = (d) => {
    setPatient({...patient,date:d})
    console.log(d)
    router.push("/(tabs)/patients/MedicalReport");
  };
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
            <Text className="text-xl">{patient.gender}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Mobile No:</Text>
            <Text className="text-xl">{patient.mobNo}</Text>
          </View>
          {/* <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Place:</Text>
            <Text className="text-xl">{patient.place}</Text>
          </View> */}
        </View>
        <View className="w-full items-center my-4">
          <Button
            title={"Upload Prescription"}
            handlePress={() => router.push("/(tabs)/patients/CameraScreen")}
            containerStyles={"min-w-150"}
            titleStyles={"text-white"}
          />
        </View>
        <View className="  m-4 rounded-xl border-2 border-borderColor">
          <View className="flex flex-row justify-around p-4 border-b border-borderColor bg-[#cde2ea] rounded-t-lg">
            <Text className="text-xl font-imedium ">Date</Text>
            <Text className="text-xl font-imedium">Details</Text>
          </View>
          <FlatList
            data={date}
            keyExtractor={(item) => item.Date}
            renderItem={({ item, index }) => (
              <View
                className={` flex flex-row  justify-around  p-4 items-center ${
                  index !== date.length - 1 && "border-b border-borderColor"
                } `}
              >
                <Text className="text-xl">{item.Date}</Text>
                <View className="items-center">
                  <Button
                    title={"Fetch"}
                    handlePress={()=>ToMedicalReport(item.Date)}
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
