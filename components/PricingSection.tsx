import { LinksEImagens } from "../dados"; // Puxa os dados estruturados do seu painel

const planos = [
  {
    nome: "Plano Mensal",
    duracao: "30 DIAS",
    preco: "R$ 137",
    periodo: "/mês",
    detalhes: "1 Planilha de treino focada no seu objetivo inicial.",
    link: LinksEImagens.checkoutConsultoria30Dias,
    destaque: false,
  },
  {
    nome: "Plano Trimestral",
    duracao: "90 DIAS",
    preco: "R$ 277",
    periodo: "/total",
    detalhes: "3 Planilhas de treino. O mais vendido para resultados consistentes.",
    link: LinksEImagens.checkoutConsultoria90Dias,
    destaque: true, // Deixa esse plano destacado na tela
  },
  {
    nome: "Plano Semestral",
    duracao: "180 DIAS",
    preco: "R$ 477",
    periodo: "/total",
    detalhes: "6 Planilhas de treino. Ideal para quem busca evolução contínua.",
    link: LinksEImagens.checkoutConsultoria180Dias,
    destaque: false,
  },
];

export default function PricingSection() {
  return (
    <section id="planos" className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
            Escolha o seu plano e <span className="text-orange-500">Comece Hoje</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-2xl mx-auto text-sm">
            Selecione o período ideal para o seu ritmo de evolução. Acesso imediato após a confirmação.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {planos.map((plano, index) => (
            <div 
              key={index}
              className={`border rounded-2xl p-8 flex flex-col justify-between transition-all ${
                plano.destaque 
                  ? "border-orange-500 bg-neutral-900 shadow-xl shadow-orange-500/10 scale-105" 
                  : "border-neutral-800 bg-neutral-950"
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-neutral-300">{plano.nome}</h3>
                  <span className={`text-xs font-bold uppercase px-2.5 py-1 rounded-full ${
                    plano.destaque ? "bg-orange-500 text-black" : "bg-neutral-800 text-neutral-400"
                  }`}>
                    {plano.duracao}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 mb-6">{plano.detalhes}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black tracking-tight">{plano.preco}</span>
                  <span className="text-neutral-500 text-sm font-medium"> {plano.periodo}</span>
                </div>
              </div>

              <a
                href={plano.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full block text-center font-bold uppercase tracking-wider text-sm py-3 px-4 rounded-xl transition-all ${
                  plano.destaque
                    ? "bg-orange-500 hover:bg-orange-600 text-black shadow-lg shadow-orange-500/20"
                    : "bg-white hover:bg-neutral-200 text-black"
                }`}
              >
                Contratar Plano
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}