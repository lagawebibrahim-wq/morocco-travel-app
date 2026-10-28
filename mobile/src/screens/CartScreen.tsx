import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

export default function CartScreen({ go }: { go: (s: string) => void }) {
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>My Cart</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 16, marginTop: 16 }}>
        <Text>Hostel Ils — 2 nights × 345 MAD = 690 MAD</Text>
        <Text style={{ marginTop: 6 }}>Desert Camp Hostel — 1 night × 420 MAD = 420 MAD</Text>
        <Text style={{ marginTop: 6 }}>Service fees: 135 MAD</Text>
        <Text style={{ fontWeight: "700", marginTop: 10 }}>Total: 1,245 MAD (Figma cart example)</Text>
      </View>
      <TouchableOpacity onPress={() => go("booking")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 20 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
