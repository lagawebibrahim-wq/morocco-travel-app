import React from "react";
import { ScrollView, Text, View } from "react-native";
import { colors, radius } from "../theme";
import { OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
export default function StartScreen({ nav }: ScreenProps) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: "700", color: colors.title }}>Start Traveling</Text>
      <Text style={{ color: colors.secondary, marginTop: 12, fontSize: 16 }}>Explore the beautiful cities of Morocco — Marrakech, Merzouga, Imlil and Agafay.</Text>
      <View style={{ marginTop: 32, gap: 12 }}><OrangeButton label="Start Traveling →" onPress={() => nav.navigate("explore")} /><OrangeButton label="Sign in / Register" onPress={() => nav.navigate("auth")} /></View>
    </ScrollView>
  );
}
