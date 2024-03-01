// LoginScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem("authToken");
        if (authToken) {
          // If authToken exists, navigate the user to the home screen
          navigation.replace("Home");
        }
      } catch (error) {
        console.error("Error checking authToken:", error);
      }
    };

    checkAuthToken();
  }, [navigation]);

  const handleLogin = async () => {
    try {
      // Validate inputs
      if (!email || !password) {
        Alert.alert("Error", "Please enter both email and password.");
        return;
      }

      // Send login request to the server
      const response = await axios.post(
        "https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/auth/applogin",
        {
          email,
          password,
        }
      );

      // Assuming the server returns a token upon successful login
      const authToken = response.data.token;

      // Store the token in AsyncStorage
      await AsyncStorage.setItem("authToken", authToken);

      // Navigate to the Home screen
      navigation.replace("Home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Invalid email or password. Please try again.");
    }
  };

  const handleSignUp = () => {
    // Navigate to the CreateUserProfile screen
    navigation.navigate("CreateUserProfile");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo-chess.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* <Text style={styles.title}>Login</Text> */}
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
      {/* <Button title="Login" style={styles.loginButton} onPress={handleLogin} /> */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}> Login </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateUserProfile")}
      >
        <Text style={styles.signupLink}>Don't Have an Account, Sign Up!</Text>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "black", // Adjust the background color as needed
    paddingVertical: 12,
    borderRadius: 6,
    marginTop: 15,
    alignItems: "center",
    width: "80%",
  },
  loginButtonText: {
    color: "#fff", // Adjust the text color as needed
    fontSize: 20,
    fontWeight: "bold",
  },
  signupLink: {
    textAlign: "center",
    marginTop: 16,
    color: "black",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
