"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

const CUSTOMER_SESSION_KEY = "bf_customer_session";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const returnTo = searchParams.get("returnTo") || "/cart";

  function saveSession(input: { name?: string; email?: string; phone?: string }) {
    window.localStorage.setItem(
      CUSTOMER_SESSION_KEY,
      JSON.stringify({
        name: input.name || name || "Bombay Falooda Customer",
        email: input.email || email || "customer@bombayfalooda.com",
        phone: input.phone || phone,
      }),
    );
    router.push(returnTo);
  }

  function continueWithGoogle() {
    saveSession({
      name: name || "Google Customer",
      email: email || "customer@bombayfalooda.com",
      phone,
    });
  }

  function sendOtp() {
    if (!phone.trim()) {
      setError("Enter mobile number before requesting OTP.");
      return;
    }

    setError("");
    setOtpSent(true);
    setMessage("Demo WhatsApp OTP sent. Use 123456 for now.");
  }

  function verifyOtp(event: FormEvent) {
    event.preventDefault();

    if (otp !== "123456") {
      setError("Invalid demo OTP. Use 123456 for now.");
      return;
    }

    saveSession({ name, email, phone });
  }

  return (
    <main>
      <section className="section my-4 sm:my-8">
        <div className="grid gap-10 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          {/* Left Side: Tag, Heading & Description */}
          <div>
            <span className="section-tag mb-3 inline-block">Customer Login</span>
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] leading-tight mb-4">
              Continue faster,
              <br />
              <span className="serif-italic text-[var(--theme-accent)]">
                keep your cart ready.
              </span>
            </h1>
            <p className="text-base font-medium text-[var(--text-muted)] leading-relaxed mb-8 max-w-lg">
              Use Google for development login or verify with demo phone OTP.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="glass-card bg-white p-4 rounded-2xl border border-[var(--border-glass)] shadow-xs">
                <span className="text-xl mb-1.5 block">⚡</span>
                <h4 className="text-sm font-black text-[var(--text-primary)] mb-1">Instant Checkout</h4>
                <p className="text-xs text-[var(--text-muted)] mb-0 leading-relaxed">
                  Saved cart items and fast one-click takeaway ordering.
                </p>
              </div>
              <div className="glass-card bg-white p-4 rounded-2xl border border-[var(--border-glass)] shadow-xs">
                <span className="text-xl mb-1.5 block">🍨</span>
                <h4 className="text-sm font-black text-[var(--text-primary)] mb-1">Order History</h4>
                <p className="text-xs text-[var(--text-muted)] mb-0 leading-relaxed">
                  Re-order your favorite Bombay Special loaded cups anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="glass-card bg-white p-8 rounded-3xl shadow-xl border border-[var(--border-glass)] max-w-md w-full mx-auto">
            <div className="mb-6 flex items-center gap-4 border-b border-[var(--border-subtle)] pb-4">
              <Image src="/assets/bombay-logo.png" alt="Bombay Falooda" width={52} height={52} />
              <div>
                <h2 className="text-xl font-black text-[var(--text-primary)]">Sign In / Sign Up</h2>
                <p className="text-xs font-bold text-[var(--text-muted)]">
                  Continue with Google or Mobile OTP
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Google Sign In Button with Official Google multicolor SVG icon */}
              <button
                className="btn-pill bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 w-full flex items-center justify-center gap-3 font-bold py-3 shadow-xs transition-all text-xs sm:text-sm"
                type="button"
                onClick={continueWithGoogle}
              >
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="my-4 flex items-center gap-4">
                <span className="h-px flex-1 bg-[var(--border-subtle)]" />
                <span className="text-[11px] font-black uppercase tracking-wider text-[var(--text-muted)]">or continue with phone</span>
                <span className="h-px flex-1 bg-[var(--border-subtle)]" />
              </div>

              {/* Optional Name & Email Inputs */}
              <div className="grid gap-3">
                <input
                  className="form-input text-xs"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name (Optional)"
                />
                <input
                  className="form-input text-xs"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (Optional)"
                />
              </div>

              {/* Phone OTP Form */}
              <form className="space-y-3 pt-1" onSubmit={verifyOtp}>
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] mb-1">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] overflow-hidden focus-within:border-[var(--theme-accent)] transition">
                    <span className="px-3.5 py-2.5 text-xs font-black bg-gray-100/80 border-r border-[var(--border-subtle)] text-[var(--text-primary)] shrink-0">
                      +91
                    </span>
                    <input
                      className="w-full bg-transparent px-3 py-2.5 text-xs font-medium outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98250 12345"
                      type="tel"
                      maxLength={10}
                    />
                  </div>
                </div>

                <button
                  className="btn-pill btn-outline w-full text-xs font-bold py-2.5"
                  type="button"
                  onClick={sendOtp}
                >
                  Send WhatsApp OTP
                </button>

                {otpSent ? (
                  <input
                    className="form-input text-center text-lg font-black tracking-[0.4em]"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                  />
                ) : null}

                <button className="btn-pill btn-primary w-full text-xs font-black py-3" type="submit">
                  Verify OTP & Sign In
                </button>
              </form>
            </div>

            {message ? <p className="notice mt-4 text-[#0f766e] text-xs font-bold">{message}</p> : null}
            {error ? <p className="notice mt-4 text-rose-600 text-xs font-bold">{error}</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
