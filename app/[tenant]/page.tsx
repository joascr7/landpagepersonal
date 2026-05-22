import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import AppSection from "@/components/AppSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer"; 

import ServicesAndGallery from "@/components/ServicesAndGallery";
import BookingSection from "@/components/BookingSection";

import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function Home({ params }: PageProps) {
  const { tenant } = await params;

  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  if (error || !cliente || cliente.assinatura_status !== "ativo") {
    notFound();
  }

  const { data: servicosDoBanco } = await supabase
    .from("servicos")
    .select("*")
    .eq("cliente_id", cliente.id);

  const { data: galeriaDoBanco } = await supabase
    .from("galeria")
    .select("*")
    .eq("cliente_id", cliente.id);

  const clienteObjeto: any = cliente;
  const ehEstetica = clienteObjeto.nicho === "estetica";
  const listaDeServicos = servicosDoBanco || [];
  const listaDaGaleria = galeriaDoBanco || [];

  return (
    <main className={`min-h-screen bg-neutral-950 text-white font-sans ${ehEstetica ? 'selection:bg-pink-500' : 'selection:bg-amber-500'} selection:text-neutral-950 overflow-x-hidden scroll-smooth relative`}>
      
      <Navbar cliente={clienteObjeto} />
      
      <div className="relative z-10 w-full">
        
        <HeroSection cliente={clienteObjeto} />
        
        {/* 🔥 VITRINE / GALERIA INTELIGENTE */}
        <div id="vitrine">
          <ServicesAndGallery 
            cliente={clienteObjeto} 
            // Se for personal, enviamos um array vazio para o componente não renderizar a parte de "serviços"
            servicos={ehEstetica ? listaDeServicos : []} 
            galeria={listaDaGaleria} 
          />
        </div>
        
        <div id="como-funciona">
          <ObjectivesSection cliente={clienteObjeto} />
        </div>
        
        {!ehEstetica && (
          <div id="app">
            <AppSection cliente={clienteObjeto} />
          </div>
        )}
        
        {!ehEstetica && (
          <div id="services">
            <FeaturesSection cliente={clienteObjeto} />
          </div>
        )}
        
        <AboutSection cliente={clienteObjeto} />
        
        {!ehEstetica && (
          <div id="precos" className="py-20 md:py-32 border-t border-neutral-900 bg-neutral-950">
            <PricingSection cliente={clienteObjeto} />
          </div>
        )}
        
        {ehEstetica && (
          <div id="agendamento">
            <BookingSection cliente={clienteObjeto} servicos={listaDeServicos} />
          </div>
        )}
        
        <FaqSection cliente={clienteObjeto} />

      </div>

      <Footer cliente={clienteObjeto} />
    </main>
  );
}