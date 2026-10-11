import { Navbar } from "@/components/Navbar";
import { PrintHeader } from "@/components/PrintHeader";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Certifications } from "@/components/Certifications";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { SECTION_IDS } from "@/data/nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";

const SECTIONS = SECTION_IDS as readonly string[];

export default function App() {
  const { theme, toggle } = useTheme();
  const activeId = useActiveSection(SECTIONS);

  return (
    <>
      <a
        href="#main"
        className="no-print sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-accent-strong focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-accent-fg focus:shadow-lg"
      >
        Skip to main content
      </a>

      <Navbar theme={theme} onToggleTheme={toggle} activeId={activeId} />

      <main id="main" tabIndex={-1} className="outline-none">
        <div className="container-page">
          <PrintHeader />
        </div>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
