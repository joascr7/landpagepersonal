"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function ServicosPage() {
  const [servicos, setServicos] = useState<any[]>([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from("servicos").insert([{ nome, preco: parseFloat(preco), imagem_url: imagemUrl }]);
    window.location.reload();
  };

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-black text-white">⚡ Procedimentos e Preços</h1>
      
      <form onSubmit={handleSalvar} className="bg-neutral-900 p-6 rounded-2xl space-y-4">
        <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} className="w-full p-3 bg-neutral-950 rounded-xl" />
        <input type="number" placeholder="Preço" onChange={(e) => setPreco(e.target.value)} className="w-full p-3 bg-neutral-950 rounded-xl" />
        <button type="submit" className="w-full py-3 bg-white text-black font-bold uppercase rounded-xl">Publicar</button>
      </form>
    </div>
  );
}