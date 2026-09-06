"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useSiteCart } from "@/components/site-shell";
import { websiteRequest, type WebsiteOutlet } from "@/lib/api";

type OrderContext = {
  selectedOutlet: WebsiteOutlet;
  orderType: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
  address: string;
};

const ORDER_CONTEXT_KEY = "bf_order_context";
const CUSTOMER_SESSION_KEY = "bf_customer_session";

export default function CartPage() {
  const { cart, subtotal, changeQty, clearCart } = useSiteCart();
  const [orderContext, setOrderContext] = useState<OrderContext | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedOrder = window.localStorage.getItem(ORDER_CONTEXT_KEY);
    const savedCustomer = window.localStorage.getItem(CUSTOMER_SESSION_KEY);

    if (savedOrder) {
      setOrderContext(JSON.parse(savedOrder) as OrderContext);
    }

    if (savedCustomer) {
      const customer = JSON.parse(savedCustomer) as {
        name?: string;
        phone?: string;
        email?: string;
      };
      setCustomerName(customer.name || "");
      setCustomerPhone(customer.phone || "");
      setCustomerEmail(customer.email || "");
      setLoggedIn(true);
    }
  }, []);

  const outlet = orderContext?.selectedOutlet;
  const outletBaseCharge = cart.length ? outlet?.outletBaseCharge || 0 : 0;
  const deliveryCharge =
    cart.length && orderContext?.orderType === "DELIVERY"
      ? deliveryPriceForDistance(outlet?.deliveryKmPricing || [], outlet?.distanceKm)
      : 0;
  const total = subtotal + outletBaseCharge + deliveryCharge;
  const canPlace = useMemo(
    () => cart.length > 0 && !!outlet && !!orderContext,
    [cart.length, orderContext, outlet],
  );

  function sendOtp() {
    if (!customerPhone.trim()) {
      setError("Enter mobile number before requesting OTP.");
      return;
    }

    setOtpSent(true);
    setError("");
    setMessage("Demo WhatsApp OTP sent. Use 123456 for now.");
  }

  function verifyOtp() {
    if (otp !== "123456") {
      setError("Invalid demo OTP. Use 123456 for now.");
      return;
    }

    saveCustomerSession();
    setShowLogin(false);
    setMessage("Mobile verified. You can place the order now.");
  }

  function loginWithGoogle() {
    const email = customerEmail || "customer@bombayfalooda.com";
    setCustomerEmail(email);
    saveCustomerSession(email);
    setShowLogin(false);
    setMessage("Google login simulated for development. You can place the order now.");
  }

  function saveCustomerSession(emailOverride?: string) {
    window.localStorage.setItem(
      CUSTOMER_SESSION_KEY,
      JSON.stringify({
        name: customerName,
        phone: customerPhone,
        email: emailOverride || customerEmail,
      }),
    );
    setLoggedIn(true);
  }

  async function placeOrder() {
    setError("");
    setMessage("");

    if (!canPlace || !outlet || !orderContext) {
      setError("Select outlet and add items before placing order.");
      return;
    }

    if (!outlet.websitePosOnline) {
      setError("This outlet is not accepting website orders right now.");
      return;
    }

    if (!loggedIn) {
      setShowLogin(true);
      return;
    }

    if (!customerPhone.trim() && !customerEmail.trim()) {
      setShowLogin(true);
      setError("Login with phone OTP or Google before placing order.");
      return;
    }

    try {
      const data = await websiteRequest<{ message: string; order: { id: string } }>(
        "/website/orders",
        {
          method: "POST",
          body: JSON.stringify({
            outletId: outlet.id,
            type: orderContext.orderType,
            customerName,
            customerPhone,
            customerEmail: customerEmail || undefined,
            address: orderContext.address,
            customerDistanceKm: outlet.distanceKm ?? undefined,
            notes: "Website customer verified",
            items: cart.map((line) => ({
              itemId: line.itemId,
              quantity: line.quantity,
              addons: line.addons,
            })),
          }),
        },
      );
      clearCart();
      setMessage(`${data.message} Order ID: ${data.order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not place order.");
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="max-w-[760px]">
          <div className="section-tag">Your Cart</div>
          <h1 className="section-title">
            Review your loaded cup,
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              then place your order.
            </span>
          </h1>
          <p className="section-desc">
            Login is checked only when you place the order. Your cart remains
            saved while you verify with phone OTP or development Google login.
          </p>
        </div>
      </section>

      <section className="section grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {cart.map((line) => (
            <div className="cart-page-line" key={line.localId}>
              <Image
                className="cart-page-img"
                src={line.imageUrl || "/assets/falooda-product.png"}
                alt={line.name}
                width={96}
                height={96}
                unoptimized
              />
              <div className="flex-1">
                <h2 className="text-lg font-black">{line.name}</h2>
                <p className="text-sm font-bold text-[var(--text-muted)]">
                  {line.addons.length
                    ? `Add-ons: ${line.addons.map((addon) => `${addon.name} +INR ${addon.price}`).join(", ")}`
                    : "No add-ons selected"}
                </p>
                <p className="mt-2 font-black text-[var(--theme-accent)]">
                  INR {(line.unitPrice * line.quantity).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="qty-controls">
                <button className="qty-btn" type="button" onClick={() => changeQty(line.localId, line.quantity - 1)}>
                  -
                </button>
                <span className="text-sm font-black">{line.quantity}</span>
                <button className="qty-btn" type="button" onClick={() => changeQty(line.localId, line.quantity + 1)}>
                  +
                </button>
              </div>
            </div>
          ))}
          {!cart.length ? (
            <div className="glass-card bg-white text-center">
              <h2 className="text-2xl font-black">Your cart is empty</h2>
              <p className="mt-2 text-sm font-bold text-[var(--text-muted)]">
                Add your favourite falooda from the order menu.
              </p>
              <Link className="btn-pill btn-primary mt-5" href="/order">
                Browse Menu
              </Link>
            </div>
          ) : null}
        </div>

        <aside className="glass-card sticky top-24 h-fit bg-white">
          <h2 className="text-2xl font-black">Order Summary</h2>
          <div className="mt-4 rounded-2xl bg-[var(--bg-canvas)] p-4">
            <p className="text-sm font-black">{outlet?.name || "No outlet selected"}</p>
            <p className="text-xs font-bold text-[var(--text-muted)]">
              {outlet?.address || "Select location and outlet from Order page."}
            </p>
            <div className="order-outlet-status">
              <span>{orderContext?.orderType?.replace("_", " ") || "Order type pending"}</span>
              <span>{outlet?.websitePosOnline ? "Accepting orders" : "Route offline"}</span>
            </div>
          </div>

          <div className="mt-5 grid gap-2 border-t border-dashed border-[var(--border-glass)] pt-5">
            <SummaryRow label="Subtotal" value={subtotal} />
            <SummaryRow label="" value={outletBaseCharge} />
            <SummaryRow label="Delivery charge" value={deliveryCharge} />
            <SummaryRow label="Total" value={total} strong />
          </div>

          {message ? <p className="notice mt-4 text-[#0f766e]">{message}</p> : null}
          {error ? <p className="notice mt-4 text-red-600">{error}</p> : null}

          <button className="btn-pill btn-primary mt-5 w-full" type="button" onClick={placeOrder}>
            Place Order
          </button>
          <Link className="btn-pill btn-outline mt-3 w-full" href="/order">
            Add More Items
          </Link>
        </aside>
      </section>

      <div className={`modal-backdrop ${showLogin ? "open" : ""}`}>
        <div className="addons-modal">
          <div className="modal-header">
            <div>
              <span className="text-xs font-black uppercase text-[var(--theme-accent)]">
                Login Required
              </span>
              <h3 className="modal-title">Continue to place order</h3>
            </div>
            <button className="modal-close" type="button" onClick={() => setShowLogin(false)}>
              x
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            <input className="form-input" value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Name optional" />
            <input className="form-input" value={customerPhone} onChange={(event) => setCustomerPhone(event.target.value)} placeholder="Mobile number" />
            <div className="grid grid-cols-2 gap-2">
              <button className="btn-pill btn-outline" type="button" onClick={sendOtp}>
                Send OTP
              </button>
              <button className="btn-pill btn-outline" type="button" onClick={verifyOtp}>
                Verify OTP
              </button>
            </div>
            {otpSent ? (
              <input className="form-input" value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="Demo OTP 123456" />
            ) : null}
            <div className="my-2 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--border-glass)]" />
              <span className="text-xs font-black text-[var(--text-muted)]">or</span>
              <span className="h-px flex-1 bg-[var(--border-glass)]" />
            </div>
            <input className="form-input" value={customerEmail} onChange={(event) => setCustomerEmail(event.target.value)} placeholder="Email optional for Google login" />
            <button className="btn-pill btn-primary w-full" type="button" onClick={loginWithGoogle}>
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function deliveryPriceForDistance(
  rows: Array<{ km: number; price: number }>,
  distanceKm?: number | null,
) {
  if (distanceKm === undefined || distanceKm === null) {
    return 0;
  }

  const tier = [...rows].sort((a, b) => a.km - b.km).find((row) => distanceKm <= row.km);
  return tier?.price || 0;
}

function SummaryRow({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div className={`flex justify-between ${strong ? "text-xl font-black" : "text-sm font-bold"}`}>
      <span>{label}</span>
      <span>INR {value.toLocaleString("en-IN")}</span>
    </div>
  );
}
