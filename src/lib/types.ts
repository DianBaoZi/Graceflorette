export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  category_id: string | null;
  category?: Category;
  images: string[];
  is_available: boolean;
  is_featured: boolean;
  tags: string[];
  created_at: string;
}

export interface HomepageSection {
  id: string;
  name: string;
  title: string;
  description: string | null;
  is_enabled: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}
