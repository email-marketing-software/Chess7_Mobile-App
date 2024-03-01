// CreateUserProfileScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import chess7 from "../../../assets/logo-chess.png";

const CreateUserProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegistration = async () => {
    // Client-side validation
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    try {
      // Send user registration data to the backend API
      const response = await axios.post(
        "https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/auth/appsignup",
        {
          name,
          email,
          password,
        }
      );

      // Handle the response from the server
      console.log("User registered successfully:", response.data);

      // Store the received token in AsyncStorage
      await AsyncStorage.setItem("authToken", response.data.token);

      // Navigate to the UserProfileScreen
      navigation.replace("UserProfile");
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle errors and provide user feedback
      Alert.alert(
        "Registration Error",
        "An error occurred during registration"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Chess7 Logo */}
      <Image
        source={require("../../../assets/logo-chess.png")} // Replace with the correct path to your Chess7 logo image
        style={styles.logo}
        resizeMode="contain"
      />

      {/* <Text style={styles.title}>SIGN UP</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {/* <Button title="Register" onPress={handleRegistration} /> */}

      {/* Login Button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleRegistration}
      >
        <Text style={styles.registerButtonText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginButton}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "black",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: "100%",
  },
  registerButton: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    width: "80%",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginButton: {
    marginTop: 20,
    color: "black",
    textDecorationLine: "underline",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default CreateUserProfileScreen;
