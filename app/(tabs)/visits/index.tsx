import { View, ScrollView, Text, FlatList, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import PatientCardRegistered from "@/components/PatientCardRegistered";
import { router } from "expo-router";
import ip from "@/constants/IP";
import { usePatientContext } from "@/context/PatientProvider";

const Patients = () => {
  const { patient, setPatient } = usePatientContext();
  const [date, setDate] = useState({ day: "", nday: 0, mon: "" });
  const [patients, setPatients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const dateObj = new Date();
    setDate({
      day: dateObj.toLocaleString("en-US", { weekday: "long" }),
      nday: dateObj.getDate(),
      mon: dateObj.toLocaleString("en-US", { month: "long" }),
    });
    fetchPatients();
  }, []);

  // Function to fetch patients using fetch()
  const fetchPatients = async () => {
    try {
      const response = await fetch(`http://${ip}:8000/registeredpatients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data.patients); // Update state with fetched data
      console.log(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    } finally {
      // Hide loading indicator
    }
  };

  // Function to save the patient details in global Context and Go to recording page
  const GoToRecording = async (Vpatient) => {
    await setPatient({
      ...patient,
      name: Vpatient.Name,
      age: Vpatient.Age,
      mobNo: Vpatient.MobileNo,
      abhaNo: Vpatient.ABHA_id,
    });
    router.push("/(tabs)/visits/Recording");
  };

  // functionwhich refresh and fetch registered patients
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchPatients();
    setIsRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Registered Patients"} />

      <FlatList
        data={patients}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <PatientCardRegistered patient={item} addRecording={GoToRecording} />
        )}
        ListEmptyComponent={
          <View className="flex justify-center items-center mt-4">
            <Text className="font-ibold text-2xl ">No Patients Found</Text>
          </View>
        }
        ListHeaderComponent={
          <View className=" flex-1 flex-row justify-between items-center m-4">
            <View>
              <Text className="font-iregular text-lg pb-1">Hello,</Text>
              <Text className="font-imedium text-xl text-blue">
                Dr. Ramanan
              </Text>
            </View>
            <View className="flex flex-row items-center gap-2">
              <Text className="font-iregular text-[48px]">{date.nday}</Text>
              <View>
                <Text className="font-iregular text-lg ">{date.day}</Text>
                <Text className="font-iregular text-lg ">{date.mon}</Text>
              </View>
            </View>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Patients;
