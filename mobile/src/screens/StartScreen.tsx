import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { OrangeButton } from "../components/ui";
import { SUPPORTED_LOCALES } from "../i18n/dictionaries";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function StartScreen({ nav }: ScreenProps) {
  const { t, locale, setLocale, rtl } = useLanguage();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", backgroundColor: colors.bg, padding: 24 }}>
      <Text style={{ fontSize: 32, fontWeight: "700", color: colors.title }}>{t("start_traveling")}</Text>
      <Text style={{ color: colors.secondary, marginTop: 12, fontSize: 16 }}>{t("start_subtitle")}</Text>
      <View style={{ flexDirection: rtl ? "row-reverse" : "row", gap: 10, marginTop: 24 }}>
        {SUPPORTED_LOCALES.map((l) => (
          <TouchableOpacity key={l.code} onPress={() => setLocale(l.code)} style={{ backgroundColor: locale === l.code ? colors.cta : colors.card, borderRadius: 12, padding: 12, flex: 1 }}>
            <Text style={{ textAlign: "center", fontWeight: "700", color: locale === l.code ? "#fff" : colors.title }}>{l.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ marginTop: 24, gap: 12 }}><OrangeButton label={t("start_traveling") + " →"} onPress={() => nav.navigate("explore")} /><OrangeButton label={t("sign_in_register")} onPress={() => nav.navigate("auth")} /></View>
    </ScrollView>
  );
}
