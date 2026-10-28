import type { Locale } from "./dictionaries";
export const isRTL = (locale: Locale) => locale === "ar";
export const rowDirection = (locale: Locale): "row" | "row-reverse" => (locale === "ar" ? "row-reverse" : "row");
export const textAlign = (locale: Locale): "right" | "left" => (locale === "ar" ? "right" : "left");
