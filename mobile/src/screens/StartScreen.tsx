import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

export default function StartScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: "700", color: colors.title }}>Start Traveling</Text>
      <Text style={{ color: colors.secondary, marginTop: 12, fontSize: 16 }}>Explore the beautiful cities of Morocco — Marrakech, Merzouga, Imlil and Agafay.</Text>
      <TouchableOpacity onPress={() => go("explore")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 32 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Start Traveling →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
