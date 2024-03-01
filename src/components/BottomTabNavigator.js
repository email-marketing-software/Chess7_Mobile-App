// BottomTabNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { Text } from "react-native-elements";
import HomeScreen from "./HomeScreen";
import StateScreen from "./StateScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route }) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: () => null, // Hides the label
        tabBarIcon: ({ color, size }) => {
          let iconName;
          let label;

          if (route.name === "Home") {
            iconName = "home";
            label = "Home";
          } else if (route.name === "States") {
            iconName = "location-pin";
            label = "States";
          } else if (route.name === "Profile") {
            iconName = "person";
            label = "Profile";
          }

          // Return the icon component
          return (
            <>
              <Icon
                name={iconName}
                type="material"
                color={color}
                size={size}
                label={label}
              />
              <Text style={{ color: color, fontSize: 12 }}>{label}</Text>
            </>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="States" component={StateScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
