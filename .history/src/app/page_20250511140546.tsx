import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import BlueprintRoute from "@/components/ui/BlueprintRoute";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background-dark overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BlueprintRoute />
      </div>
      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory px-16 md:px-32 lg:px-48">
        <div
          className="snap-start h-screen flex items-center justify-center"
          id="hero"
        >
          <Hero />
        </div>
        <div
          className="snap-start h-screen flex items-center justify-center"
          id="about"
        >
          <About />
        </div>
        <div
          className="snap-start h-screen flex items-center justify-center"
          id="skills"
        >
          <Skills />
        </div>
        <div
          className="snap-start h-screen flex items-center justify-center"
          id="experience"
        >
          <Experience />
        </div>
        <div
          className="snap-start h-screen flex items-center justify-center"
          id="portfolio"
        >
          <Portfolio />
        </div>
      </main>
    </div>
  );
}
