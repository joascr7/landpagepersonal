import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer"; // Importando o rodapé

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuração de metadados corrigida e sem erros de sintaxe
export const metadata: Metadata = {
  title: "PT Consultoria Fitness | Joás Vieira",
  description: "Seu planejamento de treino de alta performance e consultoria personalizada na palma da sua mão.",
  openGraph: {
    title: "PT Consultoria Fitness | Joás Vieira",
    description: "Seu planejamento de treino de alta performance e consultoria personalizada na palma da sua mão.",
    type: "website",
    images: [
      {
        url: "/logo.jpg", // Busca automaticamente dentro da pasta public
        width: 1200,
        height: 630,
        alt: "PT Consultoria Fitness",
      },
    ], // Apenas uma vírgula aqui para fechar a propriedade interna
  }, // Fecha o openGraph
}; // Fecha o metadata por completo

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-950 text-white min-h-screen flex flex-col justify-between`}>
        <div className="w-full">
          {children}
        </div>
        {/* O Footer vai aparecer automaticamente no final de todas as páginas */}
        <Footer />
      </body>
    </html>
  );
}