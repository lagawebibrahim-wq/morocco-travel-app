import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places } from "../data/places";
// Figma frame 1:102 — "Explore the Beautiful City in the World"
export default function ExploreScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.title }}>Explore the Beautiful City in the World</Text>
      <View style={{ backgroundColor: colors.search, borderRadius: radius.search, padding: 14, marginTop: 16 }}>
        <TextInput placeholder="Search places" placeholderTextColor={colors.secondary} />
      </View>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "700", color: colors.title }}>Categories</Text>
      <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
        {["Cities", "Places"].map((c) => (
          <TouchableOpacity key={c} onPress={() => go("city")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 14, flex: 1 }}>
            <Text style={{ fontWeight: "600" }}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "700", color: colors.title }}>Travel Places</Text>
      {places.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => go("detail")} style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 12, marginTop: 12 }}>
          <View style={{ height: 132, backgroundColor: colors.search, borderRadius: radius.image }} />
          <Text style={{ marginTop: 10, fontWeight: "700", color: colors.title }}>{p.name}</Text>
          <Text style={{ color: colors.secondary }}>📍 {p.location} · {p.distanceKm} Km · ⭐ {p.rating}</Text>
          <Text style={{ color: colors.gold, marginTop: 4 }}>●●● +{p.travelers}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => go("booking")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 20, marginBottom: 30 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
