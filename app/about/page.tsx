import Image from "next/image";

import { PageHero, SectionIntro } from "@/components/page-hero";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        tag="40 Years of Craftsmanship"
        title="The dream behind"
        accent="the loaded falooda cup."
        description="What started in 1985 as a single copper rabdi pot has grown into Vadodara's landmark dessert brand."
      />
      <section className="section">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="mb-5 text-3xl font-black">Our 40-Year Heritage Journey</h2>
            <p className="mb-5 text-[var(--text-secondary)]">
              In 1985, our family set out to bring authentic, rich Indian
              falooda to dessert lovers in a modern, hygienic, generous cup.
              We refused synthetic thickeners, artificial rabdi powders, and
              skimmed milk shortcuts.
            </p>
            <p className="mb-8 text-[var(--text-secondary)]">
              Today, Bombay Falooda serves loaded cups with the same slow-cooked
              milk rabdi and mawa recipes perfected across four decades.
            </p>
            <div className="grid gap-4">
              {[
                ["1985", "First Kitchen & Copper Pot", "Perfected traditional rabdi falooda using pure milk and hand-churned copper pots near Kirtistambh."],
                ["1998", "Handmade Sev Innovation", "Crafted our signature thin falooda sev for refreshing texture contrast."],
                ["2005", "Dry Fruit Mawa Debut", "Introduced the loaded cup filled with milk cake, almonds, cashews, and pistachios."],
                ["2018", "Cold Insulation Packaging", "Built takeaway packaging that keeps ice cream and rabdi cold during transit."],
                ["Present", "Multi-City Expansion", "Expanding across Gujarat while maintaining strict heritage quality control."],
              ].map(([year, title, text]) => (
                <div className="glass-card flex gap-4 bg-white p-5" key={year}>
                  <span className="h-fit rounded-md bg-[var(--text-primary)] px-3 py-1 text-sm font-black text-white">
                    {year}
                  </span>
                  <div>
                    <h3 className="font-black">{title}</h3>
                    <p className="mb-0 text-sm text-[var(--text-muted)]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card bg-white">
            <div className="mb-6 grid aspect-[4/3] place-items-center rounded-2xl bg-[var(--theme-soft)]">
              <div className="text-center">
                <Image
                  src="/assets/bombay-logo.png"
                  alt="Founder seal"
                  className="mx-auto h-28 w-28 object-contain"
                  width={112}
                  height={112}
                />
                <p className="mt-3 text-xs font-black uppercase tracking-[0.08em] text-[var(--theme-accent)]">
                  Founder & Master Craftsmen
                </p>
              </div>
            </div>
            <blockquote className="border-l-4 border-[var(--theme-accent)] pl-5 font-serif text-xl italic leading-snug">
              "We did not just build a dessert menu; we crafted memories in
              every loaded cup."
            </blockquote>
            <p className="mb-0 mt-5 font-black">The Qureshi Family</p>
            <p className="mb-0 text-xs font-bold uppercase text-[var(--text-muted)]">
              Founders & Operations Directors
            </p>
          </div>
        </div>
      </section>
      <section className="section bg-[var(--bg-subtle)]">
        <SectionIntro
          tag="Our 5 Core Values"
          title="The principles that"
          accent="guide our kitchen daily."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {[
            {
              title: "1. Absolute Purity",
              text: "Only pure milk boiled fresh with no synthetic thickeners.",
              badgeBg: "bg-sky-50 border-sky-200/70 text-sky-600",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.605 15.12a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              ),
            },
            {
              title: "2. Generosity",
              text: "Every cup gets a full load of mawa, nuts, and rabdi.",
              badgeBg: "bg-rose-50 border-rose-200/70 text-rose-600",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
            },
            {
              title: "3. Recipe Heritage",
              text: "Preserving the 1985 slow-simmer method without shortcuts.",
              badgeBg: "bg-amber-50 border-amber-200/70 text-amber-600",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
            {
              title: "4. Hygiene & Care",
              text: "Clean open kitchens, refrigeration, and food-grade cups.",
              badgeBg: "bg-emerald-50 border-emerald-200/70 text-emerald-600",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ),
            },
            {
              title: "5. Warm Hospitality",
              text: "Fast counter service with a guest-first mindset.",
              badgeBg: "bg-purple-50 border-purple-200/70 text-purple-600",
              icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
            },
          ].map((item) => (
            <article className="glass-card bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between" key={item.title}>
              <div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.badgeBg} border mb-4 shadow-xs`}>
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg font-black text-[var(--text-primary)]">{item.title}</h3>
                <p className="mb-0 text-xs font-medium text-[var(--text-muted)] leading-relaxed">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
