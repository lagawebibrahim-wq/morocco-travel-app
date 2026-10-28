import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";
import { OrangeButton } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function ProfileScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  const { user, signOut } = useApp();
  const items: [string, string][] = [[t("my_cart"), "cart"], [t("saved"), "saved"], [t("my_trips"), "trips"], [t("settings"), "settings"]];
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("hello")} {user?.name ?? "Ali"}</Text>
      <Text style={{ color: colors.secondary, marginTop: 4 }}>{user ? user.email : t("guest_hint")}</Text>
      {items.map(([label, screen]) => (
        <TouchableOpacity key={screen} onPress={() => nav.navigate(screen)} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>{label}</Text></TouchableOpacity>
      ))}
      <View style={{ marginTop: 20 }}>
        {user ? <OrangeButton label={t("log_out")} onPress={() => { signOut(); nav.navigate("start"); }} /> : <OrangeButton label={t("sign_in_register")} onPress={() => nav.navigate("auth")} />}
      </View>
    </ScrollView>
  );
}
