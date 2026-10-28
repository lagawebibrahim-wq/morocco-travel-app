import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places as localPlaces } from "../data/places";
import { getPlaces } from "../api/client";
import { Card, OrangeButton, Stars } from "../components/ui";
import type { ScreenProps } from "../types";
export default function ExploreScreen({ nav }: ScreenProps) {
  const [q, setQ] = useState("");
  const [list, setList] = useState<any[]>(localPlaces);
  useEffect(() => { getPlaces().then((d) => { if (Array.isArray(d) && d.length) setList(d.map((p: any) => ({ id: String(p.id), name: p.name, location: p.location, distanceKm: Number(p.distance_km ?? 0), rating: Number(p.rating ?? 4.5), travelers: Number(p.travelers_count ?? 15) }))); }).catch(() => {}); }, []);
  const shown = list.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.title }}>Explore the Beautiful City in the World</Text>
      <View style={{ backgroundColor: colors.search, borderRadius: radius.search, padding: 14, marginTop: 16 }}>
        <TextInput placeholder="Search places" placeholderTextColor={colors.secondary} value={q} onChangeText={setQ} />
      </View>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "700", color: colors.title }}>Categories</Text>
      <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
        <TouchableOpacity onPress={() => nav.navigate("city")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 14, flex: 1 }}><Text style={{ fontWeight: "600" }}>Cities</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate("hostels")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 14, flex: 1 }}><Text style={{ fontWeight: "600" }}>Places</Text></TouchableOpacity>
      </View>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "700", color: colors.title }}>Travel Places</Text>
      {shown.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => nav.navigate("detail", { placeId: p.id })}>
          <Card>
            <View style={{ height: 132, backgroundColor: colors.search, borderRadius: radius.image }} />
            <Text style={{ marginTop: 10, fontWeight: "700", color: colors.title }}>{p.name}</Text>
            <Text style={{ color: colors.secondary }}>📍 {p.location} · {p.distanceKm} Km</Text>
            <Stars rating={p.rating} />
            <Text style={{ color: colors.gold, marginTop: 4 }}>●●● +{p.travelers}</Text>
          </Card>
        </TouchableOpacity>
      ))}
      <View style={{ marginTop: 20, marginBottom: 30 }}><OrangeButton label="Book Now" onPress={() => nav.navigate("booking")} /></View>
    </ScrollView>
  );
}
