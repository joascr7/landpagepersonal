import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesAndGallery from "@/components/ServicesAndGallery";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import BookingSection from "@/components/BookingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

import TestimonialsSection from "@/components/TestimonialsSection";

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps { params: Promise<{ tenant: string }>; }

export default async function Home({ params }: PageProps) {
  const { tenant } = await params;

  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  if (error || !cliente || cliente.assinatura_status !== "ativo") notFound();

  const [servicosRes, galeriaRes] = await Promise.all([
    supabase.from("servicos").select("*").eq("cliente_id", cliente.id),
    supabase.from("galeria").select("*").eq("cliente_id", cliente.id),
  ]);

  const ehEstetica = cliente.nicho === "estetica";

  // CONTROLE CENTRALIZADO: 
  // Altere a string abaixo para 'dark', 'light' ou 'beige' sempre que quiser.
  // Você pode até ler isso de uma coluna fixa no banco se preferir.
  const temaAtivo = cliente.tema || 'dark'; 
  
  const temaClasses = {
    dark: "bg-neutral-950 text-white selection:bg-amber-500",
    light: "bg-white text-neutral-900 selection:bg-amber-500",
    beige: "bg-[#FDF6E3] text-neutral-800 selection:bg-amber-500"
  };

  return (
    <main className={`min-h-screen font-sans overflow-x-hidden scroll-smooth relative transition-colors duration-500 ${temaClasses[temaAtivo as keyof typeof temaClasses]}`}>
      
      <Navbar cliente={cliente} />
      
      <div className="relative z-10 w-full">
        <HeroSection cliente={cliente} />
       
        
        <div id="vitrine">
          <ServicesAndGallery 
            cliente={cliente} 
            servicos={ehEstetica ? servicosRes.data || [] : []} 
            galeria={galeriaRes.data || []} 
          />
        </div>
        
        <ObjectivesSection cliente={cliente} />
        
        {!ehEstetica && (
          <>
            <AppSection cliente={cliente} />
            <FeaturesSection cliente={cliente} />
          </>
        )}
        
        <AboutSection cliente={cliente} />
        
        {!ehEstetica && (
          <div id="precos" className="py-20 border-t border-neutral-900/10">
            <PricingSection cliente={cliente} />
          </div>
        )}
        
        <TestimonialsSection cliente={cliente} />

        {ehEstetica && (
          <div id="agendamento">
            <BookingSection cliente={cliente} servicos={servicosRes.data || []} />
          </div>
        )}
        
        <FaqSection cliente={cliente} />
      </div>

      <Footer cliente={cliente} />
    </main>
  );
}