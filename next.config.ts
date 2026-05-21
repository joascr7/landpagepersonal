import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co', // Mantém o seu Supabase liberado
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc', // Mantém o Postimages liberado
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com', // 🔥 ADICIONE ESTA LINHA PARA LIBERAR O IMGUR!
      },
    ],
  },
};

export default nextConfig;