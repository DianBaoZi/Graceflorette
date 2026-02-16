import { Product, Category } from "./types";

export const sampleCategories: Category[] = [];

export const sampleProducts: Product[] = [
  {
    id: "prod-1",
    name: "Sunshine & Blue Hydrangea Vase",
    slug: "sunshine-blue-hydrangea-vase",
    description:
      "Cheerful sunflowers paired with soft blue hydrangea and lush eucalyptus, arranged in an elegant glass vase. A stunning centrepiece that brightens any room.",
    price: 68,
    category_id: null,
    images: ["/flowers/flower-1.jpg"],
    sizes: [
      { name: "Standard", price: 68 },
      { name: "Premium", price: 88 },
    ],
    occasions: ["birthday", "congratulations", "housewarming"],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-2",
    name: "Sunflower Daisy Bouquet",
    slug: "sunflower-daisy-bouquet",
    description:
      "Bright sunflowers nestled among white daisies and baby's breath, wrapped in kraft paper with a satin ribbon. A joyful bouquet for any occasion.",
    price: 52,
    category_id: null,
    images: ["/flowers/flower-2.jpg"],
    sizes: [
      { name: "Standard", price: 52 },
      { name: "Premium", price: 72 },
    ],
    occasions: ["birthday", "congratulations", "graduation"],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-3",
    name: "Blush Hydrangea & Rose Bouquet",
    slug: "blush-hydrangea-rose-bouquet",
    description:
      "A romantic bouquet of pink hydrangea, blush roses, green lisianthus, and white daisies wrapped in burlap paper. Soft, elegant, and utterly charming.",
    price: 58,
    category_id: null,
    images: ["/flowers/flower-3.jpg"],
    sizes: [
      { name: "Standard", price: 58 },
      { name: "Premium", price: 78 },
      { name: "Deluxe", price: 98 },
    ],
    occasions: ["birthday", "anniversary", "romantic"],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-4",
    name: "Hot Pink Rose Bouquet",
    slug: "hot-pink-rose-bouquet",
    description:
      "Bold hot pink roses wrapped in sleek black paper with a dramatic ribbon. Striking, confident, and unforgettable. Perfect for making a statement.",
    price: 65,
    category_id: null,
    images: ["/flowers/flower-4.jpg"],
    sizes: [
      { name: "12 Stems", price: 65 },
      { name: "24 Stems", price: 110 },
    ],
    occasions: ["valentine", "anniversary", "romantic"],
    is_available: true,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-5",
    name: "Orange Rose & Chamomile Bouquet",
    slug: "orange-rose-chamomile-bouquet",
    description:
      "Vibrant orange roses surrounded by delicate chamomile flowers and lisianthus, wrapped in earthy brown paper. A warm, rustic arrangement with a modern twist.",
    price: 55,
    category_id: null,
    images: ["/flowers/flower-5.jpg"],
    sizes: [
      { name: "Standard", price: 55 },
      { name: "Premium", price: 75 },
    ],
    occasions: ["birthday", "congratulations", "housewarming"],
    is_available: true,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-6",
    name: "Red Carnation & Baby's Breath",
    slug: "red-carnation-babys-breath",
    description:
      "Classic red carnations paired with clouds of white baby's breath, wrapped in blush paper with a red satin ribbon. Timeless and heartfelt.",
    price: 45,
    category_id: null,
    images: ["/flowers/flower-6.jpg"],
    sizes: [
      { name: "Standard", price: 45 },
      { name: "Premium", price: 62 },
    ],
    occasions: ["valentine", "anniversary", "birthday"],
    is_available: true,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "prod-7",
    name: "Pink Tulip Bouquet",
    slug: "pink-tulip-bouquet",
    description:
      "Gorgeous pink tulips with delicate wax flowers, wrapped in kraft paper with a pink satin ribbon. Fresh, vibrant, and full of joy.",
    price: 50,
    category_id: null,
    images: ["/flowers/flower-7.jpg"],
    sizes: [
      { name: "Standard", price: 50 },
      { name: "Premium", price: 70 },
    ],
    occasions: ["birthday", "graduation", "congratulations"],
    is_available: true,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];
