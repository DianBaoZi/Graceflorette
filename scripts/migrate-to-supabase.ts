import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { sampleProducts } from "../src/lib/sample-data";

// Load environment variables from .env.local
config({ path: path.join(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables!");
  console.error("Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function uploadImage(imagePath: string): Promise<string | null> {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    const fileName = path.basename(imagePath);
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    console.log(`  📤 Uploading ${fileName}...`);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(uniqueFileName, imageBuffer, {
        contentType: "image/jpeg",
        upsert: false,
      });

    if (error) {
      console.error(`  ❌ Error uploading ${fileName}:`, error.message);
      return null;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(data.path);

    console.log(`  ✅ Uploaded: ${fileName}`);
    return publicUrl;
  } catch (error) {
    console.error(`  ❌ Error reading file ${imagePath}:`, error);
    return null;
  }
}

async function createCategories() {
  console.log("\n📁 Creating categories...");

  const categories = [
    {
      name: "Bouquets",
      slug: "bouquets",
      description: "Beautiful hand-tied bouquets perfect for any occasion",
      display_order: 0,
    },
    {
      name: "Arrangements",
      slug: "arrangements",
      description: "Stunning floral arrangements in vases",
      display_order: 1,
    },
    {
      name: "Special Occasions",
      slug: "special-occasions",
      description: "Flowers for weddings, graduations, and more",
      display_order: 2,
    },
  ];

  const categoryMap: { [key: string]: string } = {};

  for (const category of categories) {
    const { data, error } = await supabase
      .from("categories")
      .insert(category)
      .select()
      .single();

    if (error) {
      console.error(`  ❌ Error creating category ${category.name}:`, error.message);
    } else {
      console.log(`  ✅ Created category: ${category.name}`);
      categoryMap[category.slug] = data.id;
    }
  }

  return categoryMap;
}

async function migrateProducts() {
  console.log("\n🌸 Starting migration to Supabase...\n");

  // Create categories first
  const categoryMap = await createCategories();

  console.log("\n📸 Uploading images and creating products...\n");

  for (const product of sampleProducts) {
    console.log(`\n📦 Processing: ${product.name}`);

    // Upload images
    const uploadedImageUrls: string[] = [];
    for (const imagePath of product.images) {
      // Convert relative path to absolute path
      const absolutePath = path.join(process.cwd(), "public", imagePath);

      if (fs.existsSync(absolutePath)) {
        const url = await uploadImage(absolutePath);
        if (url) {
          uploadedImageUrls.push(url);
        }
      } else {
        console.log(`  ⚠️  Image not found: ${absolutePath}`);
      }
    }

    if (uploadedImageUrls.length === 0) {
      console.log(`  ⚠️  No images uploaded for ${product.name}, skipping product`);
      continue;
    }

    // Assign category (default to first category if not specified)
    const categoryId = categoryMap["bouquets"]; // Default category

    // Create product in database
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        category_id: categoryId,
        images: uploadedImageUrls,
        sizes: product.sizes,
        occasions: product.occasions,
        is_available: product.is_available,
        is_featured: product.is_featured,
      })
      .select()
      .single();

    if (error) {
      console.error(`  ❌ Error creating product ${product.name}:`, error.message);
    } else {
      console.log(`  ✅ Created product: ${product.name}`);
      console.log(`     - Images: ${uploadedImageUrls.length}`);
      console.log(`     - Sizes: ${product.sizes.length}`);
      console.log(`     - Featured: ${product.is_featured ? "Yes" : "No"}`);
    }
  }

  console.log("\n✨ Migration complete!\n");
}

// Run migration
migrateProducts().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});
