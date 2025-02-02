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

const OldPatients = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isFetched, setIsFetched] = useState(false);
  const [fetchedDetails, setFetchedDetails] = useState({
    name: "",
    age: "",
    mobNo: "",
    abhaNo: "",
  });
  const submitting = () => {
    router.push("/(tabs)/home/HealthMetrics");
  };
  const searching = () => {
    console.log(searchValue);
  };
  const fetching = () => {
    setFetchedDetails({ name: "Sriram", age: "23", mobNo: "24", abhaNo: "27" });
    setIsFetched(true);
    console.log(JSON.stringify(fetchedDetails));
  };
  const patients = [
    { id: "1", name: "John Doe", age: "45", date: "2024-01-15" },
    { id: "2", name: "Sriram Ramasamy ", age: "33", date: "2023-12-10" },
  ];

  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Patient Registration"} />
      <ScrollView>
        <View className="justify-center items-center my-4 gap-8">
          <ToggleButton initialValue={false} />
          <Search
            value={searchValue}
            handleChangeText={(e) => setSearchValue(e)}
            handleSearch={searching}
          />
        </View>
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientCardSearch
              name={item.name}
              id={item.age}
              date={item.date}
              handleFetch={fetching}
              buttonName={"Fetch"}
            />
          )}
          ListEmptyComponent={
            <View className="flex justify-center items-center">
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
