export const getThemeColors = (cor: string) => ({
  texto: cor === 'pink' ? 'text-pink-500' : 'text-amber-500',
  bg: cor === 'pink' ? 'bg-pink-500' : 'bg-amber-500',
  border: cor === 'pink' ? 'border-pink-500/20' : 'border-amber-500/20',
  hoverBg: cor === 'pink' ? 'hover:bg-pink-500' : 'hover:bg-amber-500',
  accent: cor === 'pink' ? 'accent-pink-500' : 'accent-amber-500',
  // Adicione aqui qualquer outra classe que você usa no site
});