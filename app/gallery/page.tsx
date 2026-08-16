"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { PageHero } from "@/components/page-hero";

type GalleryItem = {
  id: string;
  src: string;
  title: string;
  category: "all" | "cups" | "ingredients" | "process";
  tag: string;
  aspectRatio: "portrait" | "landscape" | "square" | "tall";
  description: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    src: "/assets/falooda-product.png",
    title: "Bombay Special Loaded Cup",
    category: "cups",
    tag: "Signature Special",
    aspectRatio: "tall",
    description: "Layered falooda cup overflowing with rabdi, sabja, mawa cake, and scoops.",
  },
  {
    id: "g2",
    src: "/assets/falooda-product-kesar.png",
    title: "Golden Kesar Dryfruit Mawa",
    category: "cups",
    tag: "Kesar Special",
    aspectRatio: "portrait",
    description: "Rich saffron milk blend loaded with mawa cake chunks, cashews, and almonds.",
  },
  {
    id: "g3",
    src: "/assets/falooda-product-pista.png",
    title: "Pista Dryfruit Mawa Falooda",
    category: "cups",
    tag: "Pista Special",
    aspectRatio: "square",
    description: "Nutty pistachio cream falooda finished with chopped pistachios.",
  },
  {
    id: "g4",
    src: "/assets/falooda-product-rajbhog.png",
    title: "Classic Rabdi Special Cup",
    category: "cups",
    tag: "Rabdi Classic",
    aspectRatio: "tall",
    description: "Traditional homemade slow-simmered rabdi loaded with falooda sev.",
  },
  {
    id: "g5",
    src: "/assets/falooda-product-strwaberry.png",
    title: "Rose Strawberry Loaded Cup",
    category: "cups",
    tag: "Fruit Special",
    aspectRatio: "portrait",
    description: "Chilled pink strawberry milk layered with rose syrup and ice cream scoops.",
  },
  {
    id: "g6",
    src: "/assets/Ingredients/flavoured-ice-cream.png",
    title: "Gourmet Ice Cream Scoops",
    category: "ingredients",
    tag: "Fresh Scoop",
    aspectRatio: "landscape",
    description: "Sub-zero ice cream scoops prepared daily from fresh pasteurized cream.",
  },
  {
    id: "g7",
    src: "/assets/Ingredients/flavoured-milk.png",
    title: "Chilled Flavoured Milk Base",
    category: "ingredients",
    tag: "Pure Dairy",
    aspectRatio: "square",
    description: "Slow-chilled flavoured milk without synthetic thickeners.",
  },
  {
    id: "g8",
    src: "/assets/Ingredients/dry-fruits.png",
    title: "Handpicked Premium Dry Fruits",
    category: "ingredients",
    tag: "Nuts & Mawa",
    aspectRatio: "portrait",
    description: "Whole almonds, cashews, pistachios, and roasted mawa cake chunks.",
  },
  {
    id: "g9",
    src: "/assets/how-we-make/step1.png",
    title: "Step 01 - Chilled Milk Pour",
    category: "process",
    tag: "Making Craft",
    aspectRatio: "landscape",
    description: "Pouring the ice-cold milk base into clean food-grade takeaway cups.",
  },
  {
    id: "g10",
    src: "/assets/how-we-make/step4.png",
    title: "Step 04 - Ice Cream Scoop Finish",
    category: "process",
    tag: "Making Craft",
    aspectRatio: "tall",
    description: "Adding the signature ice cream scoop right at the cold center.",
  },
  {
    id: "g11",
    src: "/assets/how-we-make/step7.png",
    title: "Step 07 - Final Loaded Presentation",
    category: "process",
    tag: "Making Craft",
    aspectRatio: "landscape",
    description: "The complete loaded cup handed over live at the outlet counter.",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "cups" | "ingredients" | "process">("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter,
  );

  const selectedItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  function showPrev() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  }

  function showNext() {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, filteredItems]);

  return (
    <main>
      <PageHero
        tag="Pinterest Photo Board"
        title="A visual taste of"
        accent="Bombay Falooda."
        description="Explore product cups, ingredient textures, and the making process that gives the brand its signature look."
      />

      {/* Filter Chips Navigation */}
      <section className="section pb-2">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            ["all", "All Pins"],
            ["cups", "Signature Cups"],
            ["ingredients", "Pure Ingredients"],
            ["process", "Craft Process"],
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              className={`px-5 py-2.5 rounded-full text-xs font-black transition-all ${
                activeFilter === key
                  ? "bg-[var(--theme-accent)] text-white shadow-md scale-105"
                  : "bg-white text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--theme-accent)]"
              }`}
              onClick={() => {
                setActiveFilter(key as any);
                setSelectedIndex(null);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Pinterest Style Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5 space-y-5">
          {filteredItems.map((item, idx) => {
            const aspectClass =
              item.aspectRatio === "tall"
                ? "aspect-[3/4]"
                : item.aspectRatio === "portrait"
                ? "aspect-[4/5]"
                : item.aspectRatio === "landscape"
                ? "aspect-[4/3]"
                : "aspect-square";

            return (
              <article
                key={item.id}
                className="break-inside-avoid rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer relative bg-slate-900 border border-slate-100/10"
                onClick={() => setSelectedIndex(idx)}
              >
                <div className={`relative w-full ${aspectClass} overflow-hidden rounded-3xl`}>
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  {/* Inside gradient shadow & text overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white">
                    <div className="flex justify-end">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white font-bold shadow-md">
                        🔍
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block mb-1">
                        {item.tag}
                      </span>
                      <h3 className="text-base font-black text-white leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] font-medium text-white/80 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Lightbox Full Screen Modal */}
      {selectedItem !== null && (
        <div
          className="modal-backdrop open"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIndex(null);
          }}
        >
          <div className="addons-modal max-w-4xl p-0 overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
              {/* Image Column */}
              <div className="relative md:col-span-7 bg-slate-950 flex items-center justify-center p-6 min-h-[350px]">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  width={800}
                  height={800}
                  className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-xl"
                />
                {/* Nav Arrows */}
                <button
                  type="button"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-black hover:bg-white/40 transition backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  title="Previous image"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white font-black hover:bg-white/40 transition backdrop-blur-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  title="Next image"
                >
                  →
                </button>
              </div>

              {/* Details Column */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 mb-4">
                    <span className="text-[11px] font-black uppercase tracking-wider rounded-full bg-[var(--theme-soft)] text-[var(--theme-accent)] px-3 py-1 border border-[var(--border-glass)]">
                      {selectedItem.tag}
                    </span>
                    <button
                      type="button"
                      className="text-xl font-bold rounded-full h-8 w-8 bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                      onClick={() => setSelectedIndex(null)}
                    >
                      ✕
                    </button>
                  </div>

                  <h2 className="text-2xl font-black text-[var(--text-primary)] mb-3 leading-tight">
                    {selectedItem.title}
                  </h2>
                  <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed mb-6">
                    {selectedItem.description}
                  </p>
                </div>

                <div>
                  <div className="rounded-2xl bg-[var(--bg-canvas)] p-4 border border-[var(--border-glass)] mb-6 text-xs">
                    <span className="font-extrabold text-[var(--text-primary)] block mb-1">
                      Bombay Falooda Quality
                    </span>
                    <span className="text-[var(--text-muted)]">
                      Crafted daily with 100% fresh milk, authentic rabdi, and premium dry fruits.
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      className="btn-pill btn-primary flex-1 text-center text-xs"
                      href="/order"
                      onClick={() => setSelectedIndex(null)}
                    >
                      Order Takeaway
                    </Link>
                    <button
                      type="button"
                      className="btn-pill btn-outline text-xs"
                      onClick={() => setSelectedIndex(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
