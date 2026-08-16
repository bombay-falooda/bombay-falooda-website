import Link from "next/link";

import { MenuCards } from "@/components/menu-cards";
import { PageHero } from "@/components/page-hero";

export default function MenuPage() {
  return (
    <main>
      <PageHero
        tag="Full Falooda Catalog"
        title="Explore our signature"
        accent="loaded dessert menu."
        description="Browse loaded cups, rabdi classics, kesar and pista dryfruit mawa creations, and ice cream desserts."
      />
      <section className="section">
        <div className="menu-catalog-toolbar">
          <div>
            <p className="text-xs font-black uppercase text-[var(--theme-accent)]">
              Full menu view
            </p>
            <h2 className="text-2xl font-black">Browse first, order from nearest outlet</h2>
          </div>
          <Link className="btn-pill btn-primary" href="/order">
            Order Now
          </Link>
        </div>
        <MenuCards />
      </section>
    </main>
  );
}
