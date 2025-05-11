import { MainLayout } from "@/components/layout/MainLayout";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";

export default function Home() {
  return (
    <MainLayout>
      <Hero
        title="Anthony 'Mrguru' Feaster – Full Stack Developer | Locksmith Lead | Low Voltage Specialist"
        subtitle="I fix. I code. I lead. I build what's needed."
      />

      <Section id="about" title="About Me">
        {/* About section content will go here */}
      </Section>

      <Section id="skills" title="Skills">
        {/* Skills section content will go here */}
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
