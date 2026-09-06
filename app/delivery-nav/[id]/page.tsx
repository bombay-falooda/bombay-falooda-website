"use client";

import { use, useEffect, useState } from "react";

type DeliveryDetails = {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  googleMapsUrl: string;
  distanceKm: number;
  estimatedTimeMins: number;
  driverName: string;
  driverPhone: string;
  deliveryStatus: string;
  orderType: string;
  source: string;
  total: number;
  outletName: string;
  outletCode: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  customerTrackingUrl: string;
  driverNavUrl: string;
};

export default function DriverNavigationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [details, setDetails] = useState<DeliveryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    void fetchDeliveryDetails();
  }, [id]);

  async function fetchDeliveryDetails() {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`http://localhost:4000/api/pos-terminal/delivery-orders/${id}`);
      const data = await res.json();
      setDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load delivery details");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(newStatus: "ON_THE_WAY" | "OUT_FOR_DELIVERY" | "DELIVERED") {
    try {
      setUpdating(true);
      setMessage("");
      setError("");
      const res = await fetch(`http://localhost:4000/api/pos-terminal/delivery-orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deliveryStatus: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`Delivery status updated to ${newStatus.replace(/_/g, " ")}`);
        await fetchDeliveryDetails();
      }
    } catch {
      setError("Failed to update delivery status");
    } finally {
      setUpdating(false);
    }
  }

  function handleCopyCustomerLink() {
    if (!details?.customerTrackingUrl) return;
    navigator.clipboard.writeText(details.customerTrackingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-sans p-4">
        <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-6 py-4 rounded-2xl shadow-2xl">
          <span className="h-5 w-5 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
          <span className="text-sm font-bold tracking-wide">Loading Driver Navigation Portal...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between max-w-md mx-auto shadow-2xl border-x border-slate-800">
      {/* Header */}
      <header className="p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            🛵
          </div>
          <div>
            <h1 className="text-sm font-black text-white leading-tight">Driver Location & Portal</h1>
            <p className="text-[11px] text-slate-400 font-mono">Driver: {details?.driverName || "Assigned Driver"}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] uppercase border border-emerald-500/30 tracking-wider">
          {details?.deliveryStatus.replace(/_/g, " ")}
        </span>
      </header>

      {/* Content Body */}
      <main className="p-4 space-y-4 flex-1">
        {message && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <span>✓</span>
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Route Metrics (Distance & Travel Time) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Distance</span>
            <div className="text-xl font-black text-emerald-400 font-mono">{details?.distanceKm || 3.2} KM</div>
            <span className="text-[10px] text-slate-500 block">From Outlet</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 text-center space-y-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Est. Travel Time</span>
            <div className="text-xl font-black text-cyan-400 font-mono">{details?.estimatedTimeMins || 12} Mins</div>
            <span className="text-[10px] text-slate-500 block">Traffic Estimate</span>
          </div>
        </div>

        {/* Customer Contact & Navigation Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3.5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Contact</span>
              <h2 className="text-base font-black text-white mt-0.5">{details?.customerName}</h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{details?.customerPhone}</p>
            </div>
            <a
              href={`tel:${details?.customerPhone}`}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              📞 Call Customer
            </a>
          </div>

          {/* Delivery Address & Google Maps Free Integration */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Actual Delivery Address:</span>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
              📍 {details?.deliveryAddress}
            </div>
            
            {/* Free Google Maps Directions Button */}
            <a
              href={details?.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 border border-blue-400/40"
            >
              🗺️ Open Directions in Google Maps ↗
            </a>
          </div>
        </div>

        {/* Share Tracking Link with Customer Card */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Customer Tracking Portal Link (Simple & Free)
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={details?.customerTrackingUrl || ""}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 truncate outline-none"
            />
            <button
              type="button"
              onClick={handleCopyCustomerLink}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 shrink-0"
            >
              {copied ? "Copied! ✓" : "Copy Link 🔗"}
            </button>
          </div>
        </div>

        {/* Items Summary & Total Collection */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Order Items ({details?.items.length})
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Outlet: {details?.outletName}
            </span>
          </div>
          <div className="space-y-1.5 pt-1">
            {details?.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-200">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-mono text-slate-400">₹{item.price}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-slate-800 pt-2.5 font-bold text-xs">
            <span className="text-slate-400">Total Cash / Payment to Collect:</span>
            <span className="font-mono text-emerald-400 text-base font-black">₹{details?.total}</span>
          </div>
        </div>
      </main>

      {/* Driver Action Control Footer */}
      <footer className="p-4 bg-slate-900 border-t border-slate-800 space-y-2.5 sticky bottom-0 z-20">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block text-center">
          Interactive Driver Status Action Controls:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            disabled={updating}
            onClick={() => void updateStatus("ON_THE_WAY")}
            className={`py-3 px-1 rounded-xl font-bold text-xs transition border text-center active:scale-95 ${
              details?.deliveryStatus === "ON_THE_WAY"
                ? "bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-600/30"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            ON THE WAY
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={() => void updateStatus("OUT_FOR_DELIVERY")}
            className={`py-3 px-1 rounded-xl font-bold text-xs transition border text-center active:scale-95 ${
              details?.deliveryStatus === "OUT_FOR_DELIVERY"
                ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/30"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            OUT FOR DELIVERY
          </button>
          <button
            type="button"
            disabled={updating}
            onClick={() => void updateStatus("DELIVERED")}
            className={`py-3 px-1 rounded-xl font-bold text-xs transition border text-center active:scale-95 ${
              details?.deliveryStatus === "DELIVERED"
                ? "bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            DELIVERED ✓
          </button>
        </div>
      </footer>
    </div>
  );
}

