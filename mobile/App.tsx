import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "./src/theme";
import ExploreScreen from "./src/screens/ExploreScreen";
import MapScreen from "./src/screens/MapScreen";
import PlaceDetailScreen from "./src/screens/PlaceDetailScreen";
import HostelsScreen from "./src/screens/HostelsScreen";
import BookingScreen from "./src/screens/BookingScreen";
import MyTripsScreen from "./src/screens/MyTripsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SavedScreen from "./src/screens/SavedScreen";
import CartScreen from "./src/screens/CartScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import CityDetailScreen from "./src/screens/CityDetailScreen";
import StartScreen from "./src/screens/StartScreen";

const screens: Record<string, any> = {
  start: StartScreen, explore: ExploreScreen, map: MapScreen, detail: PlaceDetailScreen,
  hostels: HostelsScreen, booking: BookingScreen, trips: MyTripsScreen, profile: ProfileScreen,
  saved: SavedScreen, cart: CartScreen, settings: SettingsScreen, city: CityDetailScreen,
};
const tabs = ["explore", "map", "trips", "saved", "profile"];
export default function App() {
  const [screen, setScreen] = useState("explore");
  const Screen = screens[screen] ?? ExploreScreen;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1 }}><Screen go={setScreen} /></View>
      <View style={{ flexDirection: "row", backgroundColor: colors.card, padding: 12 }}>
        {tabs.map((t) => (
          <TouchableOpacity key={t} onPress={() => setScreen(t)} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontWeight: screen === t ? "700" : "400", color: screen === t ? colors.cta : colors.secondary }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
