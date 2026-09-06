"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { websiteRequest } from "@/lib/api";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
  addons?: Array<{ addonId: string; name: string; price: number }>;
};

type CustomerOrder = {
  id: string;
  orderNumber: string;
  createdAt: string;
  type: "DINE_IN" | "TAKEAWAY" | "DELIVERY";
  status: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  subtotal: number;
  taxAmount: number;
  discount: number;
  total: number;
  notes?: string;
  outlet?: { id: string; name: string; address: string; phone: string };
  items: OrderItem[];
  trackingUrl: string;
};

const CUSTOMER_SESSION_KEY = "bf_customer_session";

export default function OrderHistoryPage() {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState<{ name?: string; phone?: string; email?: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCustomer = window.localStorage.getItem(CUSTOMER_SESSION_KEY);
    if (savedCustomer) {
      try {
        const parsed = JSON.parse(savedCustomer) as { name?: string; phone?: string; email?: string };
        setCustomer(parsed);
        void fetchHistory(parsed.phone, parsed.email);
      } catch {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchHistory(phone?: string, email?: string) {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (phone) params.append("phone", phone);
      if (email) params.append("email", email);

      const data = await websiteRequest<CustomerOrder[]>(`/website/orders/history?${params.toString()}`);
      setOrders(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load order history.");
    } finally {
      setLoading(false);
    }
  }

  function getStatusBadgeClass(status: string) {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "OUT_FOR_DELIVERY":
      case "PREPARING":
      case "ACCEPTED":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "CANCELLED":
      case "REJECTED":
        return "bg-rose-100 text-rose-800 border-rose-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  }

  return (
    <main>
      <section className="page-hero">
        <div className="max-w-[760px]">
          <div className="section-tag">Order History</div>
          <h1 className="section-title">
            Your Loaded Cups,
            <br />
            <span className="serif-italic text-[var(--theme-accent)]">
              All Orders & Live Tracking
            </span>
          </h1>
          <p className="section-desc">
            View all your past orders, Razorpay payment verification details, and track your active delivery status in real-time.
          </p>
        </div>
      </section>

      <section className="section max-w-4xl mx-auto space-y-6">
        {!customer ? (
          <div className="glass-card bg-white text-center p-8 rounded-3xl border border-[var(--border-glass)]">
            <div className="h-16 w-16 bg-rose-50 text-[var(--theme-accent)] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-black">
              👤
            </div>
            <h2 className="text-2xl font-black text-[var(--text-primary)]">Login Required</h2>
            <p className="mt-2 text-sm font-bold text-[var(--text-muted)] max-w-md mx-auto">
              Please login with your mobile phone OTP or Google account to view your past order history and track active orders.
            </p>
            <Link className="btn-pill btn-primary mt-6 inline-flex" href="/cart">
              Go to Checkout / Login
            </Link>
          </div>
        ) : loading ? (
          <div className="glass-card bg-white text-center p-12 rounded-3xl border border-[var(--border-glass)]">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[var(--theme-accent)] border-t-transparent mb-3" />
            <p className="text-sm font-bold text-[var(--text-muted)]">Loading your order history...</p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-bold">
            ⚠️ {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="glass-card bg-white text-center p-12 rounded-3xl border border-[var(--border-glass)] space-y-4">
            <div className="h-16 w-16 bg-[var(--theme-soft)] text-[var(--theme-accent)] rounded-full flex items-center justify-center mx-auto text-3xl">
              🍨
            </div>
            <h2 className="text-2xl font-black text-[var(--text-primary)]">No orders found yet</h2>
            <p className="text-sm font-bold text-[var(--text-muted)]">
              Logged in as <span className="text-[var(--theme-accent)] font-black">{customer.phone || customer.email}</span>. You haven't placed any website orders yet.
            </p>
            <Link className="btn-pill btn-primary inline-flex mt-2" href="/order">
              Browse Menu & Order Now
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-[var(--text-muted)] px-1">
              <span>Showing {orders.length} Order{orders.length > 1 ? "s" : ""} for {customer.name || customer.phone || customer.email}</span>
              <button
                type="button"
                onClick={() => void fetchHistory(customer.phone, customer.email)}
                className="text-[var(--theme-accent)] hover:underline"
              >
                🔄 Refresh History
              </button>
            </div>

            {orders.map((order) => (
              <div
                key={order.id}
                className="glass-card bg-white rounded-3xl p-6 border border-[var(--border-glass)] shadow-xs transition hover:shadow-md space-y-4"
              >
                {/* Card Top Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-black text-[var(--text-primary)]">
                        #{order.orderNumber}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border uppercase tracking-wider ${getStatusBadgeClass(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Paid via Razorpay ✓
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[var(--text-muted)] mt-1">
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}{" "}
                      • {order.outlet?.name || "Bombay Falooda Outlet"} ({order.type.replace("_", " ")})
                    </p>
                  </div>

                  {/* Track Order Button */}
                  <Link
                    href={order.trackingUrl}
                    className="btn-pill btn-primary text-xs py-2 px-4 shadow-sm flex items-center gap-1.5 hover:scale-105 transition"
                  >
                    <span>Track Order</span>
                    <span>🚀</span>
                  </Link>
                </div>

                {/* Items Summary List */}
                <div className="space-y-2">
                  <span className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-wider block">
                    Ordered Items:
                  </span>
                  <div className="grid gap-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-canvas)] border border-[var(--border-glass)] text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-6 w-6 rounded-full bg-[var(--theme-soft)] text-[var(--theme-accent)] font-mono font-black text-[11px] flex items-center justify-center shrink-0">
                            {item.quantity}x
                          </span>
                          <div>
                            <span className="font-bold text-[var(--text-primary)] block">{item.name}</span>
                            {item.addons && Array.isArray(item.addons) && item.addons.length > 0 && (
                              <span className="text-[10px] font-semibold text-[var(--text-muted)] block">
                                + Addons: {item.addons.map((a) => a.name).join(", ")}
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[var(--text-primary)]">
                          INR {item.total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Total */}
                <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 text-sm font-black text-[var(--text-primary)]">
                  <span>Total Amount Paid:</span>
                  <span className="font-mono text-lg text-[var(--theme-accent)]">
                    INR {order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
