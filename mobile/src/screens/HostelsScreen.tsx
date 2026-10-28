import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

import { hostels } from "../data/places";
export default function HostelsScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Hostels</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>Marrakech region — price per day, rating first.</Text>
      {hostels.map((h) => (
        <TouchableOpacity key={h.id} onPress={() => go("booking")} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, marginTop: 12 }}>
          <View style={{ height: 110, backgroundColor: colors.search, borderRadius: radius.image }} />
          <Text style={{ fontWeight: "700", marginTop: 10 }}>{h.name}</Text>
          <Text style={{ color: colors.secondary }}>⭐ {h.rating} · Marrakech, Morocco</Text>
          <Text style={{ color: colors.cta, fontWeight: "700", marginTop: 4 }}>{h.pricePerDay} MAD / Day</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => go("explore")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 20, marginBottom: 30 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Back to Explore</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
