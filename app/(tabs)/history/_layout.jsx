import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const HistoryLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="PatientHistory" options={{headerShown:false}} />
        <Stack.Screen name="CameraScreen" options={{headerShown:false}} />
        <Stack.Screen name="MedicalReport" options={{ headerShown: false }} />
    </Stack>
  )
}

export default HistoryLayout