import {
  View,
  Text,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import { useState } from "react";
import Button from "@/components/Button";
import { router } from "expo-router";
import icons from "@/constants/icons";
import CustomAlertBox from "@/components/CustomAlertBox";

const HealthMetrics = () => {
  const [formValues, setFormValues] = useState({
    spo2: "",
    bp: "",
    pr: "",
    temp: "",
    wg: "",
  });
  const [modalVisible, setModalVisible] = useState(false);

  const submitMetrics = () => {
    setModalVisible(true);
  };
  const BackToHome = () => {
    setModalVisible(false);
    router.push("/(tabs)/home");
  };

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
        </View>

        <View className="w-full justify-center items-center">
          <Button
            title={"Next"}
            handlePress={submitMetrics}
            containerStyles={"min-w-[100]"}
            titleStyles={"text-white"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthMetrics;
