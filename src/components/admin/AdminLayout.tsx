import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#F5EDE5" }}>
      <AdminNav />
      <main className="flex-1 overflow-x-auto overflow-y-auto min-w-0">
        <div className="max-w-7xl mx-auto p-8 min-w-0">{children}</div>
      </main>
    </div>
  );
}
