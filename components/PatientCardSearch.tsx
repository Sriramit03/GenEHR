import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'

const PatientCardSearch = ({name, id, date, buttonName, handleFetch}) => {
  return (
    <View className='flex flex-row justify-between items-center  bg-white p-4 rounded-[10] mx-4 mb-4 '>
      <Text className='font-iregular text-xl w-[30]'>{id}</Text>
      <Text className='font-imedium text-xl w-[100]'>{name}</Text>
      <Text className='font-iregular'>{date}</Text>
      <Button title={buttonName} handlePress={handleFetch} containerStyles={"min-w-[70]"} titleStyles={"text-white"} />
    </View>
  )
}

export default PatientCardSearch