import { useState } from 'react';

export const useCart = () => {
  const [carrinho, setCarrinho] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [produtoEmEdicao, setProdutoEmEdicao] = useState<any>(null);

  const adicionarAoCarrinho = (item: any) => {
    setCarrinho([...carrinho, { ...item, idUnico: Date.now() }]);
    setProdutoEmEdicao(null);
  };

  const removerDoCarrinho = (index: number) => {
    setCarrinho(carrinho.filter((_, i) => i !== index));
  };

  const editarItem = (item: any, index: number) => {
    setProdutoEmEdicao(item);
    removerDoCarrinho(index);
    setIsCartOpen(false);
  };

  return { carrinho, setCarrinho, isCartOpen, setIsCartOpen, produtoEmEdicao, setProdutoEmEdicao, adicionarAoCarrinho, editarItem };
};