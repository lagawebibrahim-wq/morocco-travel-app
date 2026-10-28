import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "./src/theme";
import { AppProvider } from "./src/context/AppContext";
import { LanguageProvider, useLanguage } from "./src/context/LanguageContext";
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
import AuthScreen from "./src/screens/AuthScreen";

const screens: Record<string, any> = {
  start: StartScreen, explore: ExploreScreen, map: MapScreen, detail: PlaceDetailScreen,
  hostels: HostelsScreen, booking: BookingScreen, trips: MyTripsScreen, profile: ProfileScreen,
  saved: SavedScreen, cart: CartScreen, settings: SettingsScreen, city: CityDetailScreen, auth: AuthScreen,
};
type Route = { name: string; params: Record<string, any> };
function InnerApp() {
  const { t } = useLanguage();
  const tabs: [string, string][] = [["explore", "travel_places"], ["map", "map"], ["trips", "my_trips"], ["saved", "saved"], ["profile", "profile"]];
  const [stack, setStack] = useState<Route[]>([{ name: "start", params: {} }]);
  const current = stack[stack.length - 1];
  const Screen = screens[current.name] ?? ExploreScreen;
  const nav = {
    navigate: (name: string, params: Record<string, any> = {}) => setStack((s) => [...s, { name, params }]),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    params: current.params,
    go: (name: string) => setStack((s) => [...s, { name, params: {} }]),
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={{ flex: 1 }}>
        {stack.length > 1 ? (
          <TouchableOpacity onPress={nav.back} style={{ paddingHorizontal: 20, paddingTop: 8 }}><Text style={{ color: colors.cta, fontWeight: "700" }}>← {t("back")}</Text></TouchableOpacity>
        ) : null}
        <Screen nav={nav} go={nav.go} params={current.params} />
      </View>
      <View style={{ flexDirection: "row", backgroundColor: colors.card, padding: 12 }}>
        {tabs.map(([name, key]) => (
          <TouchableOpacity key={name} onPress={() => setStack([{ name, params: {} }])} style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", fontWeight: current.name === name ? "700" : "400", color: current.name === name ? colors.cta : colors.secondary }}>{t(key)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
export default function App() {
  return (
    <AppProvider>
      <LanguageProvider>
        <InnerApp />
      </LanguageProvider>
    </AppProvider>
  );
}
