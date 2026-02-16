export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export interface ProductSize {
  name: string;
  price: number;
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
  sizes: ProductSize[];
  occasions: string[];
  is_available: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: ProductSize;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  items: CartItem[];
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
}
