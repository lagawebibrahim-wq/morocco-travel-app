import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../theme";
import { SERVICE_FEE_MAD } from "../data/places";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function CartScreen({ nav }: ScreenProps) {
  const { t } = useLanguage();
  const { cart, removeFromCart, clearCart } = useApp();
  const subtotal = cart.reduce((s, i) => s + i.pricePerDay * i.nights, 0);
  const total = cart.length ? subtotal + SERVICE_FEE_MAD : 0;
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{t("my_cart")}</Text>
      {cart.length === 0 ? <Card><Text>{t("empty_cart")}</Text></Card> : null}
      {cart.map((i) => (
        <Card key={i.id}><View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ fontWeight: "700" }}>{i.name}</Text><Text>{i.nights} × {i.pricePerDay} MAD</Text></View><TouchableOpacity onPress={() => removeFromCart(i.id)} style={{ marginTop: 8 }}><Text style={{ color: colors.cta }}>{t("remove")}</Text></TouchableOpacity></Card>
      ))}
      {cart.length ? (<><Card><Text>{t("subtotal")}: {subtotal} MAD</Text><Text style={{ marginTop: 4 }}>{t("service_fee")}: {SERVICE_FEE_MAD} MAD</Text><Text style={{ fontWeight: "700", marginTop: 8 }}>{t("total")}: {total} MAD</Text></Card><View style={{ marginTop: 20, gap: 12 }}><OrangeButton label={t("checkout_first")} onPress={() => nav.navigate("booking", { hostelId: cart[0].id, pricePerDay: cart[0].pricePerDay, hostelName: cart[0].name })} /><TouchableOpacity onPress={clearCart} style={{ padding: 12 }}><Text style={{ textAlign: "center", color: colors.secondary }}>{t("clear_cart")}</Text></TouchableOpacity></View></>) : null}
    </ScrollView>
  );
}
