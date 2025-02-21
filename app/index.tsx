import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useIPContext } from "@/context/IPProvider";
import FormField from "@/components/FormField";

const index = () => {
  const { ip, setIP } = useIPContext();
  const [temp, setTemp] = useState("");

  const saveIP = async () => {
    if (temp !== "") {
      await setIP(temp);
    }
  };

  const handleGetStarted = () => {
    if (ip !== "") {
      router.push("/(tabs)/home");
    } else {
      Alert.alert("Error", "Please enter IP address");
    }
  };

  return (
    <View className="h-full bg-bgColor items-center">
      <View className="items-center justify-center h-full">
        <View className="flex items-center justify-center">
          <Text className="font-imedium text-4xl text-blue">GenEHR</Text>
        </View>
        <View>
          <Text className="text-xl mx-[10%] mt-4 font-iregular">
            " The best way to find yourself is to lose yourself in the service
            of others."
          </Text>
          <View className="flex items-end">
            <Text className=" font-imedium text-xl m-2 ">- Mahatma Gandhi</Text>
          </View>
        </View>
        {ip == "" && (
          <View className="flex items-center justify-center mt-4">
            <FormField
              title={"IP Address"}
              value={temp}
              placeholder={"Enter IP address: "}
              handleChangeText={(e) => setTemp(e)}
              otherStyles={undefined}
            />
            <View>
              <TouchableOpacity
                className="m-4 bg-orange p-2 rounded-[25] w-[120] justify-center items-center"
                onPress={saveIP}
              >
                <Text className="text-white font-imedium text-xl items-center">
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View className="items-center absolute bottom-4">
        {ip !== "" && (
          <TouchableOpacity
            className="m-4 bg-blue p-4 rounded-[25] w-[250] justify-center items-center"
            onPress={handleGetStarted}
          >
            <Text className="text-white font-imedium text-xl items-center">
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default index;
