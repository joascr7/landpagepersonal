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

  // 4. BUSCA DIRETA DOS SERVIÇOS: Extrai a lista completa de serviços pelo ID do cliente
  const { data: servicosDoBanco } = await supabase
    .from("servicos")
    .select("*")
    .eq("cliente_id", cliente.id);

  // 5. BUSCA DIRETA DA GALERIA: Busca as fotos do portfólio deste cliente
  const { data: galeriaDoBanco } = await supabase
    .from("galeria")
    .select("*")
    .eq("cliente_id", cliente.id);

  // Cria uma referência fortemente tipada como 'any' para evitar travas do compilador
  const clienteObjeto: any = cliente;
  const ehEstetica = clienteObjeto.nicho === "estetica";
  const listaDeServicos = servicosDoBanco || [];
  const listaDaGaleria = galeriaDoBanco || [];

  return (
    <main className="bg-neutral-950 text-white min-h-screen font-sans selection:bg-pink-500 selection:text-white overflow-x-hidden scroll-smooth relative">
      
      {/* O Menu Superior Fixo */}
      <Navbar cliente={clienteObjeto} />
      
      {/* CORREÇÃO GLOBAL DE CLIQUES */}
      <div className="relative z-10 w-full pointer-events-auto block">
        
        {/* Seção Hero de Entrada */}
        <HeroSection cliente={clienteObjeto} />
        
        {/* Seção de Procedimentos e Trabalhos Reais (Apenas para Estética) */}
        {ehEstetica && (
          <ServicesAndGallery 
            cliente={clienteObjeto} 
            servicos={listaDeServicos as any[]} 
            galeria={listaDaGaleria as any[]} 
          />
        )}
        
        {/* Exibe os 3 Cards Informativos de como você vai ajudar o cliente */}
        <div id="como-funciona">
          <ObjectivesSection {...clienteObjeto} cliente={clienteObjeto} />
        </div>
        
        {/* Só mostra a seção do Aplicativo se for Personal Trainer */}
        {!ehEstetica && (
          <div id="app">
            <AppSection cliente={clienteObjeto} />
          </div>
        )}
        
        {/* Só exibe o FeaturesSection se NÃO for estética */}
        {!ehEstetica && (
          <div id="services">
            <FeaturesSection cliente={clienteObjeto} />
          </div>
        )}
        
        {/* 🌟 SEÇÃO SOBRE MIM (Renderizada de forma global, apenas uma vez) */}
        <AboutSection cliente={clienteObjeto} />
        
        {/* Só exibe os cards de planos pretos se NÃO for estética */}
        {!ehEstetica && (
          <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
            <PricingSection cliente={clienteObjeto} />
          </div>
        )}
        
        {/* Formulário de Agendamento de Horários (Apenas para Estética) */}
        {ehEstetica && (
          <div id="agendamento">
            <BookingSection cliente={clienteObjeto} servicos={listaDeServicos as any[]} />
          </div>
        )}
        
        <FaqSection cliente={clienteObjeto} />

      </div>

      {/* O Rodapé Dinâmico */}
      <Footer cliente={clienteObjeto} />
    </main>
  );
}