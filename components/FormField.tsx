import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-[18px] text-black font-imedium mb-2">{title}</Text>
      <View
        className={`w-[80%] h-14 px-4 border-2 rounded-[5px] items-center flex flex-row ${
          isFocused ? "border-blue" : "border-grey"
        }`}
      >
        <TextInput
          className="text-black flex-1 font-iregular h-12"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="text-grey"
          onChangeText={handleChangeText}
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

export default FormField;
