import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import icons from "@/constants/icons";
import Slider from "@react-native-community/slider"; // Import Slider

const AudioPlayer = ({ uri }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const soundRef = useRef(null);

  const loadAudio = async () => {
    try {
      // Unload previous sound if it exists
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: uri },
        { shouldPlay: isPlaying }
      );
      soundRef.current = sound;

      // Set duration
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        setDuration(status.durationMillis / 1000); // Duration in seconds
      }

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  };

  const onPlaybackStatusUpdate = async (status) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / 1000); // Update progress
    }

    if (status.didJustFinish) {
      setIsPlaying(false);
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0); // Reset to the beginning
      }
    }
  };

  const handlePlayPause = async () => {
    try {
      if (!soundRef.current) return;

      if (isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in play/pause:", error);
    }
  };
  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s);
    return `${mins.toString().padStart(1, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    loadAudio();

    return () => {
      // Unload sound on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);
  // Seek to a specific position in the audio
  const handleSeek = async (value) => {
    if (soundRef.current) {
      setIsPlaying(true);
      await soundRef.current.setPositionAsync(value * 1000); // Convert to milliseconds
    }
    setProgress(value);
  };

  return (
    <View className="bg-grey mx-[8%] rounded-[30] my-6">
      <View className="flex flex-row items-center justify-around gap-2 p-6 ">
        {!isPlaying ? (
          <TouchableOpacity onPress={handlePlayPause}>
            <Image source={icons.play} className="w-6 h-6" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handlePlayPause}>
            <Image source={icons.pause1} className="w-6 h-6" />
          </TouchableOpacity>
        )}
        <Text className="font-iregular">
          {formatTime(progress)} / {formatTime(duration)}
        </Text>
        <Slider
          className=""
          style={styles.slider}
          value={progress}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="#4894FE"
          maximumTrackTintColor="#000000"
          thumbTintColor="#4894FE"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  slider: {
    width: "60%",
  },
  /* container:{
    display:"flex",
    flexDirection:"row",
  } */
});

export default AudioPlayer;
