import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors } from "../theme";
import { getMyBookings } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function MyTripsScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  const { user } = useApp();
  const [list, setList] = useState<any[] | null>(null);
  useEffect(() => { if (user) getMyBookings().then(setList).catch(() => setList([])); }, [user]);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("my_trips")}</Text>
      {!user ? <Card><Text>{t("guest_trips_hint")}</Text><Text style={{ color: colors.secondary, marginTop: 6 }}>{t("demo_trip")}</Text><Text style={{ marginTop: 10, fontWeight: "700" }}>Hostel Ils — 2 {t("nights")} · 2 {t("guests")} · 725 MAD</Text></Card> : null}
      {user && list === null ? <Text style={{ marginTop: 16, color: colors.secondary }}>{t("loading")}</Text> : null}
      {user && list !== null && list.length === 0 ? <Text style={{ marginTop: 16, color: colors.secondary }}>{t("no_bookings")}</Text> : null}
      {(list ?? []).map((b: any) => (<Card key={String(b.id)}><Text style={{ fontWeight: "700" }}>{b.hostel?.name ?? "Booking"} #{b.id}</Text><Text style={{ marginTop: 4 }}>{b.check_in} → {b.check_out} · {b.guests} {t("guests")} · {b.status}</Text><Text style={{ marginTop: 4, fontWeight: "700" }}>{b.total_mad} MAD</Text></Card>))}
      <View style={{ marginTop: 20 }}><OrangeButton label={t("explore_more")} onPress={() => nav.navigate("explore")} /></View>
    </ScrollView>
  );
}
