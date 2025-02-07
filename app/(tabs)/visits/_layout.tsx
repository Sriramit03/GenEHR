import { Stack } from "expo-router"

const PatientsLayout
 = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="Recording" options={{headerShown:false}} />
        <Stack.Screen name="Transcription" options={{headerShown:false}}/>
        <Stack.Screen name="Summary" options={{headerShown:false}}/>
    </Stack>
  )
}

export default PatientsLayout
