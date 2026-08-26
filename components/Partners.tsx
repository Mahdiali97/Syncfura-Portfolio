import Reveal from "./Reveal";
import { Quote, Handshake } from "lucide-react";

const partners = ["Miezy Tech", "Elvexify", "InteXcore", "IntegAI"];

export default function Partners() {
  return (
    <section id="partners" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Partners grid */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.3em] text-violet-glow uppercase">
              Trusted By
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Our <span className="text-gradient-violet">Partners</span>
            </h2>
            <p className="mt-5 text-lg text-[#b9b2d6]">
              We collaborate with forward-thinking teams to deliver lasting
              digital infrastructure.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {partners.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <div className="glass rounded-2xl h-32 grid place-items-center text-center px-4 transition-transform duration-300 hover:-translate-y-1.5">
                <div>
                  <Handshake
                    className="mx-auto text-violet-glow/70 mb-2"
                    size={22}
                  />
                  <span className="text-lg font-semibold text-white tracking-wide">
                    {p}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CEO message */}
        <Reveal delay={0.1}>
          <div className="mt-16 relative overflow-hidden rounded-3xl border border-violet-electric/30 bg-gradient-to-br from-violet-electric/15 via-transparent to-violet-glow/10 p-10 sm:p-16 text-center">
            <Quote
              className="mx-auto text-violet-glow/80 mb-6 animate-pulse-glow"
              size={40}
            />
            <blockquote className="text-2xl sm:text-3xl font-bold text-white leading-snug max-w-4xl mx-auto">
              &ldquo;True digital transformation requires more than just
              deploying new technology—it demands a foundation of absolute
              reliability.&rdquo;
            </blockquote>
            <div className="mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-violet-glow/60" />
              <span className="text-violet-glow font-semibold tracking-wide">
                Aisyatul Hani, CEO
              </span>
              <span className="h-px w-8 bg-violet-glow/60" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
