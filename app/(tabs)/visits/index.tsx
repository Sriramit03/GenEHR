import {
  View,
  ScrollView,
  Text,
  FlatList,
  RefreshControl,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import PatientCardRegistered from "@/components/PatientCardRegistered";
import { router } from "expo-router";
import { usePatientContext } from "@/context/PatientProvider";
import { useIPContext } from "@/context/IPProvider";

const Patients = () => {
  const { patient, setPatient } = usePatientContext();
  const { ip, setIP } = useIPContext();
  const [date, setDate] = useState({ day: "", nday: 0, mon: "" });
  const [patients, setPatients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const dateObj = new Date();
    setDate({
      day: dateObj.toLocaleString("en-US", { weekday: "long" }),
      nday: dateObj.getDate(),
      mon: dateObj.toLocaleString("en-US", { month: "long" }),
    });
    fetchPatients();
  }, []);

  // Function to fetch patients using axios with https agent
  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://${ip}:8000/registeredpatients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status == 200) {
        const data = await response.json();
        console.log(data);
        setPatients(data.patients);
        console.log(data.patients);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    } finally {
      // Hide loading indicator
      setIsLoading(false);
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

  // function which refreshes and fetches registered patients
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchPatients();
    setIsRefreshing(false);
  };

  /* const cancelPatient = async (mobNo,name) => {
    try {
      console.log(mobNo,name);
      setIsLoading(true);
      const response = await fetch(`http://${ip}:8000/CancelPatient/${mobNo}/${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.status == 200) {
        console.log("Patient Cancelled successfully:", data);
        fetchPatients();
      }
      setIsLoading(false);
    } catch (error) {}
  }; */

  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Registered Patients"} />
      <Modal
        visible={isLoading}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLoading(false)}
      >
        <View className="flex justify-center items-center h-full absolute w-full bg-ctransparent/50 ">
          <ActivityIndicator
            animating={isLoading}
            color="#0D2438"
            size="large"
            className=" "
          />
        </View>
      </Modal>
      <FlatList
        data={patients}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <PatientCardRegistered patient={item} addRecording={GoToRecording} cancel={undefined} />
        )}
        ListEmptyComponent={
          <View className="flex justify-center items-center mt-4">
            <Text className="font-ibold text-2xl ">No Patients Found</Text>
          </View>
        }
        ListHeaderComponent={
          <>
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
          </>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Patients;
