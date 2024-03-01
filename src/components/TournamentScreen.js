import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Button } from "react-native";
import RegistrationForm from "./User/RegisterationFormScreen";
const BoldText = ({ children }) => (
  <Text style={styles.boldText}>{children}</Text>
);

const SemiBoldText = ({ children }) => (
  <Text style={styles.semiBoldText}>{children}</Text>
);

const TableHeader = ({ label1, label2, label3 }) => (
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderText}>{label1}</Text>
    <Text style={styles.tableHeaderText}>{label2}</Text>
    <Text style={styles.tableHeaderText}>{label3}</Text>
  </View>
);

const PrizeRow = ({ position, category, prize }) => (
  <View style={styles.tableRow}>
    <Text style={styles.tableRowText}>{position}</Text>
    <Text style={styles.tableRowText}>{category}</Text>
    <Text style={styles.tableRowText}>{`Rs. ${prize}`}</Text>
  </View>
);

const TournamentScreen = ({ route, navigation }) => {
  const { tournament } = route.params || {};
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const handleRegistrationSubmit = (registrationData) => {
    // Handle the submitted registration data (e.g., send it to a server)
    console.log("Submitted Registration Data:", registrationData);

    // Optionally, close the registration form after submission
    setShowRegistrationForm(false);
  };

  const startDate = new Date(tournament.startDate);
  const endDate = new Date(tournament.endDate);

  const startDateFormatted = startDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const endDateFormatted = endDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      {/* Header with Back Button and Tournament Name */}
      <View style={styles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#4F4F4F"
            style={styles.backButton}
          />
        </TouchableOpacity>

        {/* Tournament Name */}
        <Text style={styles.tournamentName}>{tournament.name}</Text>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Fixed Banner Image */}
        <Image
          source={{
            uri: `https://billsubmit.sgp1.cdn.digitaloceanspaces.com/Chess7/banners/${tournament.bannerImage}`,
          }}
          style={styles.bannerImage}
          resizeMode="cover"
        />

        {/* Content */}
        {/* General Information */}
        {/* Important Dates Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Important Dates</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.listItem}>
              <BoldText>Start Date:</BoldText>
              <SemiBoldText>{startDateFormatted}</SemiBoldText>
            </View>
            <View style={styles.listItem}>
              <BoldText>End Date:</BoldText>
              <SemiBoldText>{endDateFormatted}</SemiBoldText>
            </View>
            <View style={styles.listItem}>
              <BoldText>Last Date:</BoldText>
              <SemiBoldText>{tournament.lastDate}</SemiBoldText>
            </View>
          </View>
        </View>

        {/* Venue Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Venue</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.listItem}>
              <BoldText>Address:</BoldText>
              <SemiBoldText>{tournament.address}</SemiBoldText>
            </View>
            <View style={styles.listItem}>
              <BoldText>City:</BoldText>
              <SemiBoldText>{tournament.city}</SemiBoldText>
            </View>
            <View style={styles.listItem}>
              <BoldText>State:</BoldText>
              <SemiBoldText>{tournament.state}</SemiBoldText>
            </View>
          </View>
        </View>

        {/* Organization and Contact Persons Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Connect With Them</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.listItem}>
              <BoldText>Organization:</BoldText>
              <SemiBoldText>{tournament.organization}</SemiBoldText>
            </View>
            <View style={styles.listItem}>
              <BoldText>Contact Details</BoldText>
            </View>
            {tournament.contactPerson &&
              tournament.contactPerson.map((contact, index) => (
                <View key={index} style={styles.listItem}>
                  <SemiBoldText>{`${contact.name} :  `}</SemiBoldText>
                  <SemiBoldText>{contact.number}</SemiBoldText>
                </View>
              ))}
          </View>
        </View>

        {/* Entry Fees and Prizes Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Total Prize:</Text>
          </View>
          <View style={styles.listItem}>
            <SemiBoldText>{`Rs. ${tournament.totalPrize}`}</SemiBoldText>
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Entry Fees</Text>
          </View>
          <View style={styles.cardBody}>
            {tournament.entryFees &&
              tournament.entryFees.map((fee, index) => (
                <View key={index} style={styles.listItem}>
                  <SemiBoldText>{`${fee.category}:`}</SemiBoldText>
                  <SemiBoldText>{`Rs. ${fee.fee}`}</SemiBoldText>
                </View>
              ))}
          </View>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Prizes</Text>
          </View>
          <View style={styles.cardBody}>
            {/* <TableHeader
              label1="Position"
              label2="Category"
              label3="Prize (Rs.)"
            /> */}
            {tournament.prizes &&
              tournament.prizes.map((category, categoryIndex) => (
                <View key={categoryIndex}>
                  <Text style={styles.categoryTitle}>{category.category}</Text>
                  {category.prizes &&
                    category.prizes.map((prize, prizeIndex) => (
                      <PrizeRow
                        key={prizeIndex}
                        position={prize.position}
                        category={prize.category}
                        prize={prize.prize}
                      />
                    ))}
                </View>
              ))}
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>Points To Remember</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.listItem}>
              {/* <BoldText>Tournament Rules:</BoldText>
              <View style={styles.listItem}> */}
              <SemiBoldText>{tournament.tournamentRules}</SemiBoldText>
              {/* </View> */}
            </View>
            <View style={styles.listItem}>
              {/* <BoldText>Important Points:</BoldText> */}
              {/* <View style={styles.listItem}> */}
              <SemiBoldText>{tournament.importantPoints}</SemiBoldText>
              {/* </View> */}
            </View>
          </View>
        </View>
      </ScrollView>

      {showRegistrationForm ? (
        <RegistrationForm onSubmit={handleRegistrationSubmit} />
      ) : (
        <>
          <Button
            title="Register Entry"
            onPress={() => setShowRegistrationForm(true)}
            style={styles.registerButton}
            color="#000"
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginHorizontal: 8,
    marginBottom: 4,
    marginTop: 8,
  },
  backButton: {
    marginRight: 8,
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  bannerImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  scrollContainer: {
    padding: 12,
  },
  detailsContainer: {
    marginBottom: 8,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  semiBoldText: {
    fontSize: 16,
    fontWeight: "500",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
  },
  cardHeader: {
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  cardHeaderText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333333",
  },
  cardBody: {
    marginBottom: 8,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  tableRowText: {
    fontSize: 16,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  registerButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
    borderRadius: 8,
  },
});

export default TournamentScreen;
