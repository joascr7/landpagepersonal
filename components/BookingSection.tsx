"use client";

import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import { supabase } from "@/lib/supabase";

export default function BookingSection({ cliente, servicos: servicosIniciais = [] }: any) {
  const clienteValido = cliente || {};
  const [servicos] = useState<any[]>(servicosIniciais);
  const [horariosLivres, setHorariosLivres] = useState<string[]>([]);
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(new Date());
  const [horaSelecionada, setHoraSelecionada] = useState<string>("");
  const [servicoSelecionado, setServicoSelecionado] = useState<string>("");
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  const ehEstetica = clienteValido.nicho === "estetica";
  const corDefinida = clienteValido.tema_cor || (ehEstetica ? "pink" : "amber");

  const mapasDeCores: Record<string, { texto: string; botao: string; hex: string }> = {
    blue: { texto: "text-blue-500", botao: "bg-blue-500 hover:bg-blue-600 text-white", hex: "#3b82f6" },
    purple: { texto: "text-purple-500", botao: "bg-purple-500 hover:bg-purple-600 text-white", hex: "#a855f7" },
    pink: { texto: "text-pink-500", botao: "bg-pink-500 hover:bg-pink-600 text-white", hex: "#ec4899" },
    amber: { texto: "text-amber-500", botao: "bg-amber-500 hover:bg-amber-600 text-neutral-950", hex: "#f59e0b" },
  };

  const estiloAtivo = mapasDeCores[corDefinida] || mapasDeCores[ehEstetica ? "pink" : "amber"];

  const atualizarHorariosLivres = useCallback(async (dataFoco: Date) => {
    if (!clienteValido.id) return;
    
    const agora = new Date();
    const isHoje = format(dataFoco, "yyyy-MM-dd") === format(agora, "yyyy-MM-dd");
    const diaSemana = dataFoco.getDay();
    const dataFormatada = format(dataFoco, "yyyy-MM-dd");

    const { data: config } = await supabase.from("configuracao_agenda")
      .select("*")
      .eq("cliente_id", clienteValido.id)
      .eq("dia_semana", diaSemana)
      .maybeSingle();
    
    if (config?.esta_fechado) { setHorariosLivres([]); return; }

    let horariosPermitidos = config?.horarios_disponiveis || ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

   if (isHoje) {
  const horaAtual = agora.getHours();
  const minutoAtual = agora.getMinutes();
  
  // Apenas adicione : string ao parâmetro para o TypeScript parar de reclamar
  horariosPermitidos = horariosPermitidos.filter((horario: string) => {
    const [hora, minuto] = horario.split(":").map(Number);
    return hora > horaAtual || (hora === horaAtual && minuto > minutoAtual);
  });
}

    const { data: agendados } = await supabase.from("agendamentos")
      .select("hora_agendamento")
      .eq("cliente_id", clienteValido.id)
      .eq("data_agendamento", dataFormatada);
    
    const horasOcupadas = agendados?.map((a) => a.hora_agendamento) || [];
    setHorariosLivres(horariosPermitidos.filter((h: string) => !horasOcupadas.includes(h)));
  }, [clienteValido.id]);

  useEffect(() => {
    if (dataSelecionada) atualizarHorariosLivres(dataSelecionada);
  }, [dataSelecionada, atualizarHorariosLivres]);

  const handleSolicitarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!horaSelecionada || !servicoSelecionado || !nome || !whatsapp) return alert("Preencha todos os campos!");
    setCarregando(true);
    const { error } = await supabase.from("agendamentos").insert([{
      cliente_id: clienteValido.id, servico_id: servicoSelecionado, data_agendamento: format(dataSelecionada!, "yyyy-MM-dd"),
      hora_agendamento: horaSelecionada, nome_cliente: nome, whatsapp_cliente: whatsapp, status: "pendente"
    }]);
    if (!error) setSucesso(true);
    setCarregando(false);
  };

if (sucesso) {
  // Busca especificamente pelo campo que o seu Admin preenche
  const numeroBruto = clienteValido.whatsapp_numero;
  const numeroLimpo = numeroBruto?.toString().replace(/\D/g, "");

  const mensagem = `Olá! Gostaria de confirmar meu agendamento. Cliente: ${nome}, Serviço: ${servicos.find(s => s.id === servicoSelecionado)?.nome || 'Procedimento'}`;
  
  // Se o número existir, gera o link, senão exibe um aviso amigável
  const linkWhatsapp = numeroLimpo 
    ? `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}` 
    : null;

  return (
    <div className="text-center py-20 font-bold flex flex-col items-center gap-6">
      <p className="text-xl">Solicitação Enviada com Sucesso!</p>
      
      {linkWhatsapp ? (
        <a 
          href={linkWhatsapp} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`px-8 py-4 rounded-xl font-black uppercase text-white flex items-center gap-2 ${estiloAtivo.botao}`}
        >
          Confirmar no WhatsApp
        </a>
      ) : (
        <div className="p-4 bg-neutral-900 rounded-xl border border-neutral-800">
           <p className="text-sm text-neutral-400">Aguarde a confirmação do profissional.</p>
        </div>
      )}
    </div>
  );
}

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 bg-inherit text-inherit rounded-3xl border border-current/10">
      <style jsx global>{`
        .rdp { display: flex; flex-direction: column; align-items: center; user-select: none; }
        .rdp-table { display: grid !important; grid-template-columns: repeat(7, 40px) !important; gap: 4px !important; justify-content: center !important; }
        .rdp-head_row, .rdp-row { display: contents !important; }
        .rdp-head_cell, .rdp-cell { display: flex !important; justify-content: center !important; align-items: center !important; width: 40px !important; height: 40px !important; }
        .rdp-day { width: 35px !important; height: 35px !important; border-radius: 50% !important; border: none !important; background: transparent !important; cursor: pointer; }
        .rdp { --rdp-accent-color: ${estiloAtivo.hex} !important; }
        .rdp-day_selected, .rdp-day_selected:hover { background-color: ${estiloAtivo.hex} !important; color: #000 !important; font-weight: 900 !important; outline: none !important; box-shadow: none !important; }
        .rdp-day_selected::before { display: none !important; }
        .rdp-nav_button { color: #333 !important; }
      `}</style>

      <h2 className="text-center text-3xl font-black uppercase mb-12">Escolha seu Horário</h2>
      <form onSubmit={handleSolicitarAgendamento} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col items-center bg-current/5 p-6 rounded-2xl border border-current/10">
          <DayPicker 
            mode="single" 
            selected={dataSelecionada} 
            onSelect={setDataSelecionada} 
            locale={ptBR}
            disabled={{ before: new Date() }}
            modifiersStyles={{
              selected: { backgroundColor: estiloAtivo.hex, color: "#000", fontWeight: "900", border: "2px solid #000", borderRadius: "8px" }
            }}
          />
          <div className="grid grid-cols-3 gap-2 mt-8 w-full">
            {horariosLivres.map((h) => (
              <button key={h} type="button" onClick={() => setHoraSelecionada(h)} className={`p-3 text-xs font-bold rounded-lg border ${horaSelecionada === h ? estiloAtivo.botao : "border-current/20"}`}>
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative">
            <label className="text-xs font-black uppercase opacity-60 mb-2 block">Procedimento</label>
            <div onClick={() => setMenuAberto(!menuAberto)} className="w-full p-4 bg-inherit border border-current/10 rounded-xl cursor-pointer text-sm">
              {servicos?.find(s => s.id === servicoSelecionado)?.nome || "Selecione..."}
            </div>
            {menuAberto && (
              <div className="absolute z-50 w-full mt-2 bg-white border border-current/20 rounded-xl overflow-hidden shadow-2xl text-neutral-900">
                {servicos?.map((s) => (
                  <div key={s.id} onClick={() => { setServicoSelecionado(s.id); setMenuAberto(false); }} className="p-4 text-sm hover:bg-neutral-100 cursor-pointer" style={{ backgroundColor: servicoSelecionado === s.id ? estiloAtivo.hex : '', color: servicoSelecionado === s.id ? 'white' : '' }}>
                    {s.nome}
                  </div>
                ))}
              </div>
            )}
          </div>
          <input className="w-full p-4 bg-inherit border border-current/10 rounded-xl text-sm" placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
          <input className="w-full p-4 bg-inherit border border-current/10 rounded-xl text-sm" placeholder="WhatsApp" onChange={(e) => setWhatsapp(e.target.value)} />
          <button type="submit" className={`w-full py-4 rounded-xl font-black uppercase ${estiloAtivo.botao}`}>
            {carregando ? "ENVIANDO..." : "SOLICITAR AGENDAMENTO"}
          </button>
        </div>
      </form>
    </section>
  );
}