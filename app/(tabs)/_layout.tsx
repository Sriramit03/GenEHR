import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import icons from "../../constants/icons";
const TabIcon = ({  icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2 ">
      <Image
        source={focused ? icon.Active : icon.Default}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-imedium" : "font-iregular"} text-xs text-center w-[50px]`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const Tabslayout = () => {
  return (
    <>
      <Tabs
       screenOptions={{
        tabBarActiveTintColor: "#4894FE",
        tabBarInactiveTintColor: "#0D2438",
        tabBarShowLabel: false,
        headerShown:false,
        tabBarStyle: {
          backgroundColor: "#F0F8FF",
          borderTopWidth: 0,
          height: 55,
          paddingTop:8,
          elevation: 0, 
          shadowOpacity: 0,
        }}}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="visits"
          options={{
            title: "Visits",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.patients}
                color={color}
                name="Visits"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="patients"
          options={{
            title: "Patients",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.history}
                color={color}
                name="Patients"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Tabslayout;
