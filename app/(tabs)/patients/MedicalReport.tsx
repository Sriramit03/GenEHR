import { View, Text, ScrollView,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { usePatientContext } from "@/context/PatientProvider";
import AudioPlayer from "@/components/AudioPlayer";
import { router } from "expo-router";
/* import ip from "@/constants/IP"; */
import * as FileSystem from "expo-file-system";
import { useIPContext } from "@/context/IPProvider";

const MedicalReport = () => {
  const { patient, setPatient } = usePatientContext();
  const {ip, setIP} = useIPContext();
  const [audioUri, setaudioUri] = useState(null);
  const [Image1Uri, setImage1Uri] = useState("");
  const [Image2Uri, setImage2Uri] = useState("");

  useEffect(() => {
    fetchpatientDetails();
    fetchAudio();
    fetchAndStoreImages();
  }, []);

  const fetchpatientDetails = async () => {
    try {
      const response = await fetch(
        `http://${ip}:8000/fullDetails/${patient.mobNo}/${patient.name}/${patient.date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        router.back();
      }
      const data = await response.json();
      await setPatient({
        ...patient,
        co: data.Complaints,
        summary: data.Summary,
        transcription: data.Transcription,
      });
    } catch (error) {
      console.error("Error fetching patient:", error.message);
    }
  };

  const fetchAudio = async () => {
    try {
      const url = `http://${ip}:8000/audio/${patient.mobNo}/${patient.name}_${patient.date}.wav`;
      if (url) {
        const fileUri = FileSystem.documentDirectory + "Patient.wav";

        // Download the file and save it locally
        const downloadedAudio = await FileSystem.downloadAsync(url, fileUri);

        if (downloadedAudio.status !== 200) {
          throw new Error(
            `Failed to fetch audio. Status: ${downloadedAudio.status}`
          );
        }
        setaudioUri(fileUri) // Set the local file URI
      }
    } catch (error) {
      console.error("Error fetching audio:", error.message);
    }
    finally{
      console.log(patient.audio);
    }
  };

  const fetchAndStoreImages = async () => {
    try {
      const response = fetch(`http://${ip}:8000/images/${patient.mobNo}/${patient.name}_${patient.date}`);

      const localDir = FileSystem.cacheDirectory; // Use cache directory to store images temporarily

      // Download image 1
      const image1Uri = `${localDir}Image1.jpg`;
      const image1Download = await FileSystem.downloadAsync(response.data.img1, image1Uri);

      // Download image 2
      const image2Uri = `${localDir}Image2.jpg`;
      const image2Download = await FileSystem.downloadAsync(response.data.img2, image2Uri);

      if (image1Download.status === 200 && image2Download.status === 200) {
        setImage1Uri(image1Uri);
        setImage2Uri(image2Uri);
      } else {
        console.error("Error downloading images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  

  return (
    <SafeAreaView className="h-full">
      <Header pageName={"Summarization"} />
      <ScrollView>
        <View className="bg-white p-4 mx-4 rounded-xl">
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Name:</Text>
            <Text className="text-xl">{patient.name}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Age:</Text>
            <Text className="text-xl">{patient.age}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Sex:</Text>
            <Text className="text-xl">{patient.gender}</Text>
          </View>
          <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Mobile No:</Text>
            <Text className="text-xl">{patient.mobNo}</Text>
          </View>
          {/* <View className="flex flex-row gap-2 items-center mb-2">
            <Text className="text-xl font-imedium">Place:</Text>
            <Text className="text-xl">{patients.place}</Text>
          </View> */}
        </View>
        <Text className="text-xl font-imedium ml-4 my-6">C/O</Text>
        {patient.co && (
          <View className="justify-center p-4 mx-4 rounded-xl bg-white items-center">
            <Text className="text-xl font-iregular">
              {patient.co.join(", ")}
            </Text>
          </View>
        )}
        <Text className="text-xl font-imedium ml-4 mt-4">Audio Record</Text>
        {audioUri && <AudioPlayer uri={audioUri} />}
        <Text className="text-xl font-imedium ml-4 mb-6">Summary</Text>
        <View className="bg-white p-4 mx-4 rounded-xl ">
          <Text className="text-xl">{patient.summary}</Text>
        </View>
        <Text className="text-xl font-imedium ml-4 my-6">Image</Text>
        <View className="bg-white p-4 mx-4 rounded-xl ">
          <Image source={{uri:Image1Uri}}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicalReport;
