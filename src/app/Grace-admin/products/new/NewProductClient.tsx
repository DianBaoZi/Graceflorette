"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { createProduct } from "@/lib/actions/products";

interface Category {
  id: string;
  name: string;
}

interface NewProductClientProps {
  categories: Category[];
}

export default function NewProductClient({ categories }: NewProductClientProps) {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/Grace-admin/products");
  };

  return (
    <ProductForm
      categories={categories}
      onSubmit={createProduct}
      onCancel={handleCancel}
    />
  );
}
