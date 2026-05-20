import Navbar from "../../components/Navbar";
import Link from "next/link";
import { LinksEImagens } from "../../dados"; // Importando o Painel de Controle

const consultorias = [
  {
    name: "180 DIAS (6 PLANILHAS)",
    price: "R$ 477,00",
    description: "Consultoria personalizada de longo prazo com o melhor custo-benefício.",
    badge: "Sale",
    checkoutUrl: LinksEImagens.checkoutConsultoria180Dias, // Puxando do painel
  },
  {
    name: "90 DIAS (3 PLANILHAS)",
    price: "R$ 277,00",
    description: "Acompanhamento focado em evolução e constância por 3 meses.",
    badge: "Sale",
    checkoutUrl: LinksEImagens.checkoutConsultoria90Dias,
  },
  {
    name: "30 DIAS (1 PLANILHA)",
    price: "R$ 137,00",
    description: "Plano mensal para você dar o primeiro passo na metodologia.",
    badge: "Sale",
    checkoutUrl: LinksEImagens.checkoutConsultoria30Dias,
  },
];

export default function LojaPage() {
  const planilhasProntas = [
    {
      name: "Planilha de musculação para HOMENS com objetivo de EMAGRECIMENTO",
      oldPrice: "R$ 277,00",
      price: "R$ 47,00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: LinksEImagens.planilhaEmagrecimentoHomem.imagem,
      checkoutUrl: LinksEImagens.planilhaEmagrecimentoHomem.checkout,
    },
    {
      name: "Planilha de TREINAMENTO EM CASA (Sem equipamentos)",
      oldPrice: "R$ 277,00",
      price: "R$ 47,00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: LinksEImagens.planilhaTreinoEmCasa.imagem,
      checkoutUrl: LinksEImagens.planilhaTreinoEmCasa.checkout,
    },
    {
      name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para MULHERES",
      oldPrice: "R$ 277,00",
      price: "R$ 47,00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: LinksEImagens.planilhaAvancadoMulher.imagem,
      checkoutUrl: LinksEImagens.planilhaAvancadoMulher.checkout,
    },
    {
      name: "Planilha com TÉCNICAS AVANÇADAS de treinamento para HOMENS",
      oldPrice: "R$ 277,00",
      price: "R$ 47,00",
      category: "Planilhas prontas",
      badge: "Sale",
      img: LinksEImagens.planilhaAvancadoHomem.imagem,
      checkoutUrl: LinksEImagens.planilhaAvancadoHomem.checkout,
    },
  ];

  return (
    <main className="bg-white text-neutral-950 min-h-screen pt-32 pb-20 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Consultorias */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">Consultoria Personalizada</h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultorias.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm relative flex flex-col justify-between text-center">
                <span className="absolute top-3 right-3 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">{item.badge}</span>
                <div>
                  <p className="text-xs text-neutral-400 font-medium uppercase tracking-wider">Consultoria personalizada</p>
                  <h3 className="text-lg font-extrabold text-neutral-900 mt-1 min-h-[50px] flex items-center justify-center">{item.name}</h3>
                  <div className="flex items-center justify-center gap-1 my-2">
                    {"★★★★★".split("").map((s, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                  </div>
                  <p className="text-xl font-black text-neutral-950 mt-4">{item.price}</p>
                  <p className="text-xs text-neutral-500 mt-2 min-h-[40px]">{item.description}</p>
                </div>
                <a href={item.checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-xl text-sm uppercase transition-colors">
                  Adicionar ao carrinho
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Planilhas Prontas */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950">Planilhas Prontas</h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto mt-2"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {planilhasProntas.map((item, idx) => (
              <div key={idx} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm p-4 flex flex-col justify-between">
                <span className="absolute top-6 right-6 bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase z-10">{item.badge}</span>
                <div>
                  <div className="h-40 w-full rounded-xl overflow-hidden relative mb-4">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
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
                <a href={item.checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl text-xs uppercase transition-colors">
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