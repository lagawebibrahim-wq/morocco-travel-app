import React from "react";
import { Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places } from "../data/places";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function MapScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("map")}</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>{t("map_hint")}</Text>
      <View style={{ backgroundColor: "#e8e0d5", borderRadius: radius.card, marginTop: 16, padding: 16 }}>
        {places.map((p) => (
          <TouchableOpacity key={p.id} onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${p.lat},${p.lng}`)}>
            <Text style={{ fontWeight: "700", marginTop: 12 }}>📍 {p.name.split(" ")[0]} — {p.distanceKm} Km → Maps</Text>
          </TouchableOpacity>
        ))}
      </View>
      {places.slice(0, 2).map((p) => (
        <TouchableOpacity key={p.id} onPress={() => nav.navigate("detail", { placeId: p.id })}>
          <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 12, marginTop: 12 }}>
            <Text style={{ fontWeight: "700" }}>{p.name}</Text><Text style={{ color: colors.secondary }}>{p.location}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
