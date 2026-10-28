import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

export default function MyTripsScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>My Trips</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 16, marginTop: 16 }}>
        <Text style={{ fontWeight: "700" }}>✓ Booking confirmed</Text>
        <Text style={{ color: colors.secondary, marginTop: 6 }}>Hostel Ils — Marrakech, Morocco</Text>
        <Text style={{ marginTop: 6 }}>2 nights · 2 guests · Total 725 MAD</Text>
      </View>
      <TouchableOpacity onPress={() => go("explore")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 20 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Explore more</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
