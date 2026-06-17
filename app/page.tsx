import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import ResearchMapSection from "@/components/sections/ResearchMapSection";
import Skills from "@/components/sections/Skills";
import Publications from "@/components/sections/Publications";
import SummerSchools from "@/components/sections/SummerSchools";
import Honours from "@/components/sections/Honours";
import Engagement from "@/components/sections/Engagement";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Experience />
        <ResearchMapSection />
        <Skills />
        <Publications />
        <SummerSchools />
        <Honours />
        <Engagement />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
