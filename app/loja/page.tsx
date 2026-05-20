import Navbar from "@/components/Navbar";
import Link from "next/link";

const consultorias = [
  {
    name: "180 DIAS (6 PLANILHAS)",
    price: "R$ 477,00",
    description: "Consultoria personalizada de longo prazo com o melhor custo-benefício.",
    badge: "Sale",
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_180",
  },
  {
    name: "90 DIAS (3 PLANILHAS)",
    price: "R$ 277,00",
    description: "Acompanhamento focado em evolução e constância por 3 meses.",
    badge: "Sale",
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_90",
  },
  {
    name: "30 DIAS (1 PLANILHA)",
    price: "R$ 137,00",
    description: "Plano mensal para você dar o primeiro passo na metodologia.",
    badge: "Sale",
    checkoutUrl: "https://pay.kiwify.com.br/SEU_LINK_30",
  },
];

const planilhasProntas = [
  {
    name: "Planilha de musculação para HOMENS com objetivo de EMAGRECIMENTO",
    oldPrice: "R$ 277,00",
    price: "R$ 47,00",
    category: "Planilhas prontas",
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80",
    checkoutUrl: "https://pay.kiwify.com.br/PLANILHA_1",
  },
  {
    name: "Planilha de TREINAMENTO EM CASA (Sem equipamentos)",
    oldPrice: "R$ 277,00",
    price: "R$ 47,00",
    category: "Planilhas prontas",
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80",
    checkoutUrl: "https://pay.kiwify.com.br/PLANILHA_2",
  },
  {
    name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para MULHERES",
    oldPrice: "R$ 277,00",
    price: "R$ 47,00",
    category: "Planilhas prontas",
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=400&q=80",
    checkoutUrl: "https://pay.kiwify.com.br/PLANILHA_3",
  },
  {
    name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para HOMENS",
    oldPrice: "R$ 277,00",
    price: "R$ 47,00",
    category: "Planilhas prontas",
    badge: "Sale",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=400&q=80",
    checkoutUrl: "https://pay.kiwify.com.br/PLANILHA_4",
  },
];

export default function LojaPage() {
  return (
    <main className="bg-neutral-50 text-neutral-950 min-h-screen pt-32 pb-20 font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Bloco 1: Consultorias */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">Consultoria Personalizada</h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-2"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultorias.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow text-center">
                <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {item.badge}
                </span>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Consultoria personalizada</p>
                  <h3 className="text-lg font-extrabold text-neutral-900 mt-1 min-h-[50px] flex items-center justify-center">{item.name}</h3>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                  </div>
                  <p className="text-xl font-black text-neutral-950 mt-4">{item.price}</p>
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed min-h-[40px]">{item.description}</p>
                </div>
                <Link
                  href={item.checkoutUrl}
                  target="_blank"
                  className="mt-6 block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm uppercase transition-colors"
                >
                  Adicionar ao carrinho
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bloco 2: Planilhas Prontas */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">Planilhas Prontas</h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {planilhasProntas.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm relative flex flex-col justify-between hover:shadow-md transition-shadow p-4">
                <span className="absolute top-6 right-6 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase z-10">
                  {item.badge}
                </span>
                <div>
                  <div className="h-40 w-full rounded-xl overflow-hidden relative mb-4">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-neutral-950/20"></div>
                  </div>
                  <p className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">{item.category}</p>
                  <h3 className="text-xs font-bold text-neutral-800 mt-1 line-clamp-3 min-h-[48px]">{item.name}</h3>
                  <div className="flex items-center gap-0.5 my-1">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-[10px]">★</span>)}
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-neutral-400 line-through">{item.oldPrice}</span>
                    <span className="text-base font-black text-neutral-950">{item.price}</span>
                  </div>
                </div>
                <Link
                  href={item.checkoutUrl}
                  target="_blank"
                  className="mt-4 block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase transition-colors"
                >
                  Adicionar ao carrinho
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}