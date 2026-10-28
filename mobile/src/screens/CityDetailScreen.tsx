import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

import { places } from "../data/places";
export default function CityDetailScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.title }}>Marrakech</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>Morocco — places in this city, from the Figma City Detail screen.</Text>
      {places.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => go("detail")} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, marginTop: 12 }}>
          <Text style={{ fontWeight: "700" }}>{p.name}</Text>
          <Text style={{ color: colors.secondary }}>{p.distanceKm} Km · ⭐ {p.rating} · +{p.travelers}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
