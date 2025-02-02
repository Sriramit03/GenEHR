import { View, Text, ScrollView, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import Search from "@/components/Search";
import PatientCardSearch from "@/components/PatientCardSearch";
import { router } from "expo-router";

const History = () => {
  const patients = [
    { id: "1", name: "John Doe", age: "45", date: "2024-01-15" },
    { id: "2", name: "Sriram Ramasamy ", age: "33", date: "2023-12-10" },
  ];
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"History"} />
      <ScrollView>
        <View>
          <Text className="text-xl font-imedium my-4 ml-6">
            Search By Mobile Number
          </Text>
          <Search
            value={undefined}
            handleChangeText={undefined}
            handleSearch={undefined}
          />
        </View>
        <Text className=" my-4 ml-6 items-center justify-center text-xl font-imedium text-blue">
          Clinical Examinations Performed Today
        </Text>
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientCardSearch
              name={item.name}
              id={item.age}
              date={item.date}
              handleFetch={() => router.push("/(tabs)/history/PatientHistory")} buttonName={"View"}            />
          )}
          ListEmptyComponent={
            <View className="flex justify-center items-center">
              <Text className="font-ibold text-2xl ">No Patients Found</Text>
            </View>
          }
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default History;
