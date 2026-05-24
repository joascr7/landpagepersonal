"use client";

import { useEffect, useState, use } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface AdminPanelProps {
  params: Promise<{ tenant: string }>;
}

export default function AdminPanel({ params }: AdminPanelProps) {
  const { tenant } = use(params);
  const router = useRouter();

  // 🔒 ESTADOS DE SEGURANÇA E AUTENTICAÇÃO
  const [autenticado, setAutenticado] = useState(false);
  const [codigoDigitado, setCodigoDigitado] = useState("");
  const [codigoCorretoBanco, setCodigoCorretoBanco] = useState("");
  const [erroAutenticacao, setErroAutenticacao] = useState("");

  // Estados de Controle Gerais
  const [loading, setLoading] = useState(true);
  const [salvandoCliente, setSalvandoCliente] = useState(false);
  const [salvandoAgenda, setSalvandoAgenda] = useState(false);
  const [subindoImagem, setSubindoImagem] = useState(false);
  const [subindoGaleria, setSubindoGaleria] = useState(false);
  const [subindoFotoPerfil, setSubindoFotoPerfil] = useState<{ hero: boolean; sobre: boolean }>({ hero: false, sobre: false });
  const [subindoObjetivo, setSubindoObjetivo] = useState<Record<number, boolean>>({ 1: false, 2: false, 3: false });
  const [idServicoEditando, setIdServicoEditando] = useState<string | null>(null);

  // Estados dos Dados do Cliente (Espaço)
  const [clienteId, setClienteId] = useState("");
  const [nichoCliente, setNichoCliente] = useState("estetica"); 
  const [whatsappNumero, setWhatsappNumero] = useState("");
  const [navbarIniciais, setNavbarIniciais] = useState("");
  const [fotoHero, setFotoHero] = useState("");
  const [fotoSobre, setFotoSobre] = useState("");
  const [imgObjetivo1, setImgObjetivo1] = useState("");
  const [imgObjetivo2, setImgObjetivo2] = useState("");
  const [imgObjetivo3, setImgObjetivo3] = useState("");

  // 🔥 NOVOS ESTADOS EXCLUSIVOS DO NICHO PERSONAL TRAINER
  const [instagramUrl, setInstagramUrl] = useState("");
  const [certificacoes, setCertificacoes] = useState("");
  const [checkoutUrl, setCheckoutUrl] = useState("");

  // ESTADOS DO CONTROLE DE HORÁRIOS DA AGENDA
  const diasDaSemanaTexto = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const [diaSelecionadoConfig, setDiaSelecionadoConfig] = useState<number>(1);
  const [estaFechado, setEstaFechado] = useState(false);
  const [horariosDoDia, setHorariosDoDia] = useState<string[]>([]);
  const [novoHoraInput, setNovoHoraInput] = useState("");

  // Estados dos Serviços, Galeria e Agendamentos
  const [servicos, setServicos] = useState<any[]>([]);
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");
  const [emPromocao, setEmPromocao] = useState(false);
  const [precoPromoServico, setPrecoPromoServico] = useState("");
  const [imagemUrlServico, setImagemUrlServico] = useState("");
  const [fotosGaleria, setFotosGaleria] = useState<any[]>([]);
  const [urlFotoNovaGaleria, setUrlFotoNovaGaleria] = useState("");
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [abaAgendamento, setAbaAgendamento] = useState<'pendente' | 'concluido' | 'cancelado'>('pendente');

  const ehEstetica = nichoCliente === "estetica";

  // Carrega os dados iniciais do Supabase e valida o acesso
  useEffect(() => {
    async function carregarDados() {
      setLoading(true);
      const { data: cliente, error: errCliente } = await supabase
        .from("clientes")
        .select("*")
        .eq("slug", tenant)
        .single();

      if (!errCliente && cliente) {
        setClienteId(cliente.id);
        setNichoCliente(cliente.nicho || "estetica"); 
        setWhatsappNumero(cliente.whatsapp_numero || "");
        setNavbarIniciais(cliente.navbar_iniciais_logo || "");
        setFotoHero(cliente.foto_hero || "");
        setFotoSobre(cliente.foto_sobre || "");
        setImgObjetivo1(cliente.img_objetivo_1 || "");
        setImgObjetivo2(cliente.img_objetivo_2 || "");
        setImgObjetivo3(cliente.img_objetivo_3 || "");

        // 🔥 Alimenta as informações adicionadas do Personal
        setInstagramUrl(cliente.instagram_url || "");
        setCertificacoes(cliente.certificacoes || "");
        setCheckoutUrl(cliente.checkout_url || "");

        // Configuração de Segurança por PIN
        setCodigoCorretoBanco(cliente.codigo_acesso || "1234");
        const sessaoSalva = sessionStorage.getItem(`admin_auth_${tenant}`);
        if (sessaoSalva === (cliente.codigo_acesso || "1234")) {
          setAutenticado(true);
        }

        // Carrega os horários da segunda-feira por padrão
        await carregarConfiguracaoDia(cliente.id, 1);

        // Busca Serviços, Galeria e Agendamentos
        const { data: listaServicos } = await supabase.from("servicos").select("*").eq("cliente_id", cliente.id).order("created_at", { ascending: true });
        if (listaServicos) setServicos(listaServicos);

        const { data: listaGaleria } = await supabase.from("galeria").select("*").eq("cliente_id", cliente.id).order("created_at", { ascending: false });
        if (listaGaleria) setFotosGaleria(listaGaleria);

        const { data: listaAgendamentos } = await supabase.from("agendamentos").select("*").eq("cliente_id", cliente.id).order("data_agendamento", { ascending: false });
        if (listaAgendamentos) setAgendamentos(listaAgendamentos);
      }
      setLoading(false);
    }
    carregarDados();
  }, [tenant]);


  // Substitua o useEffect do Realtime por este:
useEffect(() => {
  if (!clienteId) return;

  const channel = supabase
    .channel('public:agendamentos') // Nome padrão sugerido
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'agendamentos',
      filter: `cliente_id=eq.${clienteId}` 
    }, (payload) => {
      console.log('Evento recebido:', payload); // VEJA ISSO NO CONSOLE DO NAVEGADOR
      
      if (payload.eventType === 'INSERT') {
        setAgendamentos(prev => [payload.new, ...prev]);
      }
      // ... restante dos ifs
    })
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [clienteId]);

  // VERIFICA O PIN DIGITADO
  const handleVerificarCodigoAcesso = (e: React.FormEvent) => {
    e.preventDefault();
    if (codigoDigitado === codigoCorretoBanco) {
      setAutenticado(true);
      setErroAutenticacao("");
      sessionStorage.setItem(`admin_auth_${tenant}`, codigoDigitado);
    } else {
      setErroAutenticacao("Código de acesso incorreto. Tente novamente.");
    }
  };

  // LOGOUT DO PAINEL ADMIN
  const handleLogout = () => {
    if (confirm("Deseja realmente sair do painel administrativo?")) {
      sessionStorage.removeItem(`admin_auth_${tenant}`);
      setAutenticado(false);
      setCodigoDigitado("");
      window.location.reload();
    }
  };

  // CARREGA AS REGRAS DO DIA SELECIONADO NA AGENDA
  const carregarConfiguracaoDia = async (cId: string, dia: number) => {
    const { data: config } = await supabase
      .from("configuracao_agenda")
      .select("*")
      .eq("cliente_id", cId)
      .eq("dia_semana", dia)
      .maybeSingle();

    if (config) {
      setEstaFechado(config.esta_fechado);
      setHorariosDoDia(config.horarios_disponiveis || []);
    } else {
      setEstaFechado(false);
      setHorariosDoDia(["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]);
    }
  };

  const handleTrocarDiaAbas = async (dia: number) => {
    setDiaSelecionadoConfig(dia);
    if (clienteId) {
      await carregarConfiguracaoDia(clienteId, dia);
    }
  };

  const handleAdicionarHoraLista = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoHoraInput || horariosDoDia.includes(novoHoraInput)) return;
    const listaOrdenada = [...horariosDoDia, novoHoraInput].sort();
    setHorariosDoDia(listaOrdenada);
    setNovoHoraInput("");
  };

  const handleRemoverHoraLista = (horaRemover: string) => {
    setHorariosDoDia(horariosDoDia.filter(h => h !== horaRemover));
  };

 const handleSalvarConfigAgenda = async () => {
  if (!clienteId) return;
  setSalvandoAgenda(true);

  const { error } = await supabase
    .from("configuracao_agenda")
    .upsert({
      cliente_id: clienteId,
      dia_semana: diaSelecionadoConfig,
      esta_fechado: estaFechado,
      horarios_disponiveis: horariosDoDia
    }, { onConflict: "cliente_id,dia_semana" });

  if (error) {
    alert("Erro ao salvar agenda: " + error.message);
  } else {
    alert(`Agenda de ${diasDaSemanaTexto[diaSelecionadoConfig]} atualizada com sucesso!`);
    
    // 🔥 FORÇA A RECARGA DOS DADOS IMEDIATAMENTE
    // Ao chamar esta função, o React irá buscar os dados atualizados 
    // no banco e atualizar a tela sem necessidade de reload manual.
    await carregarConfiguracaoDia(clienteId, diaSelecionadoConfig);
  }
  
  setSalvandoAgenda(false);
};

  const handleUploadFotoCliente = async (e: React.ChangeEvent<HTMLInputElement>, tipo: "hero" | "sobre") => {
    const file = e.target.files?.[0];
    if (!file || !clienteId) return;
    try {
      setSubindoFotoPerfil(prev => ({ ...prev, [tipo]: true }));
      const fileExt = file.name.split('.').pop();
      const fileName = `${clienteId}/perfil/${tipo}-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from("servicos-imagens").upload(fileName, file, { upsert: true });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from("servicos-imagens").getPublicUrl(fileName);

      if (tipo === "hero") setFotoHero(publicUrl);
      if (tipo === "sobre") setFotoSobre(publicUrl);

      alert(`Imagem enviada! Salve no botão ao fim da seção.`);
    } catch (error: any) {
      alert("Erro ao subir imagem: " + error.message);
    } finally {
      setSubindoFotoPerfil(prev => ({ ...prev, [tipo]: false }));
    }
  };

  const handleUploadFotoObjetivo = async (e: React.ChangeEvent<HTMLInputElement>, num: number) => {
    const file = e.target.files?.[0];
    if (!file || !clienteId) return;
    try {
      setSubindoObjetivo(prev => ({ ...prev, [num]: true }));
      const fileExt = file.name.split('.').pop();
      const fileName = `${clienteId}/objetivos/card-${num}-${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage.from("servicos-imagens").upload(fileName, file, { upsert: true });
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from("servicos-imagens").getPublicUrl(fileName);

      if (num === 1) setImgObjetivo1(publicUrl);
      if (num === 2) setImgObjetivo2(publicUrl);
      if (num === 3) setImgObjetivo3(publicUrl);

      alert(`Foto do Card ${num} carregada!`);
    } catch (error: any) {
      alert("Erro ao subir imagem: " + error.message);
    } finally {
      setSubindoObjetivo(prev => ({ ...prev, [num]: false }));
    }
  };

  // Salva dados estruturados da seção 1
  const handleSalvarDadosCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvandoCliente(true);

    const { error } = await supabase
      .from("clientes")
      .update({ 
        whatsapp_numero: whatsappNumero, 
        navbar_iniciais_logo: navbarIniciais,
        foto_hero: fotoHero || null,
        foto_sobre: fotoSobre || null,
        img_objetivo_1: imgObjetivo1 || null,
        img_objetivo_2: imgObjetivo2 || null,
        img_objetivo_3: imgObjetivo3 || null,
        // 🔥 Salva os novos campos adicionais mapeados no banco
        instagram_url: instagramUrl || null,
        certificacoes: certificacoes || null,
        checkout_url: checkoutUrl || null
      })
      .eq("id", clienteId);

    setSalvandoCliente(false);
    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Dados e fotos atualizados com sucesso!");
  };

  const handleUploadImagemServico = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setSubindoImagem(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${clienteId}/servicos/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from("servicos-imagens").upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("servicos-imagens").getPublicUrl(fileName);
      setImagemUrlServico(publicUrl);
      alert("Imagem enviada!");
    } catch (error: any) { alert(error.message); } finally { setSubindoImagem(false); }
  };

  const handleUploadGaleria = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !clienteId) return;
    try {
      setSubindoGaleria(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${clienteId}/galeria/${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage.from("servicos-imagens").upload(fileName, file, { upsert: true });
      if (error) throw error;
      const { data: { publicUrl } } = supabase.storage.from("servicos-imagens").getPublicUrl(fileName);
      await supabase.from("galeria").insert([{ cliente_id: clienteId, imagem_url: publicUrl }]);
      window.location.reload();
    } catch (error: any) { alert(error.message); } finally { setSubindoGaleria(false); }
  };


 const handleAtualizarStatus = async (id: string, novoStatus: 'pendente' | 'concluido' | 'cancelado') => {
  const { error } = await supabase.from("agendamentos").update({ status: novoStatus }).eq("id", id);
  
  if (!error) {
    // Atualiza o estado localmente sem dar F5
    setAgendamentos(prev => prev.map(a => a.id === id ? { ...a, status: novoStatus } : a));
  } else {
    alert("Erro ao atualizar status");
  }
};

  const handleAdicionarFotoGaleriaLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlFotoNovaGaleria) return;
    await supabase.from("galeria").insert([{ cliente_id: clienteId, imagem_url: urlFotoNovaGaleria }]);
    window.location.reload();
  };

  const handleDeletarFotoGaleria = async (idFoto: string) => {
    if (!confirm("Remover esta foto?")) return;
    await supabase.from("galeria").delete().eq("id", idFoto);
    setFotosGaleria(fotosGaleria.filter(f => f.id !== idFoto));
  };

  const enviarConfirmacaoWhatsApp = (agendamento: any) => {
    const numeroLimpo = String(agendamento.whatsapp_cliente || "").replace(/[^0-9]/g, "");
    const dataFormatada = agendamento.data_agendamento ? agendamento.data_agendamento.split("-").reverse().join("/") : "";
    const textMensagem = `Olá ${agendamento.nome_cliente}! Seu agendamento para o procedimento *${agendamento.servico_nome || "Procedimento"}* no dia *${dataFormatada}* às *${agendamento.hora_agendamento}* foi confirmado com sucesso. Te aguardamos!`;
    window.open(`https://wa.me/${numeroLimpo}?text=${encodeURIComponent(textMensagem)}`, "_blank");
  };

  const handleDeletarAgendamento = async (idAgendamento: string) => {
    if (!confirm("Remover esse agendamento?")) return;
    await supabase.from("agendamentos").delete().eq("id", idAgendamento);
    setAgendamentos(agendamentos.filter(a => a.id !== idAgendamento));
  };

  const iniciarEdicaoServico = (servico: any) => {
    setIdServicoEditando(servico.id);
    setNomeServico(servico.nome);
    setDescricaoServico(servico.descricao);
    setPrecoServico(servico.preco.toString());
    setEmPromocao(servico.em_promocao);
    setPrecoPromoServico(servico.preco_promocional ? servico.preco_promocional.toString() : "");
    setImagemUrlServico(servico.imagem_url || "");
    document.getElementById("formulario-servico")?.scrollIntoView({ behavior: "smooth" });
  };

  const resetarFormularioServico = () => {
    setIdServicoEditando(null);
    setNomeServico("");
    setDescricaoServico("");
    setPrecoServico("");
    setEmPromocao(false);
    setPrecoPromoServico("");
    setImagemUrlServico("");
  };

  const handleSalvarServico = async (e: React.FormEvent) => {
    e.preventDefault();
    const dadosServico = { cliente_id: clienteId, nome: nomeServico, descricao: descricaoServico, preco: parseFloat(precoServico), em_promocao: emPromocao, preco_promocional: emPromocao && precoPromoServico ? parseFloat(precoPromoServico) : null, imagem_url: imagemUrlServico || null };
    if (idServicoEditando) await supabase.from("servicos").update(dadosServico).eq("id", idServicoEditando);
    else await supabase.from("servicos").insert([dadosServico]);
    resetarFormularioServico();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center font-sans gap-3">
        <div className={`w-6 h-6 border-2 ${ehEstetica ? 'border-pink-500' : 'border-amber-500'} border-t-transparent rounded-full animate-spin`}></div>
        <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">Carregando Painel...</span>
      </div>
    );
  }

  // TELA DE BLOQUEIO POR SENHA
  if (!autenticado) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-4 font-sans user-select-none">
        <div className="max-w-sm w-full bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-4xl">🔒</span>
            <h1 className="text-xl font-black uppercase tracking-tight pt-2">Área Restrita</h1>
            <p className="text-neutral-400 text-xs uppercase tracking-wide">Insira o código de acesso para gerenciar /{tenant}</p>
          </div>

          <form onSubmit={handleVerificarCodigoAcesso} className="space-y-4 text-left">
            <div>
              <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1.5 tracking-wider">Código de Segurança</label>
              <input
                type="password"
                placeholder="••••"
                value={codigoDigitado}
                onChange={(e) => setCodigoDigitado(e.target.value)}
                className={`w-full text-center p-3.5 bg-neutral-950 border border-neutral-800 ${ehEstetica ? 'focus:border-pink-500' : 'focus:border-amber-500'} rounded-xl text-lg font-mono tracking-widest text-white focus:outline-none`}
                required
              />
            </div>

            {erroAutenticacao && (
              <p className="text-xs text-red-500 font-semibold bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-center">
                {erroAutenticacao}
              </p>
            )}

            <button
              type="submit"
              className={`w-full py-3.5 ${ehEstetica ? 'bg-pink-500 hover:bg-pink-400' : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'} font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg cursor-pointer`}
            >
              Acessar Painel ➔
            </button>
          </form>
          
          <button onClick={() => router.push(`/${tenant}`)} className="text-[11px] text-neutral-500 hover:text-neutral-400 uppercase font-bold tracking-wide transition-colors block mx-auto pt-2">
            ← Voltar para o Site
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={`min-h-screen bg-neutral-950 text-white p-4 sm:p-8 md:p-12 font-sans ${ehEstetica ? 'selection:bg-pink-500' : 'selection:bg-amber-500 selection:text-black'}`}>
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Topo */}
        <div className="flex justify-between items-center border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Painel Admin</h1>
            <p className="text-neutral-500 text-xs uppercase font-semibold mt-1">Nicho ativo: <span className={ehEstetica ? 'text-pink-500' : 'text-amber-500'}>{ehEstetica ? "Estética" : "Personal Trainer"}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push(`/${tenant}`)} 
              className="px-4 py-2 border border-neutral-800 rounded-xl text-xs font-bold uppercase hover:bg-white hover:text-black hover:border-white transition-all cursor-pointer"
            >
              Visualizar Site ↗
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 bg-red-600/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase hover:bg-red-600 hover:text-white hover:border-red-600 transition-all cursor-pointer"
            >
              Sair do Painel 🚪
            </button>
          </div>
        </div>

        {/* SEÇÃO DE AGENDAMENTOS COM ABAS E STATUS */}
<section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 space-y-6">
  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
    <h2 className="text-lg font-black uppercase text-pink-500">
      🗓️ Gestão de Agendamentos
    </h2>
    
    {/* Abas com Contadores */}
    <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-900 w-fit">
      {(['pendente', 'concluido', 'cancelado'] as const).map((s) => (
        <button 
          key={s} 
          onClick={() => setAbaAgendamento(s)}
          className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all flex items-center gap-2 ${
            abaAgendamento === s 
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' 
              : 'text-neutral-500 hover:text-white'
          }`}
        >
          {s}
          <span className="bg-black/20 px-1.5 py-0.5 rounded-md text-[9px]">
            {agendamentos.filter(a => a.status === s).length}
          </span>
        </button>
      ))}
    </div>
  </div>

  {/* Lista Filtrada */}
  <div className="space-y-3">
    {agendamentos.filter(a => a.status === abaAgendamento).length === 0 ? (
      <div className="text-center py-10 border-2 border-dashed border-neutral-800 rounded-xl">
        <p className="text-xs text-neutral-500 italic">Nenhum agendamento com status "{abaAgendamento}"</p>
      </div>
    ) : (
      agendamentos.filter(a => a.status === abaAgendamento).map((agend) => (
        <div key={agend.id} className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-neutral-800 transition-colors">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-bold text-sm text-white uppercase">{agend.nome_cliente}</h3>
              <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[11px] px-2 py-0.5 rounded-md">
                {agend.data_agendamento?.split("-").reverse().join("/")} às {agend.hora_agendamento}
              </span>
            </div>
            <p className="text-xs text-neutral-400">Procedimento: <span className="text-pink-500 font-semibold">{agend.servico_nome}</span></p>
            <p className="text-[11px] text-neutral-500 font-mono">Contato: {agend.whatsapp_cliente}</p>
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            {abaAgendamento === 'pendente' && (
              <>
                <button 
                  onClick={() => handleAtualizarStatus(agend.id, 'concluido')} 
                  className="px-3 py-1.5 bg-green-900/20 text-green-400 border border-green-900/50 rounded-lg text-[10px] font-bold uppercase hover:bg-green-600 hover:text-white transition-all cursor-pointer"
                >
                  Concluir
                </button>
                <button 
                  onClick={() => handleAtualizarStatus(agend.id, 'cancelado')} 
                  className="px-3 py-1.5 bg-red-900/20 text-red-400 border border-red-900/50 rounded-lg text-[10px] font-bold uppercase hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
              </>
            )}
            <button 
              onClick={() => enviarConfirmacaoWhatsApp(agend)} 
              className="p-2 bg-neutral-800 text-white rounded-lg text-[10px] hover:bg-green-600 transition-colors"
              title="Confirmar no WhatsApp"
            >
              💬
            </button>
            <button 
              onClick={() => handleDeletarAgendamento(agend.id)} 
              className="p-2 bg-neutral-800 text-neutral-400 hover:text-red-500 rounded-lg text-[10px] transition-colors"
            >
              🗑️
            </button>
          </div>
        </div>
      ))
    )}
  </div>
</section>
        

        {/* CONFIGURAÇÃO DA AGENDA: SÓ SE FOR ESTÉTICA */}
        {ehEstetica && (
          <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-black uppercase text-pink-500">⚙️ Configuração da Agenda Semanal</h2>
              <p className="text-neutral-500 text-xs uppercase mt-0.5">Selecione o dia e gerencie as janelas de horários livres no seu site</p>
            </div>

            <div className="flex flex-wrap gap-1.5 border-b border-neutral-900 pb-4">
              {diasDaSemanaTexto.map((diaNome, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTrocarDiaAbas(idx)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    diaSelecionadoConfig === idx
                      ? "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20"
                      : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
                  }`}
                >
                  {diaNome}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
              <div className="space-y-3 md:col-span-1 bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300">Status do Dia</h3>
                <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="fechado-check" checked={estaFechado} onChange={(e) => setEstaFechado(e.target.checked)} className="w-4 h-4 rounded text-pink-500 bg-neutral-900 border-neutral-800 focus:ring-0 cursor-pointer accent-pink-500" />
                  <label htmlFor="fechado-check" className="text-xs font-black uppercase tracking-wider text-neutral-200 cursor-pointer select-none">Estarei Fechado neste dia</label>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300">Horários Ativos ({estaFechado ? "Bloqueado" : horariosDoDia.length})</h3>
                  {!estaFechado && (
                    <form onSubmit={handleAdicionarHoraLista} className="flex gap-2">
                      <input type="time" value={novoHoraInput} onChange={(e) => setNovoHoraInput(e.target.value)} className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-pink-500" required />
                      <button type="submit" className="px-3 py-2 bg-white text-black font-black text-xs uppercase rounded-lg hover:bg-neutral-200 cursor-pointer whitespace-nowrap">+ Adicionar</button>
                    </form>
                  )}
                </div>

                {estaFechado ? (
                  <div className="py-8 bg-red-950/10 border border-dashed border-red-900/40 rounded-xl text-center"><p className="text-xs text-red-400 font-bold uppercase tracking-wider">🔒 Estabelecimento Fechado</p></div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 bg-neutral-950/40 p-4 border border-neutral-900 rounded-xl">
                    {horariosDoDia.map((hora) => (
                      <div key={hora} className="relative bg-neutral-950 border border-neutral-800 p-2 rounded-lg font-mono text-xs text-center flex items-center justify-center">
                        <span className="font-bold text-neutral-300">{hora}</span>
                        <button type="button" onClick={() => handleRemoverHoraLista(hora)} className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[9px] rounded-full flex items-center justify-center cursor-pointer">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end border-t border-neutral-900 pt-4">
              <button type="button" onClick={handleSalvarConfigAgenda} disabled={salvandoAgenda} className="px-5 py-2.5 bg-pink-500 text-white font-black text-xs uppercase rounded-xl hover:bg-pink-400 disabled:opacity-50 cursor-pointer">Salvar Agenda</button>
            </div>
          </section>
        )}

        {/* Bloco 1: Informações Gerais */}
        <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
          <h2 className={`text-lg font-black uppercase ${ehEstetica ? 'text-pink-500' : 'text-amber-500'} mb-6`}>1. Informações da Identidade Profissional</h2>
          <form onSubmit={handleSalvarDadosCliente} className="space-y-8">
            
            {/* GRUPO BASE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">WhatsApp de Atendimento</label>
                <input type="text" value={whatsappNumero} onChange={(e) => setWhatsappNumero(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Iniciais da Marca (Logo)</label>
                <input type="text" value={navbarIniciais} onChange={(e) => setNavbarIniciais(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm uppercase text-white focus:outline-none" />
              </div>
            </div>

            {/* 🔥 NOVOS INPUTS EXCLUSIVOS PARA O NICHO DO PERSONAL TRAINER */}
            {!ehEstetica && (
              <div className="border-t border-neutral-900 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-amber-500 mb-2">Link do perfil do Instagram (URL)</label>
                  <input type="text" value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} placeholder="https://instagram.com/seu_perfil" className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-amber-500 mb-2">Link de Pagamento Direto / Checkout (Opcional)</label>
                  <input type="text" value={checkoutUrl} onChange={(e) => setCheckoutUrl(e.target.value)} placeholder="Link da Hotmart, Kiwify, Eduzz..." className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold uppercase text-amber-500 mb-2">Suas Certificações e Formação (Exibido no Sobre Mim)</label>
                  <textarea rows={3} value={certificacoes} onChange={(e) => setCertificacoes(e.target.value)} placeholder="Ex: Graduado em Ed. Física (USP) / Pós-graduado em Fisiologia do Exercício / Certificado Internacional em Biomecânica..." className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-amber-500 font-sans resize-none" />
                </div>
              </div>
            )}

            {/* HERO FOTO */}
            <div className="border-t border-neutral-900 pt-6 space-y-3">
              <h3 className="text-xs font-black uppercase text-neutral-300 tracking-wider">Foto Principal de Capa (Banner Superior)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoCliente(e, "hero")} className="text-xs text-neutral-400 cursor-pointer" />
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
                  <input type="text" value={fotoHero} onChange={(e) => setFotoHero(e.target.value)} placeholder="Ou cole a URL..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>
            </div>

            {/* SOBRE FOTO */}
            <div className="border-t border-neutral-900 pt-6 space-y-3">
              <h3 className="text-xs font-black uppercase text-neutral-300 tracking-wider">Foto de Perfil (Seção Quem Sou / História)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoCliente(e, "sobre")} className="text-xs text-neutral-400 cursor-pointer" />
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-center">
                  <input type="text" value={fotoSobre} onChange={(e) => setFotoSobre(e.target.value)} placeholder="Ou cole a URL..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>
            </div>

            {/* FOTOS DOS CARDS BASEADAS NO NICHO */}
            <div className="border-t border-neutral-900 pt-6 space-y-6">
              <div>
                <h3 className={`text-sm font-black uppercase ${ehEstetica ? 'text-pink-500' : 'text-amber-500'} tracking-wider`}>Imagens dos Blocos de Entrega (Como eu vou te ajudar)</h3>
              </div>

              {/* CARD 1 */}
              <div className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-black text-neutral-300 uppercase">{ehEstetica ? "Card 1: Alongamento em Gel" : "Card 1: Foco Emagrecimento"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 1)} className="text-xs text-neutral-400 cursor-pointer" />
                  <input type="text" value={imgObjetivo1} onChange={(e) => setImgObjetivo1(e.target.value)} placeholder="URL da Imagem..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>

              {/* CARD 2 */}
              <div className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-black text-neutral-300 uppercase">{ehEstetica ? "Card 2: Manutenção Perfeita" : "Card 2: Foco Hipertrofia"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 2)} className="text-xs text-neutral-400 cursor-pointer" />
                  <input type="text" value={imgObjetivo2} onChange={(e) => setImgObjetivo2(e.target.value)} placeholder="URL da Imagem..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>

              {/* CARD 3 */}
              <div className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-black text-neutral-300 uppercase">{ehEstetica ? "Card 3: Blindagem de Unhas" : "Card 3: Foco Definição Muscular"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 3)} className="text-xs text-neutral-400 cursor-pointer" />
                  <input type="text" value={imgObjetivo3} onChange={(e) => setImgObjetivo3(e.target.value)} placeholder="URL da Imagem..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-neutral-900 pt-4">
              <button type="submit" disabled={salvandoCliente} className={`px-6 py-3 ${ehEstetica ? 'bg-pink-500 hover:bg-pink-400' : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'} text-xs font-black uppercase rounded-xl disabled:opacity-50 cursor-pointer`}>
                {salvandoCliente ? "Salvando..." : "Salvar Configurações"}
              </button>
            </div>
          </form>
        </section>

        {/* Módulo 2: Planos / Procedimentos */}
        <section className="space-y-4">
          <h2 className={`text-lg font-black uppercase ${ehEstetica ? 'text-pink-500' : 'text-amber-500'}`}>{ehEstetica ? "2. Procedimentos e Preços Cadastrados" : "2. Planos de Consultoria Ativos"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicos.map((s) => (
              <div key={s.id} className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-neutral-800 transition-colors">
                <div className="flex items-center gap-3">
                  {s.imagem_url && <img src={s.imagem_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-neutral-800" />}
                  <div>
                    <h3 className="font-bold text-sm text-white">{s.nome}</h3>
                    <p className="text-xs text-neutral-400">R$ {s.preco}</p>
                  </div>
                </div>
                <button onClick={() => iniciarEdicaoServico(s)} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold cursor-pointer">Editar</button>
              </div>
            ))}
          </div>
        </section>

        {/* Módulo 3: Formulário de Adição com Imagem e Promoção */}
<section id="formulario-servico" className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 scroll-mt-6">
  <h2 className="text-lg font-black uppercase text-pink-500 mb-4">
    {idServicoEditando ? "⚡ Editando Item" : "3. Cadastrar Novo Procedimento"}
  </h2>
  
  <form onSubmit={handleSalvarServico} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Nome do Serviço</label>
        <input type="text" value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white" required />
      </div>
      
      <div>
        <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Valor Cobrado (R$)</label>
        <input type="number" step="0.01" value={precoServico} onChange={(e) => setPrecoServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white" required />
      </div>

      {/* NOVO CAMPO: PROMOÇÃO */}
      <div className="md:col-span-2 bg-neutral-950/50 p-4 rounded-xl border border-neutral-800/50">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={emPromocao} 
            onChange={(e) => setEmPromocao(e.target.checked)} 
            className="w-4 h-4 accent-pink-500" 
          />
          <span className="text-xs font-bold uppercase text-neutral-300">Ativar preço promocional</span>
        </label>
        
        {emPromocao && (
          <div className="mt-4">
            <label className="block text-xs font-bold uppercase text-pink-500 mb-2">Novo Preço (Promoção)</label>
            <input 
              type="number" 
              step="0.01" 
              value={precoPromoServico} 
              onChange={(e) => setPrecoPromoServico(e.target.value)} 
              placeholder="Ex: 99.90" 
              className="w-full p-3 bg-neutral-900 border border-pink-500/30 rounded-xl text-sm text-white" 
            />
          </div>
        )}
      </div>

      <div className="md:col-span-2">
        <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">URL da Imagem</label>
        <div className="flex gap-4">
          <input type="text" value={imagemUrlServico} onChange={(e) => setImagemUrlServico(e.target.value)} placeholder="Cole o link da imagem..." className="flex-1 p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white" />
          <label className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 px-4 py-3 rounded-xl text-xs font-bold flex items-center">
            Upload
            <input type="file" accept="image/*" onChange={handleUploadImagemServico} className="hidden" />
          </label>
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Breve descrição</label>
        <input type="text" value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white" />
      </div>
    </div>

    <div className="flex justify-between items-center border-t border-neutral-900 pt-6">
      {idServicoEditando && <button type="button" onClick={resetarFormularioServico} className="text-xs font-bold text-neutral-500 hover:text-white cursor-pointer">Cancelar</button>}
      <button type="submit" className="px-6 py-3 bg-white text-black text-xs font-black uppercase rounded-xl ml-auto cursor-pointer">
        {idServicoEditando ? "Atualizar" : "Publicar"}
      </button>
    </div>
  </form>
</section>

        {/* Módulo 4: Galeria */}
        <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 space-y-6">
          <h2 className={`text-lg font-black uppercase ${ehEstetica ? 'text-pink-500' : 'text-amber-500'}`}>{ehEstetica ? "4. Portfólio / Trabalhos Reais do Studio" : "4. Vitrine de Resultados / Evolução de Alunos"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-neutral-900 pb-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <input type="file" accept="image/*" onChange={handleUploadGaleria} disabled={subindoGaleria} className="text-xs text-neutral-400 cursor-pointer" />
            </div>
            <form onSubmit={handleAdicionarFotoGaleriaLink} className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex gap-2">
              <input type="text" value={urlFotoNovaGaleria} onChange={(e) => setUrlFotoNovaGaleria(e.target.value)} placeholder="URL da foto..." className="flex-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white" />
              <button type="submit" className="px-4 py-2 bg-white text-black font-black text-xs uppercase rounded-lg">Salvar</button>
            </form>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {fotosGaleria.map((foto) => (
              <div key={foto.id} className="relative flex flex-col border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950">
                <img src={foto.imagem_url} alt="" className="object-cover w-full aspect-square" />
                <div className="p-2 bg-neutral-900 border-t border-neutral-800"><button type="button" onClick={() => handleDeletarFotoGaleria(foto.id)} className="w-full bg-red-600 text-white text-[10px] font-black uppercase py-1 rounded-lg">Remover</button></div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}