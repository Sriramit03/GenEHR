import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";
import ToggleButton from "@/components/ToggleButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { router } from "expo-router";
const Home = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    age: "",
    mobNo: "",
    abhaNo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const submitPatient = () => {
    if (formValues.name != "" && formValues.age != "") {
      console.log(JSON.stringify(formValues, null, 2));
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        router.push("/(tabs)/home/HealthMetrics");
      }, 4000);
    } else {
      Alert.alert("Error", "Please fill in all fields");
    }
  };
  return (
    <SafeAreaView className="bg-bgColor h-full">
      <View className="flex flex-row justify-between mx-4 items-center">
        <Text className="text-2xl font-ibold text-black mx-6 my-4">C_RIHT</Text>
        <Button
          title={"Doctor Details"}
          handlePress={()=> router.push("/(tabs)/home/DoctorDetail")
          }
          containerStyles={"min-w-[120]"}
          titleStyles={"text-white"}
        />
      </View>
      <ScrollView>
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
        <View className="justify-center items-center my-4">
          <ToggleButton initialValue={true} />
        </View>
        <View className=" flex items-center bg-white  rounded-[10px] m-6 py-6">
          <FormField
            title={"Name"}
            value={formValues.name}
            placeholder={"Enter Name: "}
            handleChangeText={(e) => setFormValues({ ...formValues, name: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"Age"}
            value={formValues.age}
            placeholder={"Enter Age: "}
            handleChangeText={(e) => setFormValues({ ...formValues, age: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"Mobile No"}
            value={formValues.mobNO}
            placeholder={"Enter Mobile No: "}
            handleChangeText={(e) => setFormValues({ ...formValues, mobNo: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"ABHA No"}
            value={formValues.abhaNo}
            placeholder={"Enter ABHA No: "}
            handleChangeText={(e) =>
              setFormValues({ ...formValues, abhaNo: e })
            }
            otherStyles={"mb-6"}
          />
        </View>
        <View className="items-center">
          <Button
            title={"Next"}
            handlePress={submitPatient}
            containerStyles={"min-w-[100]"}
            titleStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
