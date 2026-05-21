import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadados genéricos para a raiz do seu SaaS
export const metadata: Metadata = {
  title: "Plataforma SaaS | Suas Páginas em Alto Nível",
  description: "Crie e gerencie suas landing pages profissionais de prestação de serviços.",
};

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
        {/* O Footer foi removido daqui porque agora ele é renderizado dinamicamente dentro de cada página passando o cliente */}
      </body>
    </html>
  );
}