export default function AvatarGroup({ corDestaque = "text-pink-500" }) {
  // Lista de URLs de imagens de perfis de clientes (fakes ou de banco de imagens)
  // Certifique-se de ter essas imagens na sua pasta public/clientes/ ou use URLs externas.
  const fotosClientes = [
    "/clientes/perfil-1.jpg",
    "/clientes/perfil-2.jpg",
    "/clientes/perfil-3.jpg",
  ];

  return (
    <div className="flex items-center gap-4 text-inherit">
      {/* Grupo de Avatares Sobrepostos com Imagens Reais */}
      <div className="flex -space-x-3 isolate">
        {fotosClientes.map((foto, i) => (
          <div 
            key={i} 
            // Borda-inherit para o efeito de recorte, fundo escuro de fallback
            className="w-10 h-10 rounded-full border-2 border-inherit bg-neutral-800 flex items-center justify-center overflow-hidden shadow-lg z-10"
          >
            {/* Imagem do Cliente. O object-cover é crucial para não distorcer. */}
            <img 
              src={foto} 
              alt={`Cliente ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Avaliação e Contador */}
      <div className="flex flex-col">
        {/* Usamos corDestaque (Pink ou Amber) para a cor viva das estrelas */}
        <div className={`flex ${corDestaque} text-xs`}>
          {"★★★★★".split("").map((star, i) => <span key={i} className="leading-none">{star}</span>)}
        </div>
        <p className="font-bold text-sm text-white mt-1">+300 Unhas</p>
      </div>
    </div>
  );
}