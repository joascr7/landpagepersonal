// app/[tenant]/admin/servicos/layout.tsx
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode, 
  params: Promise<{ tenant: string }> 
}) {
  // Resolvemos a Promise aqui
  const { tenant } = await params;

  return (
    <div className="flex bg-neutral-950 min-h-screen">
      <Sidebar tenant={tenant} />
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}