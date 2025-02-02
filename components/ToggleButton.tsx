import { View } from "react-native";
import React, { useState } from "react";
import Button from "./Button";
import { router } from "expo-router";

const ToggleButton = ({ initialValue }: { initialValue: boolean }) => {
  const [toggle, setToggle] = useState(initialValue);

  const togglingNew = () =>{
    if(!toggle){
       router.push("/(tabs)/home")
    }
  }
  const togglingOld = () =>{
    if(toggle){
      router.push("/(tabs)/home/OldPatients")
    }
  }

  return (
    <View className="flex-row border-grey bg-grey p-1 rounded-xl ">
      <Button
        title="New Patient"
        handlePress={togglingNew}
        containerStyles={toggle ? "" : "bg-grey"}
        titleStyles={toggle ? "text-white" : "text-black"}
      />
      <Button
        title="Old Patient"
        handlePress={togglingOld}
        containerStyles={toggle ? "bg-grey" : ""}
        titleStyles={toggle ? "text-black" : "text-white"}
      />
    </View>
  );
};

export default ToggleButton;
