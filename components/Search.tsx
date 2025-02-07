import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Search = ({ value, handleChangeText, handleSearch }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className="items-center">
      <View
        className={`w-[90%] h-14 px-4 border-2 rounded-[26] items-center flex flex-row ${
          isFocused ? "border-blue" : "border-grey"
        }`}
      >
        <TextInput
          className="text-black flex-1 font-iregular h-12"
          value={value}
          placeholder="Enter Mobile No"
          placeholderTextColor="text-grey"
          onChangeText={handleChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity 
        onPress={handleSearch}
        >
          <Image source={require("../assets/icons/search.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;