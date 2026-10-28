import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors } from "../theme";
import { getMyBookings } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
export default function MyTripsScreen({ nav }: ScreenProps) {
  const { user } = useApp();
  const [list, setList] = useState<any[] | null>(null);
  useEffect(() => { if (user) getMyBookings().then(setList).catch(() => setList([])); }, [user]);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>My Trips</Text>
      {!user ? <Card><Text>Sign in to see your real bookings.</Text><Text style={{ color: colors.secondary, marginTop: 6 }}>Demo trip below is the Figma example, not a server booking.</Text><Text style={{ marginTop: 10, fontWeight: "700" }}>Hostel Ils — 2 nights · 2 guests · 725 MAD</Text></Card> : null}
      {user && list === null ? <Text style={{ marginTop: 16, color: colors.secondary }}>Loading…</Text> : null}
      {user && list !== null && list.length === 0 ? <Text style={{ marginTop: 16, color: colors.secondary }}>No bookings yet.</Text> : null}
      {(list ?? []).map((b: any) => (<Card key={String(b.id)}><Text style={{ fontWeight: "700" }}>{b.hostel?.name ?? "Booking"} #{b.id}</Text><Text style={{ marginTop: 4 }}>{b.check_in} → {b.check_out} · {b.guests} guests · {b.status}</Text><Text style={{ marginTop: 4, fontWeight: "700" }}>{b.total_mad} MAD</Text></Card>))}
      <View style={{ marginTop: 20 }}><OrangeButton label="Explore more" onPress={() => nav.navigate("explore")} /></View>
    </ScrollView>
  );
}
