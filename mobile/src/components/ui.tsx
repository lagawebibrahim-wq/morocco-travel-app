import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
export function OrangeButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (<TouchableOpacity onPress={onPress} style={{ backgroundColor: colors.cta, borderRadius: radius.button, padding: 16 }}><Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>{label}</Text></TouchableOpacity>);
}
export function Card({ children }: { children: React.ReactNode }) {
  return (<View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, marginTop: 12 }}>{children}</View>);
}
export function Stars({ rating }: { rating: number }) {
  return (<Text style={{ color: colors.gold }}>⭐ {rating.toFixed(1)}</Text>);
}
