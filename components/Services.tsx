import Reveal from "./Reveal";
import { Code2, BrainCircuit, RadioTower } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Custom Web Platforms",
    desc: "We design reliable, scalable web architectures — from internal portals to dynamic applications — with a strict focus on comprehensive software validation so what ships stays solid under load.",
    points: ["Internal portals & dashboards", "Dynamic web applications", "Comprehensive software validation"],
    span: "col-span-1",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent AI & Automation",
    desc: "We deploy advanced AI to transform complex raw data into actionable insights, predict trends, and reduce repetitive manual workloads — freeing your team to focus on what matters.",
    points: ["Predictive analytics", "Process automation", "Actionable insights"],
    span: "col-span-1",
  },
  {
    icon: RadioTower,
    title: "Seamless IoT Systems",
    desc: "We bridge the physical and digital worlds for real-time monitoring and securely synchronize physical operations with central digital dashboards you can trust.",
    points: ["Real-time monitoring", "Secure device sync", "Central dashboards"],
    span: "col-span-1",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-[0.3em] text-violet-glow uppercase">
              What We Do
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Core{" "}
              <span className="text-gradient-violet">Solutions</span>
            </h2>
            <p className="mt-5 text-lg text-[#b9b2d6]">
              Three pillars of engineering that form the digital backbone of
              modern enterprises.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.12}>
                <div className="glass rounded-2xl p-7 h-full flex flex-col transition-transform duration-300 hover:-translate-y-1.5">
                  <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-electric/30 to-violet-glow/15 border border-violet-electric/30 mb-6">
                    <Icon className="text-violet-glow" size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-[#b9b2d6] leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-[#cdc7e6]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-glow" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
