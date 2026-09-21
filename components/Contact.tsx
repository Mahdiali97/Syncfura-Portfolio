"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import Logo from "./Logo";
import { MapPin, Send, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Front-end only: simulate a successful submit.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const input =
    "w-full rounded-xl bg-white/70 border border-ink/10 px-4 py-3 text-ink placeholder-ink-muted/70 outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition";

  return (
    <section id="contact" className="relative py-24 sm:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: HQ + intro */}
          <Reveal>
            <span className="text-sm font-semibold tracking-[0.3em] text-accent uppercase">
              Contact
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-ink leading-tight">
              Let&rsquo;s build your{" "}
              <span className="text-gradient-violet">digital backbone</span>
            </h2>
            <p className="mt-5 text-lg text-ink-muted max-w-md">
              Tell us about your project. From idea to digital — built to last.
            </p>

            <div className="mt-8 flex items-start gap-3 glass rounded-2xl p-5">
              <MapPin className="text-accent mt-0.5 shrink-0" size={22} />
              <div>
                <p className="text-ink font-semibold">Headquarters</p>
                <p className="text-ink-muted">Tanjong Malim, Perak, Malaysia</p>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.12}>
            <form
              onSubmit={onSubmit}
              className="glass rounded-3xl p-7 sm:p-9 space-y-5"
            >
              <div>
                <label className="block text-sm text-ink-soft mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Your name"
                  className={input}
                />
              </div>
              <div>
                <label className="block text-sm text-ink-soft mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@company.com"
                  className={input}
                />
              </div>
              <div>
                <label className="block text-sm text-ink-soft mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="How can we help?"
                  className={`${input} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent-deep px-6 py-3.5 font-semibold text-white shadow-[0_0_28px_-6px_rgba(170,111,255,0.6)] hover:bg-[#5a4880] transition-all"
              >
                {sent ? (
                  <>
                    <CheckCircle2 size={18} /> Message Sent
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Footer */}
        <div className="mt-24 border-t border-ink/10 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Logo variant="light" markSize={32} />
          <p className="text-sm text-ink-muted">
            © 2026 SyncFura Digital
          </p>
          <div className="flex gap-6 text-sm text-ink-muted">
            <a href="#about" className="hover:text-accent transition">
              About
            </a>
            <a href="#services" className="hover:text-accent transition">
              Services
            </a>
            <a href="#team" className="hover:text-accent transition">
              Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
