import AdminLayout from "@/components/admin/AdminLayout";

export default function Loading() {
  return (
    <AdminLayout>
      <div className="max-w-4xl animate-pulse">
        <div className="mb-6">
          <div className="h-8 w-56 bg-[#E8DED4] rounded-lg" />
          <div className="h-4 w-72 bg-[#E8DED4] rounded mt-2" />
        </div>
        <div className="h-20 bg-[#F5EDE5] rounded-lg mb-6" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white p-6" style={{ border: "2px solid #E5E7EB" }}>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-5 w-40 bg-[#F5EDE5] rounded mb-2" />
                  <div className="h-4 w-60 bg-[#F5EDE5] rounded" />
                </div>
                <div className="w-12 h-7 bg-[#F5EDE5] rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
