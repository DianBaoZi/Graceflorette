import { redirect } from "next/navigation";
import { getCategory } from "@/lib/actions/categories";
import AdminLayout from "@/components/admin/AdminLayout";
import EditCategoryClient from "./EditCategoryClient";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    redirect("/Grace-admin/categories");
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-warm-gray">Edit Category</h1>
          <p className="text-warm-gray/60 mt-1">Update category information</p>
        </div>

        <div className="bg-white rounded-lg border border-primary/10 p-8">
          <EditCategoryClient category={category} />
        </div>
      </div>
    </AdminLayout>
  );
}
