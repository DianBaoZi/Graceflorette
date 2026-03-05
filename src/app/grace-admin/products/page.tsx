import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { getHomepageSections } from "@/lib/actions/homepage-sections";
import ResponsiveProductTable from "@/components/admin/ResponsiveProductTable";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function ProductsPage() {
  const [products, sections] = await Promise.all([getProducts(), getHomepageSections()]);
  const sectionLabels = Object.fromEntries(sections.map((s) => [s.id, s.title]));

  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-warm-gray">Products</h1>
            <p className="text-warm-gray/60 mt-1 text-sm sm:text-base">
              Manage your flower arrangements
            </p>
          </div>
          <Link
            href="/grace-admin/products/new"
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#d4a5a5] via-primary-dark to-[#c89097] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-primary-dark/30 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden text-sm sm:text-base"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Add New Product</span>
              <span className="sm:hidden">New Product</span>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Link>
        </div>

        <ResponsiveProductTable products={products} sectionLabels={sectionLabels} />
      </div>
    </AdminLayout>
  );
}
