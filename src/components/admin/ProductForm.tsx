"use client";

import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  product?: {
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
  };
  categories: Category[];
  onSubmit: (formData: FormData) => Promise<{ error?: string }>;
  onCancel: () => void;
}

const sectionCard: React.CSSProperties = {
  background: "white",
  borderRadius: "1.25rem",
  padding: "1.75rem",
  border: "1px solid #F2D7D9",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  background: "white",
  border: "1.5px solid #F2D7D9",
  borderRadius: "0.75rem",
  color: "#2C2826",
  outline: "none",
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.7rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#9B9593",
  marginBottom: "0.5rem",
};

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "#C9A2A7";
  e.target.style.boxShadow = "0 0 0 3px rgba(201,162,167,0.1)";
}

function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
  e.target.style.borderColor = "#F2D7D9";
  e.target.style.boxShadow = "none";
}

function Toggle({ checked, onChange, label, sub }: { checked: boolean; onChange: () => void; label: string; sub?: string }) {
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl"
      style={{ background: "#FAFAFA", border: "1px solid #F2D7D9", cursor: "pointer" }}
      onClick={onChange}
    >
      <div>
        <div className="text-sm font-medium" style={{ color: "#2C2826" }}>{label}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: "#9B9593" }}>{sub}</div>}
      </div>
      <button
        type="button"
        className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0"
        style={{ background: checked ? "#C9A2A7" : "#D1D5DB" }}
        onClick={(e) => { e.stopPropagation(); onChange(); }}
      >
        <span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          style={{
            transform: checked ? "translateX(24px)" : "translateX(4px)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
          }}
        />
      </button>
    </div>
  );
}

export default function ProductForm({ product, categories, onSubmit, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(product?.category_id || "");
  const [images, setImages] = useState<string[]>(product?.images || []);
  const [isAvailable, setIsAvailable] = useState(product?.is_available ?? true);
  const tags = product?.tags || [];
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateSlug = (name: string): string =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  useEffect(() => {
    if (!product && name) setSlug(generateSlug(name));
  }, [name, product]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Product name is required"); return; }
    if (!price || parseFloat(price) <= 0) { setError("Valid price is required"); return; }
    if (images.length === 0) { setError("At least one product image is required"); return; }
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category_id", categoryId);
    formData.append("images", JSON.stringify(images));
    formData.append("is_available", isAvailable.toString());
    formData.append("tags", JSON.stringify(tags));
    const result = await onSubmit(formData);
    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF2F2", color: "#B91C1C", border: "1px solid #FECACA" }}>
          {error}
        </div>
      )}

      {/* Basic Information */}
      <div style={sectionCard}>
        <h2 className="font-heading text-lg mb-5" style={{ color: "#2C2826" }}>Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label style={labelStyle}>Product Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={focusInput}
              onBlur={blurInput}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Base Price (SGD) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                min="0"
                style={inputStyle}
                onFocus={focusInput}
                onBlur={blurInput}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                style={inputStyle}
                onFocus={focusInput}
                onBlur={blurInput}
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div style={sectionCard}>
        <h2 className="font-heading text-lg mb-1.5" style={{ color: "#2C2826" }}>Product Images *</h2>
        <p className="text-xs mb-4" style={{ color: "#9B9593" }}>First image will be the main thumbnail. Drag to reorder.</p>
        <ImageUpload images={images} onChange={setImages} />
      </div>

      {/* Visibility Settings */}
      <div style={sectionCard}>
        <h2 className="font-heading text-lg mb-4" style={{ color: "#2C2826" }}>Visibility Settings</h2>
        <div className="space-y-3">
          <Toggle
            checked={isAvailable}
            onChange={() => setIsAvailable(!isAvailable)}
            label="Available for Purchase"
            sub="Show this product in the shop"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #C9A2A7 0%, #b5828a 100%)" }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving…
            </span>
          ) : (
            product ? "Save Changes" : "Create Product"
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-6 py-3.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50 hover:opacity-80"
          style={{ background: "white", border: "1.5px solid #F2D7D9", color: "#6B6462" }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
