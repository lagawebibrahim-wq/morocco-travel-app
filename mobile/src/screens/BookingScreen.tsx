import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { SERVICE_FEE_MAD, bookingTotal } from "../data/places";
import { createBooking } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
export default function BookingScreen({ nav, params }: ScreenProps) {
  const { t } = useLanguage();
  const { user, clearCart } = useApp();
  const price = Number(params.pricePerDay ?? 345);
  const hostelName = String(params.hostelName ?? "Hostel Ils");
  const [nights, setNights] = useState(2);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(plusDays(2));
  const [error, setError] = useState("");
  const [payment, setPayment] = useState<"cash" | "card">("cash");
  const [done, setDone] = useState<any>(null);
  const total = bookingTotal(nights, price);
  const submit = async () => {
    setError("");
    if (!user) { nav.navigate("auth"); return; }
    if (!params.hostelId) { setError(t("choose_hostel_first")); return; }
    try { const b = await createBooking({ hostel_id: params.hostelId, check_in: checkIn, check_out: checkOut, guests, payment_method: payment }); setDone(b); clearCart(); }
    catch (e: any) { setError(e.message ?? "Booking failed"); }
  };
  if (done) return (<ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}><Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>✓ {t("booking_confirmed")}</Text><Card><Text>{hostelName}</Text><Text style={{ marginTop: 6 }}>{t("booking_payment")} #{done.id} · {done.status ?? "pending"}</Text><Text style={{ marginTop: 6 }}>{t("total")}: {done.total_mad ?? total} MAD</Text><Text style={{ marginTop: 4 }}>{t("payment_method")}: {done.payment_method ?? payment}</Text></Card><View style={{ marginTop: 20 }}><OrangeButton label={t("my_trips")} onPress={() => nav.navigate("trips")} /></View></ScrollView>);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("booking_payment")}</Text>
      <Card><Text style={{ fontWeight: "700" }}>{hostelName}</Text><Text style={{ color: colors.secondary }}>{price} MAD / Day</Text></Card>
      {!user ? <Text style={{ color: colors.cta, marginTop: 12 }}>{t("guest_hint")}</Text> : null}
      <Text style={{ fontWeight: "700", marginTop: 20 }}>{t("check_in")}</Text>
      <TextInput value={checkIn} onChangeText={setCheckIn} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 6 }} />
      <Text style={{ fontWeight: "700", marginTop: 12 }}>{t("check_out")}</Text>
      <TextInput value={checkOut} onChangeText={setCheckOut} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 6 }} />
      <Text style={{ fontWeight: "700", marginTop: 16 }}>{t("nights")}: {nights}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setNights(Math.max(1, nights - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setNights(nights + 1)} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "700", marginTop: 16 }}>{t("guests")}: {guests}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setGuests(Math.max(1, guests - 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>−</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setGuests(Math.min(10, guests + 1))} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}><Text>+</Text></TouchableOpacity>
      </View>
      <Text style={{ fontWeight: "700", marginTop: 16 }}>{t("payment_method")}</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
        <TouchableOpacity onPress={() => setPayment("cash")} style={{ backgroundColor: payment === "cash" ? colors.cta : colors.card, borderRadius: 12, padding: 12, flex: 1 }}><Text style={{ textAlign: "center", fontWeight: "700", color: payment === "cash" ? "#fff" : colors.title }}>{t("cash_on_arrival")}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setPayment("card")} style={{ backgroundColor: payment === "card" ? colors.cta : colors.card, borderRadius: 12, padding: 12, flex: 1 }}><Text style={{ textAlign: "center", fontWeight: "700", color: payment === "card" ? "#fff" : colors.title }}>{t("card")}</Text></TouchableOpacity>
      </View>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>Card is recorded as payment method for now; no gateway charge is made in this version.</Text>
      <Card><Text>{nights} × {price} MAD = {nights * price} MAD</Text><Text style={{ marginTop: 4 }}>{t("service_fee")}: {SERVICE_FEE_MAD} MAD</Text><Text style={{ fontWeight: "700", marginTop: 8 }}>{t("total")}: {total} MAD</Text></Card>
      {error ? <Text style={{ color: "red", marginTop: 12 }}>{error}</Text> : null}
      <View style={{ marginTop: 20, marginBottom: 30 }}><OrangeButton label={user ? t("confirm_booking") : t("sign_in_to_book")} onPress={submit} /></View>
    </ScrollView>
  );
}
