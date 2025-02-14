import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useReducer, useState } from "react";
import Button from "@/components/Button";
import ToggleButton from "@/components/ToggleButton";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import { router } from "expo-router";
import ip from "@/constants/IP";
import { usePatientContext } from "@/context/PatientProvider";
import CustomAlertBox from "@/components/CustomAlertBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "Male":
      return { gender: action.type };

    case "Female":
      return { gender: action.type };

    case "Other":
      return { gender: action.type };

    default:
      return state;
  }
};

const Home = () => {
  const { patient, setPatient } = usePatientContext();
  const [state, dispatch] = useReducer(reducer, { gender: "" });
  const [formValues, setFormValues] = useState({
    name: "",
    age: 0,
    mobNo: "",
    abhaNo: "",
    gender: "",
  });

  /* State to visible message box if patient already registered*/
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerPatient = async () => {
    if (formValues.name != "" && formValues.age !== 0 && state.gender !== "") {
      try {
        const response = await fetch(`http://${ip}:8000/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ABHA_id: formValues.abhaNo,
            Name: formValues.name,
            Age: formValues.age,
            MobileNo: formValues.mobNo,
            Gender:state.gender
          }),
        });

        const data = await response.json();
        if (response.status == 400) {
          setModalVisible(true);
        } else if (response.ok) {
          setPatient({
            ...patient,
            name: formValues.name,
            age: formValues.age,
            mobNo: formValues.mobNo,
            abhaNo: formValues.abhaNo,
            gender: state.gender,
          });
          setFormValues({
            name: "",
            age: 0,
            mobNo: "",
            abhaNo: "",
            gender: "",
          });
          console.log("Patient registered successfully:", data);
          router.push("/(tabs)/home/HealthMetrics");
        } else {
          throw new Error(data.detail || "Failed to register");
        }
      } catch (error) {
        console.error("Error registering patient:", error.message);
      }
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
          handlePress={() => router.push("/(tabs)/home/DoctorDetail")}
          containerStyles={"min-w-[120]"}
          titleStyles={"text-white"}
        />
      </View>
      <ScrollView>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <CustomAlertBox
            message={"Patient Already Present !"}
            closeFunc={() => setModalVisible(false)}
            buttonName={"OldPatient"}
            buttonFunc={() => {
              setModalVisible(false);
              router.push("/(tabs)/home/OldPatients");
            }}
          />
        </Modal>
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
            value={formValues.mobNo}
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
          <View className="flex flex-row items-start  w-full ml-[70px] mb-2">
            <Text className="text-black font-imedium mb-2 text-[18px]">
              Gender
            </Text>
          </View>
          <View className="flex flex-row justify-evenly w-full">
            <TouchableOpacity
              className={`bg-grey p-2 rounded-3xl w-[80] items-center ${
                state.gender === "Male" && "bg-orange"
              }`}
              onPress={() => {
                dispatch({ type: "Male" });
              }}
            >
              <Text className="text-xl font-imedium text-white">Male</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-grey p-2 rounded-3xl w-[80] items-center ${
                state.gender === "Female" && "bg-orange"
              }`}
              onPress={() => {
                dispatch({ type: "Female" });
              }}
            >
              <Text className="text-xl font-imedium text-white">Female</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`bg-grey p-2 rounded-3xl w-[80] items-center ${
                state.gender === "Other" && "bg-orange"
              }`}
              onPress={() => {
                dispatch({ type: "Other" });
              }}
            >
              <Text className="text-xl font-imedium text-white">Other</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-center">
          <Button
            title={"Next"}
            handlePress={registerPatient}
            containerStyles={"min-w-[100]"}
            titleStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
