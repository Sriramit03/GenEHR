import React from 'react'
import { Stack } from 'expo-router'

const Homelayout = () => {
  return (
   <Stack screenOptions={{headerStyle:{backgroundColor:"#F7F8FC"}}}>
    <Stack.Screen name="index" options={{headerShown:false,headerStyle:{backgroundColor:"#F7F8FC"}}}/>
    <Stack.Screen name="HealthMetrics" options={{headerShown:false}}/>
    <Stack.Screen name="OldPatients" options={{headerShown:false}}/>
    <Stack.Screen name="DoctorDetail" options={{headerShown:false}}/>
    <Stack.Screen name="DoctorRecording" options={{headerShown:false}}/>
    </Stack>
  )
}

export default Homelayout