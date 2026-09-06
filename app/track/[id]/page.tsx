"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

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
};

export default function CustomerTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [details, setDetails] = useState<DeliveryDetails | null>(null);

  useEffect(() => {
    void fetchDetails();
    const interval = setInterval(() => void fetchDetails(), 5000);
    return () => clearInterval(interval);
  }, [id]);

  async function fetchDetails() {
    try {
      const res = await fetch(`http://localhost:4000/api/pos-terminal/delivery-orders/${id}`);
      const data = await res.json();
      setDetails(data);
    } catch {
      // Ignore
    }
  }

  const steps = [
    { key: "ACCEPTED", label: "Order Placed & Accepted" },
    { key: "PREPARING", label: "Kitchen Preparing Falooda" },
    { key: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
    { key: "DELIVERED", label: "Delivered to Customer" },
  ];

  function getStepStatus(stepKey: string) {
    const current = details?.deliveryStatus || "ACCEPTED";
    const order = ["ACCEPTED", "PREPARING", "ON_THE_WAY", "OUT_FOR_DELIVERY", "DELIVERED"];
    const currentIdx = order.indexOf(current);
    const stepIdx = order.indexOf(stepKey);

    if (currentIdx >= stepIdx) return "completed";
    return "pending";
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#1e293b] py-8 px-4 font-sans">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#b82e46] text-white font-black text-xs">
              🍨 LIVE
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bombay Falooda Live Tracking</span>
              <h1 className="text-base font-black text-slate-900 leading-tight">Order #{id.slice(-8)}</h1>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
            {details?.deliveryStatus.replace(/_/g, " ")}
          </span>
        </div>

        {/* Stepper Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
          <h2 className="font-bold text-sm text-slate-800 border-b pb-3">Delivery Progress Stepper</h2>

          <div className="space-y-6">
            {steps.map((step, idx) => {
              const status = getStepStatus(step.key);
              const isDone = status === "completed";
              return (
                <div key={step.key} className="flex items-center gap-4 relative">
                  <div
                    className={`h-8 w-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 ${
                      isDone ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {isDone ? "✓" : idx + 1}
                  </div>
                  <div>
                    <h3 className={`font-bold text-xs ${isDone ? "text-slate-900" : "text-slate-400"}`}>
                      {step.label}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {isDone ? "Completed & verified" : "Pending step"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Driver Details Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Delivery Partner</span>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-600 text-white font-black text-xs flex items-center justify-center">
                🛵
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{details?.driverName || "Assigned Driver"}</h3>
                <p className="text-xs text-slate-500 font-mono">{details?.driverPhone || "9876543210"}</p>
              </div>
            </div>
            {details?.driverPhone && (
              <a
                href={`tel:${details.driverPhone}`}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-2xs"
              >
                <span>📞 Call Driver</span>
              </a>
            )}
          </div>
        </div>

        {/* Delivery Address & Outlet */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 text-xs">
          <div className="flex items-start gap-2">
            <span className="text-rose-500 font-bold text-sm">📍</span>
            <div>
              <span className="font-bold text-slate-800 block">Delivery Address:</span>
              <span className="text-slate-600 mt-0.5 block">{details?.deliveryAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-slate-100">
            <span className="text-slate-400 font-bold text-sm">🏢</span>
            <div>
              <span className="font-bold text-slate-800 block">Fulfilled By Outlet:</span>
              <span className="text-slate-600 mt-0.5 block">{details?.outletName} ({details?.outletCode})</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
