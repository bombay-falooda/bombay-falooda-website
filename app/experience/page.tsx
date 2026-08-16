"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { PageHero, SectionIntro } from "@/components/page-hero";
import { productFlavours } from "@/lib/content";
import { applyFlavourTheme, getSavedFlavour } from "@/lib/flavour-theme";

const makeStepsDetailed = [
  {
    step: 1,
    title: "Prepare the chilled milk base",
    eyebrow: "Step 01 - Pure Base",
    hygieneTag: "Pasteurized Pure Milk",
    desc: "Fresh, pasteurized milk is slow-chilled under strict temperature controls without synthetic thickeners.",
    image: "/assets/how-we-make/step1.png",
  },
  {
    step: 2,
    title: "Layer sabja and falooda sev",
    eyebrow: "Step 02 - Hydrated Texture",
    hygieneTag: "Purified Water Wash",
    desc: "Soft handmade falooda sev and organic sabja seeds are rinsed in purified RO water for refreshing hydration.",
    image: "/assets/how-we-make/step2.png",
  },
  {
    step: 3,
    title: "Add rabdi and milk cake",
    eyebrow: "Step 03 - Artisanal Rabdi",
    hygieneTag: "Untouched Cold Prep",
    desc: "Thick homemade rabdi and fresh mawa cake chunks are ladled into the cup for a dense, high-value center.",
    image: "/assets/how-we-make/step3.png",
  },
  {
    step: 4,
    title: "Scoop flavour ice cream",
    eyebrow: "Step 04 - Sub-Zero Chill",
    hygieneTag: "Hygienic Scoop Control",
    desc: "Premium flavoured ice cream is scooped using sanitized equipment at ideal sub-zero temperatures.",
    image: "/assets/how-we-make/step4.png",
  },
  {
    step: 5,
    title: "Finish with dry fruits",
    eyebrow: "Step 05 - Premium Crunch",
    hygieneTag: "Handpicked Nuts",
    desc: "Crisp cashews, almonds, and pistachios are sprinkled generously for maximum crunch and nutritional value.",
    image: "/assets/how-we-make/step5.png",
  },
  {
    step: 6,
    title: "Seal for takeaway freshness",
    eyebrow: "Step 06 - Spill-Proof Seal",
    hygieneTag: "100% Sealed Lid",
    desc: "Each cup is capped tightly with a tamper-evident lid, locking in cold temperature during transit.",
    image: "/assets/how-we-make/step6.png",
  },
  {
    step: 7,
    title: "Serve the loaded cup",
    eyebrow: "Step 07 - Counter Delivery",
    hygieneTag: "Zero-Touch Service",
    desc: "The final loaded cup is handed over: layered, generous, hygienic, and ready to enjoy anywhere.",
    image: "/assets/how-we-make/step7.png",
  },
];

export default function ExperiencePage() {
  const [flavour, setFlavour] = useState(productFlavours[0]);

  useEffect(() => {
    const saved = getSavedFlavour();
    setFlavour(saved);
    applyFlavourTheme(saved);
  }, []);

  function selectFlavour(nextFlavour: (typeof productFlavours)[number]) {
    setFlavour(nextFlavour);
    applyFlavourTheme(nextFlavour);
  }

  return (
    <main>
      <PageHero
        tag="The Experience"
        title="Handcrafted layers"
        accent="served cold and fresh."
        description="A Bombay Falooda cup is built in steps so texture, sweetness, temperature and toppings stay balanced."
      />

      {/* Core Ingredients Grid (Full Uncut Images) */}
      <section className="section">
        <SectionIntro
          tag="Pure Ingredients"
          title="Four core components"
          accent="in every loaded cup."
          description="We use 100% fresh milk, authentic rabdi, and handpicked dry fruits without synthetic powders."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["/assets/Ingredients/sev.png", "Sev & Sabja Base", "Cooling basil seeds and soft falooda sev create the signature refreshing base."],
            ["/assets/Ingredients/flavoured-milk.png", "Chilled Flavoured Milk", "Smooth milk carries rose, kesar, pista, chocolate or rabdi flavour."],
            ["/assets/Ingredients/milk-cake.png", "Pure Rabdi & Mawa", "Fresh milk cake and rabdi make the cup rich, dense, and satisfying."],
            ["/assets/Ingredients/dry-fruits.png", "Ice Cream & Nuts Topping", "Scoops, nuts, and final garnishes finish the loaded texture."],
          ].map(([src, title, text]) => (
            <article className="glass-card bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" key={title}>
              <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-[var(--theme-soft)] p-3 border border-[var(--border-subtle)]">
                <Image
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
                  src={src}
                  alt={title}
                  width={280}
                  height={200}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-black text-[var(--text-primary)] mb-1.5">{title}</h3>
                <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed mb-0">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Hygiene & Value Guarantee Banner */}
      <section className="section bg-[var(--theme-soft)] border-y border-[var(--border-subtle)]">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <span className="section-tag">Quality Standards</span>
          <h2 className="section-title">
            Hygiene first,
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              maximum dessert value.
            </span>
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="glass-card bg-white p-6 rounded-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-4 font-black">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-black mb-2">100% Hygienic Preparation</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-0">
              Pasteurized dairy, sanitized equipment stations, and zero-touch handling at every store outlet.
            </p>
          </article>

          <article className="glass-card bg-white p-6 rounded-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 mb-4 font-black">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-black mb-2">Best Value Loaded Cups</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-0">
              Generously layered cups filled with dense mawa cake, fresh rabdi, and whole dry fruits.
            </p>
          </article>

          <article className="glass-card bg-white p-6 rounded-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 mb-4 font-black">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-black mb-2">Spill-Proof Cold Packaging</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-0">
              Thick food-grade cups sealed tightly with leak-proof lids to preserve sub-zero chill during takeaway.
            </p>
          </article>
        </div>
      </section>

      {/* Interactive Flavour Mood Switcher */}
      <section className="section bg-[var(--bg-subtle)]">
        <SectionIntro
          tag="Choose Flavour"
          title="One craft method"
          accent="many flavour moods."
          description="Preview how the same layered cup transforms across different signature flavour themes."
        />
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="hero-visual min-h-[360px]">
            <div className="hero-glow" />
            <Image
              className="hero-product"
              src={flavour.image}
              alt={`${flavour.name} falooda`}
              width={430}
              height={520}
            />
          </div>
          <div>
            <div className="hero-flavour-switcher">
              {productFlavours.map((item) => (
                <button
                  key={item.key}
                  className={`hero-flavour-pill ${flavour.key === item.key ? "active" : ""}`}
                  type="button"
                  onClick={() => selectFlavour(item)}
                >
                  <span className="swatch-dot" style={{ background: item.color }} />
                  {item.name}
                </button>
              ))}
            </div>
            <div className="glass-card mt-6 bg-white">
              <p className="text-xs font-black uppercase text-[var(--theme-accent)]">
                Current Selection
              </p>
              <h3 className="mt-2 text-3xl font-black">{flavour.name} Falooda</h3>
              <p className="mb-0 mt-3 text-[var(--text-muted)]">
                The same layered craft changes character with each flavour:
                kesar warmth, pista nuttiness, rabdi richness, strawberry rose,
                or the Bombay Special classic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How We Make It - Redesigned 7 Steps Showcase */}
      <section className="section">
        <SectionIntro
          tag="How We Make It"
          title="Seven small steps"
          accent="one loaded cup."
          description="Step-by-step preparation with strict hygiene controls and artisanal care."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {makeStepsDetailed.map((item) => (
            <article
              className="glass-card bg-white p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[var(--border-glass)]"
              key={item.step}
            >
              <div>
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-subtle)]">
                  <Image
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={260}
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[var(--theme-accent)] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/80 shadow-sm">
                    {item.eyebrow}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30">
                    ✓ {item.hygieneTag}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-[var(--text-muted)] leading-relaxed mb-0">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-extrabold text-[var(--text-muted)]">
                <span>Step {item.step} of 7</span>
                <span className="text-[var(--theme-accent)]">Bombay Falooda Craft</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
