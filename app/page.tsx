import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";

export default function Home() {
  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden">
      
      {/* 1. Promessa e Foto Principal */}
      <HeroSection />
      
      {/* 2. Como Funciona o Método */}
      <FeaturesSection />
      
      {/* 3. Quem é o Profissional (Autoridade/CREF) */}
      <AboutSection />
      
      {/* 4. Tabela de Preços e Checkout */}
      <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
        <PricingSection />
      </div>

      {/* 5. Quebra de Objeções Finas */}
      <FaqSection />
      
    </main>
  );
}