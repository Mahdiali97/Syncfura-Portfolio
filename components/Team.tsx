import Reveal from "./Reveal";
import { Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "AISHATUL HANI BINTI AHMAD PUAD",
    role: "Chief Executive Officer (CEO) & Product Strategist",
    initials: "AH",
    accent: "from-violet-electric to-fuchsia-500",
  },
  {
    name: "WAN AZIMAH BINTI WAN OTHMAN",
    role: "Chief Technology Officer (CTO) & Lead Web Architect",
    initials: "WA",
    accent: "from-indigo-500 to-violet-electric",
  },
  {
    name: "MUHAMAD ALI HANAFIAH BIN SABARUDIN",
    role: "AI & Automation Engineer",
    initials: "MH",
    accent: "from-cyan-500 to-violet-electric",
  },
  {
    name: "AMIRUL AZIM BIN APANDI",
    role: "IoT & Embedded Systems Engineer",
    initials: "AA",
    accent: "from-emerald-500 to-violet-electric",
  },
  {
    name: "NURFARHAH SAKINAH BINTI MOHD BUSTAMAN",
    role: "Lead Quality Assurance (QA) & Software Verification Engineer",
    initials: "NS",
    accent: "from-amber-500 to-violet-electric",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 section-glow">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.3em] text-violet-glow uppercase">
              Our People
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Leadership &amp; Engineering{" "}
              <span className="text-gradient-violet">Team</span>
            </h2>
            <p className="mt-5 text-lg text-[#b9b2d6]">
              A focused crew of strategists, architects, and verification
              specialists who build to last.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.12}>
              <div className="glass rounded-2xl p-7 h-full flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1.5">
                <div
                  className={`relative grid place-items-center w-24 h-24 rounded-full bg-gradient-to-br ${m.accent} text-white text-2xl font-extrabold shadow-[0_0_30px_-6px_rgba(168,85,247,0.7)] mb-5`}
                >
                  {m.initials}
                  <span className="absolute inset-0 rounded-full ring-2 ring-white/20" />
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  {m.name}
                </h3>
                <p className="mt-2 text-sm text-violet-glow font-medium">
                  {m.role}
                </p>
                <div className="mt-4 flex gap-3 text-[#9e97c4]">
                  <span className="p-2 rounded-full bg-white/5 hover:text-violet-glow hover:bg-violet-electric/10 transition-colors cursor-pointer">
                    <Linkedin size={16} />
                  </span>
                  <span className="p-2 rounded-full bg-white/5 hover:text-violet-glow hover:bg-violet-electric/10 transition-colors cursor-pointer">
                    <Mail size={16} />
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
