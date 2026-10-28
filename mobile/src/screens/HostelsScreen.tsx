import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { hostels as localHostels } from "../data/places";
import { getHostels } from "../api/client";
import { Card } from "../components/ui";
import type { ScreenProps } from "../types";
export default function HostelsScreen({ nav, params }: ScreenProps) {
  const [list, setList] = useState<any[]>(localHostels);
  useEffect(() => { getHostels(params.placeId).then((hs: any[]) => { if (Array.isArray(hs) && hs.length) setList(hs.map((h: any) => ({ id: String(h.id), name: h.name, pricePerDay: Number(h.price_per_day_mad), rating: Number(h.rating ?? 4.5) }))); }).catch(() => {}); }, [params.placeId]);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Hostels</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>Marrakech region — price per day, rating first.</Text>
      {list.map((h) => (
        <TouchableOpacity key={h.id} onPress={() => nav.navigate("booking", { hostelId: h.id, pricePerDay: h.pricePerDay, hostelName: h.name })}>
          <Card>
            <View style={{ height: 110, backgroundColor: colors.search, borderRadius: radius.image }} />
            <Text style={{ fontWeight: "700", marginTop: 10 }}>{h.name}</Text>
            <Text style={{ color: colors.secondary }}>⭐ {h.rating} · Marrakech, Morocco</Text>
            <Text style={{ color: colors.cta, fontWeight: "700", marginTop: 4 }}>{h.pricePerDay} MAD / Day</Text>
          </Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
