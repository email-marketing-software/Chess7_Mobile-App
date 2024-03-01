// App.js
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import CreateUserProfileScreen from "./src/components/User/CreateUserProfileScreen";
import LoginScreen from "./src/components/User/LoginScreen";
import TournamentScreen from "./src/components/TournamentScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TournamentByStateScreen from "./src/components/TournamentByStateScreen";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuthentication = async () => {
      const authToken = await AsyncStorage.getItem("authToken");
      if (authToken) {
        // User is authenticated, navigate to UserProfileScreen
        useNavigation.replace("ProfileScreen");
      }
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="CreateUserProfile"
          component={CreateUserProfileScreen}
        />
        <Stack.Screen name="TournamentScreen" component={TournamentScreen} />
        <Stack.Screen name="Home" component={BottomTabNavigator} />
        <Stack.Screen
          name="TournamentByStateScreen"
          component={TournamentByStateScreen}
        />
        {/* Add other screens as needed */}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
