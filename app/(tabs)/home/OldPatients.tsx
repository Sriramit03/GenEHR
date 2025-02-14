import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ToggleButton from "@/components/ToggleButton";
import Search from "@/components/Search";
import PatientCardSearch from "@/components/PatientCardSearch";
import PatientDetail from "@/components/PatientDetail";
import Button from "@/components/Button";
import { router } from "expo-router";
import ip from "@/constants/IP";
import { usePatientContext } from "@/context/PatientProvider";

const OldPatients = () => {
  const { patient, setPatient } = usePatientContext();
  const [searchValue, setSearchValue] = useState("");
  const [patients, setPatients] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [fetchedDetails, setFetchedDetails] = useState({});
  const submitting = () => {
    setPatient({
      ...patient,
      mobNo: fetchedDetails.PatientRegistration.MobileNo,
    });
    router.push("/(tabs)/home/HealthMetrics");
  };
  const searchPatients = async () => {
    try {
      setIsFetched(false);
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
 

  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Patient Registration"} />
      <ScrollView>
        <View className="justify-center items-center my-4 gap-8">
          <ToggleButton initialValue={false} />
          <Search
            value={searchValue}
            handleChangeText={(e) => setSearchValue(e)}
            handleSearch={searchPatients}
          />
        </View>
        <FlatList
          data={patients}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => (
            <PatientCardSearch
              name={item.Name}
              id={item.Age}
              date="11/02/2025"
              handleFetch={() => {
                setFetchedDetails(item);
                setIsFetched(true);
              }}
              buttonName={"Fetch"}
            />
          )}
          ListEmptyComponent={
            <View className="flex justify-center items-center mt-4">
              <Text className="font-ibold text-2xl ">No Patients Found</Text>
            </View>
          }
          scrollEnabled={false}
        />
        {isFetched && (
          <View className="w-full">
            <PatientDetail patient={fetchedDetails} />
            <View className="w-full justify-center items-center">
              <Button
                title={"Next"}
                handlePress={submitting}
                containerStyles={"min-w-[100]"}
                titleStyles={"text-white"}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OldPatients;
