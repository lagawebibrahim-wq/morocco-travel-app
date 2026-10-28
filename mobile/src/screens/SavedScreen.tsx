import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

import { places } from "../data/places";
export default function SavedScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Saved</Text>
      {places.slice(0, 2).map((p) => (
        <TouchableOpacity key={p.id} onPress={() => go("detail")} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, marginTop: 12 }}>
          <Text style={{ fontWeight: "700" }}>♥ {p.name}</Text>
          <Text style={{ color: colors.secondary }}>{p.location} · ⭐ {p.rating}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
