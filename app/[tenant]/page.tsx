import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer"; 

// Novos componentes do fluxo de Agendamentos e Estética
import ServicesAndGallery from "@/components/ServicesAndGallery";
import BookingSection from "@/components/BookingSection";

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function Home({ params }: PageProps) {
  // 1. Captura o slug do personal/manicure vindo da URL (ex: /joasvieira)
  const { tenant } = await params;

  // 2. Busca apenas os dados do cliente primeiro para garantir a segurança da rota
  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  // 3. Se o cliente não existir ou a assinatura dele não estiver 'ativa', joga para página 404
  if (error || !cliente || cliente.assinatura_status !== "ativo") {
    notFound();
  }

  // 4. BUSCA DIRETA SEM JOIN: Força o Supabase a extrair a lista completa de serviços pelo ID do cliente
  const { data: servicosDoBanco } = await supabase
    .from("servicos")
    .select("*")
    .eq("cliente_id", cliente.id);

  const ehEstetica = cliente.nicho === "estetica";
  const listaDeServicos = servicosDoBanco || [];

  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden scroll-smooth relative">
      
      {/* O Menu Superior Fixo */}
      <Navbar cliente={cliente} />
      
      {/* CORREÇÃO GLOBAL DE CLIQUES */}
      <div className="relative z-10 w-full pointer-events-auto block">
        
        {/* Seção Hero de Entrada */}
        <HeroSection cliente={cliente} />
        
        {/* Passa a lista convertida para anular o erro do TypeScript */}
        {ehEstetica && <ServicesAndGallery cliente={cliente} servicos={listaDeServicos as any[]} />}
        
        {/* Só exibe a seção do Passo a Passo (Objectives) se NÃO for estética */}
        {!ehEstetica && (
          <div id="como-funciona">
            <ObjectivesSection cliente={cliente} />
          </div>
        )}
        
        {/* Só mostra a seção do Aplicativo se for Personal Trainer */}
        {!ehEstetica && (
          <div id="app">
            <AppSection cliente={cliente} />
          </div>
        )}
        
        {/* 🔥 CORRIGIDO: Só exibe o FeaturesSection se NÃO for estética (remove o passo a passo) */}
        {!ehEstetica && (
          <div id="services">
            <FeaturesSection cliente={cliente} />
          </div>
        )}
        
        <AboutSection cliente={cliente} />
        
        {/* Só exibe os cards de planos pretos se NÃO for estética */}
        {!ehEstetica && (
          <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
            <PricingSection cliente={cliente} />
          </div>
        )}
        
        {/* Passa a lista convertida para anular o erro do TypeScript */}
        {ehEstetica && (
          <div id="agendamento">
            <BookingSection cliente={cliente} servicos={listaDeServicos as any[]} />
          </div>
        )}
        
        <FaqSection cliente={cliente} />

      </div>

      {/* O Rodapé Dinâmico */}
      <Footer cliente={cliente} />
    </main>
  );
}