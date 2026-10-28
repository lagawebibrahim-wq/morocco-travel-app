import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { SERVICE_FEE_MAD, bookingTotal } from "../data/places";
import { createBooking } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export default function BookingScreen({ nav, params }: ScreenProps) {
  const { user, clearCart } = useApp();
  const price = Number(params.pricePerDay ?? 345);
  const hostelName = String(params.hostelName ?? "Hostel Ils");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(plusDays(2));
  const [error, setError] = useState("");
  const [done, setDone] = useState<any>(null);
  const total = bookingTotal(nights, price);
  const submit = async () => {
    setError("");
    if (!user) { nav.navigate("auth"); return; }
    if (!params.hostelId) { setError("Choose a hostel first from Place Detail or Hostels."); return; }
    try {
      const b = await createBooking({ hostel_id: params.hostelId, check_in: checkIn, check_out: checkOut, guests });
      setDone(b); clearCart();
    } catch (e: any) { setError(e.message ?? "Booking failed. Is the API running?"); }
  };
  if (done) return (<ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}><Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>✓ Booking confirmed</Text><Card><Text>{hostelName}</Text><Text style={{ marginTop: 6 }}>Booking #{done.id} · {done.status ?? "pending"}</Text><Text style={{ marginTop: 6 }}>Total: {done.total_mad ?? total} MAD</Text></Card><View style={{ marginTop: 20 }}><OrangeButton label="See My Trips" onPress={() => nav.navigate("trips")} /></View></ScrollView>);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Booking & Payment</Text>
      <Card><Text style={{ fontWeight: "700" }}>{hostelName}</Text><Text style={{ color: colors.secondary }}>{price} MAD / Day</Text></Card>
      {!user ? <Text style={{ color: colors.cta, marginTop: 12 }}>You are browsing as a guest. Sign in to confirm a real booking.</Text> : null}
      <Text style={{ fontWeight: "700", marginTop: 20 }}>Check-in (YYYY-MM-DD)</Text>
      <TextInput value={checkIn} onChangeText={setCheckIn} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 6 }} />
      <Text style={{ fontWeight: "700", marginTop: 12 }}>Check-out (YYYY-MM-DD)</Text>
      <TextInput value={checkOut} onChangeText={setCheckOut} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 6 }} />
      <Text style={{ fontWeight: "700", marginTop: 16 }}>Nights: {nights}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setNights(Math.max(1, nights - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setNights(nights + 1)} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "700", marginTop: 16 }}>Guests: {guests}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setGuests(Math.min(10, guests + 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <Card><Text>{nights} nights × {price} MAD = {nights * price} MAD</Text><Text style={{ marginTop: 4 }}>Service fee: {SERVICE_FEE_MAD} MAD</Text><Text style={{ fontWeight: "700", marginTop: 8 }}>Total: {total} MAD</Text><Text style={{ color: colors.secondary, marginTop: 4 }}>Figma example: 725 MAD at 2 nights × 345 MAD. The server recalculates the total — never trust the client total alone.</Text></Card>
      {error ? <Text style={{ color: "red", marginTop: 12 }}>{error}</Text> : null}
      <View style={{ marginTop: 20, marginBottom: 30 }}><OrangeButton label={user ? "Confirm Booking" : "Sign in to Book"} onPress={submit} /></View>
    </ScrollView>
  );
}
