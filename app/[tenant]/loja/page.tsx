import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ tenant: string }>;
}

export default async function LojaPage({ params }: PageProps) {
  // 1. Captura o slug do cliente vindo da URL
  const { tenant } = await params;

  // 2. Busca os dados do cliente lá no Supabase
  const { data: cliente, error } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  // 3. Valida se o cliente existe e está ativo
  if (error || !cliente || cliente.assinatura_status !== "ativo") {
    notFound();
  }

  const ehEstetica = cliente.nicho === "estetica";

  // 4. Captura a cor do banco. Se não existir, define o padrão baseado no nicho
  const corDefinida = cliente.tema_cor || (ehEstetica ? "pink" : "amber");

  // 5. DICIONÁRIO DE CORES DINÂMICAS DO SUPABASE PARA A LOJA
  const mapasDeCores: Record<string, { linha: string; botao: string; textBadge: string }> = {
    blue: {
      linha: "bg-blue-500",
      botao: "bg-blue-500 hover:bg-blue-400 shadow-blue-500/10 text-neutral-950",
      textBadge: "text-blue-500",
    },
    purple: {
      linha: "bg-purple-500",
      botao: "bg-purple-500 hover:bg-purple-400 shadow-purple-500/10 text-white",
      textBadge: "text-purple-500",
    },
    pink: {
      linha: "bg-pink-500",
      botao: "bg-pink-500 hover:bg-pink-400 shadow-pink-500/10 text-white",
      textBadge: "text-pink-500",
    },
    amber: {
      linha: "bg-amber-500",
      botao: "bg-amber-500 hover:bg-amber-400 shadow-amber-400/10 text-neutral-950",
      textBadge: "text-amber-500",
    },
  };

  // Seleciona o estilo ativo com base na cor escolhida no banco
  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // Vitrine 1: Serviços / Consultorias Dinâmicas
  const servicos = ehEstetica ? [
    {
      name: "PLANO SEMESTRAL VIP",
      price: cliente.preco_consultoria_180_dias + ",00",
      description: "Unhas impecáveis o ano todo com horários fixos and spa incluso.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_180_dias || "#", 
    },
    {
      name: "PLANO TRIMESTRAL RECORRENTE",
      price: cliente.preco_consultoria_90_dias + ",00",
      description: "Manutenções garantidas no trimestre com desconto exclusivo.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_90_dias || "#",
    },
    {
      name: "PACOTE MENSAL CUIDADO",
      price: cliente.preco_consultoria_30_dias + ",00",
      description: "Aplicação e reparos inclusos para o seu autocuidado mensal.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_30_dias || "#",
    },
  ] : [
    {
      name: "180 DIAS (6 PLANILHAS)",
      price: cliente.preco_consultoria_180_dias + ",00",
      description: "Consultoria personalizada de longo prazo com o melhor custo-benefício.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_180_dias || "#", 
    },
    {
      name: "90 DIAS (3 PLANILHAS)",
      price: cliente.preco_consultoria_90_dias + ",00",
      description: "Acompanhamento focado em evolução e constância por 3 meses.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_90_dias || "#",
    },
    {
      name: "30 DIAS (1 PLANILHA)",
      price: cliente.preco_consultoria_30_dias + ",00",
      description: "Plano mensal para você dar o primeiro passo na metodologia.",
      badge: "Sale",
      checkoutUrl: cliente.checkout_30_dias || "#",
    },
  ];

  // 🔥 Vitrine 2: Infoprodutos / Planilhas Dinâmicas com suporte a fotos do Supabase
  const produtosDigitais = ehEstetica ? [
    {
      name: "Apostila Digital de ALONGAMENTO EM GEL: Passo a passo do Zero",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Materiais Digitais",
      badge: "Cursos",
      img: cliente.img_planilha_emagrecimento || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#", 
    },
    {
      name: "E-book: Guia prático de BIASSEGURANÇA e Esterilização para Manicures",
      oldPrice: "R$ 197,00",
      price: cliente.preco_planilhas + ",00",
      category: "Materiais Digitais",
      badge: "Cursos",
      img: cliente.img_planilha_casa || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
    {
      name: "Apostila com TÉCNICAS AVANÇADAS de controle de produto e simetria",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Materiais Digitais",
      badge: "Cursos",
      img: cliente.img_planilha_mulheres || "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
    {
      name: "Manual de DURABILIDADE EXTREMA: Como evitar descolamentos",
      oldPrice: "R$ 197,00",
      price: cliente.preco_planilhas + ",00",
      category: "Materiais Digitais",
      badge: "Cursos",
      img: cliente.img_planilha_homens || "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
  ] : [
    {
      name: "Planilha de musculação para HOMENS com objetivo de EMAGRECIMENTO",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: cliente.img_planilha_emagrecimento || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
    {
      name: "Planilha de TREINAMENTO EM CASA (Sem equipamentos)",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: cliente.img_planilha_casa || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
    {
      name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para MULHERES",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: cliente.img_planilha_mulheres || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
    {
      name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para HOMENS",
      oldPrice: "R$ 277,00",
      price: cliente.preco_planilhas + ",00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: cliente.img_planilha_homens || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
      checkoutUrl: cliente.checkout_planilhas || "#",
    },
  ];

  return (
    <main className="relative z-10 bg-white text-neutral-950 min-h-screen pt-32 pb-20 font-sans pointer-events-auto block">
      <Navbar cliente={cliente} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Seção 1 */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">
              {ehEstetica ? "Planos e Pacotes" : "Consultoria Personalizada"}
            </h2>
            <div className={`w-12 h-1 ${estiloAtivo.linha} mx-auto mt-2`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicos.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm relative flex flex-col justify-between text-center z-20">
                <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase z-30">{item.badge}</span>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                    {ehEstetica ? "Studio de Beleza" : "Consultoria personalizada"}
                  </p>
                  <h3 className="text-lg font-extrabold text-neutral-900 mt-1 min-h-[50px] flex items-center justify-center">{item.name}</h3>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                  </div>
                  <p className="text-xl font-black text-neutral-950 mt-4">R$ {item.price}</p>
                  <p className="text-xs text-neutral-500 mt-2 min-h-[40px]">{item.description}</p>
                </div>
                
                <a 
                  href={item.checkoutUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`relative z-30 mt-6 block w-full text-center ${estiloAtivo.botao} font-bold py-2.5 px-4 rounded-xl text-sm uppercase transition-all cursor-pointer pointer-events-auto select-none`}
                >
                  Adicionar ao carrinho
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 2 */}
        <div id="planilhas" className="scroll-mt-28">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">
              {ehEstetica ? "Materiais Digitais" : "Planilhas Prontas"}
            </h2>
            <div className={`w-12 h-1 ${estiloAtivo.linha} mx-auto mt-2`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosDigitais.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm p-4 flex flex-col justify-between relative z-20">
                <span className="absolute top-6 right-6 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase z-30">{item.badge}</span>
                <div>
                  <div className="h-40 w-full rounded-xl overflow-hidden relative mb-4 bg-neutral-100">
                    {/* 🔥 Renderização dinâmica da imagem vinda das colunas compartilhadas */}
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">{item.category}</p>
                  <h3 className="text-xs font-bold text-neutral-800 mt-1 line-clamp-3 min-h-[48px]">{item.name}</h3>
                  <div className="flex items-center gap-0.5 my-1">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-[10px]">★</span>)}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-neutral-400 line-through">{item.oldPrice}</span>
                    <span className="text-base font-black text-neutral-950">R$ {item.price}</span>
                  </div>
                </div>
                
                <a 
                  href={item.checkoutUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`relative z-30 mt-4 block w-full text-center ${estiloAtivo.botao} font-bold py-2 px-4 rounded-xl text-xs uppercase transition-all cursor-pointer pointer-events-auto select-none`}
                >
                  Adicionar ao carrinho
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}