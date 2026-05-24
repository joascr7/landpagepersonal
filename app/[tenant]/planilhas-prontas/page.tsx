import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{
    tenant: string;
  }>;
}

export default async function PlanilhasProntasPage({ params }: PageProps) {
  const { tenant } = await params;

  // Busca do cliente
  const { data: cliente } = await supabase
    .from("clientes")
    .select("*")
    .eq("slug", tenant)
    .single();

  // Dados Mockados para desenvolvimento/fallback
  const dadosMockados = {
    nome: "Hugo Mateus",
    nicho: "personal",
    slug: "hugomateus",
    assinatura_status: "ativo",
    tema_cor: "amber",
    whatsapp_numero: "819973119512",
    preco_planilhas: "47",
    checkout_planilhas: "#",
    link_planilha_emagrecimento: "#",
    link_planilha_casa: "#",
    link_planilha_mulheres: "#",
    link_planilha_homens: "#",
    img_planilha_emagrecimento: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=500&q=80",
    img_planilha_casa: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=500&q=80",
    img_planilha_mulheres: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80",
    img_planilha_homens: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80"
  };

  const clienteFinal = cliente || dadosMockados;

  if (!clienteFinal || clienteFinal.assinatura_status !== "ativo") notFound();
  if (clienteFinal.nicho === "acai") redirect(`/${clienteFinal.slug}`);

  const ehEstetica = clienteFinal.nicho === "estetica";
  const corDefinida = clienteFinal.tema_cor || (ehEstetica ? "pink" : "amber");
  const preco = clienteFinal.preco_planilhas ? `${clienteFinal.preco_planilhas},00` : "47,00";

  const mapasDeCores: Record<string, any> = {
    blue: { linha: "bg-blue-500", botao: "bg-blue-500 hover:bg-blue-400 text-neutral-950", badge: "bg-blue-500 text-neutral-950", textBadge: "text-blue-500" },
    purple: { linha: "bg-purple-500", botao: "bg-purple-500 hover:bg-purple-400 text-white", badge: "bg-purple-500 text-white", textBadge: "text-purple-500" },
    pink: { linha: "bg-pink-500", botao: "bg-pink-500 hover:bg-pink-400 text-white", badge: "bg-pink-500 text-white", textBadge: "text-pink-500" },
    amber: { linha: "bg-amber-500", botao: "bg-amber-500 hover:bg-amber-400 text-neutral-950", badge: "bg-amber-500 text-neutral-950", textBadge: "text-amber-500" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores.amber;

  const produtos = ehEstetica ? [
    { title: "Apostila Digital de ALONGAMENTO EM GEL", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.checkout_planilhas || "#", badge: "Cursos", img: clienteFinal.img_planilha_emagrecimento },
    { title: "Guia de BIASSEGURANÇA para Manicures", price: preco, oldPrice: "197,00", checkoutUrl: clienteFinal.checkout_planilhas || "#", badge: "E-book", img: clienteFinal.img_planilha_casa },
    { title: "TÉCNICAS AVANÇADAS de controle de produto", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.checkout_planilhas || "#", badge: "Técnicas", img: clienteFinal.img_planilha_mulheres },
    { title: "Manual de DURABILIDADE EXTREMA", price: preco, oldPrice: "197,00", checkoutUrl: clienteFinal.checkout_planilhas || "#", badge: "Manual", img: clienteFinal.img_planilha_homens }
  ] : [
    { title: "Musculação para HOMENS - Foco Emagrecimento", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.link_planilha_emagrecimento || "#", badge: "Foco", img: clienteFinal.img_planilha_emagrecimento },
    { title: "TREINAMENTO EM CASA (Sem equipamentos)", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.link_planilha_casa || "#", badge: "Home", img: clienteFinal.img_planilha_casa },
    { title: "TÉCNICAS AVANÇADAS para MULHERES", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.link_planilha_mulheres || "#", badge: "Gains", img: clienteFinal.img_planilha_mulheres },
    { title: "TÉCNICAS AVANÇADAS para HOMENS", price: preco, oldPrice: "277,00", checkoutUrl: clienteFinal.link_planilha_homens || "#", badge: "Hardcore", img: clienteFinal.img_planilha_homens }
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar cliente={clienteFinal} />
      <main className="max-w-7xl mx-auto px-4 pt-36 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-neutral-950 uppercase tracking-wider">
            {ehEstetica ? "Materiais Digitais" : "Planilhas Prontas"}
          </h1>
          <div className={`w-12 h-1 ${estiloAtivo.linha} mx-auto mt-2`}></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map((prod, index) => (
            <div key={index} className="border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-neutral-100">
                <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                <span className={`absolute top-2 right-2 text-[10px] font-black px-2.5 py-1 rounded-md uppercase ${estiloAtivo.badge}`}>
                  {prod.badge}
                </span>
              </div>
              
              <div className="mb-4">
                <p className={`text-[10px] font-bold ${estiloAtivo.textBadge} uppercase mb-1`}>
                  {ehEstetica ? "Estética e Beleza" : "Planilhas Prontas"}
                </p>
                <h3 className="text-sm font-bold text-neutral-800 leading-snug mb-2 min-h-[40px]">{prod.title}</h3>
                <div className="flex gap-0.5 text-amber-400 text-xs">★★★★★</div>
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
                  className={`block w-full text-center py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${estiloAtivo.botao}`}
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