import React, { useEffect, useState } from "react";
import {
  StatusBar,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Icon } from "react-native-elements";
// import { NavigationContainer } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import axios from "axios";
import logo from "../../assets/logo-chess.png";
import HomepageBanner from "../../assets/banner.png";
import RupeeSign from "../../assets/rupee.png";
import PinSign from "../../assets/pin.png";
import { useNavigation } from "@react-navigation/native";
import TournamentScreen from "./TournamentScreen";
import StateScreen from "./StateScreen";
import ProfileScreen from "./ProfileScreen";

// ... (existing imports)

// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const navigation = useNavigation();
  const [tournaments, setTournaments] = useState([]);
  const [search, setSearch] = useState("");
  // const [selectedTab, setSelectedTab] = useState("Home");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(
          "https://cd03-2406-b400-71-e0dd-bc8e-8d49-dc02-2799.ngrok-free.app/api/all/tournaments"
        );
        setTournaments(response.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);

  const data = [
    { type: "banner", key: "banner" },
    { type: "sectionTitle", key: "sectionTitle" },
    ...tournaments.map((tournament) => ({
      type: "tournament",
      tournament,
      key: tournament._id.toString(),
    })),
  ];

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
      {/* Header with Chess7 Logo and SearchBar */}
      <View style={styles.header}>
        {/* <Image source={logo} style={styles.logo} /> */}
        {/* SearchBar */}
        <SearchBar
          placeholder="Search..."
          onChangeText={(text) => setSearch(text)}
          value={search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
        />
      </View>

      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => {
          if (item.type === "banner") {
            return <Image source={HomepageBanner} style={styles.headerImage} />;
          } else if (item.type === "sectionTitle") {
            return (
              <Text style={styles.sectionTitle}>Featured Tournaments</Text>
            );
          } else {
            return renderItem({ item: item.tournament });
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    width: "100%",
    padding: 12,
    backgroundColor: "#fff",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Align items and justify content for a row
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
  },
  headerImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    elevation: 2, // Add elevation for a card-like shadow on Android
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
  searchBarContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    margin: 0,
    width: "100%", // Adjust the width as needed
  },
  searchBarInputContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
  },
  searchBarInput: {
    fontSize: 14, // Adjust the font size as needed
  },
  tabNavigator: {
    flex: 0,
  },
  flatList: {
    flex: 1,
  },
});

export default HomeScreen;
