import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { places as localPlaces, hostels as localHostels } from "../data/places";
import { getPlace, getHostels, postReview } from "../api/client";
import { useApp } from "../context/AppContext";
import { Card, OrangeButton, Stars } from "../components/ui";
import { useLanguage } from "../context/LanguageContext";
import type { ScreenProps } from "../types";
export default function PlaceDetailScreen({ nav, params }: ScreenProps) {
  const { t, rtl } = useLanguage();
  const { savedIds, toggleSaved, addToCart, user } = useApp();
  const placeId = String(params.placeId ?? "marzouga");
  const local: any = localPlaces.find((p) => p.id === placeId) ?? localPlaces[0];
  const [place, setPlace] = useState<any>(local);
  const [hostelList, setHostelList] = useState<any[]>(localHostels.filter((h) => h.placeId === placeId));
  const [reviews, setReviews] = useState<any[]>([]);
  const [myRating, setMyRating] = useState(5);
  const [myComment, setMyComment] = useState("");
  useEffect(() => {
    getPlace(placeId).then((p: any) => { setPlace({ id: String(p.id), name: p.name, location: p.location, distanceKm: Number(p.distance_km ?? 0), rating: Number(p.rating ?? 4.5), travelers: Number(p.travelers_count ?? 15), description: p.description, image_url: p.image_url }); if (Array.isArray(p.reviews)) setReviews(p.reviews); }).catch(() => {});
    getHostels(placeId).then((hs: any[]) => { if (Array.isArray(hs) && hs.length) setHostelList(hs.map((h: any) => ({ id: String(h.id), name: h.name, pricePerDay: Number(h.price_per_day_mad), rating: Number(h.rating ?? 4.5) }))); }).catch(() => {});
  }, [placeId]);
  const saved = savedIds.includes(placeId);
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      {place.image_url ? <Image source={{ uri: place.image_url }} style={{ height: 220, borderRadius: radius.image }} /> : <View style={{ height: 220, backgroundColor: colors.search, borderRadius: radius.image }} /> }
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title, marginTop: 16 }}>{place.name}</Text>
      <Text style={{ color: colors.secondary, marginTop: 6 }}>📍 {place.location} · {place.distanceKm} Km</Text>
      <Stars rating={place.rating} />
      <Text style={{ color: colors.gold, marginTop: 6 }}>●●● +{place.travelers}</Text>
      {place.description ? <Text style={{ color: colors.secondary, marginTop: 12 }}>{place.description}</Text> : null}
      <TouchableOpacity onPress={() => toggleSaved(placeId)} style={{ marginTop: 14 }}><Text style={{ fontWeight: "700", color: colors.cta }}>{saved ? "♥ " + t("saved_remove") : "♡ " + t("save_place")}</Text></TouchableOpacity>
      {hostelList.map((h) => (
        <Card key={h.id}>
          <View style={{ flexDirection: rtl ? "row-reverse" : "row", justifyContent: "space-between" }}>
            <Text style={{ fontWeight: "700" }}>{h.name}</Text>
            <Text style={{ color: colors.cta, fontWeight: "700" }}>{h.pricePerDay} MAD / Day</Text>
          </View>
          <View style={{ flexDirection: rtl ? "row-reverse" : "row", gap: 10, marginTop: 10 }}>
            <TouchableOpacity onPress={() => nav.navigate("booking", { hostelId: h.id, pricePerDay: h.pricePerDay, hostelName: h.name })} style={{ backgroundColor: colors.cta, borderRadius: 12, padding: 10, flex: 1 }}><Text style={{ color: "#fff", textAlign: "center", fontWeight: "700" }}>{t("book_now")}</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => addToCart({ id: String(h.id), name: h.name, pricePerDay: h.pricePerDay, nights: 2 })} style={{ backgroundColor: colors.search, borderRadius: 12, padding: 10, flex: 1 }}><Text style={{ textAlign: "center", fontWeight: "700" }}>{t("add_to_cart")}</Text></TouchableOpacity>
          </View>
        </Card>
      ))}
      <Text style={{ fontSize: 18, fontWeight: "700", color: colors.title, marginTop: 20 }}>Reviews ({reviews.length})</Text>
      {reviews.map((r: any) => (
        <Card key={r.id}><Text style={{ fontWeight: "700" }}>{r.user_name ?? "Traveler"} · {"★".repeat(Number(r.rating ?? 5))}</Text>{r.comment ? <Text style={{ color: colors.secondary, marginTop: 4 }}>{r.comment}</Text> : null}</Card>
      ))}
      {user ? (
        <Card>
          <Text style={{ fontWeight: "700" }}>Your rating</Text>
          <View style={{ flexDirection: rtl ? "row-reverse" : "row", gap: 8, marginTop: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (<TouchableOpacity key={n} onPress={() => setMyRating(n)}><Text style={{ fontSize: 24, color: n <= myRating ? colors.gold : colors.secondary }}>{n <= myRating ? "★" : "☆"}</Text></TouchableOpacity>))}
          </View>
          <TextInput value={myComment} onChangeText={setMyComment} placeholder="Share your experience..." placeholderTextColor={colors.secondary} multiline style={{ borderWidth: 1, borderColor: colors.search, borderRadius: 12, padding: 10, marginTop: 10, color: colors.title }} />
          <View style={{ marginTop: 10 }}><OrangeButton label="Submit review" onPress={() => { const backendId = place.id; postReview(backendId, myRating, myComment).then((r: any) => { setReviews((prev) => [r, ...prev.filter((x: any) => x.id !== r.id)]); setMyComment(""); }).catch(() => {}); }} /></View>
        </Card>
      ) : (
        <TouchableOpacity onPress={() => nav.navigate("auth", {})}><Text style={{ color: colors.cta, fontWeight: "700", marginTop: 8 }}>Log in to write a review →</Text></TouchableOpacity>
      )}
      <View style={{ marginTop: 20, marginBottom: 30 }}><OrangeButton label={t("book_now")} onPress={() => nav.navigate("booking", { hostelId: hostelList[0]?.id, pricePerDay: hostelList[0]?.pricePerDay, hostelName: hostelList[0]?.name })} /></View>
    </ScrollView>
  );
}
