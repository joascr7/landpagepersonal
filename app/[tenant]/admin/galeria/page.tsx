"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function GaleriaPage() {
  const [fotos, setFotos] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("galeria").select("*");
      if (data) setFotos(data);
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-white">🖼️ Galeria</h1>
      <div className="grid grid-cols-4 gap-4">
        {fotos.map((f) => (
          <img key={f.id} src={f.imagem_url} className="rounded-xl w-full aspect-square object-cover" />
        ))}
      </div>
    </div>
  );
}