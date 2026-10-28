import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
export default function BookingScreen({ go }: { go: (s: string) => void }) {
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const price = 345;
  const total = nights * price + 35; // 35 MAD service fee, matching the 725 MAD Figma example at 2 nights
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Booking & Payment</Text>
      <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 16, marginTop: 16 }}>
        <Text style={{ fontWeight: "700" }}>Hostel Ils</Text>
        <Text style={{ color: colors.secondary }}>Marrakech, Morocco · {price} MAD / Day</Text>
      </View>
      <Text style={{ fontWeight: "700", marginTop: 20 }}>Nights: {nights}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setNights(Math.max(1, nights - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setNights(nights + 1)} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "700", marginTop: 16 }}>Guests: {guests}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setGuests(guests + 1)} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 16, marginTop: 20 }}>
        <Text>{nights} nights × {price} MAD = {nights * price} MAD</Text>
        <Text style={{ marginTop: 4 }}>Service fee: 35 MAD</Text>
        <Text style={{ fontWeight: "700", marginTop: 8 }}>Total: {total} MAD</Text>
        <Text style={{ color: colors.secondary, marginTop: 4 }}>Figma example: 725 MAD at 2 nights. Server calculates the real total in Laravel — see docs/API.md.</Text>
      </View>
      <TouchableOpacity onPress={() => go("trips")} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16, marginTop: 20, marginBottom: 30 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
