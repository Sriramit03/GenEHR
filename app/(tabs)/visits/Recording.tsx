import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  AppState,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import icons from "@/constants/icons";
import { Audio } from "expo-av";
import Button from "@/components/Button";
import * as FileSystem from "expo-file-system";
import AudioPlayer from "@/components/AudioPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { usePatientContext } from "@/context/PatientProvider";

const Recording = () => {
  const [recording, setRecording] = useState();
  const [timer, setTimer] = useState(0);
  const [savedUri, setSavedUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const {patient,setPatient} = usePatientContext();

  const recordingOptions = {
    android: {
      extension: ".wav",
      outputFormat: Audio.RECORDING_OPTION_OUTPUT_FORMAT_LINEAR_PCM,
      audioEncoder: Audio.RECORDING_OPTION_AUDIO_ENCODER_PCM_16BIT,
      sampleRate: 44100, // Sample rate for better quality (standard for high-quality audio)
      numberOfChannels: 1, // Mono channel for better clarity, or 2 for stereo
    },
    ios: {
      extension: ".caf",
      audioQuality: Audio.RECORDING_OPTION_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1, // Mono channel for better clarity
    },
  };

  useEffect(() => {
    try {
      checkPermission();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 100); // Increment by 100ms
      }, 100); // Interval of 100ms for precision
    }
    return () => clearInterval(interval); // Cleanup the interval
  }, [isRecording, isPaused]);

  async function checkPermission() {
    try {
      const savedPermission = await AsyncStorage.getItem("audioPermission");
      if (savedPermission === "granted") {
        setHasPermission(true);
      }
      else{
        requestPermission();
      }
    } catch (err) {
      console.error("Error checking permissions:", err);
    }
  }

  async function requestPermission() {
    const response = await Audio.requestPermissionsAsync();
    if (response.granted) {
      await AsyncStorage.setItem("audioPermission", "granted");
      setHasPermission(true);
    }else if (response.canAskAgain) {
      const requestResponse = await Audio.requestPermissionsAsync();
      setHasPermission(requestResponse.granted);
      if (requestResponse.granted) {
        await AsyncStorage.setItem("audioPermission", "granted");
      }
    }else {
      Alert.alert(
        "Permission Required",
        "Audio recording permission is required. Please enable it in system settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]
      );
    }
  }

  // Format time to show minutes, seconds, and milliseconds
  function formatTime(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const millis = ms % 1000;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}.${millis.toString().padStart(3, "0")}`; // Show milliseconds
  }

  const startRecording = async () => {
    if (hasPermission) {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(
          recordingOptions
        );
        setIsRecording(true);
        setIsCompleted(false);
        setRecording(recording);
        setTimer(0);
      } catch (err) {
        console.error("Failed to start recording", err);
      }
    } else {
      await requestPermission();
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        const newUri = FileSystem.documentDirectory + "audio/recording.wav";
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "audio",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });
        console.log(newUri);
        setSavedUri(newUri);
        setRecording(null);
        setIsRecording(false);
        setIsPaused(false);
        setIsCompleted(true);
        setTimer(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const pauseRecording = async () => {
    try {
      if (recording) {
        await recording.pauseAsync();
        setIsPaused(true);
        setIsRecording(false);
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };
  const resumeRecording = async () => {
    try {
      if (recording) {
        console.log("Resuming recording...");
        setIsRecording(true);
        await recording.startAsync();
        setIsPaused(false);
        console.log("Recording resumed");
      }
    } catch (err) {
      console.error("Failed to resume recording", err);
    }
  };

const handleSubmit = async() =>{
  if(savedUri){
    await setPatient({... patient , audio:savedUri});
    router.push("/(tabs)/visits/Transcription");
  }
}

  return (
    <SafeAreaView className="flex-1 bg-bgColor h-full">
      <Header pageName={"Recording"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1 flex-grow"
      >
        <View className="flex-1 justify-between">
          {/* Timer Display */}
          <View className="items-center mt-5">
            <Text className="font-iregular text-[40px]">
              {formatTime(timer)}
            </Text>
          </View>

          {/* Controls at the Bottom */}
          <View className="items-center mb-8">
            {/* Audio Player if Recording Completed */}
            {isCompleted && <AudioPlayer uri={savedUri} />}
            <View className="bg-white p-4 rounded-xl flex-row items-center justify-around gap-10">
              {!isRecording ? (
                <TouchableOpacity
                  onPress={isPaused ? resumeRecording : startRecording}
                >
                  <Image
                    source={icons.record}
                    className="w-[60px] h-[60px]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={pauseRecording}>
                  <Image
                    source={icons.pause}
                    className="w-[60px] h-[60px]"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={stopRecording}>
                <Image source={icons.save} className="w-[45px] h-[45px]" />
              </TouchableOpacity>
            </View>
            <Button title={"Process the audio"} handlePress={handleSubmit} containerStyles={"min-w-[150] mt-6"} titleStyles={"text-white"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Recording;
