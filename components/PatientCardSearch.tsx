import { View, Text } from 'react-native'
import React from 'react'
import Button from './Button'

const PatientCardSearch = ({name, id, date,mobNo, buttonName, handleFetch}) => {
  return (
    <View className='flex flex-row justify-evenly items-center  bg-white p-4 rounded-[10] mx-4 mb-4 '>
      <Text className='font-iregular text-xl w-[70]'>{id}</Text>
      <Text className='font-imedium text-xl w-[100] items-center'>{name}</Text>
      <Text className='font-iregular mr-2'>{date}</Text>
      <Button title={buttonName} handlePress={()=> handleFetch(name, id ,mobNo)} containerStyles={"min-w-[70]"} titleStyles={"text-white"} />
    </View>
  )
}

export default PatientCardSearch