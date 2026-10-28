import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme";
import { places as localPlaces } from "../data/places";
import { getPlaces } from "../api/client";
import { Card } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function CityDetailScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  const [list, setList] = useState<any[]>(localPlaces);
  useEffect(() => { getPlaces().then((d: any[]) => { if (Array.isArray(d) && d.length) setList(d.map((p: any) => ({ id: String(p.id), name: p.name, location: p.location, distanceKm: Number(p.distance_km ?? 0), rating: Number(p.rating ?? 4.5), travelers: Number(p.travelers_count ?? 15) }))); }).catch(() => {}); }, []);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "700", color: colors.title }}>Marrakech</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>{t("travel_places")}</Text>
      {list.map((p) => (
        <TouchableOpacity key={p.id} onPress={() => nav.navigate("detail", { placeId: p.id })}>
          <Card><Text style={{ fontWeight: "700" }}>{p.name}</Text><Text style={{ color: colors.secondary }}>{p.distanceKm} Km · ⭐ {p.rating} · +{p.travelers}</Text></Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
