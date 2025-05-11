import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import ScrollJourneyNav from "@/components/ui/ScrollJourneyNav";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <ScrollJourneyNav />
      <div className="snap-start h-screen" id="hero">
        <Hero />
      </div>
      <div className="snap-start h-screen" id="about">
        <About />
      </div>
      <div className="snap-start h-screen" id="skills">
        <Skills />
      </div>
      <div className="snap-start h-screen" id="experience">
        <Experience />
      </div>
      <div className="snap-start h-screen" id="portfolio">
        <Portfolio />
      </div>
    </main>
  );
}
