export type MapPlace = { id: string; name: string; lat: number; lng: number };
export function leafletHtml(places: MapPlace[]): string {
  const markers = JSON.stringify(places);
  return `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>html,body,#map{height:100%;margin:0;padding:0}</style></head><body><div id="map"></div><script>
var places = ${markers};
var map = L.map("map").setView([31.6, -7.9], 6);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap contributors" }).addTo(map);
places.forEach(function(p){
  var m = L.marker([p.lat, p.lng]).addTo(map).bindPopup(p.name);
  m.on("click", function(){ window.ReactNativeWebView.postMessage(p.id); });
});
</script></body></html>`;
}
