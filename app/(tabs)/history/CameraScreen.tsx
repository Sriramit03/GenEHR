import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CameraView, Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import { usePatientContext } from "@/context/PatientProvider";
import { router } from "expo-router";

export default function CameraScreen() {
  const { patient, setPatient } = usePatientContext();
  const [hasPermission, setHasPermission] = useState(false);
  const [savedUri, setSavedUri] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    try {
      checkPermission();
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function checkPermission() {
    try {
      const savedPermission = await AsyncStorage.getItem("cameraPermission");
      console.log(savedPermission);
      if (savedPermission === "granted") {
        setHasPermission(true);
      } else {
        requestPermission();
      }
    } catch (err) {
      console.error("Error checking permissions:", err);
    }
  }
  async function requestPermission() {
    const response = await Camera.requestCameraPermissionsAsync();
    if (response.granted) {
      await AsyncStorage.setItem("cameraPermission", "granted");
      setHasPermission(true);
    }
  }

  const takePicture = async () => {
    try {
      console.log(savedUri);
      const photo = await cameraRef.current?.takePictureAsync();
      const uri = photo.uri;
      setSavedUri(uri);
    } catch (err) {
      console.log("Error Occurred while capturing photo");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        facing={"back"}
        mute={true}
      >
        <View className="absolute bottom-10 left-0 right-0 flex-row justify-center px-6">
          <TouchableOpacity
            onPress={takePicture}
            className="bg-white w-20 rounded-full h-20 shadow-lg"
          >
            <Text className="text-black text-xl font-bold"></Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <View className="absolute bottom-14 right-6">
        <Button
          title={"Upload"}
          handlePress={async () => {
            await setPatient({ ...patient, image: savedUri });
            router.back();

          }}
          containerStyles={"min-w-[70]"}
          titleStyles={"text-white"}
        />
      </View>
      <View className="absolute bottom-10 left-6">
        {savedUri && (
          <Image
            source={{ uri: savedUri }}
            className="w-32 h-32 rounded-lg mb-2"
          />
        )}
      </View>
    </View>
  );
}
