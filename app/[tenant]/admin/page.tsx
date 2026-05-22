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

  // Estados de Controle
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
  const [whatsappNumero, setWhatsappNumero] = useState("");
  const [navbarIniciais, setNavbarIniciais] = useState("");
  const [fotoHero, setFotoHero] = useState("");
  const [fotoSobre, setFotoSobre] = useState("");
  const [imgObjetivo1, setImgObjetivo1] = useState("");
  const [imgObjetivo2, setImgObjetivo2] = useState("");
  const [imgObjetivo3, setImgObjetivo3] = useState("");

  // ESTADOS DO CONTROLE DE HORÁRIOS DA AGENDA
  const diasDaSemanaTexto = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const [diaSelecionadoConfig, setDiaSelecionadoConfig] = useState<number>(1); // Padrão: Segunda-feira
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

  // Carrega os dados iniciais do Supabase
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
        setWhatsappNumero(cliente.whatsapp_numero || "");
        setNavbarIniciais(cliente.navbar_iniciais_logo || "");
        setFotoHero(cliente.foto_hero || "");
        setFotoSobre(cliente.foto_sobre || "");
        setImgObjetivo1(cliente.img_objetivo_1 || "");
        setImgObjetivo2(cliente.img_objetivo_2 || "");
        setImgObjetivo3(cliente.img_objetivo_3 || "");

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

  // Trata troca de aba de dias da semana
  const handleTrocarDiaAbas = async (dia: number) => {
    setDiaSelecionadoConfig(dia);
    if (clienteId) {
      await carregarConfiguracaoDia(clienteId, dia);
    }
  };

  // Adicionar hora na lista local antes de persistir
  const handleAdicionarHoraLista = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoHoraInput || horariosDoDia.includes(novoHoraInput)) return;
    const listaOrdenada = [...horariosDoDia, novoHoraInput].sort();
    setHorariosDoDia(listaOrdenada);
    setNovoHoraInput("");
  };

  // Remover hora da lista local
  const handleRemoverHoraLista = (horaRemover: string) => {
    setHorariosDoDia(horariosDoDia.filter(h => h !== horaRemover));
  };

  // SALVAR TURNO/REGRA DA AGENDA NO SUPABASE
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

    setSalvandoAgenda(false);
    if (error) alert("Erro ao salvar agenda: " + error.message);
    else alert(`Agenda de ${diasDaSemanaTexto[diaSelecionadoConfig]} atualizada com sucesso!`);
  };

  // Upload das imagens de perfil (Hero e Sobre)
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

  // Upload das imagens dos objetivos
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

  // Salva dados estruturados da aba 1
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
        img_objetivo_3: imgObjetivo3 || null
      })
      .eq("id", clienteId);

    setSalvandoCliente(false);
    if (error) alert("Erro ao salvar: " + error.message);
    else alert("Dados do espaço e fotos updated!");
  };

  // Upload de imagem de serviço e ações secundárias
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
      alert("Imagem do serviço enviada!");
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

  if (loading) return <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center font-sans">Carregando Painel...</div>;

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-4 sm:p-8 md:p-12 font-sans selection:bg-pink-500">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Topo */}
        <div className="flex justify-between items-center border-b border-neutral-900 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Painel Admin</h1>
            <p className="text-neutral-500 text-xs uppercase font-semibold">Link ativo: /{tenant}</p>
          </div>
          <button onClick={() => router.push(`/${tenant}`)} className="px-4 py-2 border border-neutral-800 rounded-xl text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors">Visualizar Site ↗</button>
        </div>

        {/* Agendamentos */}
        <section className="bg-neutral-900/20 border border-neutral-900 rounded-2xl p-6 space-y-4">
          <h2 className="text-lg font-black uppercase text-pink-500">🗓️ Próximos Agendamentos ({agendamentos.length})</h2>
          {agendamentos.length === 0 ? <p className="text-xs text-neutral-500 italic py-2">Nenhum horário agendado ainda.</p> : (
            <div className="space-y-3">
              {agendamentos.map((agend) => (
                <div key={agend.id} className="bg-neutral-950 border border-neutral-900 rounded-xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-sm text-white uppercase">{agend.nome_cliente}</h3>
                      <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 font-mono text-[11px] px-2 py-0.5 rounded-md">{agend.data_agendamento?.split("-").reverse().join("/")} às {agend.hora_agendamento}</span>
                    </div>
                    <p className="text-xs text-neutral-400">Procedimento: <span className="text-pink-500 font-semibold">{agend.servico_nome}</span></p>
                    <p className="text-[11px] text-neutral-500 font-mono">Contato: {agend.whatsapp_cliente}</p>
                  </div>
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <button onClick={() => enviarConfirmacaoWhatsApp(agend)} className="flex-1 md:flex-initial px-4 py-2 bg-green-600 text-white font-black text-xs uppercase rounded-lg cursor-pointer">Confirmar no Whats 💬</button>
                    <button onClick={() => handleDeletarAgendamento(agend.id)} className="p-2 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-red-500 rounded-lg text-xs cursor-pointer">🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CONTROLE DE DIAS E HORÁRIOS ABERTOS/FECHADOS */}
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
                    ? "bg-pink-500 border-pink-500 text-white"
                    : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700"
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
                <input
                  type="checkbox"
                  id="fechado-check"
                  checked={estaFechado}
                  onChange={(e) => setEstaFechado(e.target.checked)}
                  className="w-4 h-4 rounded text-pink-500 bg-neutral-900 border-neutral-800 focus:ring-0 cursor-pointer"
                />
                <label htmlFor="fechado-check" className="text-xs font-black uppercase tracking-wider text-neutral-200 cursor-pointer select-none">
                  Estarei Fechado neste dia
                </label>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed pt-2">
                Marcar a caixa acima desativa completamente o calendário no site público para qualquer data que caia neste dia da semana.
              </p>
            </div>

            <div className="md:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-neutral-300">
                  Horários Ativos ({estaFechado ? "Bloqueado" : horariosDoDia.length})
                </h3>
                
                {!estaFechado && (
                  <form onSubmit={handleAdicionarHoraLista} className="flex gap-2">
                    <input
                      type="time"
                      value={novoHoraInput}
                      onChange={(e) => setNovoHoraInput(e.target.value)}
                      className="p-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-pink-500"
                      required
                    />
                    <button type="submit" className="px-3 py-2 bg-white text-black font-black text-xs uppercase rounded-lg hover:bg-neutral-200 cursor-pointer">
                      + Adicionar
                    </button>
                  </form>
                )}
              </div>

              {estaFechado ? (
                <div className="py-8 bg-red-950/20 border border-dashed border-red-900/40 rounded-xl text-center">
                  <p className="text-xs text-red-400 font-bold uppercase tracking-wider">🔒 Estabelecimento Fechado</p>
                </div>
              ) : horariosDoDia.length === 0 ? (
                <div className="py-8 bg-neutral-950 border border-dashed border-neutral-800 rounded-xl text-center">
                  <p className="text-xs text-neutral-500 italic">Nenhum horário configurado para este dia.</p>
                </div>
              ) : (
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 bg-neutral-950/40 p-4 border border-neutral-900 rounded-xl">
                  {horariosDoDia.map((hora) => (
                    <div
                      key={hora}
                      className="relative bg-neutral-950 border border-neutral-800 hover:border-neutral-700 p-2 rounded-lg font-mono text-xs text-center flex items-center justify-between group"
                    >
                      <span className="w-full font-bold text-neutral-300">{hora}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoverHoraLista(hora)}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 hover:bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center cursor-pointer shadow-md"
                        title="Remover horário"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end border-t border-neutral-900 pt-4">
            <button
              type="button"
              onClick={handleSalvarConfigAgenda}
              disabled={salvandoAgenda}
              className="px-5 py-2.5 bg-pink-500 text-white font-black text-xs uppercase tracking-wider rounded-xl hover:bg-pink-400 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {salvandoAgenda ? "Salvando Configuração..." : `Salvar Agenda de ${diasDaSemanaTexto[diaSelecionadoConfig]}`}
            </button>
          </div>
        </section>

        {/* 1. Dados do Espaço */}
        <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
          <h2 className="text-lg font-black uppercase text-pink-500 mb-6">1. Dados e Fotos do Espaço</h2>
          <form onSubmit={handleSalvarDadosCliente} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">WhatsApp de Atendimento</label>
                <input type="text" value={whatsappNumero} onChange={(e) => setWhatsappNumero(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Iniciais do Logo</label>
                <input type="text" value={navbarIniciais} onChange={(e) => setNavbarIniciais(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm uppercase text-white focus:outline-none" />
              </div>
            </div>

            {/* HERO */}
            <div className="border-t border-neutral-900 pt-6 space-y-3">
              <h3 className="text-xs font-black uppercase text-neutral-300 tracking-wider">Foto Principal de Entrada (Seção Inicial)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoCliente(e, "hero")} className="text-xs text-neutral-400 file:bg-neutral-800 file:text-white cursor-pointer" />
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                  <input type="text" value={fotoHero} onChange={(e) => setFotoHero(e.target.value)} placeholder="https://..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>
            </div>

            {/* SOBRE */}
            <div className="border-t border-neutral-900 pt-6 space-y-3">
              <h3 className="text-xs font-black uppercase text-neutral-300 tracking-wider">Foto de Apresentação (Seção Sobre Mim)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoCliente(e, "sobre")} className="text-xs text-neutral-400 file:bg-neutral-800 file:text-white cursor-pointer" />
                </div>
                <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                  <input type="text" value={fotoSobre} onChange={(e) => setFotoSobre(e.target.value)} placeholder="https://..." className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                </div>
              </div>
            </div>

            {/* OBJETIVOS */}
            <div className="border-t border-neutral-900 pt-6 space-y-4">
              <h3 className="text-sm font-black uppercase text-pink-500 tracking-wider">Fotos dos Cards Informativos (Seção Como vou te ajudar)</h3>
              <div className="space-y-2 bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-bold text-neutral-300 uppercase">Card 1</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 1)} className="text-xs text-neutral-400 p-2 border border-neutral-900 rounded-lg" />
                  <input type="text" value={imgObjetivo1} onChange={(e) => setImgObjetivo1(e.target.value)} placeholder="Ou cole o link..." className="p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs" />
                </div>
              </div>
              <div className="space-y-2 bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-bold text-neutral-300 uppercase">Card 2</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 2)} className="text-xs text-neutral-400 p-2 border border-neutral-900 rounded-lg" />
                  <input type="text" value={imgObjetivo2} onChange={(e) => setImgObjetivo2(e.target.value)} placeholder="Ou cole o link..." className="p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs" />
                </div>
              </div>
              <div className="space-y-2 bg-neutral-950/40 p-4 rounded-xl border border-neutral-900">
                <p className="text-xs font-bold text-neutral-300 uppercase">Card 3</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="file" accept="image/*" onChange={(e) => handleUploadFotoObjetivo(e, 3)} className="text-xs text-neutral-400 p-2 border border-neutral-900 rounded-lg" />
                  <input type="text" value={imgObjetivo3} onChange={(e) => setImgObjetivo3(e.target.value)} placeholder="Ou cole o link..." className="p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs" />
                </div>
              </div>
            </div>

            <div className="flex justify-end border-t border-neutral-900 pt-4">
              <button type="submit" disabled={salvandoCliente} className="px-6 py-3 bg-pink-500 text-white text-xs font-black uppercase rounded-xl hover:bg-pink-400 transition-colors disabled:opacity-50">Salvar Alterações Globais</button>
            </div>
          </form>
        </section>

        {/* 2. Serviços Ativos */}
        <section className="space-y-4">
          <h2 className="text-lg font-black uppercase text-pink-500">2. Procedimentos Ativos ({servicos.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicos.map((s) => (
              <div key={s.id} className="bg-neutral-900/40 border border-neutral-900 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {s.imagem_url && <img src={s.imagem_url} alt="" className="w-12 h-12 rounded-lg object-cover border border-neutral-800" />}
                  <div>
                    <h3 className="font-bold text-sm text-white">{s.nome}</h3>
                    <p className="text-xs text-neutral-400">R$ {s.preco}</p>
                  </div>
                </div>
                {/* 🔥 CORRIGIDO: Nome da propriedade do método ajustada para minúscula */}
                <button onClick={() => iniciarEdicaoServico(s)} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold">Editar</button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Form Serviços */}
        <section id="formulario-servico" className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 scroll-mt-6">
          <h2 className="text-lg font-black uppercase text-pink-500 mb-4">{idServicoEditando ? "⚡ Editando Procedimento" : "➕ Adicionar Novo Procedimento"}</h2>
          <form onSubmit={handleSalvarServico} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Nome do Serviço</label>
                <input type="text" value={nomeServico} onChange={(e) => setNomeServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-pink-500 text-white" required />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Preço Padrão (R$)</label>
                <input type="number" step="0.01" value={precoServico} onChange={(e) => setPrecoServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-pink-500 text-white" required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Descrição Curta</label>
                <input type="text" value={descricaoServico} onChange={(e) => setDescricaoServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:outline-none" />
              </div>
              <div className="md:col-span-2 space-y-4 border-t border-neutral-900 pt-4">
                <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Imagem do Procedimento</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                    <input type="file" accept="image/*" onChange={handleUploadImagemServico} disabled={subindoImagem} className="text-xs text-neutral-400 file:bg-neutral-800 file:text-white cursor-pointer" />
                  </div>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                    <input type="text" value={imagemUrlServico} onChange={(e) => setImagemUrlServico(e.target.value)} placeholder="https://..." className="w-full p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs" />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-neutral-900 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="promocao-check" checked={emPromocao} onChange={(e) => setEmPromocao(e.target.checked)} className="w-4 h-4 rounded text-pink-500 bg-neutral-950 border-neutral-800" />
                <label htmlFor="promocao-check" className="text-sm font-bold uppercase text-neutral-200">Ativar Campanha Promocional</label>
              </div>
              {emPromocao && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Preço Promocional (R$)</label>
                    <input type="number" step="0.01" value={precoPromoServico} onChange={(e) => setPrecoPromoServico(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm focus:border-pink-500 text-pink-500" required={emPromocao} />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center border-t border-neutral-900 pt-6">
              {idServicoEditando && <button type="button" onClick={resetarFormularioServico} className="text-xs font-bold text-neutral-500 hover:text-white">Cancelar Edição</button>}
              <button type="submit" className="px-6 py-3 bg-white text-black text-xs font-black uppercase rounded-xl ml-auto hover:bg-neutral-200">{idServicoEditando ? "Atualizar" : "Cadastrar"}</button>
            </div>
          </form>
        </section>

        {/* 4. GALERIA */}
        <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 space-y-6">
          <h2 className="text-lg font-black uppercase text-pink-500">4. Galeria de Fotos (Trabalhos Reais)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-neutral-900 pb-6">
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
              <input type="file" accept="image/*" onChange={handleUploadGaleria} disabled={subindoGaleria} className="text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:bg-neutral-800 file:text-white cursor-pointer" />
            </div>
            <form onSubmit={handleAdicionarFotoGaleriaLink} className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between gap-2">
              <div className="flex gap-2">
                <input type="text" value={urlFotoNovaGaleria} onChange={(e) => setUrlFotoNovaGaleria(e.target.value)} placeholder="https://..." className="flex-1 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none" />
                <button type="submit" className="px-4 py-2 bg-white text-black font-black text-xs uppercase rounded-lg hover:bg-neutral-200">Salvar</button>
              </div>
            </form>
          </div>
          <div className="space-y-3">
            {fotosGaleria.length === 0 ? <p className="text-xs text-neutral-500 italic">Sua galeria está vazia.</p> : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {fotosGaleria.map((foto) => (
                  <div key={foto.id} className="relative flex flex-col border border-neutral-900 rounded-xl overflow-hidden bg-neutral-950 group">
                    <div className="relative w-full aspect-square"><img src={foto.imagem_url} alt="" className="object-cover w-full h-full" /></div>
                    <div className="p-2 bg-neutral-900 border-t border-neutral-800 flex justify-center items-center">
                      <button type="button" onClick={() => handleDeletarFotoGaleria(foto.id)} className="w-full bg-red-600 text-white text-[10px] font-black uppercase py-1.5 rounded-lg">Excluir Foto</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}