import { leafletHtml } from "../utils/leaflet";
import { isRTL, rowDirection, textAlign } from "../i18n/rtl";
describe("free map (OpenStreetMap + Leaflet, no API key)", () => {
  it("includes OSM tiles and markers, no Google API key", () => {
    const html = leafletHtml([{ id: "marzouga", name: "Merzouga", lat: 31.0997, lng: -4.0117 }]);
    expect(html).toContain("tile.openstreetmap.org");
    expect(html).toContain("31.0997");
    expect(html).toContain("ReactNativeWebView.postMessage");
    expect(html).not.toContain("maps.googleapis.com");
    expect(html).not.toContain("API_KEY");
  });
});
describe("RTL flip for Arabic", () => {
  it("ar is RTL, fr/en are LTR", () => {
    expect(isRTL("ar")).toBe(true);
    expect(isRTL("fr")).toBe(false);
    expect(isRTL("en")).toBe(false);
  });
  it("row direction flips to row-reverse in ar", () => {
    expect(rowDirection("ar")).toBe("row-reverse");
    expect(rowDirection("en")).toBe("row");
    expect(textAlign("ar")).toBe("right");
    expect(textAlign("fr")).toBe("left");
  });
});
