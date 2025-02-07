import { View, ScrollView, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import PatientCardRegistered from "@/components/PatientCardRegistered";
import { router } from "expo-router";

const Patients = () => {
  const [date, setDate] = useState({ day: "", nday: 0, mon: "" });
  useEffect(() => {
    const dateObj = new Date();
    setDate({
      day: dateObj.toLocaleString("en-US", { weekday: "long" }),
      nday: dateObj.getDate(),
      mon: dateObj.toLocaleString("en-US", { month: "long" }),
    });
  }, []);
  const patients = [
    { id: "1", name: "John Doe", age: "45", date: "2024-01-15" },
    { id: "2", name: "Jane Smith candes", age: "33", date: "2023-12-10" },
  ];
  const acceptFunc = () => {
    router.push("/(tabs)/visits/Recording");
  };
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Registered Patients"} />
      <ScrollView>
        <View className=" flex-1 flex-row justify-between items-center m-4">
          <View>
            <Text className="font-iregular text-lg pb-1">Hello,</Text>
            <Text className="font-imedium text-xl text-blue">Dr. Ramanan</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Text className="font-iregular text-[48px]">{date.nday}</Text>
            <View>
              <Text className="font-iregular text-lg ">{date.day}</Text>
              <Text className="font-iregular text-lg ">{date.mon}</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PatientCardRegistered
              name={item.name}
              id={item.age}
              acceptFunc={acceptFunc}
            />
          )}
          ListEmptyComponent={
            <View className="flex justify-center items-center mt-4">
              <Text className="font-ibold text-2xl ">No Patients Found</Text>
            </View>
          }
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Patients;
