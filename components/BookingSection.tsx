"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { supabase } from "@/lib/supabase";
import "react-day-picker/dist/style.css";

interface BookingSectionProps {
  cliente: any; // Dados do dono do site (SaaS tenant)
  servicos?: any[]; // RECEBE OS SERVIÇOS DIRETAMENTE DO PAGE.TSX
}

export default function BookingSection({ cliente, servicos: servicosIniciais = [] }: BookingSectionProps) {
  const clienteValido = cliente || {};
  
  // Estados de Controle dos Dados
  const [servicos, setServicos] = useState<any[]>(servicosIniciais);
  const [horariosLivres, setHorariosLivres] = useState<string[]>([]);
  
  // Estados do Formulário
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date());
  const [horaSelecionada, setHoraSelecionada] = useState<string>("");
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Estados de Status
  const [carregando, setCarregando] = useState(false);
  const [carregandoHoras, setCarregandoHoras] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Configurações Estéticas Baseadas no Nicho/Tema
  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { texto: string; botao: string; bgBadge: string }> = {
    blue: { texto: "text-blue-500", botao: "bg-blue-500 hover:bg-blue-400 text-neutral-950 shadow-blue-500/10", bgBadge: "bg-blue-500 text-neutral-950" },
    purple: { texto: "text-purple-500", botao: "bg-purple-500 hover:bg-purple-400 text-white shadow-purple-500/10", bgBadge: "bg-purple-500 text-white" },
    pink: { texto: "text-pink-500", botao: "bg-pink-500 hover:bg-pink-400 text-white shadow-pink-500/10", bgBadge: "bg-pink-500 text-white" },
    amber: { texto: "text-amber-500", botao: "bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-400/10", bgBadge: "bg-amber-500 text-neutral-950" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  // Sincroniza o estado interno caso os servicosIniciais mudem no carregamento assíncrono
  useEffect(() => {
    if (servicosIniciais && servicosIniciais.length > 0) {
      setServicos(servicosIniciais);
    }
  }, [servicosIniciais]);

  // 🔥 ESCUTADOR DO CLIQUE DA VITRINE: Preenche o select na hora do clique
  useEffect(() => {
    const escutarSelecao = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        setServicoSelecionado(customEvent.detail);
      }
    };

    window.addEventListener("selecionarServico", escutarSelecao);
    return () => window.removeEventListener("selecionarServico", escutarSelecao);
  }, []);

  // 1. LÓGICA FILTRADORA: Carrega os horários da dona e esconde os que já foram agendados
  const atualizarHorariosLivres = useCallback(async (dataFoco: Date) => {
    if (!clienteValido.id) return;
    setCarregandoHoras(true);
    
    const diaSemana = dataFoco.getDay(); // 0 (Domingo) a 6 (Sábado)
    const dataFormatada = format(dataFoco, "yyyy-MM-dd");

    // Passo A: Busca a configuração de turnos da dona para aquele dia da semana
    const { data: config, error: errConfig } = await supabase
      .from("configuracao_agenda")
      .select("*")
      .eq("cliente_id", clienteValido.id)
      .eq("dia_semana", diaSemana)
      .single();

    if (errConfig || !config || config.esta_fechado) {
      setHorariosLivres([]);
      setCarregandoHoras(false);
      return;
    }

    // Passo B: Busca agendamentos já existentes na mesma data que não foram recusados
    const { data: agendados } = await supabase
      .from("agendamentos")
      .select("hora_agendamento")
      .eq("cliente_id", clienteValido.id)
      .eq("data_agendamento", dataFormatada)
      .in("status", ["pendente", "confirmado"]);

    const horasOcupadas = agendados?.map(a => a.hora_agendamento) || [];

    // Passo C: Filtra removendo os horários ocupados da lista
    const livres = config.horarios_disponiveis.filter(
      (hora: string) => !horasOcupadas.includes(hora)
    );

    setHorariosLivres(livres);
    setCarregandoHoras(false);
  }, [clienteValido.id]);

  // Dispara a atualização sempre que mudar o dia no calendário
  useEffect(() => {
    if (dataSelecionada) {
      setHoraSelecionada(""); // Reseta a hora escolhida para evitar bugs
      atualizarHorariosLivres(dataSelecionada);
    }
  }, [dataSelecionada, atualizarHorariosLivres]);

  // 2. Salva o pedido de agendamento com status 'pendente'
  const handleSolicitarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dataSelecionada || !horaSelecionada || !servicoSelecionado || !nome || !whatsapp) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.from("agendamentos").insert([
      {
        cliente_id: clienteValido.id,
        servico_id: servicoSelecionado,
        nome_cliente: nome,
        whatsapp_cliente: whatsapp.replace(/[^0-9]/g, ""),
        data_agendamento: format(dataSelecionada, "yyyy-MM-dd"),
        hora_agendamento: horaSelecionada,
        status: "pendente"
      }
    ]);

    setCarregando(false);

    if (error) {
      alert("Erro ao solicitar agendamento: " + error.message);
    } else {
      setSucesso(true);
      // Dispara notificação opcional para o WhatsApp do profissional
      const servicoNome = servicos.find(s => s.id === servicoSelecionado)?.nome || "";
      const msg = encodeURIComponent(`Olá! Solicitei o agendamento do serviço *${servicoNome}* para o dia *${format(dataSelecionada, "dd/MM")}* às *${horaSelecionada}*. Aguardo sua aprovação no painel!`);
      window.open(`https://wa.me/${clienteValido.whatsapp_numero}?text=${msg}`, "_blank");
    }
  };

  if (sucesso) {
    return (
      <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl mx-auto px-6">
        <span className="text-5xl">⏳</span>
        <h3 className="text-2xl font-black text-white mt-4 uppercase tracking-tight">Solicitação Enviada!</h3>
        <p className="text-neutral-400 mt-2 text-sm leading-relaxed">
          O seu horário foi pré-reservado. A dona do espaço recebeu a notificação e irá confirmar seu agendamento no WhatsApp em breve.
        </p>
      </div>
    );
  }

  return (
    <section id="agendamento" className="max-w-6xl mx-auto px-4 py-16 bg-white text-neutral-900 rounded-3xl border border-neutral-200/60 shadow-sm relative z-20 pointer-events-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black uppercase tracking-tight text-neutral-950">
          Escolha seu Horário
        </h2>
        <div className={`w-12 h-1 ${estiloAtivo.botao.split(" ")[0]} mx-auto mt-2`}></div>
      </div>

      <form onSubmit={handleSolicitarAgendamento} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LADO ESQUERDO: Calendário Nativo e Grade de Horas */}
        <div className="flex flex-col items-center bg-neutral-50 p-6 rounded-2xl border border-neutral-200/50">
          <DayPicker
            mode="single"
            selected={dataSelecionada}
            onSelect={setDataSelecionada}
            locale={ptBR}
            disabled={{ before: new Date() }} // Impede agendamento retroativo
            className="text-neutral-900 mx-auto bg-white p-4 rounded-xl border border-neutral-200 shadow-sm"
          />

          <div className="w-full mt-8">
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">
              Horários Livres para este dia
            </label>
            
            {carregandoHoras ? (
              <p className="text-xs text-neutral-400 font-medium">Buscando vagas no banco...</p>
            ) : horariosLivres.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {horariosLivres.map((hora) => (
                  <button
                    key={hora}
                    type="button"
                    onClick={() => setHoraSelecionada(hora)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      horaSelecionada === hora
                        ? `${estiloAtivo.botao} border-transparent shadow-md`
                        : "bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400"
                    }`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-500 bg-neutral-100 p-4 rounded-xl font-medium border border-dashed border-neutral-300">
                Nenhum horário disponível ou o estabelecimento estará fechado nesta data.
              </p>
            )}
          </div>
        </div>

        {/* LADO DIREITO: Escolha de Procedimento e Dados de Contato */}
        <div className="flex flex-col justify-between space-y-6">
          
          {/* Seletor de Serviços Dinâmicos do Supabase */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">1. Escolha o Procedimento</label>
            <select
              value={servicoSelecionado}
              onChange={(e) => setServicoSelecionado(e.target.value)}
              className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer"
              required
            >
              <option value="">Clique para ver os serviços e preços...</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome} — {s.em_promocao ? `PROMO: R$ ${s.preco_promocional}` : `R$ ${s.preco}`}
                </option>
              ))}
            </select>
          </div>

          {/* Input de Nome */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">2. Seu Nome Completo</label>
            <input
              type="text"
              placeholder="Ex: Amanda Bezerra"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-800 focus:outline-none focus:border-neutral-400"
              required
            />
          </div>

          {/* Input de WhatsApp */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">3. Seu WhatsApp (Com DDD)</label>
            <input
              type="tel"
              placeholder="Ex: 81999999999"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-semibold text-neutral-800 focus:outline-none focus:border-neutral-400"
              required
            />
          </div>

          {/* Resumo da Agenda Ativa */}
          {dataSelecionada && horaSelecionada && servicoSelecionado && (
            <div className="bg-neutral-950 text-white p-4 rounded-xl text-xs font-semibold flex justify-between items-center transition-opacity">
              <span>Pré-reserva para:</span>
              <span className={`font-black uppercase tracking-wider ${estiloAtivo.texto}`}>
                {format(dataSelecionada, "dd 'de' MMMM", { locale: ptBR })} às {horaSelecionada}
              </span>
            </div>
          )}

          {/* Botão de Envio */}
          <button
            type="submit"
            disabled={carregando}
            className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 ${estiloAtivo.botao}`}
          >
            {carregando ? "Processando..." : "Solicitar Agendamento"}
          </button>
        </div>

      </form>
    </section>
  );
}