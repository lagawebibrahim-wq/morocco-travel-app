import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { useApp } from "../context/AppContext";
import { SUPPORTED_LOCALES } from "../i18n/dictionaries";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function SettingsScreen({ nav }: ScreenProps) {
  const { t, locale, setLocale, source, rtl } = useLanguage();
  const { user, signOut } = useApp();
  const [currency, setCurrency] = useState("MAD");
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("settings")}</Text>
      <Text style={{ fontWeight: "700", marginTop: 20 }}>{t("language")} — {source === "backend" ? "backend" : "fallback"}</Text>
      <View style={{ flexDirection: rtl ? "row-reverse" : "row", gap: 10, marginTop: 10 }}>
        {SUPPORTED_LOCALES.map((l) => (
          <TouchableOpacity key={l.code} onPress={() => setLocale(l.code)} style={{ backgroundColor: locale === l.code ? colors.cta : colors.card, borderRadius: 12, padding: 12, flex: 1 }}>
            <Text style={{ textAlign: "center", fontWeight: "700", color: locale === l.code ? "#fff" : colors.title }}>{l.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => setCurrency(currency === "MAD" ? "EUR" : "MAD")} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>{t("currency")}: {currency} ({t("currency_note")})</Text></TouchableOpacity>
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 12 }}><Text style={{ fontWeight: "600" }}>Marrakech</Text><Text style={{ color: colors.secondary, marginTop: 4 }}>{t("travel_places")}</Text></View>
      {user ? <TouchableOpacity onPress={() => { signOut(); nav.navigate("start"); }} style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginTop: 20 }}><Text style={{ fontWeight: "700", color: colors.cta, textAlign: "center" }}>{t("log_out")}</Text></TouchableOpacity> : null}
    </ScrollView>
  );
}
