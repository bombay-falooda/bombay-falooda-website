"use client";

import { productFlavours } from "@/lib/content";

export type ProductFlavour = (typeof productFlavours)[number];

export function applyFlavourTheme(flavour: ProductFlavour) {
  document.documentElement.style.setProperty("--theme-accent", flavour.color);
  document.documentElement.style.setProperty("--theme-soft", flavour.subtle);
  document.documentElement.style.setProperty("--theme-glow", flavour.glow);
  document.documentElement.style.setProperty("--bg-subtle", flavour.subtle);
  window.localStorage.setItem("selectedFlavour", flavour.key);
}

export function getSavedFlavour() {
  if (typeof window === "undefined") {
    return productFlavours[0];
  }

  const saved = window.localStorage.getItem("selectedFlavour");
  return productFlavours.find((flavour) => flavour.key === saved) || productFlavours[0];
}
