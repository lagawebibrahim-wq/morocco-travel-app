import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { colors, radius } from "../theme";
import { login, register } from "../api/client";
import { useApp } from "../context/AppContext";
import { OrangeButton } from "../components/ui";
import type { ScreenProps } from "../types";
export default function AuthScreen({ nav }: ScreenProps) {
  const { signIn } = useApp();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async () => {
    setError("");
    try {
      const res = mode === "login" ? await login(email, password) : await register(name, email, password);
      signIn(res.user, res.token); nav.navigate("explore");
    } catch (e: any) { setError(e.message ?? "Auth failed. Is the API running?"); }
  };
  return (
    <ScrollView style={{ backgroundColor: colors.bg, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", color: colors.title }}>{mode === "login" ? "Sign in" : "Create account"}</Text>
      {mode === "register" ? <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 16 }} /> : null}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 12 }} />
      <TextInput placeholder="Password (min 8)" value={password} onChangeText={setPassword} secureTextEntry style={{ backgroundColor: colors.card, borderRadius: 12, padding: 12, marginTop: 12 }} />
      {error ? <Text style={{ color: "red", marginTop: 12 }}>{error}</Text> : null}
      <View style={{ marginTop: 20 }}><OrangeButton label={mode === "login" ? "Sign in" : "Register"} onPress={submit} /></View>
      <TouchableOpacity onPress={() => setMode(mode === "login" ? "register" : "login")} style={{ marginTop: 16 }}><Text style={{ textAlign: "center", color: colors.cta, fontWeight: "700" }}>{mode === "login" ? "No account? Register" : "Already have an account? Sign in"}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate("explore")} style={{ marginTop: 12 }}><Text style={{ textAlign: "center", color: colors.secondary }}>Continue as guest</Text></TouchableOpacity>
    </ScrollView>
  );
}
