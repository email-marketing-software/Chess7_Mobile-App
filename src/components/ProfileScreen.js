// ProfileScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";

const ProfileScreen = () => {
  const [userData, setUserData] = useState({});
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Clear the authentication token from AsyncStorage
      await AsyncStorage.removeItem("authToken");

      // Navigate to the login screen or wherever you want to navigate after logout
      navigation.replace("Login");
    } catch (error) {
      console.error("Error logging out:", error);
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        console.log("Auth Token from AsyncStorage:", authToken);
        if (authToken) {
          const response = await axios.get(
            "https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          console.log("response:", response);

          const userDataFromServer = response.data;
          setUserData(userDataFromServer);
        } else {
          // Handle the case where no authToken is found
          Alert.alert("Error", "Authentication token not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        Alert.alert(
          "Error",
          `An error occurred while fetching user data: ${error.message}`
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>User Profile</Text>

      {/* User Info */}
      <Text style={styles.text}>Name: {userData.name}</Text>
      <Text style={styles.text}>Email: {userData.email}</Text>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={() => handleLogout()}
        style={styles.logoutButton}
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    color: "white",
    marginLeft: 10,
  },
});

export default ProfileScreen;
