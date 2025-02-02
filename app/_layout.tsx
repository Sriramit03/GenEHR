import { Stack, SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import "../global.css";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PatientProvider from "@/context/PatientProvider";
import { StatusBar } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  /* Using our custom fonts located in assets/fonts */
  const [fontsLoaded, error] = useFonts({
    "ibm-bold": require("../assets/fonts/IBMPlexSans-Bold.ttf"),
    "ibm-regular": require("../assets/fonts/IBMPlexSans-Regular.ttf"),
    "ibm-semibold": require("../assets/fonts/IBMPlexSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  return (
    <SafeAreaProvider>
      <PatientProvider>
        <StatusBar backgroundColor="#F0F8FF" barStyle={"dark-content"} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="MedicalReport" options={{ headerShown: false }} />
        </Stack>
      </PatientProvider>
    </SafeAreaProvider>
  );
};
export default RootLayout;
