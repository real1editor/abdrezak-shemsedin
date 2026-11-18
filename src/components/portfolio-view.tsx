import type { PortfolioView } from "@/data/site";
import { getDomainCards } from "@/data/site";
import { PortfolioProvider } from "@/components/portfolio-context";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import KeyMetrics from "@/components/sections/key-metrics";
import About from "@/components/sections/about";
import WhatIBuild from "@/components/sections/what-i-build";
import CourseFocus from "@/components/sections/course-focus";
import SeoPages from "@/components/sections/seo-pages";
import Domains from "@/components/sections/domains";
import Languages from "@/components/sections/languages";
import Skills from "@/components/sections/skills";
import Tools from "@/components/sections/tools";
import Education from "@/components/sections/education";
import Experience from "@/components/sections/experience";
import Projects from "@/components/sections/projects";
import Credentials from "@/components/sections/credentials";
import FAQ from "@/components/sections/faq";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import BackToTop from "@/components/sections/back-to-top";

export default function PortfolioView({ view }: { view: PortfolioView }) {
  const domains = view.meta.showDomains ? getDomainCards() : [];

  return (
    <PortfolioProvider value={view}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-zinc-900"
      >
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <KeyMetrics />
        <About />
        <WhatIBuild />
        <CourseFocus />
        <SeoPages />
        {domains.length > 0 && <Domains domains={domains} />}
        <Languages />
        <Skills />
        <Tools />
        <Education />
        <Experience />
        <Projects />
        <Credentials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </PortfolioProvider>
  );
}
