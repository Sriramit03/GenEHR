import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import Button from "@/components/Button";

const CustomAlertBox = ({message, closeFunc, buttonName, buttonFunc}) => {
  return (
    <View className="flex-1 justify-center items-center bg-ctransparent/50">
            <View className="bg-white p-4 h-[25%] w-[85%] rounded-xl">
              <View className="items-end">
                <TouchableOpacity onPress={closeFunc} className="w-10 h-10">
                 <Image source={icons.close} className="w-8 h-8" />
                </TouchableOpacity>
              </View>
              <View className="flex flex-row items-center justify-around my-4  h-auto w-auto">
                <Image source={icons.accept} className="w-16 h-16" />
                <Text className="font-imedium text-2xl w-[200] ">
                  {message}
                </Text>
              </View>
              <View className="w-auto items-center">
                <Button
                  title={buttonName}
                  handlePress={buttonFunc}
                  containerStyles={"min-w-[120]"}
                  titleStyles={"text-white"}
                />
              </View>
            </View>
          </View>
  )
}

export default CustomAlertBox