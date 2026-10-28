import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places } from "../data/places";
// Figma frame 1:3 — map pins + bottom place carousel
export default function MapScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Map</Text>
      <View style={{ height: 320, backgroundColor: "#e8e0d5", borderRadius: radius.card, marginTop: 16, padding: 16 }}>
        {places.map((p) => (
          <TouchableOpacity key={p.id} onPress={() => go("detail")} style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "700" }}>📍 {p.name.split(" ")[0]} — {p.distanceKm}Km</Text>
          </TouchableOpacity>
        ))}
        <Text style={{ marginTop: 20, color: colors.secondary }}>Map view: replace this box with react-native-maps + the pins above.</Text>
      </View>
      {places.slice(0, 2).map((p) => (
        <View key={p.id} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 12, marginTop: 12 }}>
          <Text style={{ fontWeight: "700" }}>{p.name}</Text><Text style={{ color: colors.secondary }}>{p.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
