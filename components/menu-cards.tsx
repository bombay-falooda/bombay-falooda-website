"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { fallbackMenu } from "@/lib/content";
import type { WebsiteMenuCategory, WebsiteMenuItem } from "@/lib/api";

export function MenuCards({
  categories = fallbackMenu,
  onAdd,
}: {
  categories?: WebsiteMenuCategory[];
  onAdd?: (item: WebsiteMenuItem) => void;
}) {
  const [active, setActive] = useState("all");
  const items = useMemo(
    () =>
      categories.flatMap((category) =>
        category.items.map((item) => ({ ...item, categoryName: category.name })),
      ),
    [categories],
  );
  const visible =
    active === "all" ? items : items.filter((item) => item.categoryName === active);

  return (
    <>
      <div className="menu-filter-bar">
        <button
          className={`filter-tab ${active === "all" ? "active" : ""}`}
          type="button"
          onClick={() => setActive("all")}
        >
          All Creations
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            className={`filter-tab ${active === category.name ? "active" : ""}`}
            type="button"
            onClick={() => setActive(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
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
                <span className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md text-[var(--theme-accent)] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/80 shadow-xs">
                  {index === 0 ? "Bestseller" : item.categoryName}
                </span>
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

            {/* 4. Below Description: Pricing & Action Button */}
            <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">Price</span>
                <span className="text-lg font-black text-[var(--theme-accent)]">INR {item.price}</span>
              </div>
              {onAdd ? (
                <button className="btn-pill btn-primary text-xs px-5 py-2.5 font-black shadow-xs" type="button" onClick={() => onAdd(item)}>
                  + Add
                </button>
              ) : (
                <Link
                  className="btn-pill btn-primary text-xs px-5 py-2.5 font-black shadow-xs"
                  href={`/order?item=${encodeURIComponent(item.id)}&name=${encodeURIComponent(item.name)}`}
                >
                  Order Now
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
