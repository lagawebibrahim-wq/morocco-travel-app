import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

export default function SettingsScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Settings</Text>
      {["Language", "Currency: MAD", "Notifications", "Change city"].map((it) => (
        <View key={it} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}>
          <Text style={{ fontWeight: "600" }}>{it}</Text>
        </View>
      ))}
      <TouchableOpacity onPress={() => go("start")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 20 }}>
        <Text style={{ fontWeight: "700", color: colors.cta, textAlign: "center" }}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
