import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";

const items = ["Profile", "My Cart", "Saved", "Historical", "Activities"];
export default function ProfileScreen({ go }: { go: (s: string) => void }) {
  const map: Record<string, string> = { "My Cart": "cart", Saved: "saved", Profile: "profile" };
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>Hello Ali</Text>
      <Text style={{ color: colors.secondary, marginTop: 4 }}>Side menu from the Figma travel file.</Text>
      {items.map((it) => (
        <TouchableOpacity key={it} onPress={() => go(map[it] ?? "explore")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}>
          <Text style={{ fontWeight: "600" }}>{it}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => go("settings")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}>
        <Text style={{ fontWeight: "600" }}>Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
