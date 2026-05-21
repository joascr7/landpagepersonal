import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer"; // Importação do Footer adicionada!

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
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden scroll-smooth">
      
      {/* O Menu Superior Fixo - Passando os dados do banco */}
      <Navbar cliente={cliente} />
      
      {/* Seções com IDs para âncora de rolagem - Passando os dados do banco */}
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

      {/* O Rodapé Dinâmico - Adicionado aqui no final! */}
      <Footer cliente={cliente} />
    </main>
  );
}