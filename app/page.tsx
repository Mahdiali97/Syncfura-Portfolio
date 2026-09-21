import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Services />
      <Team />
      <Partners />
      <Contact />
    </main>
  );
}
