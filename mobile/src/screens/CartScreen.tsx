import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { SERVICE_FEE_MAD } from "../data/places";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
export default function CartScreen({ nav }: ScreenProps) {
  const { cart, removeFromCart, clearCart } = useApp();
  const subtotal = cart.reduce((s, i) => s + i.pricePerDay * i.nights, 0);
  const total = cart.length ? subtotal + SERVICE_FEE_MAD : 0;
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>My Cart</Text>
      {cart.length === 0 ? <Card><Text>Your cart is empty.</Text><Text style={{ color: colors.secondary, marginTop: 6 }}>Figma example cart total was 1,245 MAD. Add hostels from Place Detail to build your own cart.</Text></Card> : null}
      {cart.map((i) => (
        <Card key={i.id}><View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ fontWeight: "700" }}>{i.name}</Text><Text>{i.nights} × {i.pricePerDay} MAD</Text></View><TouchableOpacity onPress={() => removeFromCart(i.id)} style={{ marginTop: 8 }}><Text style={{ color: colors.cta }}>Remove</Text></TouchableOpacity></Card>
      ))}
      {cart.length ? (<><Card><Text>Subtotal: {subtotal} MAD</Text><Text style={{ marginTop: 4 }}>Service fee: {SERVICE_FEE_MAD} MAD</Text><Text style={{ fontWeight: "700", marginTop: 8 }}>Total: {total} MAD</Text></Card><View style={{ marginTop: 20, gap: 12 }}><OrangeButton label="Checkout first item" onPress={() => nav.navigate("booking", { hostelId: cart[0].id, pricePerDay: cart[0].pricePerDay, hostelName: cart[0].name })} /><TouchableOpacity onPress={clearCart} style={{ padding: 12 }}><Text style={{ textAlign: "center", color: colors.secondary }}>Clear cart</Text></TouchableOpacity></View></>) : null}
    </ScrollView>
  );
}
