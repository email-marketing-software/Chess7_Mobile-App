import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";
import RupeeSign from "../../assets/rupee.png";
import PinSign from "../../assets/pin.png";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

const TournamentByStateScreen = ({ route }) => {
  const { state } = route.params;
  const [tournaments, setTournaments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchTournamentsByState = async () => {
      try {
        const response = await axios.get(
          `https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/tournaments/byState/${state}`
        );
        console.log("Response:", response);
        const tournamentsData = response.data;
        setTournaments(tournamentsData);
      } catch (error) {
        console.error("Error fetching tournaments:", error.message);
      }
    };

    fetchTournamentsByState();
  }, [state]);

  const headerTitle = `Tournaments in ${state}`;

  const renderItem = ({ item }) => {
    console.log("Item:", item);
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);

    const startDateFormatted = startDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    const endDateFormatted = endDate.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    return (
      <TouchableOpacity
        key={item._id.toString()}
        style={styles.card}
        onPress={() => {
          console.log("Navigating to TournamentScreen with data:", item);
          navigation.navigate("TournamentScreen", {
            tournament: item,
          });
        }}
      >
        <View style={styles.bannerImageContainer}>
          <Image
            source={{
              uri: `https://billsubmit.sgp1.cdn.digitaloceanspaces.com/Chess7/banners/${item.bannerImage}`,
            }}
            style={styles.bannerImage}
          />

          {item.entryFees.length > 0 && (
            <View style={styles.entryFeeContainer}>
              <Image source={RupeeSign} style={styles.rupeeIcon} />
              <Text style={styles.entryFeeText}>{item.entryFees[0].fee}</Text>
            </View>
          )}
        </View>

        <View style={styles.tournamentInfo}>
          {/* Tournament Name */}
          <Text style={styles.tournamentName}>{item.name}</Text>

          {/* Date */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              {`${startDateFormatted} to ${endDateFormatted}`}
            </Text>
          </View>

          {/* Total Prize */}
          {item.entryFees.length > 0 && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailLabel}>Total Prize:</Text>
              <Text style={styles.detailText}>Rs. {item.totalPrize}</Text>
            </View>
          )}

          {/* Location with Pin Sign */}
          <View style={styles.detailsContainer}>
            <View style={styles.iconTextContainer}>
              <Image source={PinSign} style={styles.icon} />
              <Text
                style={styles.detailText}
              >{`${item.city}, ${item.state}`}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} />

      {/* Header outside ScrollView */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="arrow-back"
            size={24}
            color="#4F4F4F"
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
      </View>

      {/* ScrollView for tournament cards */}
      <ScrollView>{tournaments.map((item) => renderItem({ item }))}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    width: "100%",
    padding: 8,
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
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    elevation: 2,
  },
  bannerImageContainer: {
    position: "relative",
    width: "100%",
    height: 150,
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  entryFeeContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 8,
    borderRadius: 8,
  },
  rupeeIcon: {
    width: 15,
    height: 15,
    marginRight: 2,
  },
  entryFeeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  tournamentInfo: {
    width: "100%",
  },
  tournamentName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: "gray",
  },
  detailText: {
    fontSize: 14,
    marginLeft: 4,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 10,
    height: 15,
    marginRight: 4,
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 2,
  },
});

export default TournamentByStateScreen;
