import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const RegistrationForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState(undefined);
  const [category, setCategory] = useState("");
  const [fideRating, setFideRating] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  const registerUser = () => {
    // Validate the form fields before submitting
    if (!name || !dob || !category || !fideRating || !contactNumber || !email) {
      alert("All fields are required");
      return;
    }

    // Create a registration object with the form data
    const registrationData = {
      name,
      dob: formatDate(dob),
      category,
      fideRating,
      contactNumber,
      email,
    };

    // Send a POST request to the backend
    axios
      .post(
        "https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/register",
        registrationData
      )
      .then((response) => {
        // Handle the response, you may want to show a success message
        console.log(response.data);
        alert("Registration successful");
      })
      .catch((error) => {
        // Handle errors, you may want to show an error message
        console.error(error);
        alert("Registration failed");
      });

    // Optionally, you can reset the form fields
    setName("");
    setDob(new Date());
    setCategory("");
    setFideRating("");
    setContactNumber("");
    setEmail("");
    setShowDatePicker(false);
  };

  const handleSubmit = () => {
    registerUser();
    // Call the onSubmit callback or perform any other actions if needed
    onSubmit();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Registration</Text>

      {/* Name */}
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="John Doe"
      />

      {/* Date of Birth */}
      <Text style={styles.label}>Date Of Birth:</Text>
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{dob !== undefined ? formatDate(dob) : "DD/MM/YYYY"}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date()}
          mode="date"
          display="spinner"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDob(selectedDate);
            }
          }}
        />
      )}

      {/* Category */}
      <Text style={styles.label}>Category:</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={(text) => setCategory(text)}
        placeholder="Open"
      />

      {/* Fide Rating */}
      <Text style={styles.label}>Fide Rating (if any):</Text>
      <TextInput
        style={styles.input}
        value={fideRating}
        onChangeText={(text) => setFideRating(text)}
        placeholder="2200"
      />

      {/* Contact Number */}
      <Text style={styles.label}>Contact Number:</Text>
      <TextInput
        style={styles.input}
        value={contactNumber}
        onChangeText={(text) => setContactNumber(text)}
        placeholder="8787878787"
      />

      {/* Email ID */}
      <Text style={styles.label}>Email ID:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        placeholder="example@example.com"
      />

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    backgroundColor: "#EFEFEF",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: "#A0A0A0",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  datePicker: {
    height: 40,
    borderColor: "#A0A0A0",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
    padding: 10,
    justifyContent: "center",
  },
});

export default RegistrationForm;
