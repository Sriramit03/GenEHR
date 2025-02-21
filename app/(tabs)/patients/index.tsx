import {
  View,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Search from "@/components/Search";
import PatientCardSearch from "@/components/PatientCardSearch";
import { router } from "expo-router";
/* import ip from "@/constants/IP"; */
import { usePatientContext } from "@/context/PatientProvider";
import { useIPContext } from "@/context/IPProvider";

const History = () => {
  const {patient,setPatient} = usePatientContext();
  const {ip, setIP} = useIPContext();
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchTodayExaminedPatients();
  }, []);

  /* Used To search only single patient by mobile number */
  const searchSinglePatient = async () => {
    try {
      const response = await fetch(`http://${ip}:8000/patient/${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setPatients([]);
      }
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patient:", error.message);
    }
  };

  const fetchTodayExaminedPatients = async () => {
    try {
      const response = await fetch(`http://${ip}:8000/patientsExaminedList`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        setPatients([]);
      }
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patient:", error.message);
    }
  };

  /* Get all Examined Patients */
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchTodayExaminedPatients();
    setIsRefreshing(false);
  };

  /* Get all visits and patient information */
  const fetchHistory = (name,id,mobno) =>{
    setPatient({name:name,id:id,mobNo:mobno});
    router.push("/(tabs)/patients/PatientHistory")
  }

  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"History"} />

      <FlatList
        data={patients}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          <PatientCardSearch
            name={item.Name}
            id={item.PatientID}
            date={"27-2-2025"}
            handleFetch={fetchHistory}
            buttonName={"View"}
            mobNo={item.MobileNo}
          />
        )}
        ListHeaderComponent={
          <>
            <View>
              <Text className="text-xl font-imedium my-4 ml-6">
                Search By Mobile Number
              </Text>
              <Search
                value={searchValue}
                handleChangeText={(e) => setSearchValue(e)}
                handleSearch={searchSinglePatient}
              />
            </View>
            <Text className=" my-4 ml-6 items-center justify-center text-xl font-imedium text-blue">
              Clinical Examinations Performed Today
            </Text>
          </>
        }
        ListEmptyComponent={
          <View className="flex justify-center items-center">
            <Text className="font-ibold text-2xl ">No Patients Found</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
      <View className="mx-6 justify-center "></View>
    </SafeAreaView>
  );
};

export default History;
function async() {
  throw new Error("Function not implemented.");
}
