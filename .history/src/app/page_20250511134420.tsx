import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";

export default function Home() {
  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="snap-start h-screen">
        <Hero />
      </div>
      <div className="snap-start h-screen">
        <About />
      </div>
      <div className="snap-start h-screen">
        <Skills />
      </div>
      <div className="snap-start h-screen">
        <Experience />
      </div>
      <div className="snap-start h-screen">
        <Portfolio />
      </div>
    </main>
  );
}
