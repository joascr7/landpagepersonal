'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { LogIn, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      alert("Erro ao entrar: " + error.message);
      setLoading(false);
      return;
    }

    // REDIRECIONAMENTO CORRIGIDO:
    // Em vez de voltar para '/', vamos para o caminho que o middleware reconhece.
    // Substitua 'daiane' pelo tenant que você quer acessar ou 
    // salve o tenant atual no localStorage antes de ir para o login.
    window.location.href = '/daiane/admin-acai'; 
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-6 text-white">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-neutral-900 p-8 rounded-3xl border border-neutral-800 shadow-2xl">
        <h1 className="text-3xl font-black text-amber-500 uppercase mb-2 text-center">Gestão Administrativa</h1>
        <p className="text-neutral-400 text-center mb-8">Entre com suas credenciais de administrador</p>
        
        <input 
          type="email" 
          placeholder="seu-email@dominio.com"
          className="w-full bg-neutral-800 p-4 rounded-xl mb-4 border border-neutral-700 focus:border-amber-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input 
          type="password" 
          placeholder="Sua senha"
          className="w-full bg-neutral-800 p-4 rounded-xl mb-6 border border-neutral-700 focus:border-amber-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button 
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-amber-500 text-black py-4 rounded-xl font-black text-lg hover:bg-amber-400 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <><LogIn size={20} /> Entrar</>}
        </button>
      </form>
    </div>
  );
}