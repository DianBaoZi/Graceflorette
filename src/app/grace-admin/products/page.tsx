import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { getHomepageSections } from "@/lib/actions/homepage-sections";
import ProductTable from "@/components/admin/ProductTable";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function ProductsPage() {
  const [products, sections] = await Promise.all([getProducts(), getHomepageSections()]);
  const sectionLabels = Object.fromEntries(sections.map((s) => [s.id, s.title]));

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-warm-gray">Products</h1>
            <p className="text-warm-gray/60 mt-1">
              Manage your flower arrangements and products
            </p>
          </div>
          <Link
            href="/grace-admin/products/new"
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#d4a5a5] via-primary-dark to-[#c89097] text-white px-6 py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg hover:shadow-primary-dark/30 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Product
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
          </Link>
        </div>

        <ProductTable products={products} sectionLabels={sectionLabels} />
      </div>
    </AdminLayout>
  );
}
