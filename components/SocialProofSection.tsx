export default function SocialProofSection() {
  return (
    // bg-inherit e border-current/10 garantem que a seção siga o tema e se adapte perfeitamente
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-current/10 my-10 bg-inherit text-inherit transition-colors duration-500">
      {[
        { label: "sites entregues", val: "+120" },
        { label: "clientes ativos", val: "+80" },
        { label: "uptime garantido", val: "99,9%" },
        { label: "por semana", val: "Suporte 7 dias" },
      ].map((s, i) => (
        <div key={i} className="text-center group">
          {/* font-black dá o peso necessário, text-inherit herda a cor do tema atual */}
          <p className="text-3xl md:text-4xl font-black tracking-tight">{s.val}</p>
          
          {/* opacity-60 cria um contraste elegante que funciona em qualquer fundo */}
          <p className="text-[10px] opacity-60 uppercase tracking-widest mt-2 font-bold">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}