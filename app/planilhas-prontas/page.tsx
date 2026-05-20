import Navbar from "../../components/Navbar";
import Link from "next/link";
import { LinksEImagens } from "../../dados"; // Importando o Painel de Controle

export default function PlanilhasProntasPage() {
  const checkmarks = [
    "Planilhas de musculação prontas;",
    "Comece a treinar hoje!",
    "30 dias de prescrição;",
    "Fotos e vídeos dos exercícios;",
    "Todos os detalhes da estratégia.",
  ];

  return (
    <main className="bg-white text-neutral-900 min-h-screen pt-32 pb-20 font-sans">
      {/* Menu Superior adaptado */}
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Lado Esquerdo: Textos, Tópicos e Botão */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-neutral-950 uppercase leading-none font-mono">
            Planilhas <br /> Prontas
          </h1>
          
          <ul className="mt-8 space-y-4 border-t border-b border-neutral-100 py-6">
            {checkmarks.map((text, idx) => (
              <li key={idx} className="flex items-center gap-3 text-neutral-700 font-medium text-base">
                <span className="text-neutral-900 font-bold">✓</span>
                {text}
              </li>
            ))}
          </ul>

          {/* Botão direcionando para a seção de planilhas na loja com preço dinâmico */}
          <div className="mt-10">
            <Link
              href="/loja#planilhas"
              className="inline-block px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-black text-sm uppercase tracking-wider rounded-full shadow-lg shadow-orange-600/20 transition-transform hover:scale-105"
            >
              Apenas {LinksEImagens.precoPlanilhasProntas}!
            </Link>
          </div>
        </div>

        {/* Lado Direito: Imagem dos Celulares com o App MFit */}
        <div className="flex-1 flex justify-center relative w-full max-w-md md:max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=600&q=80"
            alt="Aplicativo MFit Treinos"
            className="w-full max-w-[420px] object-contain drop-shadow-2xl"
          />
        </div>

      </section>
    </main>
  );
}