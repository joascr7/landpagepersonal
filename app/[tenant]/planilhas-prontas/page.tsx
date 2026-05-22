import { supabase } from "@/lib/supabase"; 
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: Promise<{
    tenant: string;
  }>;
}

export default async function PlanilhasProntasPage({ params }: PageProps) {
  // 1. Resolve os parâmetros da URL
  const resolvedParams = await params; 

  // 2. Busca os dados no Supabase
  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", resolvedParams.tenant)
    .single();

  // 🔥 Fallback de dados caso o banco não retorne (Ambiente de Teste)
  const dadosMockadosDeTeste = {
    nome: "Hugo Mateus",
    nicho: "personal", 
    slug: "hugomateus",
    tema_cor: "amber", 
    whatsapp_numero: "819973119512", 
    whatsapp_texto: "Olá Hugo! Vim pela página de planilhas prontas.",
    gmail_contato: "contato@hugomateus.com",
    instagram_link: "@hugomateus",
    link_planilha_emagrecimento: "https://seu-checkout.com/emagrecimento",
    link_planilha_casa: "https://seu-checkout.com/em-casa",
    link_planilha_mulheres: "https://seu-checkout.com/avancado-mulheres",
    link_planilha_homens: "https://seu-checkout.com/avancado-homens",
    // Links das imagens padrão caso o banco esteja vazio
    img_planilha_emagrecimento: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80",
    img_planilha_casa: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
    img_planilha_mulheres: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
    img_planilha_homens: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80"
  };

  const clienteFinal = cliente && cliente.whatsapp_numero ? cliente : dadosMockadosDeTeste;

  const ehEstetica = clienteFinal.nicho === "estetica";
  const corDefinida = clienteFinal.tema_cor || (ehEstetica ? "pink" : "amber");

  // Preço dinâmico tratado para não renderizar string quebrada
  const precoPlanilhas = clienteFinal.preco_planilhas ? `${clienteFinal.preco_planilhas},00` : "47,00";

  // Dicionário de cores do Supabase
  const mapasDeCores: Record<string, { linha: string; botao: string; badge: string; textBadge: string }> = {
    blue: { 
      linha: "bg-blue-500", 
      botao: "bg-blue-500 hover:bg-blue-400 shadow-blue-500/10 text-neutral-950", 
      badge: "bg-blue-500 text-neutral-950",
      textBadge: "text-blue-500"
    },
    purple: { 
      linha: "bg-purple-500", 
      botao: "bg-purple-500 hover:bg-purple-400 shadow-purple-500/10 text-white", 
      badge: "bg-purple-500 text-white",
      textBadge: "text-purple-500"
    },
    pink: { 
      linha: "bg-pink-500", 
      botao: "bg-pink-500 hover:bg-pink-400 shadow-pink-500/10 text-white", 
      badge: "bg-pink-500 text-white",
      textBadge: "text-pink-500"
    },
    amber: { 
      linha: "bg-amber-500", 
      botao: "bg-amber-500 hover:bg-amber-400 shadow-amber-400/10 text-neutral-950", 
      badge: "bg-amber-500 text-neutral-950",
      textBadge: "text-amber-500"
    },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // 🔥 3. MAPEAMENTO TOTALMENTE DINÂMICO ADAPTADO POR NICHO:
  const produtos = ehEstetica ? [
    {
      title: "Apostila Digital de ALONGAMENTO EM GEL: Passo a passo do Zero",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.checkout_planilhas || "#",
      badge: "Cursos",
      img: clienteFinal.img_planilha_emagrecimento || "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "E-book: Guia prático de BIASSEGURANÇA e Esterilização para Manicures",
      price: precoPlanilhas,
      oldPrice: "197,00",
      checkoutUrl: clienteFinal.checkout_planilhas || "#",
      badge: "E-book",
      img: clienteFinal.img_planilha_casa || "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Apostila com TÉCNICAS AVANÇADAS de controle de produto e simetria",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.checkout_planilhas || "#",
      badge: "Técnicas",
      img: clienteFinal.img_planilha_mulheres || "https://images.unsplash.com/photo-1632345031435-8797b2d58045?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Manual de DURABILIDADE EXTREMA: Como evitar descolamentos",
      price: precoPlanilhas,
      oldPrice: "197,00",
      checkoutUrl: clienteFinal.checkout_planilhas || "#",
      badge: "Manual",
      img: clienteFinal.img_planilha_homens || "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=500&q=80"
    }
  ] : [
    {
      title: "Planilha de musculação para HOMENS com objetivo de EMAGRECIMENTO",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.link_planilha_emagrecimento || "#",
      badge: "Foco",
      img: clienteFinal.img_planilha_emagrecimento || "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Planilha de TREINAMENTO EM CASA (Sem equipamentos)",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.link_planilha_casa || "#",
      badge: "Home",
      img: clienteFinal.img_planilha_casa || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Planilha com TÉCNICAS AVANÇADAS de treinamento para MULHERES",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.link_planilha_mulheres || "#",
      badge: "Gains",
      img: clienteFinal.img_planilha_mulheres || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "Planilha com TÉCNICAS AVANÇADAS de treinamento para HOMENS",
      price: precoPlanilhas,
      oldPrice: "277,00",
      checkoutUrl: clienteFinal.link_planilha_homens || "#",
      badge: "Hardcore",
      img: clienteFinal.img_planilha_homens || "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <Navbar cliente={clienteFinal} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 pointer-events-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-neutral-950 uppercase tracking-wider">
            {ehEstetica ? "Materiais Digitais" : "Planilhas Prontas"}
          </h1>
          <div className={`w-12 h-1 ${estiloAtivo.linha} mx-auto mt-2`}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((prod, index) => (
            <div key={index} className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative z-20">
              
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                {/* Badge dinâmica com a cor do tema */}
                <span className={`absolute top-2 right-2 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-30 ${estiloAtivo.badge}`}>
                  {prod.badge}
                </span>
              </div>

              <div>
                {/* Categoria superior dinâmica */}
                <p className={`text-[10px] font-bold ${estiloAtivo.textBadge} uppercase tracking-widest mb-1`}>
                  {ehEstetica ? "Estética e Beleza" : "Planilhas Prontas"}
                </p>
                <h3 className="text-sm font-bold text-neutral-800 tracking-tight leading-snug mb-3 min-h-[40px] line-clamp-3">
                  {prod.title}
                </h3>
                <div className="flex gap-0.5 text-amber-400 text-xs mb-3">
                  ★★★★★
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <span className="text-neutral-400 line-through">R$ {prod.oldPrice}</span>
                  <span className="text-neutral-950 font-black">R$ {prod.price}</span>
                </div>

                <a 
                  href={prod.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative z-30 block w-full text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer pointer-events-auto select-none ${estiloAtivo.botao}`}
                >
                  Adicionar ao Carrinho
                </a>
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer cliente={clienteFinal} />
    </div>
  );
}