import { MainLayout } from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <MainLayout>
      <Hero />

      <Section id="about" title="About Me">
        <About />
      </Section>

      <Section id="skills" title="Skills">
        <Skills />
      </Section>

      <Section id="experience" title="Experience">
        {/* Experience section content will go here */}
      </Section>

      <Section id="projects" title="Projects">
        {/* Projects section content will go here */}
      </Section>

      <Section id="contact" title="Contact">
        {/* Contact section content will go here */}
      </Section>
    </MainLayout>
  );
}
