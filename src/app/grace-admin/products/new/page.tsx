import { getCategories } from "@/lib/actions/categories";
import AdminLayout from "@/components/admin/AdminLayout";
import NewProductClient from "./NewProductClient";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-warm-gray">New Product</h1>
          <p className="text-warm-gray/60 mt-1">
            Create a new flower arrangement or product
          </p>
        </div>

        <div className="bg-white rounded-lg border border-primary/10 p-8">
          <NewProductClient categories={categories} />
        </div>
      </div>
    </AdminLayout>
  );
}
