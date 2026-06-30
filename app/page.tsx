'use client';

import { HeroSection } from '@/app/components/sections/HeroSection';
import { AboutSection } from '@/app/components/sections/AboutSection';
import { SkillsSection } from '@/app/components/sections/SkillsSection';
import { ProjectsSection } from '@/app/components/sections/ProjectsSection';
import { ContactSection } from '@/app/components/sections/ContactSection';
import { ExperienceSection } from '@/app/components/sections/ExperienceSection';
import { BG_COLOR, TEXT_COLOR } from '@/app/constants';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden" style={{ backgroundColor: BG_COLOR, color: TEXT_COLOR }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}