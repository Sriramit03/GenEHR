import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { router } from "expo-router";
import CustomAlertBox from "@/components/CustomAlertBox";
import icons from "@/constants/icons";
import symptoms from "@/constants/ComplainsOf";
import { usePatientContext } from "@/context/PatientProvider";
import ip from "@/constants/IP";

const HealthMetrics = () => {
  const { patient, setPatient } = usePatientContext();
  const [formValues, setFormValues] = useState({
    spo2: 0,
    bp: "",
    pr: 0,
    temp: 0,
    wg: 0,
    co: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAddVisible, setAddVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const dateObj = new Date();
    setDate(dateObj.toDateString());
    const hr = dateObj.getHours() % 12 || 12;
    const min = dateObj.getMinutes();
    const ampm = hr >= 12 ? "PM" : "AM";
    console.log(patient);
    setTime(`${hr}:${min < 10 ? "0" + min : min} ${ampm}`);
  }, []);

  // Toggle selection
  const toggleCheckbox = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  // Filter list based on search
  const handleSearch = (e) => {
    setSearchText(e);
    setFilteredList(
      symptoms.filter((item) =>
        item.toLowerCase().includes(searchText.toLowerCase())
      )
    );
    if (e !== "" && filteredList.length == 0) {
      setAddVisible(true);
    }
    if (e == "") {
      setFilteredList([]);
      setAddVisible(false);
    }
  };

  const onCloseAndDone = () => {
    setFormValues({ ...formValues, co: selectedItems });
    setIsFocused(false);
    console.log(formValues.co);
  };

  const addHealthMetrics = async () => {
    console.log({
      Name: patient.name,
      MobileNo: patient.mobNo,
      Date: "",
      OxygenInBlood: formValues.spo2,
      Weight: formValues.wg,
      Temperature: formValues.temp,
      BloodPressure: formValues.bp,
      PulseRate: formValues.pr,
      Complaints: formValues.co,
    });
    try {
      const response = await fetch(`http://${ip}:8000/health-metrics/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: patient.name,
          MobileNo: patient.mobNo,
          Date: "",
          OxygenInBlood: formValues.spo2,
          Weight: formValues.wg,
          Temperature: formValues.temp,
          BloodPressure: formValues.bp,
          PulseRate: formValues.pr,
          Complaints: formValues.co,
          Transcription: "",
          AudioRecord: "",
          Summary: "",
          HasAttended: false,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.detail || "Failed to add health metrics");
      }
      setModalVisible(true);
      console.log("Health Metrics Added Successfully:", data);
    } catch (error) {
      console.error(
        "Error adding health metrics:",
        JSON.stringify(error, null, 2)
      );
    }
  };
  const BackToHome = () => {
    setModalVisible(false);
    router.push("/(tabs)/home");
  };
  const handleComplainsOf = () => {};

  return (
    <SafeAreaView className="bg-bgColor h-full">
      <Header pageName={"Health Metrics"} />
      <ScrollView className="relative">
        {/* Modal for Success Message */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <CustomAlertBox
            message={"Patient Added Successfully 😊 "}
            closeFunc={() => setModalVisible(false)}
            buttonName={"New Patient"}
            buttonFunc={BackToHome}
          />
        </Modal>
        <Modal
          visible={isFocused}
          transparent={true}
          animationType="fade"
          onRequestClose={onCloseAndDone}
        >
          <View className="bg-white h-[95%] m-4 p-5 mb-4">
            <View className="mb-4">
              <Text className="text-xl font-imedium border-b-2 mb-4 pb-4 border-grey">
                C/O
              </Text>
              <View className="border-2 border-grey h-14  flex flex-row justify-center items-center px-4">
                <TextInput
                  value={searchText}
                  placeholder="Add or Search"
                  onChangeText={(e) => handleSearch(e)}
                  className={"text-black flex-1 font-iregular h-14"}
                />

                {isAddVisible && (
                  <TouchableOpacity>
                    <Text className="text-xl font-imedium text-green-600">
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <FlatList
              data={filteredList.length > 0 ? filteredList : symptoms}
              keyExtractor={(item, index) => index}
              className=""
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => toggleCheckbox(item)}
                  className={`flex-row items-center mb-4 = `}
                >
                  <View
                    className={`h-6 w-6 border-2 border-grey justify-center items-center mr-10`}
                  >
                    {selectedItems.includes(item) && (
                      <Image source={icons.tick} className="w-7 h-7" />
                    )}
                  </View>
                  <Text className="text-lg font-iregular">{item}</Text>
                </TouchableOpacity>
              )}
            />
            <View className="my-4 flex flex-row justify-between">
              <TouchableOpacity onPress={() => setIsFocused(false)}>
                <Text className="text-xl font-imedium text-red-600">Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCloseAndDone}>
                <Text className="text-xl font-imedium text-green-600">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View className="mx-[5%] flex flex-row justify-between items-center">
          <Text className="text-xl font-iregular">{date}</Text>
          <Text className="text-xl font-iregular">{time}</Text>
        </View>
        <View className="flex items-center bg-white rounded-[10px] m-6 py-6">
          <FormField
            title={"Blood Pressure"}
            value={formValues.bp}
            placeholder={"Enter Blood Pressure"}
            handleChangeText={(e) => setFormValues({ ...formValues, bp: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"Pulse Rate"}
            value={formValues.pr}
            placeholder={"Enter Pulse Rate"}
            handleChangeText={(e) => setFormValues({ ...formValues, pr: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"SpO2"}
            value={formValues.spo2}
            placeholder={"Enter Blood Oxygen"}
            handleChangeText={(e) => setFormValues({ ...formValues, spo2: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"Temperature"}
            value={formValues.temp}
            placeholder={"Enter Temperature"}
            handleChangeText={(e) => setFormValues({ ...formValues, temp: e })}
            otherStyles={"mb-6"}
          />
          <FormField
            title={"Weight"}
            value={formValues.wg}
            placeholder={"Enter Weight"}
            handleChangeText={(e) => setFormValues({ ...formValues, wg: e })}
            otherStyles={"mb-6"}
          />

          <TouchableOpacity
            className="w-[80%]"
            onPress={() => setIsFocused(true)}
          >
            <View className={`space-y-2`}>
              <Text className="text-[18px] text-black font-imedium mb-2">
                C/O
              </Text>
              <View
                className={`   border-2 rounded-[5px] items-center flex flex-row ${
                  isFocused ? "border-blue" : "border-grey"
                }`}
              >
                <View className=" w-full flex flex-row justify-around items-center p-4">
                  <Text className="w-[80%] text-black leading-relaxed">
                    {formValues.co.join(", ")}
                  </Text>
                  <TouchableOpacity onPress={() => setIsFocused(true)}>
                    <Image source={icons.plus} className="h-7 w-7" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-full justify-center items-center">
          <Button
            title={"Next"}
            handlePress={addHealthMetrics}
            containerStyles={"min-w-[100]"}
            titleStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthMetrics;
