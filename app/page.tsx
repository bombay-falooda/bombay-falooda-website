"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SectionIntro } from "@/components/page-hero";
import { productFlavours } from "@/lib/content";
import { applyFlavourTheme, getSavedFlavour } from "@/lib/flavour-theme";
import { websiteRequest, type WebsiteOutlet } from "@/lib/api";

const defaultOutlets: WebsiteOutlet[] = [
  {
    id: "vadodara-main",
    name: "Vadodara Rajmahal Road Outlet",
    code: "BF-VAD-01",
    address: "Near Kirtistambh, Rajmahal Road, Vadodara, Gujarat 390001",
    phone: "+91 98250 12345",
    dineIn: true,
    takeaway: true,
    delivery: true,
    outletBaseCharge: 0,
    deliveryKmPricing: [],
    isEligible: true,
    websitePosOnline: true,
    thirdPartyLinks: [],
  },
  {
    id: "ahmedabad-cg",
    name: "Ahmedabad C.G. Road Outlet",
    code: "BF-AMD-01",
    address: "Opp. Municipal Market, C.G. Road, Ahmedabad, Gujarat 380009",
    phone: "+91 98250 54321",
    dineIn: true,
    takeaway: true,
    delivery: true,
    outletBaseCharge: 0,
    deliveryKmPricing: [],
    isEligible: true,
    websitePosOnline: true,
    thirdPartyLinks: [],
  },
  {
    id: "surat-ghod-dod",
    name: "Surat Ghod Dod Road Outlet",
    code: "BF-SUR-01",
    address: "Near Prime Shoppers, Ghod Dod Road, Surat, Gujarat 395007",
    phone: "+91 98250 98765",
    dineIn: true,
    takeaway: true,
    delivery: false,
    outletBaseCharge: 0,
    deliveryKmPricing: [],
    isEligible: true,
    websitePosOnline: true,
    thirdPartyLinks: [],
  },
];

const makeSteps = [
  {
    image: "/assets/how-we-make/step1.png",
    eyebrow: "Step 01 - Base",
    title: "Prepare the chilled milk base",
    text: "A clean, cold milk base is prepared first so every flavour starts smooth, rich, and balanced.",
  },
  {
    image: "/assets/how-we-make/step2.png",
    eyebrow: "Step 02 - Texture",
    title: "Layer sabja and falooda sev",
    text: "Soft sev and hydrated sabja seeds create the refreshing texture that makes every spoonful feel layered.",
  },
  {
    image: "/assets/how-we-make/step3.png",
    eyebrow: "Step 03 - Richness",
    title: "Add rabdi and milk cake",
    text: "Fresh rabdi and mawa cake are spooned into the cup for the dense, creamy centre Bombay Falooda is known for.",
  },
  {
    image: "/assets/how-we-make/step4.png",
    eyebrow: "Step 04 - Cold Finish",
    title: "Scoop flavour ice cream",
    text: "Ice cream goes in at the right moment so the cup stays cold, creamy, and ready for final toppings.",
  },
  {
    image: "/assets/how-we-make/step5.png",
    eyebrow: "Step 05 - Crunch",
    title: "Finish with dry fruits",
    text: "Cashews, almonds, pistachios, and garnish add the generous crunch customers expect from a loaded cup.",
  },
  {
    image: "/assets/how-we-make/step6.png",
    eyebrow: "Step 06 - Takeaway",
    title: "Seal for freshness",
    text: "The cup is packed carefully for takeaway so the layers travel cleanly without losing their cold texture.",
  },
  {
    image: "/assets/how-we-make/step7.png",
    eyebrow: "Step 07 - Serve",
    title: "Serve the loaded cup",
    text: "The final cup is handed over with every layer visible: cold, rich, generous, and ready to enjoy.",
  },
];

export default function HomePage() {
  const [flavour, setFlavour] = useState(productFlavours[0]);
  const [outlets, setOutlets] = useState<WebsiteOutlet[]>(defaultOutlets);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const saved = getSavedFlavour();
    setFlavour(saved);
    applyFlavourTheme(saved);

    async function loadOutlets() {
      try {
        const res = await websiteRequest<{ outlets?: WebsiteOutlet[] } | WebsiteOutlet[]>("/website/outlets");
        const list = Array.isArray(res) ? res : res?.outlets || [];
        if (list.length) {
          setOutlets(list);
        } else {
          setOutlets(defaultOutlets);
        }
      } catch {
        setOutlets(defaultOutlets);
      }
    }
    void loadOutlets();
  }, []);

  function selectFlavour(nextFlavour: (typeof productFlavours)[number]) {
    setFlavour(nextFlavour);
    applyFlavourTheme(nextFlavour);
  }

  return (
    <main>
      <section className="page-hero">
        <div className="hero-grid">
          <div>
            <div className="section-tag">Heritage Brand Since 1985</div>
            <h1 className="section-title">
              Crafting loaded cups
              <br />
              <span className="serif-italic text-[var(--theme-accent)]">
                with pure passion.
              </span>
            </h1>
            <p className="section-desc">
              Bombay Falooda turns a classic Indian dessert into a full brand
              experience: generous cups, rich flavours, fresh rabdi, mawa, and
              signature cold desserts.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn-pill btn-primary" href="/menu">
                Explore Full Menu
              </Link>
              <Link className="btn-pill btn-outline" href="/order">
                Order Takeaway
              </Link>
              <Link className="btn-pill btn-outline" href="/about">
                Our 1985 Legacy
              </Link>
            </div>
            <div className="flavour-dock">
              {productFlavours.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className={`flavour-pill ${flavour.key === item.key ? "active" : ""}`}
                  onClick={() => selectFlavour(item)}
                >
                  <span className="swatch-dot" style={{ background: item.color }} />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-glow" />
            <Image
              className="hero-product"
              src={flavour.image}
              alt={`${flavour.name} Bombay Falooda`}
              width={430}
              height={520}
              priority
            />
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          tag="Why Bombay Falooda"
          title="Uncompromising quality"
          accent="in every spoonful."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            ["100% Pure Milk & Rabdi", "Prepared daily from fresh milk without artificial thickeners or synthetic powders."],
            ["Generous Mawa & Nuts", "Every cup is loaded with milk cake, almonds, cashews, and pistachios."],
            ["Fast Takeaway Service", "Clean, leak-proof cups built for counter pickup and quick takeaway."],
          ].map(([title, text]) => (
            <article className="glass-card" key={title}>
              <h3 className="mb-3 text-xl font-black">{title}</h3>
              <p className="text-[var(--text-muted)]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="anatomy-scroll-section">
        <div className="anatomy-intro">
          <div className="section-tag">The Loaded Layer Craft</div>
          <h2 className="section-title">
            The anatomy of a
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              perfect falooda cup.
            </span>
          </h2>
          <p className="section-desc">
            Scroll through the making process: each frame stacks into the next,
            showing how texture, rabdi, ice cream, and toppings come together.
          </p>
        </div>
        <div className="anatomy-stack">
          {makeSteps.map((step, index) => (
            <article
              className="anatomy-step"
              key={step.title}
              style={{ top: `calc(var(--header-h) + ${index * 10}px)` }}
            >
              <div className="anatomy-image-wrap">
                <Image
                  className="anatomy-image"
                  src={step.image}
                  alt={step.title}
                  width={1280}
                  height={720}
                  sizes="(max-width: 900px) 100vw, 85vw"
                />
              </div>
              <div className="anatomy-overlay-box">
                <span className="anatomy-kicker">{step.eyebrow}</span>
                <h3 className="serif-italic text-[var(--theme-accent)] mt-2 mb-1.5 text-lg sm:text-xl font-bold leading-tight">
                  {step.title}
                </h3>
                <p className="serif-italic text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  "{step.text}"
                </p>
                <div className="anatomy-progress mt-3 pt-2.5 border-t border-[var(--border-subtle)]">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <i style={{ width: `${((index + 1) / makeSteps.length) * 100}%` }} />
                  </div>
                  <span>{String(makeSteps.length).padStart(2, "0")}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          tag="Loved By Thousands"
          title="What our guests say"
          accent="about our loaded cups."
        />
        <div className="reviews-marquee-wrap">
          <div className="reviews-marquee-track">
          {[
            ["Aniket Patel", "Verified Buyer - Vadodara", "Hands down the thickest and most loaded rabdi falooda in Vadodara. The mawa cake chunks inside the Bombay Special are unmatched."],
            ["Sneha Parikh", "Localite - Rajmahal Road", "Been coming to Rajmahal Road outlet since childhood. The Kesar Dryfruit Mawa cup has kept its exact 1985 taste all these years."],
            ["Rohan Mehta", "Takeaway Customer - Ahmedabad", "Extremely fast takeaway service. The leak-proof cups keep the ice cream cold and fresh all the way home."],
            ["Aniket Patel", "Verified Buyer - Vadodara", "Hands down the thickest and most loaded rabdi falooda in Vadodara. The mawa cake chunks inside the Bombay Special are unmatched."],
            ["Sneha Parikh", "Localite - Rajmahal Road", "Been coming to Rajmahal Road outlet since childhood. The Kesar Dryfruit Mawa cup has kept its exact 1985 taste all these years."],
            ["Rohan Mehta", "Takeaway Customer - Ahmedabad", "Extremely fast takeaway service. The leak-proof cups keep the ice cream cold and fresh all the way home."],
          ].map(([name, meta, text], index) => (
            <article className="glass-card bg-white" key={`${name}-${index}`}>
              <p className="review-stars">Rating 5.0</p>
              <p className="italic text-[var(--text-secondary)]">&quot;{text}&quot;</p>
              <div className="reviewer-info">
                <div className="reviewer-avatar">{name.split(" ").map((part) => part[0]).join("")}</div>
                <div>
                  <p className="mb-0 text-sm font-black">{name}</p>
                  <p className="mb-0 text-xs font-bold text-[var(--text-muted)]">{meta}</p>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--bg-subtle)]">
        <div>
          <div className="section-tag">Visit Counter Outlet</div>
          <h2 className="section-title mb-2">
            Taste it fresh at
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              our brand outlet counters.
            </span>
          </h2>
          <p className="section-desc mb-8">
            Watch our artisans pour chilled rabdi, spoon fresh mawa cake, and scoop ice cream live at the counter.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outlets.map((store) => (
              <article className="glass-card bg-white p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow" key={store.id}>
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1">
                      {store.code || "OUTLET"}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                      <svg className="h-2 w-2 fill-current text-emerald-500 animate-pulse" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4"/></svg>
                      Open Now
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">
                    {store.name}
                  </h3>
                  <p className="flex items-start gap-1.5 text-xs font-medium text-[var(--text-muted)] leading-relaxed mb-3">
                    <svg className="h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{store.address}</span>
                  </p>
                  {store.phone ? (
                    <p className="flex items-center gap-1.5 text-xs font-bold text-[var(--theme-accent)] mb-4">
                      <svg className="h-3.5 w-3.5 shrink-0 text-[var(--theme-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                      <span>{store.phone}</span>
                    </p>
                  ) : null}
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-4 text-[11px] font-extrabold text-[var(--text-secondary)]">
                    {store.dineIn ? (
                      <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                        <svg className="h-3 w-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        Dine-In
                      </span>
                    ) : null}
                    {store.takeaway ? (
                      <span className="flex items-center gap-1 bg-rose-50 text-rose-800 px-2.5 py-1 rounded-lg border border-rose-200/60">
                        <svg className="h-3 w-3 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                        Takeaway
                      </span>
                    ) : null}
                    {store.delivery ? (
                      <span className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200/60">
                        <svg className="h-3 w-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        Delivery
                      </span>
                    ) : null}
                  </div>
                  <Link
                    className="btn-pill btn-primary w-full text-center text-xs"
                    href="/order"
                  >
                    Order from this Outlet
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionIntro
          tag="Frequently Asked Questions"
          title="Everything you need"
          accent="to know about ordering."
        />
        <div className="faq-grid">
          {[
            ["What makes Bombay Falooda different from regular falooda?", "Bombay Falooda uses slow-simmered milk rabdi, handmade falooda sev, fresh mawa cake chunks, and premium dry fruits in loaded cups."],
            ["How is takeaway packed to prevent melting?", "Every takeaway order is served in thick food-grade cups sealed with a spill-proof lid so the dessert stays cold during transit."],
            ["Can I customize extra toppings like rabdi or nuts?", "Yes. Click Add on a menu item and choose extra ice cream, rabdi, milk cake, nuts, or sabja and sev base."],
            ["Do you accept bulk orders for events and catering?", "Yes. Contact the outlet or support team for weddings, family functions, corporate events, and catering packages."],
          ].map(([question, answer], index) => (
            <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
              <button className="faq-question" type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{question}</span>
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">{answer}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
