import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer"; 

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function Home({ params }: PageProps) {
  // 1. Captura o slug do personal/manicure vindo da URL (ex: /joasvieira)
  const { tenant } = await params;

  // 2. Busca os dados desse cliente específico lá no Supabase
  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  // 3. Se o cliente não existir ou a assinatura dele não estiver 'ativa', joga para página 404
  if (error || !cliente || cliente.assinatura_status !== "ativo") {
    notFound();
  }

  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden scroll-smooth relative">
      
      {/* O Menu Superior Fixo - Fica isolado na camada z-50 de controle */}
      <Navbar cliente={cliente} />
      
      {/* 🔥 CORREÇÃO GLOBAL DE CLIQUES: Esta div envelopa todo o miolo do site, 
          forçando a captura do mouse e garantindo que o checkout funcione de primeira! */}
      <div className="relative z-10 w-full pointer-events-auto block">
        
        <HeroSection cliente={cliente} />
        
        <div id="como-funciona">
          <ObjectivesSection cliente={cliente} />
        </div>
        
        <div id="app">
          <AppSection cliente={cliente} />
        </div>
        
        <FeaturesSection cliente={cliente} />
        
        <AboutSection cliente={cliente} />
        
        <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
          <PricingSection cliente={cliente} />
        </div>
        
        <FaqSection cliente={cliente} />

      </div>

      {/* O Rodapé Dinâmico - Mantido na base do layout */}
      <Footer cliente={cliente} />
    </main>
  );
}