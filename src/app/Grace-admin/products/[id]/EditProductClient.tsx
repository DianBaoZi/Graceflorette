"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  images: string[];
  is_available: boolean;
  is_featured: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
}

interface EditProductClientProps {
  product: Product;
  categories: Category[];
}

export default function EditProductClient({ product, categories }: EditProductClientProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    return await updateProduct(product.id, formData);
  };

  const handleCancel = () => {
    router.push("/Grace-admin/products");
  };

  return (
    <ProductForm
      product={product}
      categories={categories}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
