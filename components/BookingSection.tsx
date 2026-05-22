"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { supabase } from "@/lib/supabase";
import "react-day-picker/dist/style.css";

interface BookingSectionProps {
  cliente: any;
  servicos?: any[];
}

export default function BookingSection({ cliente, servicos: servicosIniciais = [] }: BookingSectionProps) {
  const clienteValido = cliente || {};
  const [servicos, setServicos] = useState<any[]>(servicosIniciais);
  const [horariosLivres, setHorariosLivres] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date());
  const [horaSelecionada, setHoraSelecionada] = useState<string>("");
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [carregandoHoras, setCarregandoHoras] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { texto: string; botao: string; bgBadge: string }> = {
    blue: { texto: "text-blue-500", botao: "bg-blue-500 hover:bg-blue-600 text-white", bgBadge: "bg-blue-500/10" },
    purple: { texto: "text-purple-500", botao: "bg-purple-500 hover:bg-purple-600 text-white", bgBadge: "bg-purple-500/10" },
    pink: { texto: "text-pink-500", botao: "bg-pink-500 hover:bg-pink-600 text-white", bgBadge: "bg-pink-500/10" },
    amber: { texto: "text-amber-500", botao: "bg-amber-500 hover:bg-amber-600 text-neutral-950", bgBadge: "bg-amber-500/10" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const atualizarHorariosLivres = useCallback(async (dataFoco: Date) => {
    if (!clienteValido.id) return;
    setCarregandoHoras(true);
    const diaSemana = dataFoco.getDay();
    const dataFormatada = format(dataFoco, "yyyy-MM-dd");

    const { data: config } = await supabase
      .from("configuracao_agenda")
      .select("*")
      .eq("cliente_id", clienteValido.id)
      .eq("dia_semana", diaSemana)
      .maybeSingle();

    if (config?.esta_fechado) {
      setHorariosLivres([]);
      setCarregandoHoras(false);
      return;
    }

    const horariosPermitidos = config?.horarios_disponiveis || ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
    const { data: agendados } = await supabase
      .from("agendamentos")
      .select("hora_agendamento")
      .eq("cliente_id", clienteValido.id)
      .eq("data_agendamento", dataFormatada)
      .in("status", ["pendente", "confirmado"]);

    const horasOcupadas = agendados?.map((a) => a.hora_agendamento) || [];
    setHorariosLivres(horariosPermitidos.filter((h: string) => !horasOcupadas.includes(h)));
    setCarregandoHoras(false);
  }, [clienteValido.id]);

  useEffect(() => {
    if (dataSelecionada) atualizarHorariosLivres(dataSelecionada);
  }, [dataSelecionada, atualizarHorariosLivres]);

  const handleSolicitarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!horaSelecionada || !servicoSelecionado || !nome || !whatsapp) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    setCarregando(true);
    try {
      const { error } = await supabase.from("agendamentos").insert([{
        cliente_id: clienteValido.id,
        servico_id: servicoSelecionado,
        data_agendamento: format(dataSelecionada!, "yyyy-MM-dd"),
        hora_agendamento: horaSelecionada,
        nome_cliente: nome,
        whatsapp_cliente: whatsapp,
        status: "pendente"
      }]);

      if (error) throw error;
      setSucesso(true);
    } catch (err: any) {
      alert("Erro ao realizar agendamento: " + (err.message || "Tente novamente."));
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) return (
    <div className="max-w-xl mx-auto px-6 py-20">
      <div className="bg-inherit border border-current/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-current/5">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Solicitação Enviada!</h3>
        <p className="text-sm opacity-70 mb-8 leading-relaxed">
          Para concluir, finalize a confirmação pelo WhatsApp.
        </p>
        
        <a 
          href={`https://wa.me/${clienteValido.whatsapp_numero?.replace(/\D/g, "")}?text=Olá! Me chamo ${nome.trim()}. Gostaria de confirmar meu agendamento: ${servicos.find(s => s.id === servicoSelecionado)?.nome || 'Procedimento'} (R$ ${servicos.find(s => s.id === servicoSelecionado)?.preco || '0,00'}) - Dia ${format(dataSelecionada!, "dd/MM")} às ${horaSelecionada}.`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-5 px-6 mb-6 rounded-xl font-bold uppercase text-xs tracking-[0.2em] bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 border border-neutral-800 text-center"
        >
          Confirmar agendamento via WhatsApp
        </a>

        <button 
          onClick={() => { setSucesso(false); setDataSelecionada(new Date()); }}
          className="block w-full text-xs font-bold opacity-50 hover:opacity-100 uppercase tracking-widest"
        >
          Realizar novo agendamento
        </button>
      </div>
    </div>
  );

  return (
    <section id="agendamento" className="max-w-6xl mx-auto px-4 py-16 bg-inherit text-inherit rounded-3xl border border-current/10 relative z-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black uppercase tracking-tight">Escolha seu Horário</h2>
        <div className={`w-12 h-1 ${estiloAtivo.botao.split(" ")[0]} mx-auto mt-2`}></div>
      </div>

      <form onSubmit={handleSolicitarAgendamento} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col items-center bg-current/5 p-6 rounded-2xl border border-current/10">
          <DayPicker mode="single" selected={dataSelecionada} onSelect={setDataSelecionada} locale={ptBR} disabled={{ before: new Date() }} className="text-inherit" />
          <div className="w-full mt-8">
            <label className="block text-xs font-black uppercase tracking-widest opacity-60 mb-3">Horários Livres</label>
            {carregandoHoras ? <p className="text-xs opacity-50">Buscando...</p> : 
              <div className="grid grid-cols-3 gap-2">
                {horariosLivres.length > 0 ? horariosLivres.map((hora) => (
                  <button key={hora} type="button" onClick={() => setHoraSelecionada(hora)} className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${horaSelecionada === hora ? `${estiloAtivo.botao} border-transparent` : "bg-inherit border-current/20 hover:border-current/50"}`}>
                    {hora}
                  </button>
                )) : <p className="text-xs opacity-50 col-span-3">Nenhum horário disponível.</p>}
              </div>
            }
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest opacity-60 mb-2">1. Escolha o Procedimento</label>
            <select value={servicoSelecionado} onChange={(e) => setServicoSelecionado(e.target.value)} className="w-full p-3.5 bg-inherit border border-current/10 rounded-xl text-sm font-semibold focus:outline-none appearance-none cursor-pointer" required>
              <option value="" className="bg-neutral-900 text-white">Selecione uma opção...</option>
              {servicos?.map((s) => <option key={s.id} value={s.id} className="bg-neutral-900 text-white">{s.nome}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest opacity-60 mb-2">2. Seu Nome Completo</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-3.5 bg-inherit border border-current/10 rounded-xl text-sm font-semibold focus:outline-none" required />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest opacity-60 mb-2">3. Seu WhatsApp</label>
            <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full p-3.5 bg-inherit border border-current/10 rounded-xl text-sm font-semibold focus:outline-none" required />
          </div>
          <button type="submit" disabled={carregando} className={`w-full py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${estiloAtivo.botao}`}>
            {carregando ? "Processando..." : "Solicitar Agendamento"}
          </button>
        </div>
      </form>
    </section>
  );
}