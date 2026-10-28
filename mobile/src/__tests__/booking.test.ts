import { bookingTotal, SERVICE_FEE_MAD } from "../data/places";
import { filterPlaces, cartTotal } from "../utils/search";
describe("bookingTotal (Figma example)", () => {
  it("2 nights x 345 + 35 fee = 725", () => { expect(bookingTotal(2, 345)).toBe(725); });
  it("service fee is 35 MAD", () => { expect(SERVICE_FEE_MAD).toBe(35); });
  it("1 night = price + fee", () => { expect(bookingTotal(1, 345)).toBe(380); });
});
describe("cartTotal", () => {
  it("empty cart = 0", () => { expect(cartTotal([], 35)).toBe(0); });
  it("sums nights x price + fee", () => { expect(cartTotal([{ pricePerDay: 345, nights: 2 }, { pricePerDay: 420, nights: 1 }], 35)).toBe(1145); });
});
describe("filterPlaces", () => {
  const list = [{ name: "Imlil Marrakesh" }, { name: "Agafay" }];
  it("filters case-insensitively", () => { expect(filterPlaces(list, "imlil")).toEqual([{ name: "Imlil Marrakesh" }]); });
  it("empty query returns all", () => { expect(filterPlaces(list, "")).toEqual(list); });
});

import { dictionaries, translate } from "../i18n/dictionaries";
describe("i18n dictionaries (same keys as backend seeder)", () => {
  it("ar/fr/en all have book_now", () => {
    expect(dictionaries.ar.book_now).toBe("احجز الآن");
    expect(dictionaries.fr.book_now).toBe("Réserver");
    expect(dictionaries.en.book_now).toBe("Book Now");
  });
  it("translate falls back to en for a missing key in a locale", () => {
    expect(translate("ar", "book_now")).toBe("احجز الآن");
    expect(translate("ar", "no_such_key_xyz")).toBe("no_such_key_xyz");
  });
  it("all locales share the same key set", () => {
    const en = Object.keys(dictionaries.en).sort();
    expect(Object.keys(dictionaries.ar).sort()).toEqual(en);
    expect(Object.keys(dictionaries.fr).sort()).toEqual(en);
  });
});
