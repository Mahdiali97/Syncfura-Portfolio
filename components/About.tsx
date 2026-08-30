import Reveal from "./Reveal";
import { Target, Eye, Layers } from "lucide-react";

const brandCards = [
  {
    letter: "SYNC",
    title: "Synchronised Systems",
    desc: "We synchronise people, data, and machines into a single, seamless digital ecosystem built to last.",
    icon: Layers,
  },
  {
    letter: "FU",
    title: "Fusion of Technologies",
    desc: "We fuse Web, IoT, AI, and Automation into intelligent solutions that turn complexity into clarity.",
    icon: Target,
  },
  {
    letter: "RA",
    title: "Rapid & Reliable",
    desc: "We ship with agile rigour and comprehensive validation — quality you can depend on, speed you can feel.",
    icon: Eye,
  },
];

const mission = [
  "To design custom web and digital solutions that act as the backbone for modern businesses.",
  "To deploy intelligent automation and AI tools that transform complex data into clear, actionable insights.",
  "To bridge the gap between the physical and digital worlds through seamless IoT integrations.",
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.3em] text-accent uppercase">
              About Us
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-ink leading-tight">
              The meaning behind{" "}
              <span className="text-gradient-violet">SyncFura</span>
            </h2>
            <p className="mt-5 text-lg text-ink-muted">
              Our name is a promise. It is the blueprint for how we engineer
              digital systems that endure.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {brandCards.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.letter} delay={i * 0.12}>
                <div className="glass rounded-2xl p-7 h-full transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-accent/30 to-accent/15 border border-accent/30 text-accent font-extrabold">
                      {c.letter[0]}
                    </span>
                    <span className="text-2xl font-extrabold text-ink tracking-wide">
                      {c.letter}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">
                    {c.title}
                  </h3>
                  <p className="text-ink-muted leading-relaxed">{c.desc}</p>
                  <Icon
                    size={20}
                    className="text-accent/60 mt-5"
                    aria-hidden
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Vision */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/10 to-transparent p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-accent" size={22} />
              <h3 className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
                Our Vision
              </h3>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-ink leading-snug max-w-4xl">
              &ldquo;To be the premier digital transformation partner, empowering
              businesses to thrive in the era of artificial intelligence and
              connectivity.&rdquo;
            </p>
          </div>
        </Reveal>

        {/* Mission */}
        <Reveal delay={0.15}>
          <div className="mt-10 rounded-3xl border border-ink/10 bg-white/60 p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="text-accent" size={22} />
              <h3 className="text-sm font-semibold tracking-[0.25em] text-accent uppercase">
                Our Mission
              </h3>
            </div>
            <ul className="space-y-4">
              {mission.map((m, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="mt-1.5 grid place-items-center w-6 h-6 rounded-full bg-accent/20 border border-accent/40 text-accent-deep text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-lg text-ink-soft leading-relaxed">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
