"use client";

import Link from "next/link";

export default function WebsiteDownloadsPage() {
  const apps = [
    {
      id: "pos",
      name: "POS Billing Terminal App",
      badge: "Counter Billing & KOT",
      filename: "Bombay-Falooda-POS-Setup-v1.0.0.exe",
      size: "84.2 MB",
      version: "v1.0.0 (64-bit)",
      color: "bg-[#b82e46] text-white",
      description:
        "Dedicated desktop billing application for outlet cashiers. Direct WebSerial thermal printer support, KOT printing, and offline till resilience.",
      downloadUrl: "http://localhost:4000/api/downloads/pos-setup.exe",
    },
    {
      id: "franchise",
      name: "Franchise Owner Portal App",
      badge: "Outlet & Sales Operations",
      filename: "Bombay-Falooda-Franchise-Setup-v1.0.0.exe",
      size: "88.6 MB",
      version: "v1.0.0 (64-bit)",
      color: "bg-purple-600 text-white",
      description:
        "Native desktop client for Franchise Owners to manage outlet operations, item channel toggles (Zomato/Swiggy/POS), staff attendance, and revenue analytics.",
      downloadUrl: "http://localhost:4000/api/downloads/franchise-setup.exe",
    },
    {
      id: "superadmin",
      name: "SuperAdmin Master Workspace App",
      badge: "Corporate HQ Platform",
      filename: "Bombay-Falooda-SuperAdmin-Setup-v1.0.0.exe",
      size: "92.1 MB",
      version: "v1.0.0 (64-bit)",
      color: "bg-slate-900 text-white",
      description:
        "Desktop control center for corporate SuperAdmin executives. Provision new franchises, control global menu locking, and monitor multi-outlet metrics.",
      downloadUrl: "http://localhost:4000/api/downloads/superadmin-setup.exe",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg-canvas)] py-10 px-4 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <span className="section-tag inline-block">Official Desktop Software</span>
          <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-primary)]">
            Bombay Falooda Native Windows Executables (.exe)
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
            Download production desktop installers for Windows 10/11 (64-bit). Equipped with hardware printer drivers, offline till resilience, and native OS notifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              className="glass-card bg-white rounded-3xl p-6 border border-[var(--border-glass)] shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 inline-block">
                  {app.badge}
                </span>
                <h3 className="text-lg font-black text-[var(--text-primary)]">{app.name}</h3>
                <div className="text-xs font-mono font-bold text-[var(--text-muted)]">
                  {app.version} • {app.size}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {app.description}
                </p>
              </div>

              <div className="pt-6">
                <a
                  href={app.downloadUrl}
                  download={app.filename}
                  className="btn-pill w-full bg-[var(--theme-accent)] text-white hover:opacity-90 font-bold py-3 text-xs flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>Download {app.filename}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
