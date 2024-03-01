import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const StatesScreen = () => {
  const navigation = useNavigation();

  const onStatePress = (state) => {
    // Navigate to the new page with the selected state code
    navigation.navigate("TournamentByStateScreen", { state: state });
  };

  useEffect(() => {
    // Set the header title to null to hide it
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const states = [
    {
      code: "DL",
      name: "Delhi",
      image: require("../../assets/States/Delhi.jpeg"),
    },
    {
      code: "MH",
      name: "Maharashtra",
      image: require("../../assets/States/Mumbai.jpeg"),
    },
    {
      code: "TN",
      name: "Tamil Nadu",
      image: require("../../assets/States/Chennai.jpeg"),
    },
    {
      code: "WB",
      name: "West Bengal",
      image: require("../../assets/States/Kolkata.jpeg"),
    },
    {
      code: "KL",
      name: "Kerala",
      image: require("../../assets/States/Kerala.jpeg"),
    },
    {
      code: "AP",
      name: "Andhra Pradesh",
      image: require("../../assets/States/Hyderabad.jpeg"),
    },
    {
      code: "AR",
      name: "Arunachal Pradesh",
      image: require("../../assets/States/ArunachalPradesh.jpeg"),
    },
    {
      code: "AS",
      name: "Assam",
      image: require("../../assets/States/Assam.jpeg"),
    },
    {
      code: "BR",
      name: "Bihar",
      image: require("../../assets/States/Bihar.jpeg"),
    },
    {
      code: "CT",
      name: "Chhattisgarh",
      image: require("../../assets/States/chattisgarh.jpeg"),
    },
    { code: "GA", name: "Goa", image: require("../../assets/States/Goa.jpeg") },
    {
      code: "GJ",
      name: "Gujarat",
      image: require("../../assets/States/Gujarat.jpeg"),
    },
    {
      code: "HR",
      name: "Haryana",
      image: require("../../assets/States/haryana.jpeg"),
    },
    {
      code: "HP",
      name: "Himachal Pradesh",
      image: require("../../assets/States/Himachal.jpeg"),
    },
    {
      code: "JH",
      name: "Jharkhand",
      image: require("../../assets/States/Jharkhand.jpeg"),
    },
    {
      code: "KA",
      name: "Karnataka",
      image: require("../../assets/States/Bangalore.jpeg"),
    },
    {
      code: "MP",
      name: "Madhya Pradesh",
      image: require("../../assets/States/MadhyaPradesh.jpeg"),
    },
    {
      code: "MN",
      name: "Manipur",
      image: require("../../assets/States/Manipur.jpeg"),
    },
    {
      code: "ML",
      name: "Meghalaya",
      image: require("../../assets/States/Meghalya.jpeg"),
    },
    {
      code: "MZ",
      name: "Mizoram",
      image: require("../../assets/States/Mizoram.jpeg"),
    },
    {
      code: "NL",
      name: "Nagaland",
      image: require("../../assets/States/nagaland.jpeg"),
    },
    {
      code: "OD",
      name: "Odisha",
      image: require("../../assets/States/Orissa.jpeg"),
    },
    {
      code: "PB",
      name: "Punjab",
      image: require("../../assets/States/Punjab.jpeg"),
    },
    {
      code: "RJ",
      name: "Rajasthan",
      image: require("../../assets/States/Rajasthan.png"),
    },
    {
      code: "SK",
      name: "Sikkim",
      image: require("../../assets/States/sikkim.jpeg"),
    },
    {
      code: "TS",
      name: "Telangana",
      image: require("../../assets/States/Hyderabad.jpeg"),
    },
    {
      code: "TR",
      name: "Tripura",
      image: require("../../assets/States/Tripura.jpeg"),
    },
    {
      code: "UP",
      name: "Uttar Pradesh",
      image: require("../../assets/States/UttarPradesh.jpeg"),
    },
    {
      code: "UK",
      name: "Uttarakhand",
      image: require("../../assets/States/Uttarakhand.jpeg"),
    },
    {
      code: "JK",
      name: "Jammu And Kashmir",
      image: require("../../assets/States/JammuKashmir.jpeg"),
    },
    // Add more states as needed
  ];

  const renderStateCard = ({ item }) => (
    <TouchableOpacity
      style={styles.stateCard}
      onPress={() => onStatePress(item.name)}
    >
      <Image source={item.image} style={styles.stateImage} />
      <Text style={styles.stateName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#4F4F4F"
            style={styles.backButton}
          />
        </TouchableOpacity>
        {/* You can customize the header as needed */}
        <Text style={styles.headerText}>Select the State</Text>
      </View>

      <FlatList
        data={states}
        keyExtractor={(item) => item.code}
        renderItem={renderStateCard}
        numColumns={2} // Adjust the number of columns as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 0,
    padding: 8,
    marginTop: 35,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 4,
    marginTop: 8,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  stateCard: {
    flex: 1,
    aspectRatio: 1, // Maintain aspect ratio for the state card
    borderRadius: 8,
    margin: 8,
    overflow: "hidden",
  },
  stateImage: {
    width: "100%",
    height: "70%",
    borderRadius: 8,
  },
  stateName: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 10,
    height: 15,
    marginRight: 4,
  },
  backButton: {
    marginRight: 8,
  },
});

export default StatesScreen;
