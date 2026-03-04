"use client";

import { useRouter } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { createCategory } from "@/lib/actions/categories";
import AdminLayout from "@/components/admin/AdminLayout";

export default function NewCategoryPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/Grace-admin/categories");
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-warm-gray">New Category</h1>
          <p className="text-warm-gray/60 mt-1">
            Create a new product category
          </p>
        </div>

        <div className="bg-white rounded-lg border border-primary/10 p-8">
          <CategoryForm onSubmit={createCategory} onCancel={handleCancel} />
        </div>
      </div>
    </AdminLayout>
  );
}
