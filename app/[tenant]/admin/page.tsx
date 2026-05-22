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
  const [subindoImagem, setSubindoImagem] = useState(false);
  const [idServicoEditando, setIdServicoEditando] = useState<string | null>(null);

  // Estados dos Dados do Cliente (Espaço)
  const [clienteId, setClienteId] = useState("");
  const [whatsappNumero, setWhatsappNumero] = useState("");
  const [navbarIniciais, setNavbarIniciais] = useState("");

  // Estados dos Serviços
  const [servicos, setServicos] = useState<any[]>([]);
  const [nomeServico, setNomeServico] = useState("");
  const [descricaoServico, setDescricaoServico] = useState("");
  const [precoServico, setPrecoServico] = useState("");
  const [emPromocao, setEmPromocao] = useState(false);
  const [precoPromoServico, setPrecoPromoServico] = useState("");
  const [imagemUrlServico, setImagemUrlServico] = useState("");

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

        const { data: listaServicos } = await supabase
          .from("servicos")
          .select("*")
          .eq("cliente_id", cliente.id)
          .order("created_at", { ascending: true });

        if (listaServicos) setServicos(listaServicos);
      }
      setLoading(false);
    }
    carregarDados();
  }, [tenant]);

  // 📷 OPÇÃO A: Upload de arquivo direto do Celular/PC para o Storage
  const handleUploadImagem = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setSubindoImagem(true);

      const fileExt = file.name.split('.').pop();
      const fileName = `${clienteId}/${Date.now()}.${fileExt}`;

      // Envia o arquivo para o bucket 'servicos-imagens'
      const { error } = await supabase.storage
        .from("servicos-imagens")
        .upload(fileName, file, { upsert: true, cacheControl: "3600" });

      if (error) throw error;

      // Captura a URL pública gerada
      const { data: { publicUrl } } = supabase.storage
        .from("servicos-imagens")
        .getPublicUrl(fileName);

      setImagemUrlServico(publicUrl); // Alimenta o estado com a URL do storage
      alert("Imagem do celular carregada com sucesso!");
    } catch (error: any) {
      alert("Erro ao subir imagem: " + error.message);
    } finally {
      setSubindoImagem(false);
    }
  };

  // Salva dados de contato/iniciais
  const handleSalvarDadosCliente = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvandoCliente(true);
    await supabase
      .from("clientes")
      .update({ whatsapp_numero: whatsappNumero, navbar_iniciais_logo: navbarIniciais })
      .eq("id", clienteId);
    setSalvandoCliente(false);
    alert("Dados do espaço salvos!");
  };

  // Prepara o formulário para edição
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

  // Salva ou atualiza o serviço no banco
  const handleSalvarServico = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeServico || !precoServico) return alert("Campos obrigatórios pendentes.");

    const dadosServico = {
      cliente_id: clienteId,
      nome: nomeServico,
      descricao: descricaoServico,
      preco: parseFloat(precoServico),
      em_promocao: emPromocao,
      preco_promocional: emPromocao && precoPromoServico ? parseFloat(precoPromoServico) : null,
      imagem_url: imagemUrlServico || null, // Salva o link colado ou a URL do arquivo enviado
    };

    if (idServicoEditando) {
      await supabase.from("servicos").update(dadosServico).eq("id", idServicoEditando);
      alert("Procedimento atualizado!");
    } else {
      await supabase.from("servicos").insert([dadosServico]);
      alert("Novo procedimento cadastrado!");
    }

    resetarFormularioServico();
    router.refresh();
    window.location.reload();
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

        {/* 1. Dados do Espaço */}
        <section className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6">
          <h2 className="text-lg font-black uppercase text-pink-500 mb-4">1. Dados do Espaço</h2>
          <form onSubmit={handleSalvarDadosCliente} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">WhatsApp de Atendimento</label>
              <input type="text" value={whatsappNumero} onChange={(e) => setWhatsappNumero(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-neutral-400 mb-2">Iniciais do Logo</label>
              <input type="text" value={navbarIniciais} onChange={(e) => setNavbarIniciais(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-xl text-sm uppercase text-white focus:outline-none" />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="px-6 py-3 bg-pink-500 text-white text-xs font-black uppercase rounded-xl hover:bg-pink-400 transition-colors">Salvar Dados Globais</button>
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
                <button onClick={() => iniciarEdicaoServico(s)} className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-xs font-bold transition-colors">Editar</button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Formulário Duplo (Link + Upload) */}
        <section id="formulario-servico" className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-6 scroll-mt-6">
          <h2 className="text-lg font-black uppercase text-pink-500 mb-4">
            {idServicoEditando ? "⚡ Editando Procedimento" : "➕ Adicionar Novo Procedimento"}
          </h2>
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

              {/* 🔥 DUAS OPÇÕES DE IMAGEM JUNTO NO INTERFACE */}
              <div className="md:col-span-2 space-y-4 border-t border-neutral-900 pt-4">
                <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Imagem do Procedimento (Escolha uma das opções)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Opção 1: Upload Direto */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase bg-pink-500/10 text-pink-500 px-2 py-0.5 rounded">Opção A</span>
                      <p className="text-xs font-bold text-white mt-2 mb-3">Enviar direto do Celular ou PC</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleUploadImagem}
                        disabled={subindoImagem}
                        className="text-xs text-neutral-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer disabled:opacity-50"
                      />
                      {subindoImagem && <span className="text-[11px] text-pink-500 animate-pulse font-bold">Subindo...</span>}
                    </div>
                  </div>

                  {/* Opção 2: Colar Link URL */}
                  <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase bg-neutral-800 text-neutral-400 px-2 py-0.5 rounded">Opção B</span>
                      <p className="text-xs font-bold text-white mt-2 mb-2">Colar Link da Imagem (URL)</p>
                    </div>
                    <input 
                      type="text" 
                      value={imagemUrlServico}
                      onChange={(e) => setImagemUrlServico(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-neutral-300 focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* Caixa de Preview da Imagem Selecionada */}
                {imagemUrlServico && (
                  <div className="flex items-center gap-3 bg-neutral-900/60 p-3 rounded-xl border border-neutral-900 w-full md:w-fit">
                    <img src={imagemUrlServico} alt="Preview" className="w-12 h-12 rounded-lg object-cover border border-neutral-800" />
                    <div className="overflow-hidden max-w-xs md:max-w-md">
                      <p className="text-[10px] text-neutral-400 font-bold uppercase">Link ativo no banco:</p>
                      <p className="text-[11px] text-neutral-500 truncate font-mono">{imagemUrlServico}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controle de Promoção */}
            <div className="border-t border-neutral-900 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <input type="checkbox" id="promocao-check" checked={emPromocao} onChange={(e) => setEmPromocao(e.target.checked)} className="w-4 h-4 rounded text-pink-500 bg-neutral-950 border-neutral-800 cursor-pointer" />
                <label htmlFor="promocao-check" className="text-sm font-bold uppercase text-neutral-200 cursor-pointer select-none">Ativar Campanha Promocional</label>
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

            {/* Rodapé do Form */}
            <div className="flex justify-between items-center border-t border-neutral-900 pt-6">
              {idServicoEditando && <button type="button" onClick={resetarFormularioServico} className="text-xs font-bold text-neutral-500 hover:text-white">Cancelar Edição</button>}
              <button type="submit" className="px-6 py-3 bg-white text-black text-xs font-black uppercase rounded-xl ml-auto hover:bg-neutral-200 transition-colors shadow-md">{idServicoEditando ? "Atualizar Procedimento" : "Cadastrar Procedimento"}</button>
            </div>
          </form>
        </section>

      </div>
    </main>
  );
}