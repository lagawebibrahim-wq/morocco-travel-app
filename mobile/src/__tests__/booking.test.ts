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
