import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";
import type { ScreenProps } from "../types";
export default function SettingsScreen({ nav }: ScreenProps) {
  const { user, signOut } = useApp();
  const [lang, setLang] = useState("English");
  const [currency, setCurrency] = useState("MAD");
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Settings</Text>
      <TouchableOpacity onPress={() => setLang(lang === "English" ? "Français" : lang === "Français" ? "العربية" : "English")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>Language: {lang} (tap to change)</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setCurrency(currency === "MAD" ? "EUR" : "MAD")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>Currency display: {currency} (prices are stored in MAD)</Text></TouchableOpacity>
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>Notifications: on</Text><Text style={{ color: colors.secondary, marginTop: 4 }}>Change city: Marrakech (phase 1)</Text></View>
      {user ? <TouchableOpacity onPress={() => { signOut(); nav.navigate("start"); }} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 20 }}><Text style={{ fontWeight: "700", color: colors.cta, textAlign: "center" }}>Log Out</Text></TouchableOpacity> : null}
    </ScrollView>
  );
}
