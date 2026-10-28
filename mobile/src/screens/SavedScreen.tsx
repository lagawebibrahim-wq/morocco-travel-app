import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places as localPlaces } from "../data/places";
import { getFavorites } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card } from "../components/ui";
import type { ScreenProps } from "../types";
export default function SavedScreen({ nav }: ScreenProps) {
  const { user, savedIds, toggleSaved } = useApp();
  const [server, setServer] = useState<any[] | null>(null);
  useEffect(() => { if (user) getFavorites().then(setServer).catch(() => setServer([])); }, [user]);
  const list = user && server !== null ? server.map((f: any) => f.place).filter(Boolean) : localPlaces.filter((p) => savedIds.includes(p.id));
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Saved</Text>
      {list.length === 0 ? <Text style={{ marginTop: 16, color: colors.secondary }}>Nothing saved yet. Tap ♡ on a place detail.</Text> : null}
      {list.map((p: any) => (
        <TouchableOpacity key={String(p.id)} onPress={() => nav.navigate("detail", { placeId: String(p.id) })}>
          <Card><Text style={{ fontWeight: "700" }}>♥ {p.name}</Text><Text style={{ color: colors.secondary }}>{p.location} · ⭐ {p.rating}</Text></Card>
        </TouchableOpacity>
      ))}
      {!user ? <TouchableOpacity onPress={() => toggleSaved("marzouga")} style={{ marginTop: 16 }}><Text style={{ color: colors.cta, fontWeight: "700" }}>Guest demo: toggle Merzouga saved</Text></TouchableOpacity> : null}
    </ScrollView>
  );
}
