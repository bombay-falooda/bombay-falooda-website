"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { useSiteCart } from "@/components/site-shell";
import {
  websiteRequest,
  type WebsiteMenuCategory,
  type WebsiteOutlet,
} from "@/lib/api";
import { fallbackMenu } from "@/lib/content";

type OutletsResponse = {
  nearestOutlet: WebsiteOutlet | null;
  outlets: WebsiteOutlet[];
};

const ORDER_CONTEXT_KEY = "bf_order_context";

export default function OrderPage() {
  const { addItem, cartCount } = useSiteCart();
  const [outlets, setOutlets] = useState<WebsiteOutlet[]>([]);
  const [selectedOutlet, setSelectedOutlet] = useState<WebsiteOutlet | null>(null);
  const [categories, setCategories] = useState<WebsiteMenuCategory[]>(fallbackMenu);
  const [activeCategory, setActiveCategory] = useState("all");
  const [orderType, setOrderType] = useState<"DINE_IN" | "TAKEAWAY" | "DELIVERY">("TAKEAWAY");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const items = useMemo(
    () =>
      categories.flatMap((category) =>
        category.items.map((item) => ({ ...item, categoryName: category.name })),
      ),
    [categories],
  );
  const visibleItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.categoryName === activeCategory);
  const enabledOrderTypes = [
    selectedOutlet?.dineIn ? "DINE_IN" : null,
    selectedOutlet?.takeaway ? "TAKEAWAY" : null,
    selectedOutlet?.delivery ? "DELIVERY" : null,
  ].filter(Boolean) as Array<"DINE_IN" | "TAKEAWAY" | "DELIVERY">;

  useEffect(() => {
    if (!navigator.geolocation) {
      void loadOutlets();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => void loadOutlets(position),
      () => void loadOutlets(),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  useEffect(() => {
    if (!selectedOutlet) {
      return;
    }

    void loadMenu(selectedOutlet.id);
    const nextTypes = [
      selectedOutlet.dineIn ? "DINE_IN" : null,
      selectedOutlet.takeaway ? "TAKEAWAY" : null,
      selectedOutlet.delivery ? "DELIVERY" : null,
    ].filter(Boolean) as Array<"DINE_IN" | "TAKEAWAY" | "DELIVERY">;

    if (!nextTypes.includes(orderType)) {
      setOrderType(nextTypes[0] || "TAKEAWAY");
    }
  }, [selectedOutlet]);

  useEffect(() => {
    if (!selectedOutlet) {
      return;
    }

    window.localStorage.setItem(
      ORDER_CONTEXT_KEY,
      JSON.stringify({ selectedOutlet, orderType, address }),
    );
  }, [selectedOutlet, orderType, address]);

  async function loadOutlets(position?: GeolocationPosition) {
    setLoading(true);
    setError("");
    try {
      const query = position
        ? `?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        : "";
      const data = await websiteRequest<OutletsResponse>(`/website/outlets${query}`);
      setOutlets(data.outlets);
      const nearest = data.nearestOutlet || data.outlets[0] || null;
      setSelectedOutlet(nearest);
      if (position && nearest) {
        setMessage(`Nearest outlet selected: ${nearest.name}`);
      }
    } catch {
      setError("Could not load outlets right now.");
      setOutlets([]);
      setSelectedOutlet(null);
    } finally {
      setLoading(false);
    }
  }

  function detectLocation() {
    setError("");
    if (!navigator.geolocation) {
      setError("Location is not available in this browser. Enter address manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => void loadOutlets(position),
      () => setError("Location permission was not allowed. Enter address manually."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  async function loadMenu(outletId: string) {
    try {
      const data = await websiteRequest<WebsiteMenuCategory[]>(
        `/website/outlets/${outletId}/menu`,
      );
      setCategories(data.length ? data : fallbackMenu);
    } catch {
      setCategories(fallbackMenu);
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="max-w-[760px]">
          <div className="section-tag">Order Takeaway Online</div>
          <h1 className="section-title">
            Choose your outlet,
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              then build your dessert box.
            </span>
          </h1>
          <p className="section-desc">
            We detect your nearest active outlet, show that outlet&apos;s menu,
            and save your order type before you continue to cart.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="glass-card mb-6 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase text-[#10b981]">
                {selectedOutlet?.websitePosOnline ? "POS Online" : "Outlet Selection"}
              </p>
              <h2 className="text-2xl font-black">
                {selectedOutlet?.name || "Choose your nearest outlet"}
              </h2>
              <p className="text-sm text-[var(--text-muted)]">
                {selectedOutlet?.address ||
                  "Use location detection or choose from the outlet list."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="btn-pill btn-outline" type="button" onClick={detectLocation}>
                Use My Location
              </button>
              <a className="btn-pill btn-primary" href="/cart">
                Cart ({cartCount})
              </a>
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr]">
            <select
              className="form-input"
              value={selectedOutlet?.id || ""}
              onChange={(event) => {
                const outlet = outlets.find((item) => item.id === event.target.value);
                setSelectedOutlet(outlet || null);
              }}
            >
              <option value="">Select outlet</option>
              {outlets.map((outlet) => (
                <option key={outlet.id} value={outlet.id}>
                  {outlet.name} {outlet.distanceKm ? `(${outlet.distanceKm.toFixed(1)} km)` : ""}
                </option>
              ))}
            </select>
            <input
              className="form-input"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter address manually"
            />
          </div>

          {selectedOutlet ? (
            <>
              <div className="order-outlet-status">
                <span>{selectedOutlet.websitePosOnline ? "Website POS online" : "POS route not online"}</span>
                <span>{selectedOutlet.distanceKm ? `${selectedOutlet.distanceKm.toFixed(1)} km away` : "Distance unavailable"}</span>
                <span>{selectedOutlet.isEligible ? "Serviceable" : "Outside radius"}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {enabledOrderTypes.map((type) => (
                  <button
                    key={type}
                    className={`filter-tab ${orderType === type ? "active" : ""}`}
                    type="button"
                    onClick={() => setOrderType(type)}
                  >
                    {type.replace("_", " ")}
                  </button>
                ))}
              </div>
            </>
          ) : null}
          {loading ? <p className="mt-3 text-sm font-bold text-[var(--text-muted)]">Finding outlets...</p> : null}
          {message ? <p className="notice mt-4 text-[#0f766e]">{message}</p> : null}
          {error ? <p className="notice mt-4 text-red-600">{error}</p> : null}
        </div>

        <div className="menu-filter-bar">
          <button
            className={`filter-tab ${activeCategory === "all" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveCategory("all")}
          >
            All Creations
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-tab ${activeCategory === category.name ? "active" : ""}`}
              type="button"
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article className="glass-card bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[var(--border-glass)]" key={item.id}>
              <div>
                {/* 1. Proper Image Container */}
                <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-[var(--theme-soft)] p-3 mb-4 border border-[var(--border-subtle)] relative">
                  <Image
                    className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                    src={item.imageUrl || "/assets/image-not-uploaded.svg"}
                    alt={item.name}
                    width={360}
                    height={240}
                    unoptimized
                  />
                  {item.addonGroups.length > 0 && (
                    <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md text-[var(--theme-accent)] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/80 shadow-xs">
                      Customizable
                    </span>
                  )}
                </div>

                {/* 2. Below Image: Item Name */}
                <h3 className="text-lg font-black text-[var(--text-primary)] mb-1.5 leading-snug">
                  {item.name}
                </h3>

                {/* 3. Below Name: Item Description */}
                <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed mb-4">
                  {item.description || "Signature layered falooda cup prepared fresh with pure milk rabdi and mawa."}
                </p>
              </div>

              {/* 4. Below Description: Pricing & Add Button */}
              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <span className="block text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">Price</span>
                  <span className="text-lg font-black text-[var(--theme-accent)]">INR {item.price}</span>
                </div>
                <button
                  className="btn-pill btn-primary text-xs px-5 py-2.5 font-black shadow-xs"
                  type="button"
                  onClick={() => addItem(item)}
                >
                  + Add
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
