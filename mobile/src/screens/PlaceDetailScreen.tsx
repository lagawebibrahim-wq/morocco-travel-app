import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

import { places, hostels } from "../data/places";
export default function PlaceDetailScreen({ go }: { go: (s: string) => void }) {
  const p = places[0];
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <View style={{ height: 220, backgroundColor: colors.search, borderRadius: radius.image }} />
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title, marginTop: 16 }}>{p.name}</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>📍 {p.location} · {p.distanceKm} Km · ⭐ {p.rating}</Text>
      <Text style={{ color: colors.gold, marginTop: 6 }}>●●● +{p.travelers} travelers</Text>
      <Text style={{ color: colors.secondary, marginTop: 16 }}>Desert dunes, Atlas views and authentic stays — the Figma detail screen for this place, with its hostels below.</Text>
      {hostels.map((h) => (
        <View key={h.id} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, marginTop: 12, flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontWeight: "700" }}>{h.name}</Text>
          <Text style={{ color: colors.cta, fontWeight: "700" }}>{h.pricePerDay} MAD / Day</Text>
        </View>
      ))}
      <TouchableOpacity onPress={() => go("hostels")} style={{ backgroundColor: colors.card, borderRadius: radius.button, padding: 14, marginTop: 16 }}>
        <Text style={{ textAlign: "center", fontWeight: "700" }}>See all hostels</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => go("booking")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 12, marginBottom: 30 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
