import { View, Text } from 'react-native'
import React from 'react'

const PatientDetail = ({patient}) => {
  return (
    <View className='ml-8'>
      <Text className='font-imedium text-xl'>Name</Text>
      <Text className='mb-4 mt-1 font-iregular text-lg'>{patient.Name}</Text>
      <Text className='font-imedium text-xl'>Age</Text>
      <Text className='mb-4 mt-1 font-iregular text-lg '>{patient.Age}</Text>
      <Text className='font-imedium text-xl'>Mobile Number</Text>
      <Text className='mb-4 mt-1 font-iregular text-lg'>{patient.MobileNo}</Text>
      <Text className='font-imedium text-xl'>ABHA Number</Text>
      <Text className='mb-4 mt-1 font-iregular text-lg'>{patient.ABHA_id}</Text>

    </View>
  )
}

export default PatientDetail