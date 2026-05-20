import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden scroll-smooth">
      
      {/* O Menu Superior Fixo */}
      <Navbar />
      
      {/* Seções com IDs para âncora de rolagem */}
      <HeroSection />
      
      <div id="como-funciona">
        <ObjectivesSection />
      </div>
      
      <div id="app">
        <AppSection />
      </div>
      
      <FeaturesSection />
      
      <AboutSection />
      
      <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
        <PricingSection />
      </div>
      
      <FaqSection />
    </main>
  );
}