import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";
import { OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
export default function ProfileScreen({ nav }: ScreenProps) {
  const { user, signOut } = useApp();
  const items: [string, string][] = [["My Cart", "cart"], ["Saved", "saved"], ["My Trips", "trips"], ["Settings", "settings"]];
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Hello {user?.name ?? "Ali"}</Text>
      <Text style={{ color: colors.secondary, marginTop: 4 }}>{user ? user.email : "Guest — sign in to book and save places."}</Text>
      {items.map(([label, screen]) => (
        <TouchableOpacity key={screen} onPress={() => nav.navigate(screen)} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>{label}</Text></TouchableOpacity>
      ))}
      <View style={{ marginTop: 20 }}>
        {user ? <OrangeButton label="Log Out" onPress={() => { signOut(); nav.navigate("start"); }} /> : <OrangeButton label="Sign in / Register" onPress={() => nav.navigate("auth")} />}
      </View>
    </ScrollView>
  );
}
