"use client";

import Link from "next/link";

import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        tag="Contact Us"
        title="Find outlets and"
        accent="franchise support."
        description="Reach the counter, get directions, or send a franchise/business inquiry for Bombay Falooda."
      />
      <section className="section">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="mb-5 text-3xl font-black">Direct Desk Contacts</h2>
            <div className="grid gap-5">
              {[
                ["Customer Support", "+91 98250 12345", "Takeaway, order support and counter assistance."],
                ["Franchise Desk", "franchise@bombayfalooda.in", "Business expansion, outlet inquiry and onboarding."],
              ].map(([title, value, text]) => (
                <article className="glass-card bg-white" key={title}>
                  <p className="text-xs font-black uppercase text-[var(--theme-accent)]">
                    {title}
                  </p>
                  <h3 className="mt-2 text-2xl font-black">{value}</h3>
                  <p className="mb-0 mt-2 text-[var(--text-muted)]">{text}</p>
                </article>
              ))}
            </div>
            <div className="glass-card mt-5 bg-white">
              <h3 className="text-2xl font-black">Rajmahal Road Counter Outlet</h3>
              <p className="text-[var(--text-muted)]">
                Near Kirtistambh, Rajmahal Road, Vadodara, Gujarat 390001
              </p>
              <Link className="btn-pill btn-outline mt-4" href="https://maps.google.com" target="_blank">
                Directions
              </Link>
            </div>
          </div>

          <form
            className="glass-card grid gap-4 bg-white"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Thank you. Your message has been sent to Bombay Falooda.");
            }}
          >
            <h3 className="text-2xl font-black">Send us a message</h3>
            <input className="form-input" placeholder="Full name" />
            <div className="grid gap-4 md:grid-cols-2">
              <input className="form-input" placeholder="Phone number" />
              <input className="form-input" placeholder="Email address" />
            </div>
            <select className="form-input" defaultValue="">
              <option value="" disabled>
                Select inquiry type
              </option>
              <option>Customer Support</option>
              <option>Bulk Order</option>
              <option>Franchise Inquiry</option>
              <option>Partnership</option>
            </select>
            <textarea className="form-input min-h-36 py-3" placeholder="Message" />
            <button className="btn-pill btn-primary w-full" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
