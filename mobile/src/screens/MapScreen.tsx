import React, { useEffect, useState } from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places as localPlaces } from "../data/places";
import { getPlaces } from "../api/client";
import { useLanguage } from "../context/LanguageContext";
import { rowDirection } from "../i18n/rtl";
import FreeMap from "../components/FreeMap";
import type { ScreenProps } from "../types";
export default function MapScreen({ nav }: ScreenProps) {
  const { t, locale } = useLanguage();
  const [list, setList] = useState<any[]>(localPlaces.map((p) => ({ id: p.id, name: p.name, location: p.location, distanceKm: p.distanceKm, lat: p.lat, lng: p.lng })));
  useEffect(() => {
    getPlaces().then((d: any[]) => {
      if (Array.isArray(d) && d.length) {
        setList(d.map((p: any) => ({
          id: String(p.id), name: p.name, location: p.location, distanceKm: Number(p.distance_km ?? 0),
          lat: Number(p.latitude ?? 31.6295), lng: Number(p.longitude ?? -7.9811),
        })).filter((p) => p.lat && p.lng));
      }
    }).catch(() => {});
  }, []);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("map")}</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>{t("map_hint")} — Free map: OpenStreetMap + Leaflet, no API key, data from backend (/api/places).</Text>
      <FreeMap places={list.map((p) => ({ id: p.id, name: p.name, lat: p.lat, lng: p.lng }))} onMarkerPress={(id) => nav.navigate("detail", { placeId: id })} />
      <View style={{ backgroundColor: colors.card, borderRadius: radius.card, marginTop: 16, padding: 16 }}>
        {list.map((p) => (
          <TouchableOpacity key={p.id} onPress={() => Linking.openURL(`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=12/${p.lat}/${p.lng}`)}>
            <Text style={{ fontWeight: "700", marginTop: 12 }}>📍 {p.name} — {p.distanceKm} Km → OpenStreetMap</Text>
          </TouchableOpacity>
        ))}
      </View>
      {list.slice(0, 2).map((p) => (
        <TouchableOpacity key={p.id} onPress={() => nav.navigate("detail", { placeId: p.id })}>
          <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 12, marginTop: 12, flexDirection: rowDirection(locale) }}>
            <Text style={{ fontWeight: "700" }}>{p.name}</Text><Text style={{ color: colors.secondary }}> {p.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
