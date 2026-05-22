export default function SocialProof() {
  const stats = [
    { label: "sites entregues", val: "+120" },
    { label: "clientes ativos", val: "+80" },
    { label: "uptime garantido", val: "99,9%" },
    { label: "por semana", val: "Suporte 7 dias" },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-neutral-900">
      {stats.map((s, i) => (
        <div key={i} className="text-center">
          <p className="text-2xl font-black text-white">{s.val}</p>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  );
}