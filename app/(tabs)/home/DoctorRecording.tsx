import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import icons from "@/constants/icons";
import { Audio } from "expo-av";
import Button from "@/components/Button";
import * as FileSystem from "expo-file-system";
import AudioPlayer from "@/components/AudioPlayer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";

const DoctorRecording = () => {
  const [timer, setTimer] = useState(0);
  const [savedUri, setSavedUri] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [recording, setRecording] = useState();

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
      } else {
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
    } else if (response.canAskAgain) {
      const requestResponse = await Audio.requestPermissionsAsync();
      setHasPermission(requestResponse.granted);
      if (requestResponse.granted) {
        await AsyncStorage.setItem("audioPermission", "granted");
      }
    } else {
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
        const newUri =
          FileSystem.documentDirectory + "audio/DoctorRecording.wav";
        await FileSystem.makeDirectoryAsync(
          FileSystem.documentDirectory + "audio",
          { intermediates: true }
        );
        await FileSystem.moveAsync({
          from: uri,
          to: newUri,
        });
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
  return (
    <SafeAreaView className="h-full bg-bgColor">
      <Header pageName={"Doctor Audio Recording"} />
      <ScrollView>
        <View className="flex justify-center">
          {/* Timer Display */}
          <View className="items-center my-5">
            <Text className="font-iregular text-[40px]">
              {formatTime(timer)}
            </Text>
          </View>

          {/* Controls at the Bottom */}
          <View className="items-center mb-8">
            {/* Audio Player if Recording Completed */}

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
            {isCompleted && (
              <>
                <AudioPlayer uri={savedUri} />
                <Button
                  title={"Submit"}
                  handlePress={() => router.push("/(tabs)/home")}
                  containerStyles={"min-w-[150] mt-6"}
                  titleStyles={"text-white"}
                />
              </>
            )}
          </View>
        </View>

        <View className="mx-[5%] items-center">
          <Text className="text-xl mb-4">
            "வணக்கம்! எப்படி இருக்கிறீர்கள்?" "எந்த பிரச்சனைக்கு
            வந்திருக்கிறீர்கள்?" "உங்கள் வயது என்ன?" "எவ்வளவு நாட்களாக இந்த
            பிரச்சனை உள்ளது?" "வயிற்று வலி இருக்கிறதா?" "காய்ச்சல், சளி, இருமல்
            எதாவது உள்ளதா?" "உணவு சாப்பிடும் பழக்கம் எப்படி உள்ளது?" "எந்த
            மருந்துகள் எடுத்துக் கொண்டிருக்கிறீர்கள்?" "உங்கள் ரத்த அழுத்தம்,
            சர்க்கரை அளவு சரியாக இருக்கிறதா?" "தவறாமல் மருந்துகளை
            எடுத்துக்கொள்ளுங்கள்." "நீங்கள் ஓய்வெடுத்துக் கொள்ளவும், தேவையெனில்
            மீண்டும் பரிசோதனை செய்யலாம்." "நல்லது, நீங்கள் வாரம் கழித்து
            மீண்டும் வரலாம்." "நன்றி!"
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DoctorRecording;
