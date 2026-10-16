import Hero from "@/components/home/Hero";
import ProjectCarousel from "@/components/ProjectCarousel";
import CaseStudyScroller from "@/components/CaseStudyScroller";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialSection from "@/components/TestimonialCarousel";
import { ContactCTA, Intro, Pillars, ResearchShowcase, SolutionBento, TechnologyStack } from "@/components/sections";
import { SectionHeading, TextLink } from "@/components/ui";
import { projects } from "@/content/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <SolutionBento />
      <section className="section overflow-hidden bg-white" aria-labelledby="work-title">
        <div className="container-page">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div id="work-title">
              <SectionHeading title="Selected work." subtitle="From ambitious ideas to engineered reality. Founder-led research and engineering that shapes how we build." />
            </div>
            <TextLink href="/work">All work</TextLink>
          </div>
          <ProjectCarousel projects={projects} />
        </div>
      </section>
      <CaseStudyScroller />
      <Pillars />
      <ResearchShowcase />
      <ProcessTimeline />
      <TestimonialSection />
      <TechnologyStack />
      <ContactCTA />
    </>
  );
}
