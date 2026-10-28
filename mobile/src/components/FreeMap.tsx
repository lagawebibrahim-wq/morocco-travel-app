import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { leafletHtml, type MapPlace } from "../utils/leaflet";
export default function FreeMap({ places, onMarkerPress }: { places: MapPlace[]; onMarkerPress: (id: string) => void }) {
  return (
    <View style={{ height: 320, borderRadius: 27, overflow: "hidden", marginTop: 16 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHtml(places) }}
        onMessage={(e) => onMarkerPress(e.nativeEvent.data)}
      />
    </View>
  );
}
