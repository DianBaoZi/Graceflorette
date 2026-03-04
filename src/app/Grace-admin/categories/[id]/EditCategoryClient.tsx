"use client";

import { useRouter } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import { updateCategory } from "@/lib/actions/categories";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
}

interface EditCategoryClientProps {
  category: Category;
}

export default function EditCategoryClient({ category }: EditCategoryClientProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    return await updateCategory(category.id, formData);
  };

  const handleCancel = () => {
    router.push("/Grace-admin/categories");
  };

  return (
    <CategoryForm
      category={category}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
