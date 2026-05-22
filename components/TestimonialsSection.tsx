"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TestimonialsSection({ cliente }: { cliente: any }) {
  const [depoimentos, setDepoimentos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDepoimentos() {
      const { data } = await supabase
        .from("depoimentos")
        .select("*")
        .eq("cliente_id", cliente.id)
        .limit(3); // Busca até 3 depoimentos
      if (data) setDepoimentos(data);
    }
    fetchDepoimentos();
  }, [cliente.id]);

  if (depoimentos.length === 0) return null; // Não mostra a seção se não houver depoimentos

  return (
    <section className="py-20 max-w-5xl mx-auto px-4 text-center bg-inherit text-inherit">
      <h2 className="text-3xl font-black mb-12 uppercase tracking-tight">O que dizem sobre nós</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {depoimentos.map((dep, i) => (
          <div key={i} className="bg-current/5 p-6 rounded-3xl border border-current/10 flex flex-col justify-between">
            <p className="text-sm italic opacity-80 mb-6">"{dep.texto}"</p>
            
            <div className="flex items-center gap-3">
              <img src={dep.foto_url} className="w-12 h-12 rounded-full bg-current/10 object-cover" alt={dep.nome} />
              <div className="text-left">
                <p className="font-bold text-sm">{dep.nome}</p>
                <p className="text-xs opacity-50">{dep.cargo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}