import AdminLayout from "@/components/admin/AdminLayout";

export default function Loading() {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-8 w-40 bg-[#E8DED4] rounded-lg" />
            <div className="h-4 w-56 bg-[#E8DED4] rounded mt-2" />
          </div>
          <div className="h-12 w-44 bg-[#E8DED4] rounded-xl" />
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #F2D7D9" }}>
          <div className="h-12 bg-[#FDF8F4]" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-4 bg-white" style={{ borderTop: "1px solid rgba(242,215,217,0.45)" }}>
              <div className="w-7 h-7 rounded-lg bg-[#F5EDE5]" />
              <div className="flex-1 h-4 bg-[#F5EDE5] rounded" />
              <div className="w-20 h-4 bg-[#F5EDE5] rounded" />
              <div className="w-24 h-4 bg-[#F5EDE5] rounded" />
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
