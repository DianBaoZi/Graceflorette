import { redirect } from "next/navigation";
import { getProduct } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import AdminLayout from "@/components/admin/AdminLayout";
import EditProductClient from "./EditProductClient";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(),
  ]);

  if (!product) {
    redirect("/Grace-admin/products");
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-warm-gray">Edit Product</h1>
          <p className="text-warm-gray/60 mt-1">Update product information</p>
        </div>

        <div className="bg-white rounded-lg border border-primary/10 p-8">
          <EditProductClient product={product} categories={categories} />
        </div>
      </div>
    </AdminLayout>
  );
}
