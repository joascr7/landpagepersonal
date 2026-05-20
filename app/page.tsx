import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden">
      
      {/* 1. Topo do Site */}
      <HeroSection />
      
      {/* 2. Como Funciona */}
      <FeaturesSection />
      
      {/* 3. Seção de Preços */}
      <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
        <PricingSection />
      </div>
      
    </main>
  );
}