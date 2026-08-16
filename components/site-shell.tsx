"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { navItems, productFlavours } from "@/lib/content";
import { applyFlavourTheme, getSavedFlavour } from "@/lib/flavour-theme";
import type { WebsiteMenuItem } from "@/lib/api";

export type CartLine = {
  localId: string;
  itemId: string;
  name: string;
  imageUrl?: string | null;
  quantity: number;
  addons: Array<{ addonId: string; name: string; price: number }>;
  unitPrice: number;
};

type SiteCartContextValue = {
  addItem: (item: WebsiteMenuItem) => void;
  cart: CartLine[];
  cartCount: number;
  subtotal: number;
  changeQty: (localId: string, quantity: number) => void;
  clearCart: () => void;
};

const SiteCartContext = createContext<SiteCartContextValue | null>(null);
const CART_KEY = "bf_website_cart";
const CUSTOMER_SESSION_KEY = "bf_customer_session";

export function useSiteCart() {
  const context = useContext(SiteCartContext);
  if (!context) {
    throw new Error("useSiteCart must be used inside SiteShell");
  }
  return context;
}

type CustomerProfile = {
  name?: string;
  email?: string;
  phone?: string;
};

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [customizing, setCustomizing] = useState<WebsiteMenuItem | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [customer, setCustomer] = useState<CustomerProfile | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toast, setToast] = useState("");
  const [activeFlavour, setActiveFlavour] = useState(productFlavours[0]);

  useEffect(() => {
    const saved = getSavedFlavour();
    setActiveFlavour(saved);
    applyFlavourTheme(saved);
    const savedCart = window.localStorage.getItem(CART_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart) as CartLine[]);
    }
    const savedCustomer = window.localStorage.getItem(CUSTOMER_SESSION_KEY);
    if (savedCustomer) {
      try {
        const parsed = JSON.parse(savedCustomer) as CustomerProfile;
        setCustomer(parsed);
      } catch {
        setCustomer(null);
      }
    }
  }, []);

  function handleCustomerLogout() {
    window.localStorage.removeItem(CUSTOMER_SESSION_KEY);
    setCustomer(null);
    setShowProfileModal(false);
  }

  useEffect(() => {
    window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((total, line) => total + line.quantity, 0);
  const subtotal = cart.reduce(
    (total, line) => total + line.unitPrice * line.quantity,
    0,
  );
  const addonOptions =
    customizing?.addonGroups.flatMap((group) =>
      group.addons.map((addon) => ({
        addonId: addon.id,
        name: addon.name,
        price: addon.price,
        groupName: group.name,
      })),
    ) || [];
  const selectedAddonRows = addonOptions.filter((addon) =>
    selectedAddons.includes(addon.addonId),
  );
  const modalTotal =
    (customizing?.price ?? 0) +
    selectedAddonRows.reduce((sum, addon) => sum + addon.price, 0);

  const cartContext = useMemo<SiteCartContextValue>(
    () => ({
      addItem: (item) => {
        setCustomizing(item);
        setSelectedAddons([]);
      },
      cart,
      cartCount,
      subtotal,
      changeQty,
      clearCart: () => setCart([]),
    }),
    [cart, cartCount, subtotal],
  );

  function confirmAddons() {
    if (!customizing) {
      return;
    }

    setCart((current) => [
      ...current,
      {
        localId: `${customizing.id}-${Date.now()}-${current.length}`,
        itemId: customizing.id,
        name: customizing.name,
        imageUrl: customizing.imageUrl,
        quantity: 1,
        addons: selectedAddonRows,
        unitPrice: modalTotal,
      },
    ]);
    setCustomizing(null);
    setSelectedAddons([]);
    setToast(`${customizing.name} added to cart`);
    window.setTimeout(() => setToast(""), 2400);
  }

  function changeQty(localId: string, quantity: number) {
    setCart((current) =>
      current
        .map((line) => (line.localId === localId ? { ...line, quantity } : line))
        .filter((line) => line.quantity > 0),
    );
  }

  return (
    <SiteCartContext.Provider value={cartContext}>
      <header className="site-header">
        <Link className="brand-wrap" href="/">
          <Image
            className="brand-logo"
            src="/assets/bombay-logo.png"
            width={46}
            height={46}
            alt="Bombay Falooda"
          />
          <span>
            <span className="brand-name">BOMBAY FALOODA</span>
            <span className="brand-sub">Since 1985</span>
          </span>
        </Link>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active-page" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="header-flavour-select" title="Switch theme flavour">
            {productFlavours.map((flavour) => (
              <button
                key={flavour.key}
                className={`header-flavour-dot ${
                  activeFlavour.key === flavour.key ? "active" : ""
                }`}
                style={{ background: flavour.color }}
                type="button"
                aria-label={`Use ${flavour.name} theme`}
                onClick={() => {
                  setActiveFlavour(flavour);
                  applyFlavourTheme(flavour);
                }}
              />
            ))}
          </div>
          <Link
            className="cart-icon-btn relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-glass)] bg-[var(--surface-glass)] text-[var(--theme-accent)] shadow-sm transition hover:border-[var(--theme-accent)] hover:scale-105"
            href="/cart"
            title="View Cart"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--theme-accent)] text-[9px] font-black text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
          <Link className="btn-pill btn-primary" href="/order">
            Order
          </Link>
          {customer ? (
            <button
              type="button"
              className="profile-avatar-btn"
              title={`Logged in as ${customer.name || "Customer"}`}
              onClick={() => setShowProfileModal(true)}
            >
              <svg className="h-5 w-5 text-[var(--theme-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          ) : (
            <Link
              className="profile-avatar-btn"
              href="/login"
              title="Login"
            >
              <svg className="h-5 w-5 text-[var(--text-muted)] hover:text-[var(--theme-accent)] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
          )}
          <button
            className="mobile-toggle flex items-center justify-center h-10 w-10 rounded-full border border-[var(--border-glass)] bg-white text-[var(--text-primary)] shadow-sm"
            aria-label="Open mobile menu"
            type="button"
            onClick={() => setOpen(true)}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <div
        className={`mobile-nav-drawer ${open ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
      >
        <div className="mobile-nav-content">
          <div className="mb-4 flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
            <span className="font-black text-lg">BOMBAY FALOODA</span>
            <button type="button" className="text-xl font-bold rounded-full h-8 w-8 bg-gray-100 flex items-center justify-center" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <div className="mb-4 flex items-center gap-2 py-2 border-b border-[var(--border-subtle)]">
            <span className="text-xs font-bold text-[var(--text-muted)]">Flavour:</span>
            {productFlavours.map((flavour) => (
              <button
                key={flavour.key}
                className={`header-flavour-dot ${activeFlavour.key === flavour.key ? "active" : ""}`}
                style={{ background: flavour.color }}
                type="button"
                aria-label={`Use ${flavour.name} theme`}
                onClick={() => {
                  setActiveFlavour(flavour);
                  applyFlavourTheme(flavour);
                }}
              />
            ))}
          </div>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "text-[var(--theme-accent)]" : ""} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/cart" onClick={() => setOpen(false)}>
            Cart ({cartCount})
          </Link>
          <Link href="/order" className="text-[var(--theme-accent)] font-black" onClick={() => setOpen(false)}>
            Order
          </Link>
          {customer ? (
            <button
              type="button"
              className="flex items-center gap-2.5 py-3 border-t border-[var(--border-subtle)] text-left font-extrabold w-full text-[var(--theme-accent)] mt-2"
              onClick={() => {
                setOpen(false);
                setShowProfileModal(true);
              }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--theme-soft)] text-xs">
                👤
              </span>
              <span>Profile Details</span>
            </button>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="page-wrapper">{children}</div>
      <SiteFooter />

      <div className={`cart-toast ${toast ? "open" : ""}`}>{toast}</div>

      <div className={`modal-backdrop ${customizing ? "open" : ""}`}>
        <div className="addons-modal">
          <div className="modal-header">
            <div>
              <span className="text-xs font-black uppercase text-[var(--theme-accent)]">
                Customize Toppings
              </span>
              <h3 className="modal-title modal-item-title">
                {customizing?.name || "Bombay Special Falooda"}
              </h3>
            </div>
            <button className="modal-close" type="button" onClick={() => setCustomizing(null)}>
              x
            </button>
          </div>

          <p className="text-sm text-[var(--text-muted)]">
            Select extra toppings to add to your loaded falooda cup:
          </p>

          <div className="addons-list">
            {addonOptions.length ? addonOptions.map((addon) => (
              <label className="addon-row" key={addon.addonId}>
                <span className="addon-left">
                  <input
                    className="addon-checkbox"
                    type="checkbox"
                    checked={selectedAddons.includes(addon.addonId)}
                    onChange={(event) =>
                      setSelectedAddons((current) =>
                        event.target.checked
                          ? [...current, addon.addonId]
                          : current.filter((id) => id !== addon.addonId),
                      )
                    }
                  />
                  <span>
                    <span className="addon-name">{addon.name}</span>
                    <span className="block text-xs font-bold text-[var(--text-muted)]">
                      {addon.groupName}
                    </span>
                  </span>
                </span>
                <span className="addon-price">+INR {addon.price}</span>
              </label>
            )) : (
              <div className="notice">No add-ons for this item. Add the classic item directly.</div>
            )}
          </div>

          <div className="modal-footer">
            <div>
              <span className="modal-total-label">Total Price:</span>
              <div className="modal-total-price">INR {modalTotal}</div>
            </div>
            <button className="btn-pill btn-primary" type="button" onClick={confirmAddons}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Customer Profile Details Popup Modal */}
      <div
        className={`modal-backdrop ${showProfileModal ? "open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowProfileModal(false);
        }}
      >
        <div className="addons-modal max-w-sm">
          <div className="modal-header border-b border-[var(--border-subtle)] pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--theme-soft)] text-[var(--theme-accent)] font-black text-lg shadow-sm">
                {customer?.name?.charAt(0).toUpperCase() || "C"}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[var(--theme-accent)]">
                  Customer Account
                </span>
                <h3 className="text-base font-black text-[var(--text-primary)]">
                  {customer?.name || "Bombay Falooda Customer"}
                </h3>
              </div>
            </div>
            <button className="modal-close" type="button" onClick={() => setShowProfileModal(false)}>
              ✕
            </button>
          </div>

          <div className="my-4 space-y-2">
            {customer?.email ? (
              <div className="flex items-center justify-between rounded-xl bg-[var(--bg-canvas)] p-3 border border-[var(--border-glass)] text-xs">
                <span className="font-bold text-[var(--text-muted)]">Email</span>
                <span className="font-extrabold text-[var(--text-primary)]">{customer.email}</span>
              </div>
            ) : null}
            {customer?.phone ? (
              <div className="flex items-center justify-between rounded-xl bg-[var(--bg-canvas)] p-3 border border-[var(--border-glass)] text-xs">
                <span className="font-bold text-[var(--text-muted)]">Phone</span>
                <span className="font-extrabold text-[var(--text-primary)]">{customer.phone}</span>
              </div>
            ) : null}
            {!customer?.email && !customer?.phone ? (
              <div className="rounded-xl bg-[var(--bg-canvas)] p-3 text-xs text-[var(--text-muted)] text-center font-semibold">
                Customer session active
              </div>
            ) : null}
          </div>

          <div className="modal-footer border-t border-[var(--border-subtle)] pt-3">
            <button
              className="btn-pill btn-outline w-full text-rose-600 border-rose-200 hover:bg-rose-50"
              type="button"
              onClick={handleCustomerLogout}
            >
              Logout Session
            </button>
          </div>
        </div>
      </div>
    </SiteCartContext.Provider>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Image
            className="footer-logo"
            src="/assets/bombay-logo.png"
            width={96}
            height={96}
            alt="Bombay Falooda"
          />
          <p>
            Bombay Falooda - crafting loaded cups, fresh rabdi, and signature cold
            desserts since 1985.
          </p>
        </div>
        <FooterColumn
          title="Navigation"
          links={[
            ["/", "Home"],
            ["/about", "About Us"],
            ["/menu", "Menu"],
            ["/gallery", "Gallery"],
          ]}
        />
        <FooterColumn
          title="Explore & Order"
          links={[
            ["/experience", "Experience"],
            ["/order", "Order Takeaway"],
            ["/contact", "Store Outlets"],
            ["/contact", "Franchise Inquiry"],
          ]}
        />
        <div>
          <h4 className="footer-col-title">Order Online On</h4>
          <div className="platform-list flex items-center gap-3">
            {[
              ["/assets/platform-zomato.svg", "Zomato"],
              ["/assets/platform-swiggy.svg", "Swiggy"],
              ["/assets/platform-easycater.svg", "EasyCater"],
            ].map(([src, label]) => (
              <Link
                className="platform-icon-only hover:scale-110 transition-transform duration-200"
                href="/order"
                key={label}
                title={`Order online on ${label}`}
              >
                <Image
                  src={src}
                  alt={label}
                  width={140}
                  height={46}
                  className="h-11 w-auto rounded-xl shadow-md border border-white/10"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>1985 - 2026 Bombay Falooda. All rights reserved.</span>
        <span>Crafted with pure milk and authentic rabdi.</span>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <h4 className="footer-col-title">{title}</h4>
      <div className="footer-links">
        {links.map(([href, label]) => (
          <Link key={`${href}-${label}`} href={href}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
