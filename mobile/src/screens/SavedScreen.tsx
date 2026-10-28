import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme";
import { places as localPlaces } from "../data/places";
import { getFavorites } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function SavedScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  const { user, savedIds } = useApp();
  const [server, setServer] = useState<any[] | null>(null);
  useEffect(() => { if (user) getFavorites().then(setServer).catch(() => setServer([])); }, [user]);
  const list = user && server !== null ? server.map((f: any) => f.place).filter(Boolean) : localPlaces.filter((p) => savedIds.includes(p.id));
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("saved")}</Text>
      {list.length === 0 ? <Text style={{ marginTop: 16, color: colors.secondary }}>{t("empty_saved")}</Text> : null}
      {list.map((p: any) => (
        <TouchableOpacity key={String(p.id)} onPress={() => nav.navigate("detail", { placeId: String(p.id) })}>
          <Card><Text style={{ fontWeight: "700" }}>♥ {p.name}</Text><Text style={{ color: colors.secondary }}>{p.location} · ⭐ {p.rating}</Text></Card>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
