import { supabase } from "@/lib/supabase";

export async function salvarProduto(produto, clienteId) {
  // Garantimos que o cliente_id seja sempre enviado
  const payload = {
    ...produto,
    cliente_id: clienteId,
    ativo: produto.ativo ?? true,
    esgotado: produto.esgotado ?? false
  };

  const { data, error } = await supabase
    .from('produtos')
    .upsert(payload) // Upsert cria se não existe, ou atualiza se já tem o ID
    .select();

  if (error) {
    console.error("Erro ao salvar no Supabase:", error);
    throw error;
  }
  return data;
}